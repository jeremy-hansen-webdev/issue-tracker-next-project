"use client";

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
      <Link href={"/"}>
        <FaBug size={30} />
      </Link>
      <ul className="flex gap-5">
        {issues.map((issue) => (
          <li key={issue.href}>
            <Link
              className="text-zinc-600 hover:text-zinc-800"
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
