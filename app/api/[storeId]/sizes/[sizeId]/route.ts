import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } }
) {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Authentication Failure");
  }

  const size = await prismadb.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return NextResponse.json(size);
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { sizeId: string; storeId: string };
  }
) {
  try {
    const { userId } = auth();

    const { name, value } = await req.json();

    if (!userId) {
      return new NextResponse("Authentication Error");
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized Access");
    }

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {}
}


export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.sizeId) {
      return new NextResponse("size id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const size = await prismadb.size.delete({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[size Delete]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
