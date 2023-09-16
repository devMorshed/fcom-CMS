import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CopyIcon, ServerIcon } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  desc: string;
  variant: "public" | "admin";
}
const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  desc,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(desc);
    toast.success("Copied");
  };

  return (
    <Alert className="">
      <ServerIcon className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-4">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative bg-muted font-mono text-sm font-semibold rounded px-2 py-2">
          {desc}
        </code>
        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <CopyIcon className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
