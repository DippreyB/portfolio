import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Nav = () => {
    return (
        <nav className={styles.nav}>
          <Link href='/'>
          <a className={styles.navItem}>DippreyC</a>
          </Link>
          <a href='https://github.com/DippreyB' className={styles.navItem}> Github</a>
          <a href='https://www.linkedin.com/in/caine-dipprey-0283a61b7/' className={styles.navItem}> linkedin</a>
          <a href='https://twitter.com/Cainedipp' className={styles.navItem}> twitter</a>
          <Link href='/spotify'>
            <a className={styles.navItem}>spotify</a>
          </Link>
      </nav>
    )
}

export default Nav
