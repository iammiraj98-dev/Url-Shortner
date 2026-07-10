'use server';
import validateRequest from "../middlewaer/validateRequest";
import controller from "../backend/controller/urlShortner";

export default async function urlShortnerSubmit(url:string){
  try {
    const res = validateRequest(url);
    if(!res?.status) return res;
    const _res = await controller.createShorturl(url)
    if(_res?.status) return _res;
    return {status:0,msg:'Something went wrong!'};

  } catch (error) {
    return {status:0,msg:'Something went wrong!',error};
  }
}