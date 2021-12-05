import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Playlist from "../components/spotify/Playlist";
import SpotifySearch from "../components/spotify/SpotifySearch";


export default function Spotify() {
    const {data: session} = useSession()
    const [playlist, setPlaylist] = useState()
    
    useEffect(() => {
        const getPlaylists = async () => {
            const {data} = await axios.get('/api/spotify/playlist')
            setPlaylist(data)
        }
        if(session && session !== null){
            getPlaylists()
        }

    },[session])

    return (
        <>
            <Nav/>
            <div className='container flex justify-end items-center mt-10'>
                {session === null?
                    <button onClick={() => signIn()} >Sign In</button> 
                    :
                    <button onClick={()=> signOut()} >Sign Out</button>
                }
                    
            </div>
            <main className='flex flex-wrap md:justify-start justify-center max-h-full md:max-h-screen'>
                <section className='max-h-full flex-1 p-3 bg-gray-900'>
                    {playlist &&
                        <Playlist items={playlist.tracks.items}/>
                    }
                </section>
                <section className='max-h-full flex-1 p-3 bg-gray-900'>
                    <SpotifySearch />
                </section>
            </main>
        </>
    )
}