import { describe, it, expect } from "vitest";
import { workFormSchema } from "./work";

const validData = {
  title: "テスト作品",
  description: "説明文",
  category: "ILLUSTRATION" as const,
  imageUrl: "https://utfs.io/f/example",
  price: 0,
  published: false,
};

describe("workFormSchema", () => {
  it("有効なデータでパース成功", () => {
    const result = workFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("imageUrl が空でエラー", () => {
    const result = workFormSchema.safeParse({
      ...validData,
      imageUrl: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.imageUrl).toContain("画像は必須です");
    }
  });

  it("imageUrl が省略でエラー", () => {
    const { imageUrl: _, ...withoutImage } = validData;
    const result = workFormSchema.safeParse(withoutImage);
    expect(result.success).toBe(false);
  });

  it("title が空でエラー", () => {
    const result = workFormSchema.safeParse({
      ...validData,
      title: "",
    });
    expect(result.success).toBe(false);
  });

  it("price が負でエラー", () => {
    const result = workFormSchema.safeParse({
      ...validData,
      price: -1,
    });
    expect(result.success).toBe(false);
  });
});
