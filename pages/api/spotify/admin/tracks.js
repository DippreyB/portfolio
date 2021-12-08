import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import axios from 'axios'
import Track from "../../../../models/trackModel";
import User from '../../../../models/userModel'

export default async function handler(req,res){
    const {session} = await getSession({req})
    const {user} = session

    const secret = process.env.NEXT_AUTH_SECRET
    const token = await getToken({req, secret})
    
    const {isAdmin} = await User.findOne({email: user.email})
    if(!isAdmin){
        req.status(401).json({error: 'Not authorized.'})
    }

    if(req.method === 'GET'){
        const tracks = await Track.find()
        res.status(200).json(tracks)
    }
    if(req.method === 'PUT'){
        const track = await Track.findOne({trackId: req.body.trackId})
        track.status = req.body.status

        //if status === accepted => make req to spotify api
        if(track.status === 'accepted'){
            const playlistId = '0MPHAULITCjfDqSvSEsMbI'
            const config = {
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }   
            const res = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks/`,{"uris": [track.uri]}, config)
            track.save()
            
        }
        
       
        //iterate through all users. find users that contain track id and update with new status
        const users = await User.find()
        users.map(user => {
            const userTrack = user.tracks.find(userTrack => track.trackId === userTrack.trackId)
            
            if(userTrack && userTrack !== null)
                userTrack.status = track.status

            user.save()
        })

        if(track.status ==='rejected'){
            res.status(200).json(track)
            track.remove()
        }
        if(track.status === 'accepted'){
            res.status(200).json(track)
        }

        

        
    }
    
}