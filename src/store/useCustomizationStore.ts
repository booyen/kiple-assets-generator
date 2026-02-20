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
  ReloadMethodSettings,
  ReloadMethodKey,
} from '@/types';

export type ThemePresetId = 'kiple-default' | 'ocean-fresh' | 'forest-pay' | 'sunset-pop';

interface ThemePreset {
  id: ThemePresetId;
  name: string;
  description: string;
  swatches: [string, string, string];
  colors: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textPrimaryColor: string;
    textSecondaryColor: string;
  };
  typography: TypographySettings;
}

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
  themePreset: ThemePresetId | 'custom';

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

  // Reload Wallet Methods
  reloadMethods: ReloadMethodSettings;

  // Export Settings
  selectedScreens: string[];
  includeDeviceFrame: boolean;
  deviceType: DeviceType;
  exportFormat: ExportFormat;
  exportQuality: number;

  // Current preview screen
  currentScreen: string;

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
  setReloadMethodEnabled: (key: ReloadMethodKey, enabled: boolean) => void;
  setReloadMethodLogo: (key: ReloadMethodKey, logo: string | null) => void;
  setTypographyFontFamily: (font: FontFamily) => void;
  setTypographyScale: <K extends keyof TypographyScale>(key: K, value: number) => void;
  setTypographyWeight: <K extends keyof TypographyWeights>(key: K, value: number) => void;
  setTypographyLineHeight: (value: number) => void;
  setTypographyLetterSpacing: (value: number) => void;
  applyThemePreset: (presetId: ThemePresetId) => void;
  toggleScreen: (screenId: string) => void;
  selectAllScreens: () => void;
  deselectAllScreens: () => void;
  setIncludeDeviceFrame: (include: boolean) => void;
  setDeviceType: (type: DeviceType) => void;
  setExportFormat: (format: ExportFormat) => void;
  setExportQuality: (quality: number) => void;
  setCurrentScreen: (screenId: string) => void;
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

  // Reload Wallet
  reloadSelectTitle: 'Choose reload method',
  reloadSavedOptionsLabel: 'SAVED OPTIONS',
  reloadOtherOptionsLabel: 'OTHER OPTIONS',
  reloadSavedCardTitle: 'Pay with Your Saved card',
  reloadSavedCardSubtitle: 'VISA ending in 8908',
  reloadOnlineBankingTitle: 'Pay with Online Banking',
  reloadCreditCardTitle: 'Pay with Credit/Debit card',
  reloadDuitNowTitle: 'DuitNow Transfer',
  reloadDuitNowSubtitle: 'Acc No: 1234567890012',
  reloadVirtualBankTitle: 'Virtual Bank',
  reloadVirtualBankSubtitle: 'AFIN BANK · 0129324679',
  reloadSevenElevenTitle: '7-Eleven (OTC)',
  reloadInfoNote: 'An extra RM1.00 will be charged based on your selected card type and provider charge.',
};

const defaultModules: ModuleVisibility = {
  transfer: true,
  remittance: true,
  visa: true,
  payBills: true,
  mobileReload: true,
  more: true,
};

