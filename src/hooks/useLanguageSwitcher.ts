import { useTranslation } from 'react-i18next';
import { useCerberusStore } from '@/store/cerberus-store';

export const useLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { config, updateConfig } = useCerberusStore();

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