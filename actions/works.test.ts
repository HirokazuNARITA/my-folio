import { describe, it, expect, vi, beforeEach } from "vitest";
import { createWork, updateWork, deleteWork, togglePublish } from "./works";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    work: {
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

const { prisma } = await import("@/lib/prisma");

describe("createWork", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("有効なデータで作品を作成する", async () => {
    const mockWork = {
      id: "test-id",
      title: "テスト",
      description: "説明",
      category: "ILLUSTRATION",
      imageUrl: "https://utfs.io/f/example",
      price: 0,
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.mocked(prisma.work.create).mockResolvedValue(mockWork);

    const result = await createWork({
      title: "テスト",
      description: "説明",
      category: "ILLUSTRATION",
      imageUrl: "https://utfs.io/f/example",
      price: 0,
      published: false,
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.work.imageUrl).toBe("https://utfs.io/f/example");
    }
    expect(prisma.work.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        title: "テスト",
        imageUrl: "https://utfs.io/f/example",
      }),
    });
  });

  it("imageUrl が空でバリデーションエラーを返す", async () => {
    const result = await createWork({
      title: "テスト",
      description: "説明",
      category: "ILLUSTRATION",
      imageUrl: "",
      price: 0,
      published: false,
    });

    expect(result.ok).toBe(false);
    expect(prisma.work.create).not.toHaveBeenCalled();
  });
});

describe("updateWork", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("有効なデータで作品を更新する", async () => {
    const mockWork = {
      id: "test-id",
      title: "更新後",
      description: "説明",
      category: "GRAPHIC",
      imageUrl: "https://utfs.io/f/new-image",
      price: 500,
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    vi.mocked(prisma.work.update).mockResolvedValue(mockWork);

    const result = await updateWork("test-id", {
      title: "更新後",
      description: "説明",
      category: "GRAPHIC",
      imageUrl: "https://utfs.io/f/new-image",
      price: 500,
      published: true,
    });

    expect(result.ok).toBe(true);
    expect(prisma.work.update).toHaveBeenCalledWith({
      where: { id: "test-id" },
      data: expect.objectContaining({
        imageUrl: "https://utfs.io/f/new-image",
      }),
    });
  });

  it("imageUrl が空でエラーを返す", async () => {
    const result = await updateWork("test-id", {
      title: "テスト",
      description: "説明",
      category: "ILLUSTRATION",
      imageUrl: "",
      price: 0,
      published: false,
    });

    expect(result.ok).toBe(false);
    expect(prisma.work.update).not.toHaveBeenCalled();
  });
});

describe("togglePublish", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("作品が存在しない場合エラーを返す", async () => {
    vi.mocked(prisma.work.findUnique).mockResolvedValue(null);

    const result = await togglePublish("nonexistent-id");

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("作品が見つかりません");
    }
  });
});
