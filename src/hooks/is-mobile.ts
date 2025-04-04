'use server'

import { headers } from "next/headers";
import { isMobile } from "./user-agent";

export const checkAgent = async () =>{
    const userAgent = (await headers()).get("user-agent") || "";
    const mobileCheck = isMobile(userAgent);

    return mobileCheck;
}