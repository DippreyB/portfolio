import axios from 'axios'
import { getSession } from 'next-auth/react'
export default async function handler(req, res) {
    
    const session = await getSession({req})
    session.test = 'test'
    const accessToken = session.token.accessToken

    if(req.method === 'GET'){
        const playlistId = '0MPHAULITCjfDqSvSEsMbI'
        const config = {
            headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application-json'
            }
        }   

        const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/`, config)
        res.status(200).json(data)

    }
}