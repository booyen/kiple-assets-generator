'use client';

import { useState } from 'react';
import { useCustomizationStore } from '@/store/useCustomizationStore';
import { ColorPicker, FileUpload, TextInput, Toggle, TypographyPanel, TextEditor, CollapsibleSection } from '@/components/ui';
import { getScreenById } from '@/components/screens';
import { RotateCcw, Palette, Type, Grid3X3, FileText, Layers, Layout, Image as ImageIcon, Coins } from 'lucide-react';
import { LayoutStyle, ReloadMethodKey, TextCustomizations } from '@/types';

type TabId = 'branding' | 'typography' | 'text' | 'modules';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const tabs: Tab[] = [
  { id: 'branding', label: 'Branding', icon: Palette },
  { id: 'typography', label: 'Typography', icon: Type },
  { id: 'text', label: 'Text', icon: FileText },
  { id: 'modules', label: 'Modules', icon: Layers },
];

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

export function Sidebar() {
  const store = useCustomizationStore();
  const currentScreenInfo = getScreenById(store.currentScreen);
  const [activeTab, setActiveTab] = useState<TabId>('branding');

  return (
    <div className="w-80 bg-white border-r border-slate-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Customization</h2>
          <button
            onClick={store.resetToDefaults}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-28">
        {/* Branding Tab */}
        {activeTab === 'branding' && (
          <div className="space-y-3">
            {/* Layout Style */}
            <CollapsibleSection
              title="Layout Style"
              icon={<Layout size={16} />}
              defaultOpen={true}
            >
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'minimal' as LayoutStyle, label: 'Minimal', desc: 'Clean & simple' },
                  { id: 'card' as LayoutStyle, label: 'Card', desc: 'Bold & modern' },
                  { id: 'gradient' as LayoutStyle, label: 'Gradient', desc: 'Premium dark' },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => store.setLayoutStyle(style.id)}
                    className={`p-2.5 rounded-xl border-2 transition-all text-center ${
                      store.layoutStyle === style.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-full h-10 rounded-lg mb-1.5 ${
                        style.id === 'minimal'
                          ? 'bg-white border border-slate-200'
                          : style.id === 'card'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                          : 'bg-gradient-to-br from-slate-800 to-slate-900'
                      }`}
                    />
                    <p className={`text-xs font-medium ${store.layoutStyle === style.id ? 'text-blue-700' : 'text-slate-700'}`}>
                      {style.label}
                    </p>
                  </button>
                ))}
              </div>
            </CollapsibleSection>

            {/* Brand Identity */}
            <CollapsibleSection
              title="Brand Identity"
              icon={<Palette size={16} />}
              defaultOpen={true}
            >
              <div className="space-y-3">
                <FileUpload
                  label="Logo (SVG/PNG)"
                  value={store.logo}
                  onChange={store.setLogo}
                />
                <TextInput
                  label="App Name"
                  value={store.appName}
                  onChange={store.setAppName}
                  placeholder="Enter app name"
                />
              </div>
            </CollapsibleSection>

            {/* Promotional Banner */}
            <CollapsibleSection
              title="Promotional Banner"
              icon={<ImageIcon size={16} />}
              defaultOpen={false}
            >
              <div className="space-y-2">
                <FileUpload
                  label="Banner Image"
                  value={store.bannerImage}
                  onChange={store.setBannerImage}
                  accept="image/png,image/jpeg,image/webp"
                />
                <p className="text-xs text-slate-500">
                  Optimal size: <span className="font-medium">750 × 256px</span> (2x retina)
                </p>
              </div>
            </CollapsibleSection>

            {/* Color Palette */}
            <CollapsibleSection
              title="Color Palette"
              icon={<Palette size={16} />}
              defaultOpen={false}
              badge={6}
            >
              <div className="space-y-3">
                <ColorPicker
                  label="Primary Color"
                  value={store.primaryColor}
                  onChange={store.setPrimaryColor}
                />
                <ColorPicker
                  label="Secondary Color"
                  value={store.secondaryColor}
                  onChange={store.setSecondaryColor}
                />
                <ColorPicker
                  label="Accent Color"
                  value={store.accentColor}
                  onChange={store.setAccentColor}
                />
                <ColorPicker
                  label="Background Color"
                  value={store.backgroundColor}
                  onChange={store.setBackgroundColor}
                />
                <ColorPicker
                  label="Text Primary"
                  value={store.textPrimaryColor}
                  onChange={store.setTextPrimaryColor}
                />
                <ColorPicker
                  label="Text Secondary"
                  value={store.textSecondaryColor}
                  onChange={store.setTextSecondaryColor}
                />
              </div>
            </CollapsibleSection>

            {/* Currency & Balance */}
            <CollapsibleSection
              title="Currency & Balance"
              icon={<Coins size={16} />}
              defaultOpen={false}
            >
              <div className="space-y-3">
                <TextInput
                  label="Currency Symbol"
                  value={store.currencySymbol}
                  onChange={store.setCurrencySymbol}
                  placeholder="RM"
                />
                <TextInput
                  label="Sample Balance"
                  value={store.balanceAmount}
                  onChange={store.setBalanceAmount}
                  placeholder="1,238.00"
                />
              </div>
            </CollapsibleSection>
          </div>
        )}

        {/* Typography Tab */}
        {activeTab === 'typography' && (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 mb-4">
              Customize the typography design system for all screens.
            </p>
            <TypographyPanel />
          </div>
        )}

        {/* Text Tab */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 mb-4">
              Edit all text content across screens. Expand sections to edit.
            </p>
            <TextEditor />
          </div>
        )}

        {/* Modules Tab */}
        {activeTab === 'modules' && (
          <div className="space-y-3">
            <p className="text-sm text-slate-500 mb-2">
              Toggle modules and reload method options.
            </p>

            <CollapsibleSection
              title="Home Screen Modules"
              icon={<Grid3X3 size={16} />}
              defaultOpen={true}
              badge={Object.values(store.modules).filter(Boolean).length}
            >
              <div className="space-y-2">
                <Toggle
                  label="Transfer"
                  checked={store.modules.transfer}
                  onChange={(checked) => store.setModule('transfer', checked)}
                  description="Send money to others"
                />
                <Toggle
                  label="Remittance"
                  checked={store.modules.remittance}
                  onChange={(checked) => store.setModule('remittance', checked)}
                  description="International transfers"
                />
                <Toggle
                  label="Visa Card"
                  checked={store.modules.visa}
                  onChange={(checked) => store.setModule('visa', checked)}
                  description="Virtual card management"
                />
                <Toggle
                  label="Pay Bills"
                  checked={store.modules.payBills}
                  onChange={(checked) => store.setModule('payBills', checked)}
                  description="Bill payment services"
                />
                <Toggle
                  label="Mobile Reload"
                  checked={store.modules.mobileReload}
                  onChange={(checked) => store.setModule('mobileReload', checked)}
                  description="Phone credit top-up"
                />
                <Toggle
                  label="More"
                  checked={store.modules.more}
                  onChange={(checked) => store.setModule('more', checked)}
                  description="Additional services menu"
                />
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Reload Wallet Methods"
              icon={<Grid3X3 size={16} />}
              defaultOpen={true}
              badge={Object.values(store.reloadMethods).filter((m) => m.enabled).length}
            >
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Use these switches to show/hide reload methods.
                </p>
                <div className="space-y-2 rounded-lg border border-slate-100 p-2">
                  <TextInput
                    label="Screen Title"
                    value={store.texts.reloadSelectTitle}
                    onChange={(value) => store.setText('reloadSelectTitle', value)}
                  />
                  <TextInput
                    label="Saved Options Label"
                    value={store.texts.reloadSavedOptionsLabel}
                    onChange={(value) => store.setText('reloadSavedOptionsLabel', value)}
                  />
                  <TextInput
                    label="Other Options Label"
                    value={store.texts.reloadOtherOptionsLabel}
                    onChange={(value) => store.setText('reloadOtherOptionsLabel', value)}
                  />
                  <TextInput
                    label="Info Note"
                    value={store.texts.reloadInfoNote}
                    onChange={(value) => store.setText('reloadInfoNote', value)}
                    multiline
                    rows={2}
                  />
                </div>
                {reloadMethodFields.map((method) => (
                  (() => {
                    const methodText = reloadMethodTextKeys[method.key];
                    const subtitleKey = methodText.subtitle;
                    return (
                      <div key={method.key} className="space-y-2 rounded-lg border border-slate-100 p-2">
                        <Toggle
                          label={method.label}
                          checked={store.reloadMethods[method.key].enabled}
                          onChange={(checked) => store.setReloadMethodEnabled(method.key, checked)}
                          description={method.description}
                        />
                        <TextInput
                          label={`${method.label} Title`}
                          value={store.texts[methodText.title]}
                          onChange={(value) => store.setText(methodText.title, value)}
                        />
                        {subtitleKey && (
                          <TextInput
                            label={`${method.label} Subtitle`}
                            value={store.texts[subtitleKey]}
                            onChange={(value) => store.setText(subtitleKey, value)}
                          />
                        )}
                        <FileUpload
                          label={`${method.label} Logo (Optional)`}
                          value={store.reloadMethods[method.key].logo}
                          onChange={(logo) => store.setReloadMethodLogo(method.key, logo)}
                          accept="image/png,image/jpeg,image/svg+xml,image/webp"
                          hint="Upload custom logo (optional)"
                        />
                      </div>
                    );
                  })()
                ))}
              </div>
            </CollapsibleSection>

            {/* Current Screen Info */}
            <CollapsibleSection
              title="Current Screen"
              icon={<Layers size={16} />}
              defaultOpen={true}
            >
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="text-sm font-medium text-slate-700">
                  {currentScreenInfo?.name || 'No screen selected'}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Category: {currentScreenInfo?.category || '-'}
                </p>
              </div>
            </CollapsibleSection>
          </div>
        )}
      </div>
    </div>
  );
}
