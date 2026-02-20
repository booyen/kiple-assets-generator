'use client';

import { SplashScreen } from './SplashScreen';
import { OnboardingScreen } from './OnboardingScreen';
import { LoginScreen } from './LoginScreen';
import { SignupScreen } from './SignupScreen';
import { HomeScreen } from './HomeScreen';
import { BiometricScreen } from './BiometricScreen';
import { BiometricSetupScreen } from './BiometricSetupScreen';
import { AuthMethodScreen } from './AuthMethodScreen';
import { RegistrationSuccessScreen } from './RegistrationSuccessScreen';
import { LanguageSheetScreen } from './LanguageSheetScreen';
import { KycLockScreen } from './KycLockScreen';
import { KycIdTypeScreen } from './KycIdTypeScreen';
import { KycConfirmScreen } from './KycConfirmScreen';
import { LoadingScreen } from './LoadingScreen';
import { KycSuccessScreen } from './KycSuccessScreen';
import { ReloadMethodScreen } from './ReloadMethodScreen';
import { ReloadAmountModal } from './ReloadAmountModal';
import { ReloadReceiptScreen } from './ReloadReceiptScreen';
import { AutoReloadScreen } from './AutoReloadScreen';
import { HomeWithReloadModal } from './HomeWithReloadModal';
import { NotificationsScreen } from './NotificationsScreen';
import { HistoryScreen } from './HistoryScreen';
import { TransferScreen } from './TransferScreen';
import { VisaScreen } from './VisaScreen';
import { InsuranceScreen } from './InsuranceScreen';
import { ScanPayScreen } from './ScanPayScreen';
import { ScreenCategory } from '@/types';

export interface ScreenInfo {
  id: string;
  name: string;
  category: ScreenCategory;
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
  { id: 'signup', name: 'Sign Up', category: 'auth', component: SignupScreen },
  { id: 'login-phone-focus', name: 'Login (Phone)', category: 'auth', component: () => <LoginScreen variant="phone-focus" /> },
  { id: 'login-password-focus', name: 'Login (Password)', category: 'auth', component: () => <LoginScreen variant="password-focus" /> },
  { id: 'language-sheet', name: 'Language Sheet', category: 'auth', component: LanguageSheetScreen },
  { id: 'touch-id', name: 'Touch ID', category: 'auth', component: () => <BiometricScreen type="touch" /> },
  { id: 'face-id', name: 'Face ID', category: 'auth', component: () => <BiometricScreen type="face" /> },
  { id: 'biometric-setup', name: 'Biometric Setup', category: 'auth', component: BiometricSetupScreen },
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
  { id: 'home-reload-modal', name: 'Home + Reload Modal', category: 'home', component: () => <HomeWithReloadModal hideBalance={false} /> },

  // Reload Wallet
  { id: 'reload-method', name: 'Reload Method', category: 'reload', component: () => <ReloadMethodScreen variant="default" /> },
  { id: 'reload-method-saved', name: 'Reload Method (Saved Card)', category: 'reload', component: () => <ReloadMethodScreen variant="saved-card" /> },
  { id: 'reload-method-banking', name: 'Reload Method (Online Banking)', category: 'reload', component: () => <ReloadMethodScreen variant="online-banking" /> },
  { id: 'reload-method-card', name: 'Reload Method (Credit Card)', category: 'reload', component: () => <ReloadMethodScreen variant="credit-card" /> },
  { id: 'reload-amount', name: 'Enter Amount', category: 'reload', component: ReloadAmountModal },
  { id: 'reload-success', name: 'Reload Success', category: 'reload', component: () => <ReloadReceiptScreen variant="success" /> },
  { id: 'reload-failed', name: 'Reload Failed', category: 'reload', component: () => <ReloadReceiptScreen variant="failed" /> },
  { id: 'auto-reload', name: 'Auto-Reload', category: 'reload', component: AutoReloadScreen },

  // Notifications
  { id: 'notification', name: 'Notifications', category: 'notifications', component: () => <NotificationsScreen variant="default" /> },
  { id: 'notification-empty', name: 'Notifications (Empty)', category: 'notifications', component: () => <NotificationsScreen variant="empty" /> },
  { id: 'notification-permission', name: 'Notifications (Permission)', category: 'notifications', component: () => <NotificationsScreen variant="permission" /> },

