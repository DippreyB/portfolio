import connectDB from '../../../config/db'
import User from '../../../models/userModel'
import Track from '../../../models/trackModel'
import { getSession } from 'next-auth/react'


export default async function handler(req,res){
    const {session} = await getSession({req})
    const {name, email} = session.user
    await connectDB()
    const user = await User.findOne({email: email})
    
    if(req.method === "GET"){
        if(user === null){
            const createdUser = await User.create({
                "name": name,
                "email": email,
                "isAdmin": false,
                "tracks": []
            })
        res.status(200).json(createdUser)
        }
        res.status(200).json(user)
    }
    else if(req.method === 'PUT'){
        const track = await Track.findOne({trackId: req.body.trackId})
        let createdTrack
        if(track === null){
             createdTrack = Track.create({
                trackId: req.body.trackId,
                trackArtist: req.body.trackArtist,
                trackName: req.body.trackName,
                albumArtUrl: req.body.albumArtUrl,
                status:'pending',
                uri: req.body.uri
            })
        }
        if(user && createdTrack){
            const updatedUser = await user.addTrack({
                trackId: req.body.trackId,
                trackArtist: req.body.trackArtist,
                trackName: req.body.trackName,
                albumArtUrl: req.body.albumArtUrl,
                uri: req.body.uri
            })
            res.status(200).json(updatedUser.tracks)
        }
        else{
            res.status(400).json({error: 'Unable to request track'})
        }
    }
    else
        res.status(404).json('something went wrong')

}