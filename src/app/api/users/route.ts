
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";


export async function GET(request:NextRequest){
    try {
        const users = await prisma.user.findMany();
    return NextResponse.json(users)
}
    
     catch (error) {
      console.log("there is problem in database",error);
      return NextResponse.json({error:"problem in data "},{status:500})
    }
}