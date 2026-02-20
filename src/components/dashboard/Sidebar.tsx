'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { themePresetList, useCustomizationStore } from '@/store/useCustomizationStore';
import { ColorPicker, FileUpload, TextInput, Toggle, TypographyPanel, TextEditor, CollapsibleSection } from '@/components/ui';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { getScreenById } from '@/components/screens';
import { RotateCcw, Palette, Grid3X3, Layers, Image as ImageIcon, Coins, Sparkles, Route, Download, Upload, ShieldCheck } from 'lucide-react';
import { ReloadMethodKey, TextCustomizations } from '@/types';

const reloadMethodFields: { key: ReloadMethodKey; label: string; description: string }[] = [
  { key: 'savedCard', label: 'Saved Card', description: 'Use saved card option' },
  { key: 'onlineBanking', label: 'Online Banking', description: 'Use FPX / online banking option' },
  { key: 'creditCard', label: 'Credit/Debit Card', description: 'Use credit or debit card option' },
  { key: 'duitNow', label: 'DuitNow Transfer', description: 'Use DuitNow transfer option' },
  { key: 'virtualBank', label: 'Virtual Bank', description: 'Use virtual bank option' },
  { key: 'sevenEleven', label: '7-Eleven (OTC)', description: 'Use over-the-counter option' },
];

const reloadMethodTextKeys: Record<ReloadMethodKey, { title: keyof TextCustomizations; subtitle?: keyof TextCustomizations }> = {
  savedCard: { title: 'reloadSavedCardTitle', subtitle: 'reloadSavedCardSubtitle' },
  onlineBanking: { title: 'reloadOnlineBankingTitle' },
  creditCard: { title: 'reloadCreditCardTitle' },
  duitNow: { title: 'reloadDuitNowTitle', subtitle: 'reloadDuitNowSubtitle' },
  virtualBank: { title: 'reloadVirtualBankTitle', subtitle: 'reloadVirtualBankSubtitle' },
  sevenEleven: { title: 'reloadSevenElevenTitle' },
};

const flowPaths = [
  {
    id: 'onboarding-auth',
    label: 'Onboarding -> Auth',
    steps: ['splash', 'onboarding-1', 'login', 'signup', 'registration-success', 'biometric-setup', 'choose-auth', 'touch-id', 'home'],
  },
  {
    id: 'kyc',
    label: 'KYC Verification',
    steps: ['home', 'kyc-lock', 'kyc-id-type', 'kyc-confirm-id', 'kyc-loading', 'kyc-success', 'home'],
  },
  {
    id: 'reload',
    label: 'Reload Wallet',
    steps: ['home', 'reload-method', 'reload-method-saved', 'reload-amount', 'reload-success', 'home'],
  },
  {
    id: 'transfer',
    label: 'Transfer Journey',
    steps: ['home', 'transfer-start', 'transfer-favorite', 'transfer-show-card', 'transfer-amount', 'transfer-confirm', 'transfer-success', 'history'],
  },
  {
    id: 'scanpay',
    label: 'Scan & Pay Journey',
    steps: ['home', 'scanpay-scan', 'scanpay-enter-amount', 'scanpay-confirm-pin', 'scanpay-success', 'home'],
  },
  {
    id: 'visa-insurance',
    label: 'VISA + Insurance',
    steps: ['home', 'visa-home', 'visa-reload', 'insurance-home', 'insurance-details', 'insurance-success', 'insurance-policy'],
  },
];

