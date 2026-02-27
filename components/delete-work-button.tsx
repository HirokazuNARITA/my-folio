"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteWork } from "@/actions/works";

interface DeleteWorkButtonProps {
  workId: string;
  workTitle: string;
}

export function DeleteWorkButton({ workId, workTitle }: DeleteWorkButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleConfirm() {
    setIsDeleting(true);
    const result = await deleteWork(workId);
    setIsDeleting(false);

    if (result.ok) {
      setOpen(false);
      router.refresh();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
        <Trash2 className="size-4" />
        <span className="sr-only">削除</span>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>作品を削除しますか？</DialogTitle>
          <DialogDescription>
            「{workTitle}」を削除すると元に戻せません。よろしいですか？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "削除中..." : "削除する"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            キャンセル
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
