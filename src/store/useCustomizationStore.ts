import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  TextCustomizations,
  ModuleVisibility,
  DeviceType,
  ExportFormat,
  TypographySettings,
  FontFamily,
  TypographyScale,
  TypographyWeights,
  LayoutStyle,
} from '@/types';

interface CustomizationStore {
  // Branding
  logo: string | null;
  appName: string;
  bannerImage: string | null;

  // Colors
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;

  // Typography
  typography: TypographySettings;

  // Currency
  currencyCode: string;
  currencySymbol: string;

  // Balance display
  balanceAmount: string;
  hideBalance: boolean;

  // Editable Text
  texts: TextCustomizations;

  // Home Screen Modules
  modules: ModuleVisibility;

  // Export Settings
  selectedScreens: string[];
  includeDeviceFrame: boolean;
  deviceType: DeviceType;
  exportFormat: ExportFormat;
  exportQuality: number;

  // Current preview screen
  currentScreen: string;

  // Layout style
  layoutStyle: LayoutStyle;

  // Actions
  setLogo: (logo: string | null) => void;
  setAppName: (name: string) => void;
  setBannerImage: (banner: string | null) => void;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
  setAccentColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setTextPrimaryColor: (color: string) => void;
  setTextSecondaryColor: (color: string) => void;
  setCurrencyCode: (code: string) => void;
  setCurrencySymbol: (symbol: string) => void;
  setBalanceAmount: (amount: string) => void;
  setHideBalance: (hide: boolean) => void;
  setText: <K extends keyof TextCustomizations>(key: K, value: string) => void;
  setModule: <K extends keyof ModuleVisibility>(key: K, visible: boolean) => void;
  setTypographyFontFamily: (font: FontFamily) => void;
  setTypographyScale: <K extends keyof TypographyScale>(key: K, value: number) => void;
  setTypographyWeight: <K extends keyof TypographyWeights>(key: K, value: number) => void;
  setTypographyLineHeight: (value: number) => void;
  setTypographyLetterSpacing: (value: number) => void;
  toggleScreen: (screenId: string) => void;
  selectAllScreens: () => void;
  deselectAllScreens: () => void;
  setIncludeDeviceFrame: (include: boolean) => void;
  setDeviceType: (type: DeviceType) => void;
  setExportFormat: (format: ExportFormat) => void;
  setExportQuality: (quality: number) => void;
  setCurrentScreen: (screenId: string) => void;
  setLayoutStyle: (style: LayoutStyle) => void;
  resetToDefaults: () => void;
}

const defaultTexts: TextCustomizations = {
  // Login
  loginTitle: 'Login',
  loginSubtitle: 'Enter your mobile number and password to continue',
  loginButton: 'Login',
  signupLink: 'Sign Up',
  forgotPassword: 'Forget Password',
  dontHaveAccount: "Don't have an account?",

  // Onboarding
  onboarding1Title: 'Transfer Money',
  onboarding1Desc: 'Easily send money to your loved ones, anytime.',
  onboarding2Title: 'Remittance Transactions',
  onboarding2Desc: 'Send remittances with ease, right from your Mobile at your convenience.',
  onboarding3Title: 'Pay Bills',
  onboarding3Desc: 'Pay your bills quickly and securely from anywhere.',
  onboarding4Title: 'Mobile Reload',
  onboarding4Desc: 'Top up your mobile credit instantly with just a few taps.',
  onboarding5Title: 'Visa Card',
  onboarding5Desc: 'Get your virtual Visa card for online and international payments.',

  // Auth
  touchIdTitle: 'Tap your finger on the sensor',
  touchIdDesc: 'Scan to proceed',
  faceIdTitle: 'Look at the camera',
  faceIdDesc: 'Scan to proceed',
  chooseAuthTitle: 'Choose secure auth method',
  registrationSuccessTitle: 'Registration Successful!',
  registrationSuccessDesc: 'Your account has been created successfully. You can now start using the app.',
  registrationSuccessButton: 'Get Started',

  // Home
  walletBalanceLabel: 'Wallet Balance',
  seeAnalytics: 'See Wallet Analytics',

  // Modules
  transferLabel: 'Transfer',
  remittanceLabel: 'Remittance',
  visaLabel: 'VISA',
  payBillsLabel: 'Pay Bills',
  mobileReloadLabel: 'Mobile Reload',
  moreLabel: 'More',

  // eKYC
  kycLockTitle: "Time to confirm it's really you",
  kycLockDesc: "Hey there! To use our app as per BNM requirements, we just need to make sure it's really you",
  kycLockButton: 'Begin the eKYC Process',
  idTypeTitle: 'Identity Verification',
  idTypeDesc: 'Hey, as a regulated institution, we just need to double-check your identity',
  idTypeStep1: 'Pick your ID Type',
  idTypeStep1Desc: 'Choose between NRIC or Passport',
  idTypeStep2: 'Snap a Picture & Confirm',
  idTypeStep2Desc: 'Snap a photo of your ID or Passport.',
  idTypeStep3: 'Time for a Selfie',
  idTypeStep3Desc: 'Please take a selfie for ID verification.',
  idTypeButton: "Alright, let's do this",
  loadingText: 'Please wait...',
};

