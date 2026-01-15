'use client';

import dynamic from 'next/dynamic';

export const ScrollAnimationDemoOne = dynamic(
    () => import('./2024-05-20-future-css-scroll-animations')
        .then(mod => mod.ScrollAnimationDemoOne),
    { ssr: false }
);
