import React from 'react';
import s from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <ul>
        <li>
          <a className={s.item} href="/profile">Profile</a>
        </li>
        <li>
          <a className={`${s.item} ${s.active}`} href="/messages">Messages</a>
        </li>
        <li>
          <a className={s.item} href="/news">News</a>
        </li>
        <li>
          <a className={s.item} href="/music">Music</a>
        </li>
        <li>
          <a className={s.item} href="/settings">Settings</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar