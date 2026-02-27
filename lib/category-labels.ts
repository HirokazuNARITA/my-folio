import type { Category } from "@/types";

/** カテゴリの日本語ラベル */
export const CATEGORY_LABELS: Record<Category, string> = {
  ILLUSTRATION: "イラスト",
  GRAPHIC: "グラフィック",
  UI: "UI",
  OTHER: "その他",
};

export function getCategoryLabel(category: Category): string {
  return CATEGORY_LABELS[category] ?? category;
}
