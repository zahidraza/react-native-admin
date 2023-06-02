import type { Translate } from '../types';
import { useI18nProvider } from './useI18nProvider';

export const useTranslate = (): Translate => {
  const { translate } = useI18nProvider();
  return translate;
};
