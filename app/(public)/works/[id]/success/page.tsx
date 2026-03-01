import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getWorkById } from "@/actions/works";

export const dynamic = "force-dynamic";

interface PurchaseSuccessPageProps {
  params: Promise<{ id: string }>;
}

export default async function PurchaseSuccessPage({
  params,
}: PurchaseSuccessPageProps) {
  const { id } = await params;
  const work = await getWorkById(id);

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center px-4">
          <h1 className="text-xl font-bold">Folio</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">ご購入ありがとうございました</h2>
          {work && (
            <p className="text-muted-foreground">
              「{work.title}」のご購入が完了しました。
            </p>
          )}
          <Button asChild>
            <Link href="/">トップページに戻る</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
