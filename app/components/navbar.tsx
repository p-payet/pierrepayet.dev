import Link from 'next/link';

interface Props {
  menuItems: Array<{
    title: string;
    href: string;
  }>;
}

export function Navbar({ menuItems }: Props) {
  return (
    <header className="pt-8 md:pt-16 pb-16 px-4 md:px-0 justify-between hidden sm:flex">
      <Link href={menuItems[0].href}>
        <h1 className="text-base font-mono font-semibold text-slate-950">
          {menuItems[0].title}
        </h1>
      </Link>
      <nav className="flex gap-6">
        {menuItems.slice(1).map((menuItem) => {
          return (
            <Link
              key={menuItem.title}
              href={menuItem.href}
              className="text-950 text-sm tracking-tighter font-mono font-semibold"
            >
              {menuItem.title}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
