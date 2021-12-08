import React from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'

const Warning = ({warning, setWarning}) => {

    setTimeout(()=> setWarning(undefined), 5000)

    return (
        <div className='bg-red-100 border border-red-500 text-red-800 pl-2 pr-6 py-3 rounded mt-10 fixed bottom-1 right-1 m-auto ' role='alert'>
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{warning}</span>
            <button onClick={()=> setWarning(undefined)} className='p-1 absolute top-0 right-0 hover:text-gray-900 text-xl' >
                <AiFillCloseCircle />
            </button>
            
        </div>
    )
}

export default Warning
