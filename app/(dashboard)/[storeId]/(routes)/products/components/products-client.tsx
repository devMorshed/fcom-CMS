"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Product } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ProductsClientProps {
  initialData: Product[] | null;
}

const ProductsClient: React.FC<ProductsClientProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <Heading title="Products" desc="Manage Your Products" />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus /> Add New
        </Button>
      </div>
      <Separator />
      {/* <DataTable columns={"d"} data={initialData} searchKey="name" /> */}
    </div>
  );
};

export default ProductsClient;
