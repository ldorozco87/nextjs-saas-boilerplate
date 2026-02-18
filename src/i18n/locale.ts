import { setRequestLocale } from "next-intl/server";

/** Params promise for app routes under `[locale]`. */
export type LocaleParams = Promise<{ locale: string }>;

/** Props for a simple locale page (only params). */
export type LocalePageProps = { params: LocaleParams };

/**
 * Await locale from params and set it for next-intl. Call from locale pages/layouts only.
 * @returns The resolved locale string.
 */
export async function getLocale(params: LocaleParams): Promise<string> {
  const { locale } = await params;
  setRequestLocale(locale);
  return locale;
}
