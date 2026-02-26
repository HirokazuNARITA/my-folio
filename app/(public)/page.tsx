import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold">Folio</h1>
          <p className="text-muted-foreground">
            クリエイター向け作品公開・販売サイト
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Phase 1 完了：デプロイ基盤のセットアップ
          </p>
          <Button>Getting Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}
