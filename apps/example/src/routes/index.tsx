import { createFileRoute } from '@tanstack/react-router';

export const textColors = [
  `text-rose-500`,
  `text-yellow-500`,
  `text-teal-500`,
  `text-blue-500`,
];

export const gradients = [
  `from-rose-500 to-yellow-500`,
  `from-yellow-500 to-teal-500`,
  `from-teal-500 to-violet-500`,
  `from-blue-500 to-pink-500`,
];

export const Route = createFileRoute('/')({
  loader: () => {
    return {
      randomNumber: Math.random(),
    };
  },
  component: Index,
});

function Index() {
  return (
    <div className="max-w-full z-10">
      <div className="flex flex-col xl:flex-row items-center gap-4 xl:pt-24 xl:justify-center">
        <div className="flex flex-col items-center gap-6 text-center px-4 xl:text-left xl:items-start">
          <div className="flex gap-2 lg:gap-4 items-center">
            <h1
              className={`inline-block
            font-black text-5xl
            md:text-6xl
            lg:text-8xl`}
            >
              <span
                className={`
            inline-block text-black dark:text-white
            mb-2 uppercase [letter-spacing:-.04em] pr-1.5
            `}
              >
                TanStack
              </span>
            </h1>
          </div>
          <h2
            className="font-bold text-2xl max-w-md
            md:text-4xl md:max-w-2xl
            2xl:text-5xl lg:max-w-2xl text-balance"
          >
            High-quality open-source software for{' '}
            <span className="underline decoration-dashed decoration-yellow-500 decoration-3 underline-offset-2">
              web developers.
            </span>
          </h2>
          <p
            className="text opacity-90 max-w-sm
            lg:text-xl lg:max-w-2xl text-balance"
          >
            Headless, type-safe, & powerful utilities for Web Applications,
            Routing, State Management, Data Visualization, Datagrids/Tables, and
            more.
          </p>
        </div>
      </div>
      <div className="my-16" />
    </div>
  );
}
