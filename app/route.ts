import { getServerSession } from "next-auth";

export async function GET(request: Request) { 
    console.log(request);
    const session = getServerSession();

    if(!session){
        console.log(session);
    }

}