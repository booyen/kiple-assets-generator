'use client';

import { SplashScreen } from './SplashScreen';
import { OnboardingScreen } from './OnboardingScreen';
import { LoginScreen } from './LoginScreen';
import { HomeScreen } from './HomeScreen';
import { BiometricScreen } from './BiometricScreen';
import { AuthMethodScreen } from './AuthMethodScreen';
import { RegistrationSuccessScreen } from './RegistrationSuccessScreen';
import { LanguageSheetScreen } from './LanguageSheetScreen';
import { KycLockScreen } from './KycLockScreen';
import { KycIdTypeScreen } from './KycIdTypeScreen';
import { KycConfirmScreen } from './KycConfirmScreen';
import { LoadingScreen } from './LoadingScreen';
import { KycSuccessScreen } from './KycSuccessScreen';

export interface ScreenInfo {
  id: string;
  name: string;
  category: 'splash' | 'onboarding' | 'auth' | 'ekyc' | 'home';
  component: React.ComponentType;
}

export const screens: ScreenInfo[] = [
  // Splash
  { id: 'splash', name: 'Splash Screen', category: 'splash', component: SplashScreen },

  // Onboarding
  { id: 'onboarding-1', name: 'Onboarding 1', category: 'onboarding', component: () => <OnboardingScreen variant={1} /> },
  { id: 'onboarding-2', name: 'Onboarding 2', category: 'onboarding', component: () => <OnboardingScreen variant={2} /> },
  { id: 'onboarding-3', name: 'Onboarding 3', category: 'onboarding', component: () => <OnboardingScreen variant={3} /> },
  { id: 'onboarding-4', name: 'Onboarding 4', category: 'onboarding', component: () => <OnboardingScreen variant={4} /> },
  { id: 'onboarding-5', name: 'Onboarding 5', category: 'onboarding', component: () => <OnboardingScreen variant={5} /> },

  // Auth
  { id: 'login', name: 'Login', category: 'auth', component: () => <LoginScreen variant="default" /> },
  { id: 'login-phone-focus', name: 'Login (Phone)', category: 'auth', component: () => <LoginScreen variant="phone-focus" /> },
  { id: 'login-password-focus', name: 'Login (Password)', category: 'auth', component: () => <LoginScreen variant="password-focus" /> },
  { id: 'language-sheet', name: 'Language Sheet', category: 'auth', component: LanguageSheetScreen },
  { id: 'touch-id', name: 'Touch ID', category: 'auth', component: () => <BiometricScreen type="touch" /> },
  { id: 'face-id', name: 'Face ID', category: 'auth', component: () => <BiometricScreen type="face" /> },
  { id: 'choose-auth', name: 'Choose Auth', category: 'auth', component: AuthMethodScreen },
  { id: 'registration-success', name: 'Registration Success', category: 'auth', component: () => <RegistrationSuccessScreen variant="default" /> },
  { id: 'registration-success-alt', name: 'Registration Success (Alt)', category: 'auth', component: () => <RegistrationSuccessScreen variant="alt" /> },

  // eKYC
  { id: 'kyc-lock', name: 'KYC Lock', category: 'ekyc', component: KycLockScreen },
  { id: 'kyc-id-type', name: 'KYC ID Type', category: 'ekyc', component: () => <KycIdTypeScreen variant="default" /> },
  { id: 'kyc-id-type-alt', name: 'KYC ID Type (Alt)', category: 'ekyc', component: () => <KycIdTypeScreen variant="alt" /> },
  { id: 'kyc-confirm-id', name: 'KYC Confirm ID', category: 'ekyc', component: KycConfirmScreen },
  { id: 'kyc-loading', name: 'Loading', category: 'ekyc', component: () => <LoadingScreen variant="default" /> },
  { id: 'kyc-loading-alt', name: 'Loading (Alt)', category: 'ekyc', component: () => <LoadingScreen variant="alt" /> },
  { id: 'kyc-success', name: 'KYC Success', category: 'ekyc', component: KycSuccessScreen },

  // Home
  { id: 'home', name: 'Home', category: 'home', component: () => <HomeScreen hideBalance={false} /> },
  { id: 'home-hidden', name: 'Home (Hidden Balance)', category: 'home', component: () => <HomeScreen hideBalance={true} /> },
];

export function getScreenById(id: string): ScreenInfo | undefined {
  return screens.find((screen) => screen.id === id);
}

export function getScreensByCategory(category: ScreenInfo['category']): ScreenInfo[] {
  return screens.filter((screen) => screen.category === category);
}

export function renderScreen(id: string): React.ReactNode {
  const screen = getScreenById(id);
  if (!screen) return null;
  const Component = screen.component;
  return <Component />;
}

// Re-export individual screens
export {
  SplashScreen,
  OnboardingScreen,
  LoginScreen,
  HomeScreen,
  BiometricScreen,
  AuthMethodScreen,
  RegistrationSuccessScreen,
  LanguageSheetScreen,
  KycLockScreen,
  KycIdTypeScreen,
  KycConfirmScreen,
  LoadingScreen,
  KycSuccessScreen,
};
