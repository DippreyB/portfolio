import axios from "axios";
import { getSession } from "next-auth/react";

export default async function handler(req,res) {
    
    const session = await getSession({req})
    const accessToken = session.token.accessToken
    const {sq} = req.query
    if(req.method === 'GET'){

        const endpoint = `https://api.spotify.com/v1/search?type=track&include_external=audio&q=${sq}`

        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application-json'
            }
        }
        
        const {data} = await axios.get(endpoint, config)
        res.status(200).json(data)
    }
}