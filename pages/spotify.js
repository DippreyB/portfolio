import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Playlist from "../components/spotify/Playlist";
import SpotifySearch from "../components/spotify/SpotifySearch";
import SpotifyUserPanel from "../components/spotify/SpotifyUserPanel";


export default function Spotify() {
    const {data: session} = useSession()
    const [playlist, setPlaylist] = useState()
    const [userTracks, setUserTracks] = useState([])
    
    useEffect(() => {
        const getPlaylists = async () => {
            const {data} = await axios.get('/api/spotify/playlist')
            setPlaylist(data)
        }
        const getUserTracks = async () => {
            const {data} = await axios.get('/api/spotify/users')
            setUserTracks(data.tracks)
        }
        if(session && session !== null){
            getPlaylists()
            getUserTracks()
        }

    },[session])


    const addTrackHandler = async (track) =>{
        const trackInfo = {
         trackArtist : track.artists[0].name,
         trackName : track.name,
         trackId : track.id,
         albumArtUrl : track.album.images[0].url,
        }
        const {data} = await axios.put('/api/spotify/users', trackInfo)
        console.log(data)
        setUserTracks(data)
    }

    

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
                    <SpotifySearch addTrackHandler={addTrackHandler}/>
                </section>
                <section className='max-h-full flex-1 p-3 bg-gray-900'>
                    <SpotifyUserPanel userTracks={userTracks}/>
                </section>
            </main>
        </>
    )
}