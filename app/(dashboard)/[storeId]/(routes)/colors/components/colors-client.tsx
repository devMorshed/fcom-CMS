"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ColorsClient = () => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="pb-2 flex justify-between items-center">
        <Heading title="Colors" desc="Manage Colors for your store" />
        <Button onClick={() => router.push(`${params.storeId}/colors/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default ColorsClient;
