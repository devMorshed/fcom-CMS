import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Authentication Failure");
  }

  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
      storeId: params.storeId,
    },
  });

  return NextResponse.json(color);
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { name, value } = await req.json();
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Authentication Failure");
    }

    const storeByUserId = await prismadb.store.findUnique({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Authorization Failure");
    }
    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.colorId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
    
  } catch (error) {
    console.log("[color Delete]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
