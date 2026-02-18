import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLocale, type LocaleParams } from "@/i18n/locale";
import { isClerkConfigured } from "@/lib/auth/config";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardMockGuard } from "./dashboard-mock-guard";

type Props = {
  children: React.ReactNode;
  params: LocaleParams;
};

export default async function DashboardLayout({ children, params }: Props) {
  const locale = await getLocale(params);

  if (isClerkConfigured()) {
    const { userId } = await auth();
    if (!userId) redirect(`/${locale}/sign-in`);
  }

  return (
    <DashboardMockGuard>
      <div className="flex min-h-0 flex-1">
        <DashboardSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </DashboardMockGuard>
  );
}
