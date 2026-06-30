export type FeatureColor = 'sky' | 'indigo' | 'emerald' | 'purple';

export interface PortalFeature {
  icon: string;
  title: string;
  description: string;
  color: FeatureColor;
}

export interface PortalInfo {
  logoUrl: string;
  appName: string;
  tagline: string;
  description: string;
  version: string;
  features: PortalFeature[];
  badges: string[];
}
