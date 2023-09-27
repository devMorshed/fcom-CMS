import React from "react";
import ColorForm from "./components/color-form";
import prismadb from "@/lib/prismadb";

const ColorsPage = async ({
  params,
}: {
  params: { colorId: string; storeId: string };
}) => {
  const color = await prismadb.color.findUnique({
    where: {
      storeId: params.storeId,
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col p-8 pt-6">
      <ColorForm initialData = {color} />
    </div>
  );
};

export default ColorsPage;
