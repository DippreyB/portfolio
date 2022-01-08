import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Track from './Track'
import { FaCheckCircle} from 'react-icons/fa'

const SpotifySearch = ({requestTrackHandler}) => {
    const [search, setSearch] = useState()
    const [searchResults, setSearchResults] = useState()
    const [requesterName, setRequesterName] = useState()
    const [submitName, setSubmitName] = useState()

    useEffect(() => {
        const getSearchResults = async () => {
            const {data} = await axios.get(`/api/spotify/search/${search}`)
            setSearchResults(data)
        }
        if(search)
            getSearchResults()
        if(search && search.length == 0)
            setSearchResults(undefined)
    },[search])

    
   
    return (
        <div className='flex flex-col h-full max-h-screen'>

            {submitName &&
            <>
                <div className='p-5 text-4xl text-white hidden md:block'><h1>Search</h1></div>
                <input 
                        type='text' 
                        placeholder='Suggest a track' 
                        className='p-3 rounded'
                        onChange={(e)=>setSearch(e.target.value)}
                />
                
                <div className='flex flex-col h-full overflow-y-hidden'>
                    {searchResults &&
                        <div className='flex flex-col mt-3 scrollbar-thin scrollbar-thumb-gray-600'>
                            {searchResults.tracks.items.map(track=>{
                                return (
                                    <Track requestTrackHandler={requestTrackHandler} track={{requesterName: submitName, ...track}} key={track.id} >
                                        
                                    </Track>
                                )
                            })}
                        </div>
                    }
                </div>
            </>
            }

            {!submitName && 
            <>
                <div className='p-5 text-4xl text-white hidden md:block'><h1>Enter your name</h1></div>
                <div className='flex'>
                    <input 
                            type='text' 
                            placeholder='Enter your name to search' 
                            className='p-3 rounded flex-1 rounded-r-none'
                            onChange={(e)=>setRequesterName(e.target.value)}
                    />
                    <button className='bg-gray-800 text-white rounded-r-sm pl-6 pr-6' onClick={()=>setSubmitName(requesterName)}><FaCheckCircle /></button>
                </div>
            </>
            }
        </div>
    )
}

export default SpotifySearch
