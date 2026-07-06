import { createHash } from "crypto";
const commonHelper = {
  genCryptoKey: async (url:string) =>{ 
    try {
      return await createHash('sha256').update(url).digest('hex').slice(0,8);
    } catch (error) {
      console.error('something went wrong',error);
    }
  }
}

export default commonHelper;