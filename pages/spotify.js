import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Playlist from "../components/spotify/Playlist";
import SpotifySearch from "../components/spotify/SpotifySearch";
import SpotifyUserPanel from "../components/spotify/SpotifyUserPanel";
import SpotifyAdminPanel from "../components/spotify/SpotifyAdminPanel";
import Message from "../components/Message";
import {FaSpotify} from 'react-icons/fa'


export default function Spotify() {
    const {data: session} = useSession()
    const [playlist, setPlaylist] = useState()
    const [userTracks, setUserTracks] = useState([])
    const [message, setMessage] = useState()
    const [user, setUser] = useState()
    
    useEffect(() => {
        const getPlaylists = async () => {
            const {data} = await axios.get('/api/spotify/playlist')
            setPlaylist(data)
        }
        const getUserTracks = async () => {
            const {data} = await axios.get('/api/spotify/users')
            setUserTracks(data.tracks)
            setUser(data)
        }
        getPlaylists()
        if(session && session !== null){
            getUserTracks()
        }

    },[session])

    
    const requestTrackHandler = async (track) =>{
            
            const trackInfo = {
            trackArtist : track.artists[0].name,
            trackName : track.name,
            trackId : track.id,
            albumArtUrl : track.album.images[0].url,
            uri: track.uri
            }
            try{
                const {data} = await axios.put('/api/spotify/users', trackInfo)
                
                setUserTracks(data)
                if(data){
                    setMessage({
                        text: `${trackInfo.trackName} successfully requested!`,
                        type: 'success'
                    })
                }
            }catch(error){
               console.log(error.response.data.message)
               setMessage({text: error.response.data.message, type: 'error'})
            }
            
            
        
    }

    

    return (
        <main className='bg-gray-900 h-screen'>
            <Nav dark={true}>
            {session === null?
                    <a onClick={() => signIn()} >Sign In</a> 
                    :
                    <a  onClick={()=> signOut()} >Sign Out</a>
                }
            </Nav>
            {message &&
                <Message message={message} setMessage={setMessage}/>
            }
              
                
        
               
                <section className='flex flex-1 flex-wrap md:justify-start justify-center max-h-full md:max-h-screen pt-10 bg-gray-900'>
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
                            <SpotifyAdminPanel setMessage={setMessage}/>
                            {/* TODO - Create panel to show all accepted songs in databasemaybe a panel to view all users */}
                        </section>
                        
                    }
                    {user && !user.isAdmin &&
                        <section className='max-h-full flex-1 p-3 bg-gray-900'>
                            <SpotifyUserPanel userTracks={userTracks}/>
                        </section>
                    }
                    
                    
                    
                    </>
                    </section>
                
            
        </main>
    )
}