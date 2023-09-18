import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { billbordId: string } }
) {
  try {
    if (!params.billbordId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }
    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billbordId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("Bill_GET");
    return new NextResponse("Internel Bill_GET error");
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    const { label, imgUrl } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imgUrl) {
      return new NextResponse("Image Url is required", { status: 400 });
    }

    if (!params.billboardId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imgUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("SingleBillboard_PATCH", error);
    return new NextResponse("Single Billboard Update Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; billbordId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated Access", { status: 401 });
    }
    if (!params.billbordId) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billbordId,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log("Bill_DELETE");
    return new NextResponse("Internel Bill_DEL error");
  }
}
