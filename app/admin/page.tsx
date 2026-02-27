import Link from "next/link";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase-server";
import { LogoutButton } from "@/components/logout-button";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DUMMY_WORKS } from "@/lib/dummy-works";
import { getCategoryLabel } from "@/lib/category-labels";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const works = DUMMY_WORKS;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">管理ダッシュボード</h1>
          <p className="mt-2 text-muted-foreground">
            {user?.email ?? "オーナー"} としてログイン中
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/works/new">作品を追加</Link>
          </Button>
          <LogoutButton />
        </div>
      </div>

      {works.length === 0 ? (
        <EmptyState
          title="作品を追加してみましょう"
          description="まだ作品が登録されていません。最初の作品を追加しましょう。"
          action={{ label: "作品を追加", href: "/admin/works/new" }}
        />
      ) : (
        <div className="space-y-4">
          {works.map((work) => (
            <Card key={work.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={work.imageUrl}
                    alt={work.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{work.title}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {getCategoryLabel(work.category)}
                  </Badge>
                  <span className="ml-2 text-sm text-muted-foreground">
                    {work.price === 0
                      ? "無料"
                      : `¥${work.price.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/admin/works/${work.id}/edit`}>
                      <Pencil className="size-4" />
                      <span className="sr-only">編集</span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" disabled>
                    <Trash2 className="size-4" />
                    <span className="sr-only">削除</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
