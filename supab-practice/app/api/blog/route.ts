import {NextResponse} from "next/server"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export async function main() {
    try{
        await prisma.$connect();
    }catch(e){
        if(e) return new Error("接続に失敗しました");
    }finally{

    }
}

//ブログの全記事取得API
export const GET = async (req: Request, res:NextResponse) => {
    try{
        await main();
        const posts = await prisma.post.findMany();
        return NextResponse.json({message:"Success", posts}, {status: 200});
    }catch(e){
        if(e) return NextResponse.json({message:"Error", e}, {status: 500});
    }finally{
        prisma.$disconnect();
    }
}

//ブログの投稿用API
export const POST = async (req: Request, res:NextResponse) => {
    try{
        const { titile, description} = await req.json();
        await main();
        const post = await prisma.post.create({data: {titile, description}});
        return NextResponse.json({message:"Success", post}, {status: 201});
    }catch(e){
        if(e) return NextResponse.json({message:"Error", e}, {status: 500});
    }finally{
        prisma.$disconnect();
    }
}