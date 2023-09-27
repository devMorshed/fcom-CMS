import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: { colorId: string; storeId: string };
  }
) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Aunthentication Failed");
  }

  const { name, value } = await req.json();

  const storeByUser = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!storeByUser) {
    return new NextResponse("Unauthorized Access");
  }

  const colors = await prismadb.color.create({
    data: {
      name,
      value,
      storeId: params.storeId,
    },
  });

  return NextResponse.json(colors);
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Aunthentication Failed");
  }

  const storeByUser = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!storeByUser) {
    return new NextResponse("Unauthorized Access");
  }

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return NextResponse.json(colors);
}
