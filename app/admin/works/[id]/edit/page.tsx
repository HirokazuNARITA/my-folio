import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { WorkForm } from "@/components/work-form";
import { getWorkById } from "@/actions/works";

interface EditWorkPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWorkPage({ params }: EditWorkPageProps) {
  const { id } = await params;
  const work = await getWorkById(id);

  if (!work) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Button asChild variant="ghost" className="mb-6 -ml-2">
        <Link href="/admin">← 管理画面に戻る</Link>
      </Button>
      <WorkForm
        defaultValues={{
          id: work.id,
          title: work.title,
          description: work.description,
          category: work.category,
          price: work.price,
          published: work.published,
        }}
      />
    </div>
  );
}
