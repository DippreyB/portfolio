import React from 'react'

const Track = ({track, addTrackHandler, acceptTrackHandler, rejectTrackHandler}) => {
    let textColor 
    if(track.status === undefined)
        textColor = 'text-white'
    else if(track.status === 'pending')
        textColor = 'text-yellow-500'
    else if(track.status === 'accepted')
        textColor = 'text-green-500'
    else textColor = 'text-red-500'

    return (
        <div className='flex bg-gray-800 text-white p-3' >

            <div className='flex flex-1 justify-between  '>
                <div className='flex gap-3'>
                    <div className='w-16'> <img src={track.album.images[0].url}></img></div>
                    <div className='flex flex-col justify-center'>
                        
                        <div className={textColor}>
                            {track.name}
                        </div>
                        <div className={textColor}>
                            {track.artists[0].name}
                        </div>
                    </div>
                </div>
                {track.status &&
                        <div className='flex flex-col'>
                            <div className={textColor}>{track.status}</div>
                            {acceptTrackHandler &&
                                <button className='underline hover:text-green-500' onClick={()=>acceptTrackHandler(track)}>accept</button>
                            }
                            {rejectTrackHandler &&
                                <button className='underline hover:text-red-500' onClick={()=>rejectTrackHandler(track)}>reject</button>
                            }
                        </div>
                }
                
            </div>
            {addTrackHandler &&
                <button className='self-center hover:text-green-500 p-2 flex flex-col justify-center' onClick={()=>addTrackHandler(track)}>
                    <span className='text-3xl  '>+</span>
                </button>
            }

            


        </div>
    )
}

export default Track
