import { Message } from "@/model/User";

//Generiv API response object type
export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Array<Message>
}