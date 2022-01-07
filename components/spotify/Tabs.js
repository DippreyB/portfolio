import React, { useState } from 'react'
import Playlist from './Playlist'
import SpotifySearch from './SpotifySearch'

const Tabs = ({items, requestTrackHandler}) => {
    const [activeTab, setActiveTab] = useState('playlist')
    return (
        <div className='block md:hidden pr-5 pl-5 bg-gray-900'>
            <ul className='pt-20 flex text-white'>
                
                <li id='playlist' className={`p-5 text-xl ${activeTab === 'playlist' ? 'text-green-400' : 'text-white'}`} onClick={()=>setActiveTab('playlist')}> <a href='#playlist'>Playlist</a></li>
                
                <li id='search' className={`p-5 text-xl ${activeTab === 'search' ? 'text-green-400' : 'text-white'}`} onClick={()=>setActiveTab('search')}><a href='#search'>Search</a></li>
            </ul>
            <div id='tab-content' >
                {activeTab &&
                    activeTab === 'playlist' ? <Playlist items={items} />
                    :
                    activeTab === 'search' ? <SpotifySearch requestTrackHandler={requestTrackHandler} />
                    :
                    <div>This should not render.</div>
                }
            </div>
        </div>
    )
}

export default Tabs
