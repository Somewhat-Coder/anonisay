import NextAuth from "next-auth";
import { nextAuthOptions } from "./route";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
