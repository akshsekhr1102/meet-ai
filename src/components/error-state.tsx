import { AlertCircleIcon } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  description?: string;
}
export default function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <AlertCircleIcon className="h-10 w-10 text-red-500" />
        <div className="flex flex-col gap-y-2 text-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
