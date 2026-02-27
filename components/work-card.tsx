import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Work } from "@/types";
import { getCategoryLabel } from "@/lib/category-labels";

interface WorkCardProps {
  work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
  const priceLabel =
    work.price === 0 ? "無料" : `¥${work.price.toLocaleString()}`;

  return (
    <Link href={`/works/${work.id}`}>
      <Card className="overflow-hidden transition-colors hover:bg-accent/50">
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image
              src={work.imageUrl}
              alt={work.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2">{work.title}</h3>
          <Badge variant="secondary" className="mt-2">
            {getCategoryLabel(work.category)}
          </Badge>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <span className="text-sm font-medium text-muted-foreground">
            {priceLabel}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
