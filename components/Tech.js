import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import {SiMongodb, SiJavascript, SiNextdotjs, SiCss3, SiJava, SiExpress, SiNodedotjs, SiTailwindcss, SiGithub, SiLinkedin, SiTwitter, SiBootstrap, SiRedux} from 'react-icons/si'
import {FaReact, FaNode} from 'react-icons/fa'

const Tech = () => {
    const [activeTech, setActiveTech] = useState('default')
    
    return (
        <section id='technologies' className={styles.section}>
          
          <h1 className={styles.sectionTitle}>Tech</h1>
          <div className={styles.techFlex}>
              

            
            <TechIcon id='react' setActive={setActiveTech} activeTech={activeTech}>
                <FaReact />
            </TechIcon>
            <TechIcon id='mongodb' setActive={setActiveTech}  activeTech={activeTech}>
                <SiMongodb />
            </TechIcon>
            <TechIcon id='node' setActive={setActiveTech}  activeTech={activeTech}>
                <FaNode />
            </TechIcon>
            <TechIcon id='javascript' setActive={setActiveTech}  activeTech={activeTech}>
                <SiJavascript />
            </TechIcon>
            <TechIcon id='next' setActive={setActiveTech}  activeTech={activeTech}>
                <SiNextdotjs />
            </TechIcon>
            <TechIcon id='css' setActive={setActiveTech}  activeTech={activeTech}>
                <SiCss3 />
            </TechIcon>
            <TechIcon id='java' setActive={setActiveTech}  activeTech={activeTech}>
                <SiJava />
            </TechIcon>
            <TechIcon id='express' setActive={setActiveTech}  activeTech={activeTech}>
                <SiExpress />
            </TechIcon>
            <TechIcon id='tailwind' setActive={setActiveTech}  activeTech={activeTech}>
                <SiTailwindcss />
            </TechIcon>
            <TechIcon id='bootstrap' setActive={setActiveTech}  activeTech={activeTech}>
                <SiBootstrap />
            </TechIcon>
            <TechIcon id='redux' setActive={setActiveTech}  activeTech={activeTech}>
                <SiRedux />
            </TechIcon>
            
          </div>
          
        </section>
    )
}

const TechIcon = ({children, id, setActive, activeTech}) => {
    return (
        
        <div onClick={()=>setActive(id)} className={id===activeTech ? styles.activeTech : styles.techIcon}>
              {children}
              <div>{id}</div>
              
        </div>
        
        
    )
}

const TechProgress = ({value}) => {

    return (
        
            <div style={{width: `${value}%`,
                height: '30px', 
                marginTop:'20px',  
                backgroundColor: 'rgba(0,0,0,0.7)', 
                borderRadius: '10px', 
                transition:'.25s', 
                display: 'flex', 
                justifyContent:'flex-end', 
                paddingRight: '10px',
                color: '#fff',
                }}
            >

                {value > 0 && `${value} / 100` }
            </div>
       
    )
}

const techValues = {
    'default': 0,
    'react': 70,
    'mongodb':50,
    'node': 70,
    'javascript':80,
    'next': 40,
    'css': 40,
    'java': 60,
    'express': 70,
    'tailwind': 30,
    'bootstrap': 60,
    'redux': 30
}

export default Tech
