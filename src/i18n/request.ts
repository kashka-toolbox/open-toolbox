import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'de'];
const defaultLocale = locales[0];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../i18n/${locale}.json`)).default
  };
});