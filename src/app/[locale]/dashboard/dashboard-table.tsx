import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/db/supabase/server";

type ItemRow = {
  id: string;
  name: string | null;
  created_at: string;
};

export async function DashboardTable() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .select("id, name, created_at")
    .order("created_at", { ascending: false });

  const t = await getTranslations("Dashboard");

  if (error) {
    return (
      <p className="mt-4 text-sm text-destructive" role="alert">
        {t("tableError")}
      </p>
    );
  }

  const rows = (data ?? []) as ItemRow[];

  if (rows.length === 0) {
    return (
      <div className="mt-4 rounded-lg border border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
        {t("tableEmpty")}
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border">
      <table className="w-full min-w-[280px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 font-medium">{t("columnId")}</th>
            <th className="px-4 py-3 font-medium">{t("columnName")}</th>
            <th className="px-4 py-3 font-medium">{t("columnCreatedAt")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-border last:border-b-0">
              <td className="px-4 py-3 font-mono text-muted-foreground">
                {row.id}
              </td>
              <td className="px-4 py-3">{row.name ?? "—"}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {row.created_at
                  ? new Date(row.created_at).toLocaleDateString(undefined, {
                      dateStyle: "short",
                    })
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
