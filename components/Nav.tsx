import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const links = [
  { href: "/overview", label: "Overview" },
  { href: "/connections", label: "Connections" },
  { href: "/google", label: "Google" },
  { href: "/meta", label: "Meta" },
  { href: "/campaign", label: "Campaign" },
];

export default function Nav() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        <Link href="/overview" className="font-semibold">
          Ads Dashboard
        </Link>

        <nav className="hidden sm:flex items-center gap-4 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-600 hover:text-black"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
