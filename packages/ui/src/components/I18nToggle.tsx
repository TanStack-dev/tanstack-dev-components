import * as React from 'react';
import { MdOutlineTranslate } from 'react-icons/md';
import { ComponentProps } from 'react';

interface I18nToggleProps extends ComponentProps<'button'> {
  className?: string;
}

const I18nToggle = ({ className, ...props }: I18nToggleProps) => {
  return (
    <button
      className={`${className || ''}`}
      aria-label="Change language"
      {...props}
    >
      <MdOutlineTranslate className="text-xl" />
    </button>
  );
};

export default I18nToggle;
