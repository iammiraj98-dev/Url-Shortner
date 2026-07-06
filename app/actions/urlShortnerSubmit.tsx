'use server';
import connectMongoDB from "../connection/mongodb";
import validateRequest from "../middlewaer/validateRequest";
import commonHelper from "../backend/helper/commonhelper";
import urlShortnerModel from "../backend/models/urlShortner";
export default async function urlShortnerSubmit(url:string){
  console.log(url);
  if(url){
    const res = validateRequest(url);
    if(!res?.status)return res;
    connectMongoDB();
    const key = await commonHelper.genCryptoKey(url);
    if(key){
      const url_shortner = await urlShortnerModel.insertOne({
        

      });
      url_shortner.save();

    }
    // console.log(key,'Key gEN');

    return {status:1,msg:'URL Shortner Start!'};
  }else{
    return {status:0,msg:'Something went wrong!'};
  }
}