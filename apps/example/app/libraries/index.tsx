import reactLogo from '../images/react-logo.svg';

import { startProject } from './start';

export const frameworkOptions = [
  { label: 'React', value: 'react', logo: reactLogo, color: 'bg-blue-500' },
] as const;

export type Framework = (typeof frameworkOptions)[number]['value'];

export type Library = {
  id: 'start';
  name: string;
  cardStyles: string;
  to: string;
  tagline: string;
  description: string;
  ogImage?: string;
  bgStyle: string;
  textStyle: string;
  badge?: 'new' | 'soon' | 'alpha' | 'beta' | 'fresh';
  repo: string;
  latestBranch: string;
  latestVersion: string;
  availableVersions: string[];
  colorFrom: string;
  colorTo: string;
  textColor: string;
  frameworks: Framework[];
  scarfId?: string;
  defaultDocs?: string;
  handleRedirects?: (href: string) => void;
  hideCodesandboxUrl?: true;
  hideStackblitzUrl?: true;
  showVercelUrl?: boolean;
  showNetlifyUrl?: boolean;
  menu: LibraryMenuItem[];
  featureHighlights?: {
    title: string;
    icon: React.ReactNode;
    description: React.ReactNode;
  }[];
  docsRoot?: string;
  embedEditor?: 'codesandbox' | 'stackblitz';
};

export type LibraryMenuItem = {
  icon: React.ReactNode;
  label: React.ReactNode;
  to: string;
};

export const libraries = [startProject];
