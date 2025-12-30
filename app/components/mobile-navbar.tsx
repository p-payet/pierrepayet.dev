'use client';

import Link from 'next/link';
import { useEffect, useRef, useCallback } from 'react';

interface Props {
  menuItems: Array<{
    title: string;
    href: string;
  }>;
}

export function MobileNavbar({ menuItems }: Props) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleLinkClick = useCallback(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
      document.body.classList.remove('overflow-hidden');
    }
  }, []);

  useEffect(() => {
    const checkboxElement = checkboxRef.current;

    const handleCheckboxChange = () => {
      checkboxElement?.checked
        ? document.body.classList.add('overflow-hidden')
        : document.body.classList.remove('overflow-hidden');
    };

    if (checkboxElement) {
      checkboxElement.addEventListener('change', handleCheckboxChange);
    }

    // Cleanup listener on component unmount
    return () => {
      if (checkboxElement) {
        checkboxElement.removeEventListener('change', handleCheckboxChange);
      }
    };
  }, []);

  return (
    <header className="flex pt-5 pb-10 px-4 justify-between sm:hidden">
      <Link href={menuItems[0].href} className="content-center">
        <h1 className="text-base font-mono font-semibold text-slate-950">
          {menuItems[0].title}
        </h1>
      </Link>
      <label
        className="relative z-40 cursor-pointer px-3 py-6 overscroll-contain"
        htmlFor="mobile-menu"
      >
        <input
          ref={checkboxRef}
          className="peer hidden"
          type="checkbox"
          id="mobile-menu"
        />
        <div className="relative z-50 block h-px w-7 bg-transparent before:absolute before:top-[-0.35rem] before:z-50 before:block before:h-full before:w-full before:bg-black before:transition-all before:duration-200 before:ease-out after:absolute after:right-0 after:bottom-[-0.35rem] after:block after:h-full after:w-full after:bg-black after:transition-all after:duration-200 after:ease-out peer-checked:bg-transparent peer-checked:before:top-0 peer-checked:before:w-full peer-checked:before:rotate-45 peer-checked:before:transform peer-checked:after:bottom-0 peer-checked:after:w-full peer-checked:after:-rotate-45 peer-checked:after:transform"></div>
        <div className="fixed inset-0 z-40 hidden h-full w-full bg-black/50 backdrop-blur-xs peer-checked:block"></div>
        <div className="fixed top-0 right-0 z-40 h-full w-full translate-x-full overflow-y-auto overscroll-y-none transition duration-500 peer-checked:translate-x-0">
          <nav className="float-right min-h-full w-[85%] bg-white px-6 pt-12 shadow-2xl">
            <ul className="mt-5">
              {menuItems.map((menuItem) => (
                <li key={menuItem.title} className="text-lg mb-5">
                  <Link href={menuItem.href} onClick={handleLinkClick}>
                    {menuItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </label>
    </header>
  );
}