  // History
  { id: 'history', name: 'History', category: 'history', component: () => <HistoryScreen variant="list" /> },
  { id: 'history-ptptn', name: 'History - PTPTN Receipt', category: 'history', component: () => <HistoryScreen variant="ptptn" /> },
  { id: 'history-sspn', name: 'History - SSPN Receipt', category: 'history', component: () => <HistoryScreen variant="sspn" /> },
  { id: 'history-reload-success', name: 'History - Reload Success', category: 'history', component: () => <HistoryScreen variant="reload-success" /> },
  { id: 'history-reload-failed', name: 'History - Reload Failed', category: 'history', component: () => <HistoryScreen variant="reload-failed" /> },

  // Transfer
  { id: 'transfer-start', name: 'Transfer - Start', category: 'transfer', component: () => <TransferScreen variant="start" /> },
  { id: 'transfer-favorite', name: 'Transfer - Favorite', category: 'transfer', component: () => <TransferScreen variant="favorite" /> },
  { id: 'transfer-duitnow', name: 'Transfer - DuitNow', category: 'transfer', component: () => <TransferScreen variant="duitnow" /> },
  { id: 'transfer-amount', name: 'Transfer - Enter Amount', category: 'transfer', component: () => <TransferScreen variant="amount" /> },
  { id: 'transfer-confirm', name: 'Transfer - Confirm', category: 'transfer', component: () => <TransferScreen variant="confirm" /> },
  { id: 'transfer-success', name: 'Transfer - Success', category: 'transfer', component: () => <TransferScreen variant="success" /> },
  { id: 'transfer-show-card', name: 'Transfer - Show Card Details', category: 'transfer', component: () => <TransferScreen variant="show-card" /> },

  // VISA
  { id: 'visa-home', name: 'VISA - Home', category: 'visa', component: () => <VisaScreen variant="home" /> },
  { id: 'visa-application', name: 'VISA - Application', category: 'visa', component: () => <VisaScreen variant="application" /> },
  { id: 'visa-confirm-pin', name: 'VISA - Confirm Pin', category: 'visa', component: () => <VisaScreen variant="confirm-pin" /> },
  { id: 'visa-card-front', name: 'VISA - Card Front', category: 'visa', component: () => <VisaScreen variant="card-front" /> },
  { id: 'visa-application-success', name: 'VISA - Application Success', category: 'visa', component: () => <VisaScreen variant="application-success" /> },
  { id: 'visa-reload', name: 'VISA - Reload', category: 'visa', component: () => <VisaScreen variant="reload" /> },

  // Insurances
  { id: 'insurance-home', name: 'Insurances - Home', category: 'insurance', component: () => <InsuranceScreen variant="home" /> },
  { id: 'insurance-details', name: 'Insurances - Details', category: 'insurance', component: () => <InsuranceScreen variant="details" /> },
  { id: 'insurance-policy', name: 'Insurances - My Policy', category: 'insurance', component: () => <InsuranceScreen variant="policy" /> },
  { id: 'insurance-success', name: 'Insurances - Success Receipt', category: 'insurance', component: () => <InsuranceScreen variant="success" /> },
  { id: 'insurance-failed', name: 'Insurances - Failed Receipt', category: 'insurance', component: () => <InsuranceScreen variant="failed" /> },

  // Scan & Pay
  { id: 'scanpay-scan', name: 'Scan & Pay - Scan', category: 'scanpay', component: () => <ScanPayScreen variant="scan" /> },
  { id: 'scanpay-enter-amount', name: 'Scan & Pay - Enter Amount', category: 'scanpay', component: () => <ScanPayScreen variant="enter-amount" /> },
  { id: 'scanpay-confirm-pin', name: 'Scan & Pay - Confirm Pin', category: 'scanpay', component: () => <ScanPayScreen variant="confirm-pin" /> },
  { id: 'scanpay-success', name: 'Scan & Pay - Success', category: 'scanpay', component: () => <ScanPayScreen variant="success" /> },
  { id: 'scanpay-failed', name: 'Scan & Pay - Failed', category: 'scanpay', component: () => <ScanPayScreen variant="failed" /> },
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
  SignupScreen,
  HomeScreen,
  BiometricScreen,
  BiometricSetupScreen,
  AuthMethodScreen,
  RegistrationSuccessScreen,
  LanguageSheetScreen,
  KycLockScreen,
  KycIdTypeScreen,
  KycConfirmScreen,
  LoadingScreen,
  KycSuccessScreen,
  ReloadMethodScreen,
  ReloadAmountModal,
  ReloadReceiptScreen,
  AutoReloadScreen,
  HomeWithReloadModal,
  NotificationsScreen,
  HistoryScreen,
  TransferScreen,
  VisaScreen,
  InsuranceScreen,
  ScanPayScreen,
};