export function Sidebar() {
  const store = useCustomizationStore();
  const currentScreenInfo = getScreenById(store.currentScreen);
  const [sessionMessage, setSessionMessage] = useState<string>('');
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('saved');
  const [activeTab, setActiveTab] = useState('brand');
  const [sectionOpen, setSectionOpen] = useState<Record<string, boolean>>({
    themePresets: true,
    brandIdentity: true,
    colorTokens: false,
    typographyBaseline: false,
    homeModules: true,
    reloadMethods: true,
    sessionUtilities: false,
  });
  const importInputRef = useRef<HTMLInputElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const unsubscribe = useCustomizationStore.subscribe(() => {
      setSaveState('saving');
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        setSaveState('saved');
      }, 220);
    });

    return () => {
      unsubscribe();
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const setSection = (key: string, open: boolean) => {
    setSectionOpen((prev) => ({ ...prev, [key]: open }));
  };

  const expandAllSections = () => {
    setSectionOpen((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, true]))
    );
  };

  const hideAllSections = () => {
    setSectionOpen((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, false]))
    );
  };

  const exportSessionConfig = () => {
    const stateSnapshot = useCustomizationStore.getState();
    const serializable = JSON.parse(JSON.stringify(stateSnapshot));
    const json = JSON.stringify(serializable, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `kiple-session-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setSessionMessage('Session exported.');
  };

  const importSessionConfig = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') {
        setSessionMessage('Import failed: invalid JSON shape.');
        return;
      }
      useCustomizationStore.setState(parsed as never);
      setSessionMessage('Session imported.');
    } catch {
      setSessionMessage('Import failed: unable to parse JSON.');
    } finally {
      event.target.value = '';
    }
  };

  const sidebarTabs = [
    { id: 'brand', label: 'Brand', icon: Palette },
    { id: 'features', label: 'Features', icon: Grid3X3 },
    { id: 'content', label: 'Content', icon: Layers },
    { id: 'flows', label: 'Flows', icon: Route },
  ];

  return (
    <div className="flex bg-background border-r border-border h-full">
      {/* Left Rail (Icon Bar) */}
      <div className="w-[60px] flex-shrink-0 bg-zinc-950 dark:bg-zinc-950 border-r border-border flex flex-col items-center py-4">
        <div className="flex-1 space-y-4 w-full flex flex-col items-center">
          {sidebarTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-3 rounded-xl transition-all relative group ${isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
              >
                <Icon size={20} />

                {/* Tooltip */}
                <div className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 px-2.5 py-1.5 bg-zinc-800 text-white text-[11px] font-medium rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-lg pointer-events-none">
                  {tab.label}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Settings Panel */}
      <div className="w-[300px] flex flex-col h-full bg-muted/20">
        {/* Header */}
        <div className="p-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Customizer</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${saveState === 'saving'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                    }`}
                >
                  {saveState === 'saving' ? 'Saving...' : 'Autosaved'}
                </span>
              </p>
            </div>
            <button
              onClick={store.resetToDefaults}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
              title="Reset to defaults"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border bg-card px-2.5 py-2">
              <p className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">Theme</p>
              <p className="text-xs font-semibold text-foreground mt-0.5">{store.themePreset}</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-2.5 py-2">
              <p className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">Selected</p>
              <p className="text-xs font-semibold text-foreground mt-0.5">{store.selectedScreens.length} screens</p>
            </div>
          </div>

          {(activeTab === 'brand' || activeTab === 'features') && (
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                onClick={expandAllSections}
                className="px-2 py-1 text-[10px] font-medium rounded border border-border text-muted-foreground hover:bg-secondary"
              >
                Expand All
              </button>
              <button
                onClick={hideAllSections}
                className="px-2 py-1 text-[10px] font-medium rounded border border-border text-muted-foreground hover:bg-secondary"
              >
                Collapse All
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 pb-28 space-y-3">
          {activeTab === 'brand' && (
            <div className="space-y-3">
              <CollapsibleSection
                title="Theme Presets"
                icon={<Sparkles size={16} />}
                badge={themePresetList.length}
                open={sectionOpen.themePresets}
                onOpenChange={(open) => setSection('themePresets', open)}
              >
                <div className="space-y-2">
                  {themePresetList.map((preset) => {
                    const isActive = store.themePreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => store.applyThemePreset(preset.id)}
                        className={`w-full p-3 rounded-xl border text-left transition-all ${isActive ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/50'
                          }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className={`text-sm font-semibold ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-foreground'}`}>{preset.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{preset.description}</p>
                          </div>
                          <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${isActive ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400' : 'bg-secondary text-secondary-foreground'}`}>
                            {isActive ? 'Applied' : 'Apply'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                          {preset.swatches.map((color, index) => (
                            <span key={`${preset.id}-${index}`} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Brand Identity"
                icon={<Palette size={16} />}
                open={sectionOpen.brandIdentity}
                onOpenChange={(open) => setSection('brandIdentity', open)}
              >
                <div className="space-y-3">
                  <FileUpload label="Logo (SVG/PNG)" value={store.logo} onChange={store.setLogo} />
                  <TextInput label="App Name" value={store.appName} onChange={store.setAppName} placeholder="Enter app name" />
                  <FileUpload label="Banner Image" value={store.bannerImage} onChange={store.setBannerImage} accept="image/png,image/jpeg,image/webp" />
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Color & Balance Tokens"
                icon={<Coins size={16} />}
                badge={8}
                open={sectionOpen.colorTokens}
                onOpenChange={(open) => setSection('colorTokens', open)}
              >
                <div className="space-y-3">
                  <ColorPicker label="Primary Color" value={store.primaryColor} onChange={store.setPrimaryColor} />
                  <ColorPicker label="Secondary Color" value={store.secondaryColor} onChange={store.setSecondaryColor} />
                  <ColorPicker label="Accent Color" value={store.accentColor} onChange={store.setAccentColor} />
                  <ColorPicker label="Background Color" value={store.backgroundColor} onChange={store.setBackgroundColor} />
                  <ColorPicker label="Text Primary" value={store.textPrimaryColor} onChange={store.setTextPrimaryColor} />
                  <ColorPicker label="Text Secondary" value={store.textSecondaryColor} onChange={store.setTextSecondaryColor} />
                  <TextInput label="Currency Symbol" value={store.currencySymbol} onChange={store.setCurrencySymbol} placeholder="RM" />
                  <TextInput label="Sample Balance" value={store.balanceAmount} onChange={store.setBalanceAmount} placeholder="1,238.00" />
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Typography Baseline"
                icon={<ImageIcon size={16} />}
                open={sectionOpen.typographyBaseline}
                onOpenChange={(open) => setSection('typographyBaseline', open)}
              >
                <TypographyPanel />
              </CollapsibleSection>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-3">
              <CollapsibleSection
                title="Home Screen Modules"
                icon={<Grid3X3 size={16} />}
                badge={Object.values(store.modules).filter(Boolean).length}
                open={sectionOpen.homeModules}
                onOpenChange={(open) => setSection('homeModules', open)}
              >
                <div className="space-y-2">
                  <Toggle label="Transfer" checked={store.modules.transfer} onChange={(checked) => store.setModule('transfer', checked)} description="Send money to others" />
                  <Toggle label="Remittance" checked={store.modules.remittance} onChange={(checked) => store.setModule('remittance', checked)} description="International transfers" />
                  <Toggle label="Visa Card" checked={store.modules.visa} onChange={(checked) => store.setModule('visa', checked)} description="Virtual card management" />
                  <Toggle label="Pay Bills" checked={store.modules.payBills} onChange={(checked) => store.setModule('payBills', checked)} description="Bill payment services" />
                  <Toggle label="Mobile Reload" checked={store.modules.mobileReload} onChange={(checked) => store.setModule('mobileReload', checked)} description="Phone credit top-up" />
                  <Toggle label="More" checked={store.modules.more} onChange={(checked) => store.setModule('more', checked)} description="Additional services menu" />
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Reload Wallet Methods"
                icon={<Grid3X3 size={16} />}
                badge={Object.values(store.reloadMethods).filter((m) => m.enabled).length}
                open={sectionOpen.reloadMethods}
                onOpenChange={(open) => setSection('reloadMethods', open)}
              >
                <div className="space-y-3">
                  <div className="space-y-2 rounded-lg border border-border p-2">
                    <TextInput label="Screen Title" value={store.texts.reloadSelectTitle} onChange={(value) => store.setText('reloadSelectTitle', value)} />
                    <TextInput label="Saved Options Label" value={store.texts.reloadSavedOptionsLabel} onChange={(value) => store.setText('reloadSavedOptionsLabel', value)} />
                    <TextInput label="Other Options Label" value={store.texts.reloadOtherOptionsLabel} onChange={(value) => store.setText('reloadOtherOptionsLabel', value)} />
                    <TextInput label="Info Note" value={store.texts.reloadInfoNote} onChange={(value) => store.setText('reloadInfoNote', value)} multiline rows={2} />
                  </div>
                  {reloadMethodFields.map((method) => {
                    const methodText = reloadMethodTextKeys[method.key];
                    const subtitleKey = methodText.subtitle;
                    return (
                      <div key={method.key} className="space-y-2 rounded-lg border border-border p-2">
                        <Toggle label={method.label} checked={store.reloadMethods[method.key].enabled} onChange={(checked) => store.setReloadMethodEnabled(method.key, checked)} description={method.description} />
                        <TextInput label={`${method.label} Title`} value={store.texts[methodText.title]} onChange={(value) => store.setText(methodText.title, value)} />
                        {subtitleKey && <TextInput label={`${method.label} Subtitle`} value={store.texts[subtitleKey]} onChange={(value) => store.setText(subtitleKey, value)} />}
                        <FileUpload label={`${method.label} Logo (Optional)`} value={store.reloadMethods[method.key].logo} onChange={(logo) => store.setReloadMethodLogo(method.key, logo)} accept="image/png,image/jpeg,image/svg+xml,image/webp" hint="Upload custom logo (optional)" />
                      </div>
                    );
                  })}
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Session Utilities"
                icon={<ShieldCheck size={16} />}
                open={sectionOpen.sessionUtilities}
                onOpenChange={(open) => setSection('sessionUtilities', open)}
              >
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={exportSessionConfig} className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground hover:bg-secondary text-sm">
                      <Download size={14} />
                      Export Config
                    </button>
                    <button onClick={() => importInputRef.current?.click()} className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border text-foreground hover:bg-secondary text-sm">
                      <Upload size={14} />
                      Import Config
                    </button>
                  </div>
                  <input ref={importInputRef} type="file" accept="application/json" className="hidden" onChange={importSessionConfig} />
                  {sessionMessage && <p className="text-xs text-muted-foreground">{sessionMessage}</p>}
                  <button
                    onClick={store.resetToDefaults}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm"
                  >
                    <RotateCcw size={14} />
                    Reset to Defaults
                  </button>
                </div>
              </CollapsibleSection>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                <p className="text-xs text-slate-600">
                  Centralized copy dictionary for all journeys and states.
                </p>
              </div>
              <TextEditor />
            </div>
          )}

          {activeTab === 'flows' && (
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg border border-border">
                <p className="text-sm font-medium text-foreground">{currentScreenInfo?.name || 'No screen selected'}</p>
                <p className="text-xs text-muted-foreground mt-1">Category: {currentScreenInfo?.category || '-'}</p>
              </div>
              {flowPaths.map((flow) => (
                <div key={flow.id} className="rounded-lg border border-border p-2.5 bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-foreground">{flow.label}</p>
                    <button onClick={() => store.setCurrentScreen(flow.steps[0])} className="text-[11px] px-2 py-1 rounded bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">Start</button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {flow.steps.map((step, stepIndex) => (
                      <button
                        key={`${flow.id}-${step}-${stepIndex}`}
                        onClick={() => store.setCurrentScreen(step)}
                        className={`text-[10px] px-2 py-1 rounded border transition-colors ${store.currentScreen === step ? 'bg-blue-50 border-blue-300 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400' : 'bg-background border-border text-muted-foreground hover:border-foreground/20'
                          }`}
                      >
                        {step}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
