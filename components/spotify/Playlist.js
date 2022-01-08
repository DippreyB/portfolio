import React, {useState} from 'react'

import Track from './Track'
import {FaArrowUp, FaCentercode} from 'react-icons/fa'
import { motion } from 'framer-motion'

const Playlist = ({items}) => {
    
    const [playListItems, setPlayListItems] = useState(items)
    const [currentSort, setCurrentSort]  = useState('date-descending')

    const changeDateOrder = () => {
        if(currentSort !== 'date-ascending'){
            setPlayListItems(items.reverse())
            setCurrentSort('date-ascending')
        }
        else{
            setPlayListItems(playListItems.reverse())
            setCurrentSort('date-descending')
        }
    }

    const variants = {
        up: {rotate: 180, originX: .75,  transition: {duration: .5} },
        down: {rotate: 0, originX: .75,  transition: {duration: .5} },
    }

    return (
        <div className='flex flex-col h-screen '>
            <div className='p-5 text-4xl text-white hidden md:block'><h1>Playlist</h1></div>
            <label className='text-white text-xs'>Sort by: </label>
            <button className='bg-gray-800 rounded-lg m-2 text-white self-start text-xs p-2 hover:text-green-400 flex items-center'
                onClick={()=>changeDateOrder()}
            >
                Date Added
                <motion.div
                    variants={variants}
                    animate={currentSort === 'date-descending' ? 'down' : 'up'}
                >
                    <FaArrowUp className='ml-2'/>
                </motion.div>
            </button>
            <div className={`flex 
                            overflow-y-scroll 
                            scrollbar-thin 
                            scrollbar-thumb-gray-600
                            flex-col
                            `
            }>
                {playListItems.map(item => {
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
