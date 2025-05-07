import {
  render,
  screen,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { I18nToggle } from '../index';
import { LanguageOption } from '../utils/i18n';

describe('I18nToggle Component', () => {
  // Helper functions
  const openDropdown = (container: HTMLElement) => {
    const button = container.querySelector('[aria-label="Change language"]');
    if (button) {
      fireEvent.click(button);
    } else {
      throw new Error('Button not found');
    }
  };

  const renderComponent = (props = {}) => {
    cleanup(); // Ensure DOM is clean before each render
    return render(<I18nToggle {...props} />);
  };

  afterEach(() => {
    cleanup(); // Cleanup after each test
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with correct aria-label', () => {
      renderComponent();
      const button = screen.getByRole('button', { name: /change language/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Change language');
    });

    it('applies custom className when provided', () => {
      const customClass = 'test-class';
      renderComponent({ className: customClass });
      const button = screen.getByRole('button', { name: /change language/i });
      expect(button).toHaveClass(customClass);
    });

    it('forwards additional props to the button', () => {
      renderComponent({ 'data-testid': 'test-id' });
      const button = screen.getByTestId('test-id');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('aria-label', 'Change language');
    });
  });

  describe('Dropdown behavior', () => {
    it('keeps dropdown hidden initially', () => {
      const { container } = renderComponent();
      // Check for the CSS class 'hidden' instead of checking for absence in the DOM
      const dropdown = container.querySelector('.absolute');
      expect(dropdown).toHaveClass('hidden');
    });

    it('opens dropdown menu when clicked', () => {
      const { container } = renderComponent();
      openDropdown(container);

      // The menu should be in the document and visible (not having 'hidden' class)
      const menu = screen.getByRole('menu');
      const dropdown = container.querySelector('.absolute');
      expect(dropdown).not.toHaveClass('hidden');
      expect(menu).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('简体中文')).toBeInTheDocument();
    });

    it('closes dropdown when a language option is clicked', () => {
      const { container } = renderComponent();
      openDropdown(container);

      const englishLink = screen.getByText('English');
      fireEvent.click(englishLink);

      // Check that the dropdown has the 'hidden' class
      const dropdown = container.querySelector('.absolute');
      expect(dropdown).toHaveClass('hidden');
    });

    it('closes dropdown when clicking outside', async () => {
      // Create a div to serve as the outside element
      const outsideDiv = document.createElement('div');
      outsideDiv.setAttribute('data-testid', 'outside-element');
      document.body.appendChild(outsideDiv);

      // Render the component
      const { container } = renderComponent();

      // Open the dropdown
      openDropdown(container);

      // Verify dropdown is open
      const dropdown = container.querySelector('.absolute');
      expect(dropdown).not.toHaveClass('hidden');

      // Simulate a mousedown event outside the dropdown
      act(() => {
        const mouseDownEvent = new MouseEvent('mousedown', {
          bubbles: true,
          cancelable: true,
        });
        outsideDiv.dispatchEvent(mouseDownEvent);
      });

      // Wait for state to update - even though React Testing Library usually doesn't need this,
      // sometimes with event handlers there can be timing issues
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Check that the dropdown has the 'hidden' class now
      expect(dropdown).toHaveClass('hidden');

      // Clean up
      document.body.removeChild(outsideDiv);
    });
  });

  describe('Language options', () => {
    it('renders with custom language options when provided', () => {
      const customOptions: LanguageOption[] = [
        {
          label: 'Français',
          domain: 'https://fr.tanstack.com',
          langCode: 'fr',
        },
        { label: 'Español', domain: 'https://es.tanstack.com', langCode: 'es' },
      ];

      const { container } = renderComponent({ languageOptions: customOptions });
      openDropdown(container);

      expect(screen.getByText('Français')).toBeInTheDocument();
      expect(screen.getByText('Español')).toBeInTheDocument();
      expect(screen.queryByText('English')).not.toBeInTheDocument();
      expect(screen.queryByText('简体中文')).not.toBeInTheDocument();
    });
  });

  describe('URL handling', () => {
    it('constructs correct URLs with custom language options and href prop', () => {
      const customOptions: LanguageOption[] = [
        { label: 'Deutsch', domain: 'https://de.tanstack.com', langCode: 'de' },
      ];
      const testHref = 'https://tanstack.com/some/path';

      const { container } = renderComponent({
        href: testHref,
        languageOptions: customOptions,
      });
      openDropdown(container);

      const germanLink = screen.getByText('Deutsch');
      expect(germanLink).toHaveAttribute(
        'href',
        'https://de.tanstack.com/some/path'
      );
    });

    it('constructs correct URLs with full href prop', () => {
      const testHref = 'https://tanstack.com/query/latest/docs/react/overview';
      const { container } = renderComponent({ href: testHref });
      openDropdown(container);

      const englishLink = screen.getByText('English');
      const chineseLink = screen.getByText('简体中文');

      expect(englishLink).toHaveAttribute(
        'href',
        'https://tanstack.com/query/latest/docs/react/overview'
      );
      expect(chineseLink).toHaveAttribute(
        'href',
        'https://zh-hans.tanstack.dev/query/latest/docs/react/overview'
      );
    });

    it('constructs correct URLs when href is a path', () => {
      const testHref = '/query/latest/docs/react/overview';
      const { container } = renderComponent({ href: testHref });
      openDropdown(container);

      const englishLink = screen.getByText('English');
      const chineseLink = screen.getByText('简体中文');

      expect(englishLink).toHaveAttribute(
        'href',
        'https://tanstack.com/query/latest/docs/react/overview'
      );
      expect(chineseLink).toHaveAttribute(
        'href',
        'https://zh-hans.tanstack.dev/query/latest/docs/react/overview'
      );
    });

    it('handles href with query parameters and hash correctly', () => {
      const testHref = '/some/path?query=param#hash';
      const { container } = renderComponent({ href: testHref });
      openDropdown(container);

      const englishLink = screen.getByText('English');
      expect(englishLink).toHaveAttribute(
        'href',
        'https://tanstack.com/some/path?query=param#hash'
      );
    });

    it('handles href that is just a slash (root path)', () => {
      const testHref = '/';
      const { container } = renderComponent({ href: testHref });
      openDropdown(container);

      const englishLink = screen.getByText('English');
      expect(englishLink).toHaveAttribute('href', 'https://tanstack.com/');
    });
  });

  describe('Active language highlighting', () => {
    it('highlights the active language correctly based on href domain', () => {
      const { container } = renderComponent({
        href: 'https://zh-hans.tanstack.dev/some/page',
        currentLanguage: 'zh-Hans',
      });
      openDropdown(container);

      const englishLink = screen.getByText('English').closest('a');
      const chineseLink = screen.getByText('简体中文').closest('a');

      expect(englishLink).not.toHaveClass('bg-gray-100');
      expect(chineseLink).toHaveClass('bg-gray-100');
      expect(chineseLink).toHaveClass('text-gray-900');
    });

    it('highlights the active language correctly with custom options', () => {
      const customOptions: LanguageOption[] = [
        { label: '日本語', domain: 'https://ja.tanstack.com', langCode: 'ja' },
        { label: '한국어', domain: 'https://ko.tanstack.com', langCode: 'ko' },
      ];

      const { container } = renderComponent({
        href: 'https://ko.tanstack.com/another/path',
        languageOptions: customOptions,
        currentLanguage: 'ko',
      });
      openDropdown(container);

      const japaneseLink = screen.getByText('日本語').closest('a');
      const koreanLink = screen.getByText('한국어').closest('a');

      expect(japaneseLink).not.toHaveClass('bg-gray-100');
      expect(koreanLink).toHaveClass('bg-gray-100');
    });

    it('does not highlight active language when href is a path and currentLanguage is not provided', () => {
      const { container } = renderComponent({ href: '/some/page' });
      openDropdown(container);

      const englishLink = screen.getByText('English').closest('a');
      const chineseLink = screen.getByText('简体中文').closest('a');

      expect(englishLink).not.toHaveClass('bg-gray-100');
      expect(chineseLink).not.toHaveClass('bg-gray-100');
    });

    it('correctly highlights when currentLanguage prop is provided', () => {
      const { container } = renderComponent({ currentLanguage: 'zh-Hans' });
      openDropdown(container);

      const englishLink = screen.getByText('English').closest('a');
      const chineseLink = screen.getByText('简体中文').closest('a');

      expect(englishLink).not.toHaveClass('bg-gray-100');
      expect(chineseLink).toHaveClass('bg-gray-100');
    });
  });
});
