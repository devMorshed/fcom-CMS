import prismadb from "@/lib/prismadb";
import ProductsClient from "./components/products-client";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  console.log(products);

  return (
    <div className="flex flex-col p-8 pt-6">
      <ProductsClient initialData={products} />
    </div>
  );
};

export default ProductsPage;
