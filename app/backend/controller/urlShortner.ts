import urlShortnerModel from '../models/urlShortner';
import commonHelper from '../helper/commonhelper';
import connectMongoDB from '@/app/connection/mongodb';
import mongoose from 'mongoose';
const controller = {
  getFullUrlFromKey:async(key:string) =>{
    try {
      if(!mongoose?.connection?.readyState) await connectMongoDB();
      const res = await urlShortnerModel.findOne({
        shortKey:key
      })
      if(res){
        return {status:1,msg:res.originalUrl};
      }else{
        return {status:0,msg:'Invalid Short Key!'};
      }
    } catch (error) {
      return {status:0,msg:'Something Went Wrong!'};
    }
  },

  createShorturl:async (url:string) =>{
    try {
      if(!mongoose?.connection?.readyState) await connectMongoDB();
      const key = await commonHelper.genCryptoKey(url);
      const _data = await urlShortnerModel.findOne({
        originalUrl:url
      })
      if(_data) return {status:1,msg:`${process.env.URL}/${key}`};
      if(key && !_data){
        const date = new Date();
        date.setDate(date.getDate() + 30);
        try {
          await urlShortnerModel.insertOne({
            shortKey:key,
            originalUrl:url,
            status:1,
            expiresAt:date
          });
          return {status:1,msg:`${process.env.URL}/${key}`};
        } catch (error) {
          return {status:0,msg:'Something went Wrong!',error};
        }
      }
    } catch (error) {
      console.error('Unable to Connect MongoDb');
    }
  }
};


export default controller;