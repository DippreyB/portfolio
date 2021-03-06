import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Track from './Track'
import { useSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import drake from '../../public/drake.png'
import { motion } from 'framer-motion'

const SpotifySearch = ({requestTrackHandler}) => {
    const [search, setSearch] = useState()
    const [searchResults, setSearchResults] = useState()
    const {data: session} = useSession()

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

    let email
    if(session != null)
    email = session.session.user.email;
   
    return (
        <div className='flex flex-col h-full max-h-screen justify-center'>

            {!session && 
                <button className='p-6 border-green-400 border-2 text-white hover:text-green-400' onClick={() => signIn('google')}>Sign In to Google</button>
            }

            {session &&
            <>
                <div className='p-5 text-4xl text-white hidden md:block'>
                    <h1 className='flex'>
                        <div className='flex flex-col justify-center'>Search {email && email === process.env.NEXT_PUBLIC_DRAKE_FAN && <>for</>}</div> 

                        {email && email ===process.env.NEXT_PUBLIC_DRAKE_FAN &&
                        <motion.div className='ml-10' animate={{rotate: 360}} transition={{repeat: Infinity, repeatType:"loop", duration: 3, ease: 'linear'}}>
                            <Image src={drake} width={50} height={71} />
                        </motion.div>
                        }
                        
                    </h1>
                </div>
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
                                    <Track requestTrackHandler={requestTrackHandler} track={{...track}} key={track.id} >
                                        
                                    </Track>
                                )
                            })}
                        </div>
                    }
                </div>
            </>
            }

        </div>
    )
}

export default SpotifySearch
