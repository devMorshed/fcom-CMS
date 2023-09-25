import React from "react";
import SizesClient from "./components/sizes-client";
import prismadb from "@/lib/prismadb";
import { useParams } from "next/navigation";
import { SizeColumn } from "./components/size-column";
import { format } from "date-fns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do yyyy"),
  }));

  return (
    <div className="flex-col p-8 pt-6">
      <SizesClient data={formattedSizes} />
    </div>
  );
};

export default SizesPage;
