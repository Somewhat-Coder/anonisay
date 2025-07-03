import dbConnenct from "@/lib/dbConnect";

export default async function POST(request: Request) {

    await dbConnenct();
    try{
        const {username, code} = await request.json();

    }
    catch (error) {
        console.error("Error in verify email code API: ", error);
        return Response.json(
            {
                success: false,
                message: "Error verifying email code",
            },
            { status: 500 }
        );
    }
}
