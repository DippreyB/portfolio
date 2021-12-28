import axios from "axios";
import { getSession } from "next-auth/react";
import qs from 'qs'

export default async function handler(req,res) {
    
    const {sq} = req.query

    const config = {
        headers: {  
            Accept: 'application/json',
            Authorization: `Basic ` + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    const body = {'grant_type': 'client_credentials'}
    let clientToken
    try{
        const {data} = await axios.post('https://accounts.spotify.com/api/token',qs.stringify(body), config)
        console.log(data);
        clientToken = data.access_token
    }catch(error){
        console.log(error)
    }

    if(req.method === 'GET'){

        const endpoint = `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${sq}`

        const config = {
            headers: {
                Authorization: `Bearer ${clientToken}`,
                'Content-Type': 'application-json'
            }
        }
        
        const {data} = await axios.get(endpoint, config)
        res.status(200).json(data)
    }
}