const defaultReloadMethods: ReloadMethodSettings = {
  savedCard: { enabled: true, logo: null },
  onlineBanking: { enabled: true, logo: null },
  creditCard: { enabled: true, logo: null },
  duitNow: { enabled: true, logo: null },
  virtualBank: { enabled: true, logo: null },
  sevenEleven: { enabled: true, logo: null },
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

export const themePresets: Record<ThemePresetId, ThemePreset> = {
  'kiple-default': {
    id: 'kiple-default',
    name: 'Kiple Default',
    description: 'Clean blue primary with balanced modern typography.',
    swatches: ['#2D4EF5', '#1A1A2E', '#F5D0C5'],
    colors: {
      primaryColor: '#2D4EF5',
      secondaryColor: '#1A1A2E',
      accentColor: '#F5D0C5',
      backgroundColor: '#FFFFFF',
      textPrimaryColor: '#1A1A2E',
      textSecondaryColor: '#6B7280',
    },
    typography: defaultTypography,
  },
  'ocean-fresh': {
    id: 'ocean-fresh',
    name: 'Ocean Fresh',
    description: 'Teal-forward palette with calm, friendly readability.',
    swatches: ['#0EA5A4', '#0F172A', '#99F6E4'],
    colors: {
      primaryColor: '#0EA5A4',
      secondaryColor: '#0F172A',
      accentColor: '#99F6E4',
      backgroundColor: '#F8FAFC',
      textPrimaryColor: '#0F172A',
      textSecondaryColor: '#475569',
    },
    typography: {
      fontFamily: 'nunito',
      scale: {
        h1: 31,
        h2: 23,
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
    },
  },
  'forest-pay': {
    id: 'forest-pay',
    name: 'Greenpacket',
    description: 'Professional green identity with strong contrast.',
    swatches: ['#166534', '#052E16', '#BBF7D0'],
    colors: {
      primaryColor: '#166534',
      secondaryColor: '#052E16',
      accentColor: '#BBF7D0',
      backgroundColor: '#F7FDF9',
      textPrimaryColor: '#14532D',
      textSecondaryColor: '#4B5563',
    },
    typography: {
      fontFamily: 'opensans',
      scale: {
        h1: 31,
        h2: 23,
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
    },
  },
  'sunset-pop': {
    id: 'sunset-pop',
    name: 'Sunset Pop',
    description: 'Warm energetic palette for promo-heavy campaigns.',
    swatches: ['#EA580C', '#7C2D12', '#FED7AA'],
    colors: {
      primaryColor: '#EA580C',
      secondaryColor: '#7C2D12',
      accentColor: '#FED7AA',
      backgroundColor: '#FFF8F3',
      textPrimaryColor: '#7C2D12',
      textSecondaryColor: '#78716C',
    },
    typography: {
      fontFamily: 'poppins',
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
      lineHeight: 1.48,
      letterSpacing: 0.01,
    },
  },
};

export const themePresetList = Object.values(themePresets);

const allScreenIds = [
  'splash',
  'onboarding-1',
  'onboarding-2',
  'onboarding-3',
  'onboarding-4',
  'onboarding-5',
  'login',
  'signup',
  'login-phone-focus',
  'login-password-focus',
  'language-sheet',
  'touch-id',
  'face-id',
  'biometric-setup',
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
  'home-reload-modal',
  'reload-method',
  'reload-method-saved',
  'reload-method-banking',
  'reload-method-card',
  'reload-amount',
  'reload-success',
  'reload-failed',
  'auto-reload',
  'notification',
  'notification-empty',
  'notification-permission',
  'history',
  'history-ptptn',
  'history-sspn',
  'history-reload-success',
  'history-reload-failed',
  'transfer-start',
  'transfer-favorite',
  'transfer-duitnow',
  'transfer-amount',
  'transfer-confirm',
  'transfer-success',
  'transfer-show-card',
  'visa-home',
  'visa-application',
  'visa-confirm-pin',
  'visa-card-front',
  'visa-application-success',
  'visa-reload',
  'insurance-home',
  'insurance-details',
  'insurance-policy',
  'insurance-success',
  'insurance-failed',
  'scanpay-scan',
  'scanpay-enter-amount',
  'scanpay-confirm-pin',
  'scanpay-success',
  'scanpay-failed',
];

export const useCustomizationStore = create<CustomizationStore>()(
  persist(
    (set) => ({
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
  themePreset: 'kiple-default',

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

  // Reload methods
  reloadMethods: defaultReloadMethods,

  // Export
  selectedScreens: allScreenIds,
  includeDeviceFrame: false,
  deviceType: 'iphone',
  exportFormat: 'png',
  exportQuality: 0.9,

  // Preview
  currentScreen: 'splash',

  // Actions
  setLogo: (logo) => set({ logo }),
  setAppName: (appName) => set({ appName }),
  setBannerImage: (bannerImage) => set({ bannerImage }),
  setPrimaryColor: (primaryColor) => set({ primaryColor, themePreset: 'custom' }),
  setSecondaryColor: (secondaryColor) => set({ secondaryColor, themePreset: 'custom' }),
  setAccentColor: (accentColor) => set({ accentColor, themePreset: 'custom' }),
  setBackgroundColor: (backgroundColor) => set({ backgroundColor, themePreset: 'custom' }),
  setTextPrimaryColor: (textPrimaryColor) => set({ textPrimaryColor, themePreset: 'custom' }),
  setTextSecondaryColor: (textSecondaryColor) => set({ textSecondaryColor, themePreset: 'custom' }),
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
  setReloadMethodEnabled: (key, enabled) =>
    set((state) => ({
      reloadMethods: {
        ...state.reloadMethods,
        [key]: { ...state.reloadMethods[key], enabled },
      },
    })),
  setReloadMethodLogo: (key, logo) =>
    set((state) => ({
      reloadMethods: {
        ...state.reloadMethods,
        [key]: { ...state.reloadMethods[key], logo },
      },
    })),
  setTypographyFontFamily: (fontFamily) =>
    set((state) => ({
      themePreset: 'custom',
      typography: { ...state.typography, fontFamily },
    })),
  setTypographyScale: (key, value) =>
    set((state) => ({
      themePreset: 'custom',
      typography: {
        ...state.typography,
        scale: { ...state.typography.scale, [key]: value },
      },
    })),
  setTypographyWeight: (key, value) =>
    set((state) => ({
      themePreset: 'custom',
      typography: {
        ...state.typography,
        weights: { ...state.typography.weights, [key]: value },
      },
    })),
  setTypographyLineHeight: (lineHeight) =>
    set((state) => ({
      themePreset: 'custom',
      typography: { ...state.typography, lineHeight },
    })),
  setTypographyLetterSpacing: (letterSpacing) =>
    set((state) => ({
      themePreset: 'custom',
      typography: { ...state.typography, letterSpacing },
    })),
  applyThemePreset: (presetId) =>
    set(() => {
      const preset = themePresets[presetId];
      return {
        ...preset.colors,
        themePreset: presetId,
        typography: {
          ...preset.typography,
          scale: { ...preset.typography.scale },
          weights: { ...preset.typography.weights },
        },
      };
    }),
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
      themePreset: 'kiple-default',
      currencyCode: 'MYR',
      currencySymbol: 'RM',
      balanceAmount: '1,238.00',
      hideBalance: false,
      texts: defaultTexts,
      modules: defaultModules,
      reloadMethods: defaultReloadMethods,
      selectedScreens: allScreenIds,
      includeDeviceFrame: false,
      deviceType: 'iphone',
      exportFormat: 'png',
      exportQuality: 0.9,
      currentScreen: 'splash',
    }),
    }),
    {
      name: 'kiple-mockup-generator',
      version: 1,
    }
  )
);

// Font family map for CSS
export const fontFamilyMap: Record<FontFamily, string> = {
  inter: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  roboto: "Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  poppins: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  montserrat: "Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  opensans: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  lato: "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  nunito: "Nunito, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

export { allScreenIds, defaultTypography, defaultTexts };
