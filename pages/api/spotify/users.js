import connectDB from '../../../config/db'
import User from '../../../models/userModel'
import Track from '../../../models/trackModel'
import { getSession } from 'next-auth/react'


export default async function handler(req,res){
    const nextSession = await getSession({req})
    await connectDB()

    let name, email, user, session
    if(nextSession !== null){
        session = nextSession.session
        name = session.user.name
        email = session.user.email
        user = await User.findOne({email: email})
    }

    
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
        console.log('put going off')
        const track = await Track.findOne({trackId: req.body.trackId})
        let createdTrack
        if(track !== null){
            res.status(500).json({message: "Track already requested."})
        }
        if(track === null){
             createdTrack = await Track.create({
                trackId: req.body.trackId,
                trackArtist: req.body.trackArtist,
                trackName: req.body.trackName,
                albumArtUrl: req.body.albumArtUrl,
                status:'pending',
                uri: req.body.uri
            })
            console.log(createdTrack)
            res.status(200).json(createdTrack)
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
        
    }
    else
        res.status(404).json('something went wrong')

}