const defaultModules: ModuleVisibility = {
  transfer: true,
  remittance: true,
  visa: true,
  payBills: true,
  mobileReload: true,
  more: true,
};

const defaultTypography: TypographySettings = {
  fontFamily: 'inter',
  scale: {
    h1: 32,
    h2: 24,
    h3: 18,
    body: 16,
    small: 14,
    caption: 12,
  },
  weights: {
    heading: 700,
    subheading: 600,
    body: 400,
    caption: 500,
  },
  lineHeight: 1.5,
  letterSpacing: 0,
};

const allScreenIds = [
  'splash',
  'onboarding-1',
  'onboarding-2',
  'onboarding-3',
  'onboarding-4',
  'onboarding-5',
  'login',
  'login-phone-focus',
  'login-password-focus',
  'language-sheet',
  'touch-id',
  'face-id',
  'choose-auth',
  'registration-success',
  'registration-success-alt',
  'kyc-lock',
  'kyc-id-type',
  'kyc-id-type-alt',
  'kyc-confirm-id',
  'kyc-loading',
  'kyc-loading-alt',
  'kyc-success',
  'home',
  'home-hidden',
];

export const useCustomizationStore = create<CustomizationStore>()(
  persist(
    (set, get) => ({
      // Branding
      logo: null,
      appName: 'kiple',
      bannerImage: null,

  // Colors
  primaryColor: '#2D4EF5',
  secondaryColor: '#1A1A2E',
  accentColor: '#F5D0C5',
  backgroundColor: '#FFFFFF',
  textPrimaryColor: '#1A1A2E',
  textSecondaryColor: '#6B7280',

  // Typography
  typography: defaultTypography,

  // Currency
  currencyCode: 'MYR',
  currencySymbol: 'RM',

  // Balance
  balanceAmount: '1,238.00',
  hideBalance: false,

  // Text
  texts: defaultTexts,

  // Modules
  modules: defaultModules,

  // Export
  selectedScreens: allScreenIds,
  includeDeviceFrame: false,
  deviceType: 'iphone',
  exportFormat: 'png',
  exportQuality: 0.9,

  // Preview
  currentScreen: 'splash',

  // Layout style
  layoutStyle: 'minimal',

  // Actions
  setLogo: (logo) => set({ logo }),
  setAppName: (appName) => set({ appName }),
  setBannerImage: (bannerImage) => set({ bannerImage }),
  setPrimaryColor: (primaryColor) => set({ primaryColor }),
  setSecondaryColor: (secondaryColor) => set({ secondaryColor }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
  setTextPrimaryColor: (textPrimaryColor) => set({ textPrimaryColor }),
  setTextSecondaryColor: (textSecondaryColor) => set({ textSecondaryColor }),
  setCurrencyCode: (currencyCode) => set({ currencyCode }),
  setCurrencySymbol: (currencySymbol) => set({ currencySymbol }),
  setBalanceAmount: (balanceAmount) => set({ balanceAmount }),
  setHideBalance: (hideBalance) => set({ hideBalance }),
  setText: (key, value) =>
    set((state) => ({
      texts: { ...state.texts, [key]: value },
    })),
  setModule: (key, visible) =>
    set((state) => ({
      modules: { ...state.modules, [key]: visible },
    })),
  setTypographyFontFamily: (fontFamily) =>
    set((state) => ({
      typography: { ...state.typography, fontFamily },
    })),
  setTypographyScale: (key, value) =>
    set((state) => ({
      typography: {
        ...state.typography,
        scale: { ...state.typography.scale, [key]: value },
      },
    })),
  setTypographyWeight: (key, value) =>
    set((state) => ({
      typography: {
        ...state.typography,
        weights: { ...state.typography.weights, [key]: value },
      },
    })),
  setTypographyLineHeight: (lineHeight) =>
    set((state) => ({
      typography: { ...state.typography, lineHeight },
    })),
  setTypographyLetterSpacing: (letterSpacing) =>
    set((state) => ({
      typography: { ...state.typography, letterSpacing },
    })),
  toggleScreen: (screenId) =>
    set((state) => ({
      selectedScreens: state.selectedScreens.includes(screenId)
        ? state.selectedScreens.filter((id) => id !== screenId)
        : [...state.selectedScreens, screenId],
    })),
  selectAllScreens: () => set({ selectedScreens: allScreenIds }),
  deselectAllScreens: () => set({ selectedScreens: [] }),
  setIncludeDeviceFrame: (includeDeviceFrame) => set({ includeDeviceFrame }),
  setDeviceType: (deviceType) => set({ deviceType }),
  setExportFormat: (exportFormat) => set({ exportFormat }),
  setExportQuality: (exportQuality) => set({ exportQuality }),
  setCurrentScreen: (currentScreen) => set({ currentScreen }),
  setLayoutStyle: (layoutStyle) => set({ layoutStyle }),
  resetToDefaults: () =>
    set({
      logo: null,
      appName: 'kiple',
      bannerImage: null,
      primaryColor: '#2D4EF5',
      secondaryColor: '#1A1A2E',
      accentColor: '#F5D0C5',
      backgroundColor: '#FFFFFF',
      textPrimaryColor: '#1A1A2E',
      textSecondaryColor: '#6B7280',
      typography: defaultTypography,
      currencyCode: 'MYR',
      currencySymbol: 'RM',
      balanceAmount: '1,238.00',
      hideBalance: false,
      texts: defaultTexts,
      modules: defaultModules,
      selectedScreens: allScreenIds,
      includeDeviceFrame: false,
      deviceType: 'iphone',
      exportFormat: 'png',
      exportQuality: 0.9,
      currentScreen: 'splash',
      layoutStyle: 'minimal',
    }),
    }),
    {
      name: 'kiple-assets-generator',
      version: 1,
    }
  )
);

// Font family map for CSS
export const fontFamilyMap: Record<FontFamily, string> = {
  inter: "var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif",
  roboto: "var(--font-roboto), -apple-system, BlinkMacSystemFont, sans-serif",
  poppins: "var(--font-poppins), -apple-system, BlinkMacSystemFont, sans-serif",
  montserrat: "var(--font-montserrat), -apple-system, BlinkMacSystemFont, sans-serif",
  opensans: "var(--font-opensans), -apple-system, BlinkMacSystemFont, sans-serif",
  lato: "var(--font-lato), -apple-system, BlinkMacSystemFont, sans-serif",
  nunito: "var(--font-nunito), -apple-system, BlinkMacSystemFont, sans-serif",
};

export { allScreenIds, defaultTypography };
