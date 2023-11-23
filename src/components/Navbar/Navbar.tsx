import React, {ReactElement} from "react";
import styles from './Navbar.module.scss';
import logo from '../../images/logos/logo.png'

export default function Navbar(): ReactElement {
    return (
        <div>
            <nav className={styles.nav}>
                <a href="/">
                    <img src={logo} alt="logo" className={styles.siteLogo} width='200' height='auto'/>
                </a>
                <ul className={styles.navLinks}>
                    <li>
                        <a href="/home">DOMŮ</a>
                    </li>
                    <li>
                        <a href="/about">O NÁS</a>
                    </li>
                    <li>
                        <a href="/career">VOLNÁ MÍSTA</a>
                    </li>
                    <li>
                        <a href="/references">REFERENCE</a>
                    </li>
                    <li>
                        <a href="/contact">KONTAKT</a>
                    </li>
                    <li>
                        <a href="/contactus">NAPIŠTE NÁM</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
