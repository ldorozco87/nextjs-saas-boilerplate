import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { type LocaleParams } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { AuthProvider } from "@/components/auth-provider";
import { Header } from "@/components/header";

type Props = {
  children: React.ReactNode;
  params: LocaleParams;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <AuthProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          {children}
        </div>
      </AuthProvider>
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
