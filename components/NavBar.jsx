import Image from "next/image";
import React from "react";
import styles from '../styles/Navbar.module.css'
const NavBar = () => {
    return (
        <div className={styles.header}>
            <header>
                <Image src="/assets/logo.png" alt="logo" width="264" height="84" />
            </header>
            <div className={styles.links}>
                <a href="#registration">Registration Form</a>
                <a href="#list">Address List</a>
            </div>
        </div>
    );
};

export default NavBar;
