import { getLocale, type LocalePageProps } from "@/i18n/locale";
import { SignInPageContent } from "./sign-in-content";

export default async function SignInPage({ params }: LocalePageProps) {
  await getLocale(params);
  return <SignInPageContent />;
}
