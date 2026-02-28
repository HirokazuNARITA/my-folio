"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { workFormSchema, type WorkFormValues } from "@/lib/validations/work";
import type { Category } from "@prisma/client";

/** 公開作品一覧を取得（トップページ用） */
export async function getWorks() {
  const works = await prisma.work.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return works;
}

/** 全作品を取得（管理画面用：非公開含む） */
export async function getAllWorks() {
  const works = await prisma.work.findMany({
    orderBy: { createdAt: "desc" },
  });
  return works;
}

/** IDで1件取得 */
export async function getWorkById(id: string) {
  const work = await prisma.work.findUnique({
    where: { id },
  });
  return work;
}

/** 作品を作成 */
export async function createWork(data: WorkFormValues) {
  const parsed = workFormSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten().formErrors.join(", ") };
  }

  const work = await prisma.work.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category as Category,
      imageUrl: parsed.data.imageUrl,
      price: parsed.data.price,
      published: parsed.data.published,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true as const, work };
}

/** 作品を更新 */
export async function updateWork(id: string, data: WorkFormValues) {
  const parsed = workFormSchema.safeParse(data);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten().formErrors.join(", ") };
  }

  const work = await prisma.work.update({
    where: { id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      category: parsed.data.category as Category,
      imageUrl: parsed.data.imageUrl,
      price: parsed.data.price,
      published: parsed.data.published,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/works/${id}`);
  revalidatePath(`/admin/works/${id}/edit`);
  return { ok: true as const, work };
}

/** 作品を削除 */
export async function deleteWork(id: string) {
  await prisma.work.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  return { ok: true as const };
}

/** 公開・非公開を切り替え */
export async function togglePublish(id: string) {
  const work = await prisma.work.findUnique({ where: { id } });
  if (!work) {
    return { ok: false as const, error: "作品が見つかりません" };
  }

  await prisma.work.update({
    where: { id },
    data: { published: !work.published },
  });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/works/${id}`);
  return { ok: true as const };
}
