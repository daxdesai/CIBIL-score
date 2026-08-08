import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SecureInputProps = React.ComponentProps<typeof Input>;

export function SecureInput({ className, ...props }: SecureInputProps) {
  return (
    <div className="relative">
      <Lock
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input className={cn("pl-9", className)} {...props} />
    </div>
  );
}
