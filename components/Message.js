import React from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
const types = {
    error: 'bg-red-100 border border-red-500 text-red-800 pl-2 pr-6 py-3 rounded mt-10 fixed bottom-1 right-1 m-auto' ,
    success: 'bg-green-100 border border-green-500 text-green-800 pl-2 pr-6 py-3 rounded mt-10 fixed bottom-1 right-1 m-auto'
}

const Warning = ({message, setMessage}) => {
    const {text, type} = message
    setTimeout(()=> setMessage(undefined), 5000)

    return (
        <div className={types[type]} role='alert'>
            <span className="block sm:inline">{text}</span>
            <button onClick={()=> setMessage(undefined)} className='p-1 absolute top-0 right-0 hover:text-gray-900 text-xl' >
                <AiFillCloseCircle />
            </button>
            
        </div>
    )
}

export default Warning
