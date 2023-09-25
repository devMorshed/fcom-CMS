import Heading from "@/components/ui/heading";
import React from "react";
import SizeForm from "./components/size-form";
import prismadb from "@/lib/prismadb";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div>
      <div className="flex-col p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
