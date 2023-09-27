"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Color } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ColorColumn, columns } from "./color-column";
import ApiList from "@/components/ui/api-list";

interface ColorsClientProps {
  initialData: ColorColumn[];
}

const ColorsClient: React.FC<ColorsClientProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="pb-2 flex justify-between items-center">
        <Heading title="Colors" desc="Manage Colors for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={initialData} searchKey="name" />
      <Separator />

      <ApiList
        entityIdName="colorId"
        entityName="colors"
        title="Color API"
        desc="Colors API to manage"
      />
    </>
  );
};

export default ColorsClient;
