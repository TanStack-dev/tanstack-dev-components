import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from 'react';

import appCss from '~/styles/app.css?url';
import carbonStyles from '~/styles/carbon.css?url';

import { Link } from '@tanstack/react-router';
import { CgClose, CgMenuLeft } from 'react-icons/cg';
import { FaInstagram } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import logoColor100w from '~/images/logo-color-100w.png';

import { TbBrandBluesky, TbBrandTwitter } from 'react-icons/tb';
import { SearchButton } from '~/components/SearchButton';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },

      {
        name: 'google-adsense-account',
        content: 'ca-pub-9403278435468733',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'stylesheet',
        href: carbonStyles,
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
      },
    ],
    scripts: [],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const detailsRef = React.useRef<HTMLElement>(null!);
  const linkClasses = `flex items-center justify-between group px-2 py-1 rounded-lg hover:bg-gray-500 hover:bg-opacity-10 font-black`;

  const logo = (
    <div className="flex-1 flex items-center gap-4 justify-between">
      <Link to="/" className={twMerge(`flex items-center gap-1.5`)}>
        <img
          src={logoColor100w}
          alt=""
          className="w-[30px] rounded-full overflow-hidden border-2 border-black dark:border-none"
        />
        <div className="font-black text-xl uppercase">TanStack</div>
      </Link>
      <div className="flex items-center gap-1">
        <a
          href="https://x.com/tan_stack"
          className="opacity-70 hover:opacity-100"
        >
          <TbBrandTwitter className="text-xl" />
        </a>
        <a
          href="https://bsky.app/profile/tanstack.com"
          className="opacity-70 hover:opacity-100"
        >
          <TbBrandBluesky className="text-xl" />
        </a>
        <a
          href="https://instagram.com/tan_stack"
          className="opacity-70 hover:opacity-100"
        >
          <FaInstagram className="text-xl" />
        </a>
      </div>
      <div className="ml-auto"></div>
    </div>
  );

  const smallMenu = (
    <div className="lg:hidden bg-white/50 dark:bg-black/60 sticky top-0 z-20 backdrop-blur-[20px]">
      <details
        ref={detailsRef as any}
        id="docs-details"
        className="border-b border-gray-500 border-opacity-20"
      >
        <summary className="p-4 flex gap-2 items-center justify-between">
          <div className="flex-1 flex gap-2 items-center text-xl md:text-2xl">
            <CgMenuLeft className="icon-open mr-2 cursor-pointer" />
            <CgClose className="icon-close mr-2 cursor-pointer" />
            {logo}
          </div>
        </summary>
        <div
          className="flex flex-col gap-4 whitespace-nowrap h-[0vh] overflow-y-auto
          border-t border-gray-500 border-opacity-20 text-lg bg-white/80 dark:bg-black/20"
        >
          <div className="p-2 pb-0">
            <SearchButton />
          </div>
          <div className="space-y-px text-sm p-2 border-b border-gray-500/10 dark:border-gray-500/20"></div>
        </div>
      </details>
    </div>
  );

  const largeMenu = (
    <>
      <div className="min-w-[250px] hidden lg:flex flex-col h-screen sticky top-0 z-20 bg-white/50 dark:bg-black/30 shadow-xl dark:border-r border-gray-500/20">
        <div className="p-4 flex gap-2 items-center text-2xl border-b border-gray-500/10 dark:border-gray-500/20">
          {logo}
        </div>
        <div className="p-2">
          <SearchButton />
        </div>
        <div className="flex-1 flex flex-col gap-4 whitespace-nowrap overflow-y-auto text-base pb-[50px]">
          <div className="space-y-1 text-sm p-2 border-b border-gray-500/10 dark:border-gray-500/20"></div>
        </div>
      </div>
    </>
  );

  return (
    <html lang="en" className={'light'}>
      <head>
        <HeadContent />
      </head>
      <body>
        <div
          className={`min-h-screen flex flex-col min-w-0 lg:flex-row w-full transition-all duration-300`}
        >
          {smallMenu}
          {largeMenu}
          <div className="flex flex-1 min-h-0 relative justify-center overflow-x-hidden">
            <Outlet />
          </div>
        </div>

        <TanStackRouterDevtools position="bottom-right" />

        <Scripts />
      </body>
    </html>
  );
}
