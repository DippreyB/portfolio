import Image from 'next/image'
import styles from '../styles/Project.module.css'
import { useState } from 'react'
import {FiExternalLink} from 'react-icons/fi'

export default function ProjectCard({title, link, children}) {
    const [showDetails, setShowDetails] = useState()
    return (
        <>
            
                <div className={styles.card}>
                    
                    <h1>
                        {title}
                        <a href={link}><FiExternalLink/></a>
                    </h1>
                    
                    <>{children}</>
                </div>
            
            
        
        </>
    )
}