import React, { useEffect, useState } from 'react'
import Track from './Track'


const SpotifyUserPanel = ({userTracks}) => {
    return (
        <div className='flex flex-col h-screen'>
            <div className='p-5 text-4xl text-white'><h1>Profile</h1></div>
            <div className='flex flex-col h-full overflow-y-hidden'>
                {userTracks &&
                    <div className='flex flex-col mt-3 scrollbar-thin scrollbar-thumb-gray-600'>
                        {userTracks.map(track=>{
                            return (
                                // this is bad. Need to make a formal sturcture for all track objects that matches db fields.
                                <Track track={{
                                    album:{
                                        images:[{url:track.albumArtUrl}],
                                    },
                                    name: track.trackName,
                                    artists:[{name: track.trackArtist}],
                                    status: track.status,
                                    }
                                } 
                                key={track.trackId} 
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

export default SpotifyUserPanel
