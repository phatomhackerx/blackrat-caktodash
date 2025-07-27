import { useTranslation } from 'react-i18next';
import { useBlackRatStore } from '@/store/blackrat-store';

export const useLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { config, updateConfig } = useBlackRatStore();

  const switchLanguage = (language: 'pt-BR' | 'en-US') => {
    i18n.changeLanguage(language);
    updateConfig({ language });
  };

  return {
    currentLanguage: config.language,
    switchLanguage,
    availableLanguages: [
      { code: 'pt-BR', name: 'Português' },
      { code: 'en-US', name: 'English' }
    ]
  };
};