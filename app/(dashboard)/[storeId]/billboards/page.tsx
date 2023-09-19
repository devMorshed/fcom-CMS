import React from "react";
import BillboardClient from "./component/billboard-client";
import prismadb from "@/lib/prismadb";
import Image from "next/image";

const BillboardsPage = async () => {
  const Billb = await prismadb.billboard.findMany();

  console.log(Billb);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
      {Billb?.map((singbill) => (
        <div key={singbill.id}>
          <p>{singbill.label}</p>
          <Image
            src={singbill.imgUrl}
            width={200}
            height={200}
            alt={singbill.label}
          />
        </div>
      ))}
    </div>
  );
};

export default BillboardsPage;
