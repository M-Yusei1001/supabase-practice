import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (e) {
    if (e) return new Error("接続に失敗しました");
  } finally {
  }
}

//ブログの詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    await main();
    const post = await prisma.post.findFirst({ where: { id } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (e) {
    if (e) return NextResponse.json({ message: "Error", e }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

//ブログの記事編集API
export const PUT = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);

    const { titile, description } = await req.json();

    await main();
    const post = await prisma.post.update({
      data: { titile, description },
      where: { id },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (e) {
    if (e) return NextResponse.json({ message: "Error", e }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

//ブログの記事編集API
export const DELETE = async (req: Request, res: NextResponse) => {
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);

    await main();
    const post = await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (e) {
    if (e) return NextResponse.json({ message: "Error", e }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
