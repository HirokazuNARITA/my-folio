"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { togglePublish } from "@/actions/works";

interface TogglePublishButtonProps {
  workId: string;
  published: boolean;
}

export function TogglePublishButton({
  workId,
  published,
}: TogglePublishButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleToggle() {
    setIsLoading(true);
    const result = await togglePublish(workId);
    setIsLoading(false);

    if (result.ok) {
      router.refresh();
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleToggle}
      disabled={isLoading}
      title={published ? "非公開にする" : "公開する"}
    >
      {published ? (
        <Eye className="size-4" />
      ) : (
        <EyeOff className="size-4" />
      )}
      <span className="sr-only">
        {published ? "非公開にする" : "公開する"}
      </span>
    </Button>
  );
}
