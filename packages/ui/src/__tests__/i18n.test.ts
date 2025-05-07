import { describe, it, expect } from 'vitest';
import { getLanguageUrl, getI18nLinks, LanguageOption } from '../utils/i18n';

describe('i18n utilities', () => {
  describe('getLanguageUrl', () => {
    it('returns the domain when no href is provided', () => {
      const domain = 'https://tanstack.com';
      expect(getLanguageUrl(domain)).toBe(domain);
    });

    it('appends path to domain when href starts with /', () => {
      const domain = 'https://tanstack.com';
      const href = '/query/latest/docs';
      expect(getLanguageUrl(domain, href)).toBe(
        'https://tanstack.com/query/latest/docs'
      );
    });

    it('extracts path from full URL and appends to domain', () => {
      const domain = 'https://zh-hans.tanstack.dev';
      const href = 'https://tanstack.com/query/latest/docs?param=value#hash';

      expect(getLanguageUrl(domain, href)).toBe(
        'https://zh-hans.tanstack.dev/query/latest/docs?param=value#hash'
      );
    });

    it('preserves query parameters and hash fragments', () => {
      const domain = 'https://tanstack.com';
      const href = 'https://example.com/page?query=test&sort=asc#section-2';

      expect(getLanguageUrl(domain, href)).toBe(
        'https://tanstack.com/page?query=test&sort=asc#section-2'
      );
    });

    it('returns domain for invalid URLs', () => {
      const domain = 'https://tanstack.com';
      const invalidHref = 'not-a-url-or-path';

      expect(getLanguageUrl(domain, invalidHref)).toBe(domain);
    });

    it('handles empty paths correctly', () => {
      const domain = 'https://tanstack.com';
      const href = 'https://example.com';

      expect(getLanguageUrl(domain, href)).toBe('https://tanstack.com/');
    });

    it('handles root path correctly', () => {
      const domain = 'https://tanstack.com';
      const href = '/';

      expect(getLanguageUrl(domain, href)).toBe('https://tanstack.com/');
    });
  });

  describe('getI18nLinks', () => {
    it('generates correct alternate links for default language options', () => {
      const href = '/query/latest/docs';
      const links = getI18nLinks({ href });

      expect(links).toHaveLength(3); // 2 language options + x-default

      // Check English link
      expect(links[0]).toEqual({
        rel: 'alternate',
        hrefLang: 'en',
        href: 'https://tanstack.com/query/latest/docs',
      });

      // Check Chinese link
      expect(links[1]).toEqual({
        rel: 'alternate',
        hrefLang: 'zh-Hans',
        href: 'https://zh-hans.tanstack.dev/query/latest/docs',
      });

      // Check x-default link
      expect(links[2]).toEqual({
        rel: 'alternate',
        hrefLang: 'x-default',
        href: 'https://tanstack.com/query/latest/docs',
      });
    });

    it('generates correct links with custom language options', () => {
      const href = '/some/page';
      const customOptions: LanguageOption[] = [
        {
          label: 'Français',
          domain: 'https://fr.tanstack.com',
          langCode: 'fr',
        },
        { label: 'Español', domain: 'https://es.tanstack.com', langCode: 'es' },
        { label: 'English', domain: 'https://tanstack.com', langCode: 'en' },
      ];

      const links = getI18nLinks({ href, languageOptions: customOptions });

      expect(links).toHaveLength(4); // 3 language options + x-default

      // Check French link
      expect(links[0]).toEqual({
        rel: 'alternate',
        hrefLang: 'fr',
        href: 'https://fr.tanstack.com/some/page',
      });

      // Check Spanish link
      expect(links[1]).toEqual({
        rel: 'alternate',
        hrefLang: 'es',
        href: 'https://es.tanstack.com/some/page',
      });

      // Check English link
      expect(links[2]).toEqual({
        rel: 'alternate',
        hrefLang: 'en',
        href: 'https://tanstack.com/some/page',
      });

      // Check x-default link (should be English)
      expect(links[3]).toEqual({
        rel: 'alternate',
        hrefLang: 'x-default',
        href: 'https://tanstack.com/some/page',
      });
    });

    it('uses first option as x-default when English is not available', () => {
      const href = '/some/path';
      const customOptions: LanguageOption[] = [
        {
          label: 'Français',
          domain: 'https://fr.tanstack.com',
          langCode: 'fr',
        },
        { label: 'Español', domain: 'https://es.tanstack.com', langCode: 'es' },
      ];

      const links = getI18nLinks({ href, languageOptions: customOptions });

      expect(links).toHaveLength(3); // 2 language options + x-default

      // Check x-default link (should be first option, French)
      expect(links[2]).toEqual({
        rel: 'alternate',
        hrefLang: 'x-default',
        href: 'https://fr.tanstack.com/some/path',
      });
    });

    it('handles full URLs correctly', () => {
      const href =
        'https://tanstack.com/query/latest/docs?param=value#section-1';
      const links = getI18nLinks({ href });

      // Check links have correct paths with query params and hash
      expect(links[0].href).toBe(
        'https://tanstack.com/query/latest/docs?param=value#section-1'
      );
      expect(links[1].href).toBe(
        'https://zh-hans.tanstack.dev/query/latest/docs?param=value#section-1'
      );
    });

    it('works with an empty language options array', () => {
      const href = '/path';
      const links = getI18nLinks({ href, languageOptions: [] });

      expect(links).toEqual([]);
    });
  });
});
