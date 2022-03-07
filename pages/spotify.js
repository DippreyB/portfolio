import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Playlist from "../components/spotify/Playlist";
import SpotifySearch from "../components/spotify/SpotifySearch";
import SpotifyAdminPanel from "../components/spotify/SpotifyAdminPanel";
import Tabs from "../components/spotify/Tabs";
import {motion} from 'framer-motion';
import {Toaster, toast} from 'react-hot-toast';



function Spotify() {
    const {data: session} = useSession()
    const [playlist, setPlaylist] = useState()
    const [user, setUser] = useState()
    
    useEffect(() => {
        const getPlaylists = async () => {
            const {data} = await axios.get('/api/spotify/playlist')
            setPlaylist(data)
        }
        const getUserTracks = async () => {
            const {data} = await axios.get('/api/spotify/users')
            setUser(data)
        }
        getPlaylists()
        if(session && session !== null){
            getUserTracks()
        }

    },[session])
    
    const requestTrackHandler = async (track) =>{
            
            try{

                const trackInfo = {
                    trackArtist : track.artists[0].name,
                    trackName : track.name,
                    trackId : track.id,
                    albumArtUrl : track.album.images[0].url,
                    uri: track.uri,
                    requesterName: user.name,
                }
                console.log(trackInfo)
                const {data} = await toast.promise( axios.put('/api/spotify/users', trackInfo), 
                    {
                        loading:"Requesting...",
                        success:"Track requested!",
                        error:"Unable to request track."
                    }
                )
                console.log('Track requested: ', data)
            }catch(error){
               console.log(error.response.data.message)
            }
    }

    
    return (
        <>
        {playlist &&

            <main className='bg-gray-900 h-screen'>
                <Toaster />
                <Nav dark={true}>
                {session === null?
                        <a className="cursor-pointer" onClick={() => signIn('spotify')} >Sign In</a> 
                        :
                        <a className="cursor-pointer"  onClick={()=> signOut()} >Sign Out</a>
                    }
                </Nav>
                   
                    <section className='flex-1 flex-wrap md:justify-start justify-center max-h-full md:max-h-screen pt-10 bg-gray-900 hidden md:flex'>
                        <>
                        <section className='max-h-full flex-1 p-3 bg-gray-900'>
                            {playlist &&
                                <Playlist items={playlist.tracks.items}/>
                            }
                        </section>
                        <section className='max-h-full flex-1 p-3 bg-gray-900'>

                            <SpotifySearch requestTrackHandler={requestTrackHandler}/>
                        </section>
                        {user &&
                        user.isAdmin && 
                            <section className='max-h-full flex-1 p-3 bg-gray-900'>
                                <SpotifyAdminPanel />
                        
                            </section>
                            
                        }
                        </>
                        </section>
                    
                    <Tabs requestTrackHandler={requestTrackHandler} items={playlist.tracks.items}/>
                
            </main>
        }
            <motion.div
                className='slide-in-spotify'
                initial={{scaleX: 0}}
                animate={{scaleX: 0}}
                exit={{scaleX: 1}}
                transition={{duration: 1, ease: "easeInOut"}}
            />
            <motion.div
                className='slide-out-spotify'
                initial={{scaleX: 1}}
                animate={{scaleX: 0}}
                exit={{scaleX: 0}}
                transition={{duration: 1, ease: "easeInOut"}}
            />
        </>
    )
}

export default Spotify