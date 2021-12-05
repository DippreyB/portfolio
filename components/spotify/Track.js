import React from 'react'

const Track = ({track, addTrackHandler}) => {

    return (
        <div className='flex justify-between bg-gray-800 text-white p-3' >

            <div className='flex gap-3 '>
                <div className='w-16'> <img src={track.album.images[0].url}></img></div>
                <div className='flex flex-col justify-center'>
                    <div>{track.name}</div>
                    <div>{track.artists[0].name}</div>
                </div>
            </div>
            {addTrackHandler &&
                <button onClick={()=>addTrackHandler(track.id)}>
                    +
                </button>
            }


        </div>
    )
}

export default Track
