import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { I18nToggle } from '../index';

describe('I18nToggle Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with correct aria-label', () => {
    render(<I18nToggle />);
    const button = screen.getByRole('button', { name: /change language/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Change language');
  });

  it('applies custom className when provided', () => {
    const customClass = 'test-class';
    render(<I18nToggle className={customClass} />);
    const button = screen.getByRole('button', { name: /change language/i });
    expect(button).toHaveClass(customClass);
  });

  it('forwards additional props to the button', () => {
    render(<I18nToggle data-testid="test-id" />);
    const button = screen.getByTestId('test-id');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Change language');
  });
});
