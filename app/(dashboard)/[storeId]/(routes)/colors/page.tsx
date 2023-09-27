import React from "react";
import ColorsClient from "./components/colors-client";
import prismadb from "@/lib/prismadb";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col p-8 pt-6">
      <ColorsClient initialData={colors} />
    </div>
  );
};

export default ColorsPage;
