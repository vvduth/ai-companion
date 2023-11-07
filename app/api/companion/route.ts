import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;
    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const companion = await prismadb.companion.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instruction: instructions,
        seed,
      },
    });

    return NextResponse.json(companion)
  } catch (error) {
    console.log("companion-post ", error);
    return new NextResponse("Interal error ", { status: 500 });
  }
}


