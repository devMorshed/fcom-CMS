"use client";

import Heading from "@/components/ui/heading";
import { CategoryColumns } from "./category-columns";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";

interface CategoryClientProps {
  data: CategoryColumns[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Heading title="Categories" desc="Categorize your products" />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <PlusIcon className="h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
    </div>
  );
};

export default CategoryClient;
