// Screen types
export type ScreenCategory = 'splash' | 'onboarding' | 'auth' | 'ekyc' | 'home';

// Typography types
export type FontFamily = 'inter' | 'roboto' | 'poppins' | 'montserrat' | 'opensans' | 'lato' | 'nunito';

export interface TypographyScale {
  h1: number;      // Large headings
  h2: number;      // Section headings
  h3: number;      // Subsection headings
  body: number;    // Body text
  small: number;   // Small text
  caption: number; // Captions, labels
}

export interface TypographyWeights {
  heading: number;  // 700 bold
  subheading: number; // 600 semibold
  body: number;     // 400 regular
  caption: number;  // 400-500
}

export interface TypographySettings {
  fontFamily: FontFamily;
  scale: TypographyScale;
  weights: TypographyWeights;
  lineHeight: number;      // Base line height multiplier
  letterSpacing: number;   // In em units
}

export interface ScreenTemplate {
  id: string;
  name: string;
  category: ScreenCategory;
  description: string;
}

// Customization types
export interface TextCustomizations {
  // Login
  loginTitle: string;
  loginSubtitle: string;
  loginButton: string;
  signupLink: string;
  forgotPassword: string;
  dontHaveAccount: string;

  // Onboarding
  onboarding1Title: string;
  onboarding1Desc: string;
  onboarding2Title: string;
  onboarding2Desc: string;
  onboarding3Title: string;
  onboarding3Desc: string;
  onboarding4Title: string;
  onboarding4Desc: string;
  onboarding5Title: string;
  onboarding5Desc: string;

  // Auth
  touchIdTitle: string;
  touchIdDesc: string;
  faceIdTitle: string;
  faceIdDesc: string;
  chooseAuthTitle: string;
  registrationSuccessTitle: string;
  registrationSuccessDesc: string;
  registrationSuccessButton: string;

  // Home
  walletBalanceLabel: string;
  seeAnalytics: string;

  // Modules
  transferLabel: string;
  remittanceLabel: string;
  visaLabel: string;
  payBillsLabel: string;
  mobileReloadLabel: string;
  moreLabel: string;

  // eKYC
  kycLockTitle: string;
  kycLockDesc: string;
  kycLockButton: string;
  idTypeTitle: string;
  idTypeDesc: string;
  idTypeStep1: string;
  idTypeStep1Desc: string;
  idTypeStep2: string;
  idTypeStep2Desc: string;
  idTypeStep3: string;
  idTypeStep3Desc: string;
  idTypeButton: string;
  loadingText: string;
}

export interface ModuleVisibility {
  transfer: boolean;
  remittance: boolean;
  visa: boolean;
  payBills: boolean;
  mobileReload: boolean;
  more: boolean;
}

export type DeviceType = 'iphone' | 'android';
export type ExportFormat = 'png' | 'jpeg';

// Layout styles for e-wallet
export type LayoutStyle = 'minimal' | 'card' | 'gradient';

export interface ExportSettings {
  selectedScreens: string[];
  includeDeviceFrame: boolean;
  deviceType: DeviceType;
  exportFormat: ExportFormat;
  exportQuality: number;
}
