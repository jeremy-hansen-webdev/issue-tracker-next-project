"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const pathname = usePathname();
  const issues = [
    { name: "Dashboard", href: "/" },
    { name: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex gap-5 p-5 border border-zinc-900 items-center">
      <Link aria-label="Home" href={"/"}>
        <FaBug size={30} />
      </Link>
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
    </nav>
  );
};

export default NavBar;
