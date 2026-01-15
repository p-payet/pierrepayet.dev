'use client';

import clsx from 'clsx';
import styles from './styles.module.css';

const isCssTimelineSupported =
  typeof CSS !== 'undefined' && CSS.supports('animation-timeline', 'auto');

export function ScrollAnimationDemoOne() {
  if (!isCssTimelineSupported) {
    return (
      <div className="w-full bg-stone-200 flex items-center justify-center text-center px-4 py-8 rounded-lg">
        <span className="text-base">
          This demo isn&apos;t supported in your browser. <br />
          As of May 2024, this demo will only work in Chrome.
        </span>
      </div>
    );
  }

  return (
    <div className={clsx('flex items-start flex-col gap-2', styles.container)}>
      <div
        className={clsx(
          'w-full h-2 top-0 bg-red-900 origin-left',
          styles.progress
        )}
      />
      <div
        className={clsx(
          'relative w-full overflow-y-scroll h-[240px] rounded-xl',
          styles.scrollContainer
        )}
      >
        <div className="w-full h-[1200px] bg-linear-to-b from-stone-100 to-stone-400 flex justify-center items-top">
          <span className="block mt-24 font-medium text-sm">Scroll down</span>
        </div>
      </div>
    </div>
  );
}
