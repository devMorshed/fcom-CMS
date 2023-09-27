import React from "react";
import ColorsClient from "./components/colors-client";
import prismadb from "@/lib/prismadb";
import { ColorColumn } from "./components/color-column";
import { format } from "date-fns";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMM do yyyy"),
  }));

  return (
    <div className="flex-col p-8 pt-6">
      <ColorsClient initialData={formattedColors} />
    </div>
  );
};

export default ColorsPage;
