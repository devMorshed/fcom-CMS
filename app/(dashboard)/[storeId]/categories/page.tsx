import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { CategoryColumns } from "./components/category-columns";
import CategoryClient from "./components/category-client";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      id: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumns[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="pt-6 p-8 flex-col">
      <CategoryClient data={formattedCategories} />
    </div>
  );
};

export default CategoriesPage;
