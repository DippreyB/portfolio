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
        if(session && session !== null){
            getPlaylists()
            getUserTracks()
        }

    },[session])

    console.log(user)
    const requestTrackHandler = async (track) =>{
        if(!userTracks.find(userTrack => userTrack.trackId === track.id)){
            const trackInfo = {
            trackArtist : track.artists[0].name,
            trackName : track.name,
            trackId : track.id,
            albumArtUrl : track.album.images[0].url,
            uri: track.uri
            }
            const {data} = await axios.put('/api/spotify/users', trackInfo)
            
            setUserTracks(data)
            if(data){
                setMessage({
                    text: `${trackInfo.trackName} successfully requested!`,
                    type: 'success'
                })
            }
        }
        else{
            setMessage({
                text: 'Tracks cannot be suggested more than once!',
                type: 'error'
            })
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
            {!user && !session &&
                
                    <section className='grid grid-cols-1 h-screen justify-center'>
                       <div className='text-white m-auto flex flex-col'> 
                            <div>I need more music... help me? </div>
                            <button onClick={signIn} className='border border-white rounded p-5 mt-3 hover:border-green-500 hover:text-green-500'>
                                <div className='flex items-center justify-between'>
                                    <div>Log in with Spotify</div>
                                    <div className='text-4xl ml-5'>
                                        <FaSpotify/>
                                    </div>
                                </div>
                            </button>
                       </div>
                    </section>
                    
                }
            {session && !user &&
                <svg className='animate-spin h-52 w-52'></svg>
            }
        
                {user &&
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
                    {user.isAdmin ? 
                        <section className='max-h-full flex-1 p-3 bg-gray-900'>
                            <SpotifyAdminPanel setMessage={setMessage}/>
                            {/* TODO - Create panel to show all accepted songs in databasemaybe a panel to view all users */}
                        </section>
                        
                        :
                        <section className='max-h-full flex-1 p-3 bg-gray-900'>
                            <SpotifyUserPanel userTracks={userTracks}/>
                        </section>
                    }
                    
                    
                    </>
                    </section>
                }
            
        </main>
    )
}