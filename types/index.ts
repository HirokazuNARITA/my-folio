// Folio アプリの型定義
// Phase 4 以降で追加

/** カテゴリ（Prisma schema の Category enum と一致） */
export type Category = "ILLUSTRATION" | "GRAPHIC" | "UI" | "OTHER";

/** 作品データモデル（Prisma Work モデル・ダミーデータ共通） */
export interface Work {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  price: number; // 0 = 無料、1以上 = 有料（円）
  published: boolean;
  createdAt: Date;
}
