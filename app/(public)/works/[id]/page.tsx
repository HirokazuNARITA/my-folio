import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getWorkById } from "@/actions/works";
import { getCategoryLabel } from "@/lib/category-labels";

interface WorkDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const work = await getWorkById(id);

  if (!work || !work.published) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">作品が見つかりません。</p>
        <Button asChild variant="link" className="mt-4 px-0">
          <Link href="/">← 一覧に戻る</Link>
        </Button>
      </div>
    );
  }

  const priceLabel =
    work.price === 0 ? "無料" : `¥${work.price.toLocaleString()}`;

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <h1 className="text-xl font-bold">Folio</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link href="/">← 一覧に戻る</Link>
        </Button>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted lg:aspect-square">
            <Image
              src={work.imageUrl}
              alt={work.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6">
            <div>
              <Badge variant="secondary">
                {getCategoryLabel(work.category)}
              </Badge>
              <h1 className="mt-2 text-2xl font-bold">{work.title}</h1>
              <p className="mt-4 text-muted-foreground">{work.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">{priceLabel}</span>
              <Button disabled>購入する（Phase 6で有効化）</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
