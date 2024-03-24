import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png";
import NavLink from "@/components/header/nav-link";
import classes from "./header.module.css";
import HeaderBackground from "./header-background";

export default function Header() {
  return (
    <>
      <HeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={Logo} alt="a plate with food in it" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink to="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
