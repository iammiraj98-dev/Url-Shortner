const validateRequest = (url:string) =>{
  const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  if(!urlRegex.test(url)){
    return {status:0,msg:'Invalid Url'};
  }
  return {status:1,msg:'sucess'}
};

export default validateRequest;