import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/billboard-form";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <>
      <div className="flex-col">
        <div className="p-8 pt-6 flex-1">
          <BillboardForm initialData={billboard} />
        </div>
      </div>
    </>
  );
};

export default BillboardPage;
