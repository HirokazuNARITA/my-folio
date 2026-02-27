import type { Work } from "@/types";

/** Phase 3 用ダミーデータ（DB接続前にUI確認用） */
export const DUMMY_WORKS: Work[] = [
  {
    id: "1",
    title: "イラスト集：春の風景",
    description:
      "桜と新緑をテーマにしたイラストシリーズ。デジタル水彩で穏やかな日本の四季を表現しました。",
    category: "ILLUSTRATION",
    imageUrl: "https://picsum.photos/seed/work1/800/450",
    price: 0,
    published: true,
    createdAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "ブランドロゴデザイン",
    description:
      "スタートアップ企業向けのブランドアイデンティティデザイン。モダンで覚えやすいビジュアルを追求しました。",
    category: "GRAPHIC",
    imageUrl: "https://picsum.photos/seed/work2/800/450",
    price: 5000,
    published: true,
    createdAt: new Date("2025-02-01"),
  },
  {
    id: "3",
    title: "ダッシュボードUIキット",
    description:
      "Figma用の管理画面UIキット。アクセシビリティを考慮したコンポーネント設計です。",
    category: "UI",
    imageUrl: "https://picsum.photos/seed/work3/800/450",
    price: 3000,
    published: true,
    createdAt: new Date("2025-02-10"),
  },
  {
    id: "4",
    title: "カスタムアイコンセット",
    description:
      "アプリやWebサイト向けの32×32pxアイコンセット。100種類のアイコンを含みます。",
    category: "OTHER",
    imageUrl: "https://picsum.photos/seed/work4/800/450",
    price: 2000,
    published: true,
    createdAt: new Date("2025-02-20"),
  },
];
