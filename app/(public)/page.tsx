import { WorkCard } from "@/components/work-card";
import { EmptyState } from "@/components/empty-state";
import { DUMMY_WORKS } from "@/lib/dummy-works";

export default function Home() {
  const works = DUMMY_WORKS;

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <h1 className="text-xl font-bold">Folio</h1>
          <p className="ml-4 text-sm text-muted-foreground">
            クリエイター向け作品公開・販売サイト
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="mb-6 text-2xl font-bold">作品一覧</h2>
        {works.length === 0 ? (
          <EmptyState
            title="まだ作品がありません"
            description="しばらくお待ちください。公開作品が追加される予定です。"
          />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {works.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
