import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <>
      <div className="flex-col">
        <div className="p-8 pt-6 flex-1">
          <CategoryForm billboards={billboards} initialData={category} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
