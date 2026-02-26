import { createClient } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/logout-button";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">管理ダッシュボード</h1>
          <p className="text-muted-foreground mt-2">
            {user?.email ?? "オーナー"} としてログイン中
          </p>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
