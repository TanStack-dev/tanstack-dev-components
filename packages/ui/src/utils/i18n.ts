export interface LanguageOption {
  label: string;
  domain: string;
  langCode: string; // Added for hreflang
}

export const defaultLanguageOptions: LanguageOption[] = [
  { label: 'English', domain: 'https://tanstack.com', langCode: 'en' },
  {
    label: '简体中文',
    domain: 'https://zh-hans.tanstack.dev',
    langCode: 'zh-Hans',
  },
];

export type LanguageCode = 'en' | 'zh-Hans';

// Get path from current URL if href is provided
export const getLanguageUrl = (domain: string, href?: string) => {
  if (!href) return domain;

  // Check if href is a full URL or just a path
  if (href.startsWith('/')) {
    return `${domain}${href}`;
  }

  try {
    const currentUrl = new URL(href);
    const path = currentUrl.pathname + currentUrl.search + currentUrl.hash;
    return `${domain}${path}`;
  } catch (e) {
    // If href is not a valid URL (and not a path starting with '/'), return the domain
    // This case might occur if href is an invalid string that doesn't represent a URL or a path.
    return domain;
  }
};

export function getI18nLinks({
  href,
  languageOptions = defaultLanguageOptions,
}: {
  href: string;
  languageOptions?: LanguageOption[];
}) {
  const links = languageOptions.map((option) => ({
    rel: 'alternate',
    hrefLang: option.langCode,
    href: getLanguageUrl(option.domain, href),
  }));

  // Add x-default link (usually the first option or a specified default)
  // Assuming the first option in defaultLanguageOptions is the default (English)
  // https://developers.google.com/search/blog/2013/04/x-default-hreflang-for-international-pages
  const defaultOption =
    languageOptions.find((opt) => opt.langCode === 'en') || languageOptions[0];
  if (defaultOption) {
    links.push({
      rel: 'alternate',
      hrefLang: 'x-default',
      href: getLanguageUrl(defaultOption.domain, href),
    });
  }

  return links;
}
