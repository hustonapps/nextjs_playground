"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";

export default function NavLink({ to, children }) {
  const path = usePathname();
  return (
    <Link
      href={to}
      className={
        path.startsWith(to) ? `${classes.link} ${classes.active}` : classes.link
      }
    >
      {children}
    </Link>
  );
}
