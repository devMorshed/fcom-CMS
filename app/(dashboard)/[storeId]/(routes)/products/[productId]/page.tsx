import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";


const ProductsPage = async ({
  params,
}: {
  params: { storeId: string; productId: string };
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      storeId: params.storeId,
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });


  return (
    <div className="flex flex-col p-8 pt-6">
      <ProductForm
        categories={categories}
        sizes={sizes}
        colors={colors}
        initialData={product}
      />
    </div>
  );
};

export default ProductsPage;
