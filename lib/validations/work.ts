import { z } from "zod";

/** カテゴリ（Prisma Category enum と一致） */
const categoryEnum = z.enum(["ILLUSTRATION", "GRAPHIC", "UI", "OTHER"]);

/** 作品フォーム用 Zod スキーマ */
export const workFormSchema = z.object({
  title: z.string().min(1, "タイトルは必須です").max(100, "100文字以内で入力してください"),
  description: z.string().min(1, "説明は必須です").max(1000, "1000文字以内で入力してください"),
  category: categoryEnum,
  imageUrl: z.string().min(1, "画像は必須です"),
  price: z.number().int().min(0, "0以上で入力してください"),
  published: z.boolean(),
});

export type WorkFormValues = z.infer<typeof workFormSchema>;
