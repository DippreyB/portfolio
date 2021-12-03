import { signIn, useSession } from "next-auth/react";
import Nav from "../components/Nav";

export default function Spotify() {
    const {data: session} = useSession()
    console.log(session)
    return (
        <>
            <Nav/>
            <div className='container flex justify-center items-center h-screen'>
                <button onClick={() => signIn()} >Sign In</button>
            </div>
        </>
    )
}