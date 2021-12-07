import React from 'react'
import Track from './Track'

const Playlist = ({items}) => {
    return (
        <div className='flex flex-col h-screen '>
        <div className='p-5 text-4xl text-white'><h1>Class Playlist</h1></div>
        <div className='flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600'>
            {items.map(item => {
                const {track} = item
                return (
                    <Track key={`playlist-${track.id}`} track={track}/>
                )
            })}
            
            
        </div>
        </div>
    )
}

export default Playlist
