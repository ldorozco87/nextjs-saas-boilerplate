import { getLocale, type LocalePageProps } from "@/i18n/locale";
import { SignUpPageContent } from "./sign-up-content";

export default async function SignUpPage({ params }: LocalePageProps) {
  await getLocale(params);
  return <SignUpPageContent />;
}
