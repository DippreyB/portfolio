import React, { useEffect, useState } from 'react'
import Track from './Track'
import axios from 'axios'
import { useSession } from 'next-auth/react'


const SpotifyAdminPanel = ({setMessage}) => {
    const {data: session} = useSession()
    const [requestedTracks, setRequestedTracks] = useState()

    useEffect(()=>{
        const getRequestedTracks = async () =>{ 
            const {data} = await axios.get('/api/spotify/admin/tracks')
            setRequestedTracks(data)
        }
        if(session)
            getRequestedTracks()
    },[session])

    const acceptTrackHandler = async (track) => {
        const {data} = await axios.put('/api/spotify/admin/tracks',{trackId: track.trackId, status: "accepted"})
        if(data)
        setMessage({
            text: 'Track accepted.',
            type: 'success'
        })
    }
    const rejectTrackHandler = async (track) => {
        const {data} = await axios.put('/api/spotify/admin/tracks',{trackId: track.trackId, status: "rejected"})
        setMessage({
            text: 'Track rejected.',
            type: 'success'
        })
    }
    
    return (
        <div className='flex flex-col h-screen'>
            <div className='p-5 text-4xl text-white'><h1>Admin</h1></div>
            <div className='flex flex-col h-full overflow-y-hidden'>
                {requestedTracks &&
                    <div className='flex flex-col mt-3 scrollbar-thin scrollbar-thumb-gray-600'>
                        {requestedTracks.map(track=>{
                            
                            if(track.status === 'pending')
                            return (
                                // this is bad. Need to make a formal sturcture for all track objects that matches db fields.
                                //consider making a helper method to normalize tracks
                                <Track track={{
                                    album:{
                                        images:[{url:track.albumArtUrl}],
                                    },
                                    trackId: track.trackId,
                                    name: track.trackName,
                                    artists:[{name: track.trackArtist}],
                                    status: track.status,
                                    uri: track.uri
                                    }
                                } 
                                key={track.trackId} 
                                acceptTrackHandler={acceptTrackHandler}
                                rejectTrackHandler={rejectTrackHandler}
                                >
                                    
                                </Track>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default SpotifyAdminPanel
