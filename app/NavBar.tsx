"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import AuthButtons from "./components/AuthButtons";

const NavBar = () => {
  return (
    <nav className="flex justify-between gap-5 p-5 border border-zinc-900 items-center">
      <NavLinks />
      <AuthButtons />
    </nav>
  );
};

export default NavBar;

const NavLinks = () => {
  const pathname = usePathname();
  const issues = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];
  return (
    <>
      <NavLogo />
      <ul className="flex gap-5">
        {issues.map((issue) => (
          <li key={issue.href}>
            <Link
              className={classNames({
                "text-zinc-600 transition-colors duration-200": true,
                "text-zinc-900": pathname === issue.href,
              })}
              href={issue.href}
            >
              {issue.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export { NavLinks };

const NavLogo = () => {
  return (
    <>
      <Link aria-label="Home" href={"/"}>
        <FaBug size={30} />
      </Link>
    </>
  );
};

export { NavLogo };
