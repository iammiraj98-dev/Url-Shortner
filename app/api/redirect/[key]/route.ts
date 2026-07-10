import { NextResponse } from "next/server";
import controller from "@/app/backend/controller/urlShortner";
export async function GET(request:Request,
  { params }:{ params:Promise<{key:string}>}){
    try {
      // console.log('request',request);
      const {key} = await params;
      const res = await controller.getFullUrlFromKey(key);
      console.log('=>>>>>>>>>>>>>>>>>>>',key,res);
      if(res?.status){
      return NextResponse.redirect(new URL(res.msg));
      }else{
        return NextResponse.redirect(new URL('/error',request.url));
        
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/error',request.url));
      
    }
}