import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ServerIcon } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { Butterfly_Kids } from "next/font/google";

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
      </AlertDescription>
    </Alert>
  );
};
