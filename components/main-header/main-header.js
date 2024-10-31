import Link from "next/link";
import Image from "next/image";

import logoImg from "@/public/assets/batman-logo.jpg";
import classes from "./main-header.module.css";
import NavLink from "./nav-link";
export default function MainHeader() {
  return (
    <>
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="Batman is uploading a photo" priority />
          <label>Share Your Images</label>
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/images">Browse Images</NavLink>
            </li>
            <li>
              <NavLink href="/share">Share An Image</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
