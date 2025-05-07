import { FaSun } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

export function ThemeToggle() {
  return (
    <div
      className={twMerge(
        `w-12 h-6 bg-gray-500/10 dark:bg-gray-800 rounded-full flex items-center justify-between cursor-pointer relative transition-all`
      )}
    >
      <div className="flex-1 flex items-center justify-between px-1.5">
        <FaSun
          className={twMerge(`text-sm transition-opacity`, 'opacity-50')}
        />
      </div>
      <div
        className="absolute w-6 h-6 rounded-full shadow-md shadow-black/20 bg-white dark:bg-gray-400 transition-all duration-300 ease-in-out"
        style={{
          left: '100%',
          transform: `translateX(${'-100%'}) scale(${0.8})`,
        }}
      />
    </div>
  );
}
