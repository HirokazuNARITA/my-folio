"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  workFormSchema,
  type WorkFormValues,
} from "@/lib/validations/work";
import { createWork, updateWork } from "@/actions/works";
import { CATEGORY_LABELS } from "@/lib/category-labels";
import type { Category } from "@/types";
import { UploadButton } from "@/lib/uploadthing";

const CATEGORIES: Category[] = ["ILLUSTRATION", "GRAPHIC", "UI", "OTHER"];

interface WorkFormProps {
  /** 編集時は初期データを渡す（新規作成時はundefined） */
  defaultValues?: Partial<WorkFormValues> & { id?: string };
}

export function WorkForm({ defaultValues }: WorkFormProps) {
  const router = useRouter();
  const isEdit = !!defaultValues?.id;

  const form = useForm<WorkFormValues>({
    resolver: zodResolver(workFormSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      category: "ILLUSTRATION",
      imageUrl: "",
      price: 0,
      published: false,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: WorkFormValues) {
    if (isEdit && defaultValues?.id) {
      const result = await updateWork(defaultValues.id, data);
      if (result.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        form.setError("root", { message: result.error });
      }
    } else {
      const result = await createWork(data);
      if (result.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        form.setError("root", { message: result.error });
      }
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>{isEdit ? "作品を編集" : "作品を追加"}</CardTitle>
        <CardDescription>
          {isEdit
            ? "作品情報を更新してください"
            : "新しい作品の情報を入力してください"}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            {form.formState.errors.root && (
              <div
                className="rounded-md bg-destructive/10 p-3 text-sm text-destructive"
                role="alert"
              >
                {form.formState.errors.root.message}
              </div>
            )}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input placeholder="作品のタイトル" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>画像</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {field.value ? (
                        <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border">
                          <Image
                            src={field.value}
                            alt="プレビュー"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 512px"
                          />
                        </div>
                      ) : null}
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          const url = res?.[0]?.url;
                          if (url) field.onChange(url);
                        }}
                        onUploadError={(error) => {
                          form.setError("imageUrl", {
                            message: error.message,
                          });
                        }}
                        content={{
                          button: "画像を選択",
                          allowedContent: "画像（最大4MB）",
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>説明</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="作品の説明（1000文字以内）"
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>カテゴリ</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="カテゴリを選択" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {CATEGORY_LABELS[cat]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>価格（円）</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? 0
                            : parseInt(e.target.value, 10)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">公開する</FormLabel>
                    <CardDescription>
                      オンにするとトップページに表示されます
                    </CardDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex gap-2 pt-6">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "送信中..."
                : isEdit
                  ? "更新する"
                  : "追加する"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin")}
              disabled={isSubmitting}
            >
              キャンセル
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
