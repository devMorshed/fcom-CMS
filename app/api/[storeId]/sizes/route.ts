import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { userId } = auth();

  const { name, value } = await req.json();

  if (!userId) {
    return new NextResponse("Authentication Failure", { status: 401 });
  }

  const storeByUserId = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!storeByUserId) {
    return new NextResponse("Unauthorized Access", { status: 403 });
  }

  const size = await prismadb.size.create({
    data: {
      name,
      value,
      storeId: params.storeId,
    },
  });

  return NextResponse.json(size);
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 404 });
    }
    const sizes = await prismadb.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(sizes);
  } catch (error) {
    return new NextResponse("Internel Error");
  }
}
