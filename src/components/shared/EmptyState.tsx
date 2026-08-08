import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center text-muted-foreground">
      <Inbox className="h-10 w-10 opacity-40" aria-hidden />
      <p className="font-medium text-foreground">{title}</p>
      {description ? <p className="max-w-sm text-sm">{description}</p> : null}
    </div>
  );
}
