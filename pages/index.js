import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {FaReact, FaNode} from 'react-icons/fa'
import {SiMongodb, SiJavascript, SiNextdotjs, SiCss3, SiJava, SiExpress, SiNodedotjs, SiTailwindcss, SiGithub, SiLinkedin, SiTwitter} from 'react-icons/si'
import ProjectCard from '../components/ProjectCard'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DippreyC</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav className={styles.nav}>
          <a href="/" className={styles.navItem}>DippreyC</a>
          <a href='https://github.com/DippreyB' className={styles.navItem}> Github</a>
          <a href='https://www.linkedin.com/in/caine-dipprey-0283a61b7/' className={styles.navItem}> linkedin</a>
          <a href='https://twitter.com/Cainedipp' className={styles.navItem}> twitter</a>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
           <h1 className={styles.sectionTitle}>Caine Dipprey</h1>
           <p className={styles.aboutInfo}>
             Computer Science educator and webmaster at Hebron High School
           </p>
           <p className={styles.aboutInfo}>
             Currently seeking full stack opportunities
           </p>
        </section>
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>Technologies</h1>
          <div className={styles.techFlex}>
            <div className={styles.techIcon}>
              <FaReact style={{fontSize: 90}}/>
              <div>react</div>
            </div>
            <div className={styles.techIcon}>
              <SiMongodb style={{fontSize: 90}}/>
              <div>mongodb</div>
            </div>
            <div className={styles.techIcon}>
              <FaNode style={{fontSize: 90}}/>
              <div>node</div>
            </div>
            <div className={styles.techIcon}>
              <SiJavascript style={{fontSize: 90}}/>
              <div>javascript</div>
            </div>
            <div className={styles.techIcon}>
              <SiNextdotjs style={{fontSize: 90}}/>
              <div>next</div>
            </div>

            <div className={styles.techIcon}>
              <SiCss3 style={{fontSize: 90}}/>
              <div>css</div>
            </div>
            
            <div className={styles.techIcon}>
              <SiJava style={{fontSize: 90}}/>
              <div>java</div>
            </div>

            <div className={styles.techIcon}>
              <SiExpress style={{fontSize: 90}}/>
              <div>express</div>
            </div>

            <div className={styles.techIcon}>
              <SiTailwindcss style={{fontSize: 90}}/>
              <div>tailwind</div>
            </div>
            
          </div>
        </section>

        <section className={styles.section} >
          <h1 className={styles.sectionTitle}>Projects</h1>
          <div className={styles.projectFlex}>
          <ProjectCard title={'ultidraft'} link={'https://github.com/DippreyB/ultidraft'} >
            <span>React application used to host ultimate frisbee league drafts </span>
            <div>
              <FaReact />
              <SiMongodb />
              <SiExpress />
              <FaNode />
            </div>
          </ProjectCard>

          <ProjectCard title={'image gallery'} link={'https://github.com/DippreyB/tailwind-img-gallery'} >
            <span>Practice with pixabay api and tailwind.css </span>
            <div>
              <FaReact />
              <SiTailwindcss />
            </div>
          </ProjectCard>

          <ProjectCard title={'github jobs'} link={'https://github.com/DippreyB/github-jobs'} >
            <span>First application using react with axios to fetch data from an api </span>
            <div>
              <FaReact />
            </div>
          </ProjectCard>
        </div>

        </section>

        <section className={styles.section}>
          
         <div className={styles.contactLinks}>
            <a href='https://github.com/DippreyB' >
              <SiGithub></SiGithub>
            </a>
            <a href='https://www.linkedin.com/in/caine-dipprey-0283a61b7/'>
              <SiLinkedin></SiLinkedin>
            </a>
            <a href='https://twitter.com/Cainedipp'>
              <SiTwitter/>
            </a>
          </div>
        </section>
      </main>

     
      
    </div>
  )
}
