import connectDB from '../../../config/db'
import User from '../../../models/userModel'
import { getSession } from 'next-auth/react'
import mongoose from 'mongoose'

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
        if(user){
            console.log(req.body)
            const updatedUser = await user.addTrack(req.body)
            console.log(updatedUser)
            res.status(200).json(updatedUser.tracks)
        }
    }
    else
        res.status(404).json('something went wrong')

}