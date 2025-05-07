import { MdOutlineTranslate } from 'react-icons/md';
import { ComponentProps, useState, useRef, useEffect } from 'react';
import {
  defaultLanguageOptions,
  getLanguageUrl,
  LanguageCode,
  LanguageOption,
} from '../utils/i18n';

interface I18nToggleProps extends ComponentProps<'button'> {
  className?: string;
  href?: string; // Current URL to maintain path when switching languages
  languageOptions?: LanguageOption[];
  currentLanguage?: LanguageCode;
}

const I18nToggle = ({
  className,
  href,
  languageOptions = defaultLanguageOptions,
  currentLanguage,
  ...props
}: I18nToggleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`${className || ''} flex items-center`}
        aria-label="Change language"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        {...props}
      >
        <MdOutlineTranslate className="text-xl" />
      </button>

      <div
        className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 dark:ring-opacity-50 z-10 overflow-hidden ${isOpen ? '' : 'hidden'}`}
      >
        <div className="" role="menu" aria-orientation="vertical">
          {languageOptions.map((option) => {
            const isActive = option.langCode === currentLanguage;
            return (
              <a
                key={option.domain}
                href={getLanguageUrl(option.domain, href)}
                className={`block px-4 py-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
                  isActive
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`.trim()}
                role="menuitem"
                onClick={() => setIsOpen(false)}
              >
                {option.label}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default I18nToggle;
