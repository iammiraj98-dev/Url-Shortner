'use client'
import './urlShortner.css';
import LinkIcon from '@mui/icons-material/Link';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRef, useState } from 'react';
import urlShortnerSubmit from '../actions/urlShortnerSubmit';
export const UrlShortnerPageComp = () =>{
  const urlInputref = useRef<HTMLInputElement>(null); 
  const [isCopy,setCopy] = useState(false); 
  const [copyUrl,setCopyUrl] = useState(""); 
  const [isError,setError] = useState(false); 
  const [errorMsg,setErrorMsg] = useState(""); 



  const ValidateUrl = () =>{
    const url = urlInputref.current?.value || "";
    if(!url){
      setError(true)
      setErrorMsg('Please enter valid url!')
      return;
    }
  }

  const GetSubmitFormResponse = async () =>{
    const url = urlInputref.current?.value || "";
    const res = await urlShortnerSubmit(url);
    if(res?.status){
      setCopy(true);
      setCopyUrl(res?.msg || "");
    }else{
      setError(true)
      setErrorMsg(res?.msg || 'Something Went Wrong!')
    }
  }

  const submitUrlForm = async (e:React.SubmitEvent<HTMLElement>) =>{
    e.preventDefault();
    ValidateUrl();
    if(isError)return;
    GetSubmitFormResponse(); 
  }

  const renderCopyShortUrl = () =>{
    return(
      <div className='flex justify-center items-center'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-row items-center gap-1 justify-center cursor-default'>
            <a className='text-green-600 text-start mt-2 font-bold' href={copyUrl} target='_blank'>
              {copyUrl}
            </a>
            <ContentCopyIcon fontSize='small' className='text-gray-400 mt-1 mx-1'/>
          </div>
        </div>
      </div>
    )
  }

  const renderErrorMsg = () =>{
    return(
      <div className='flex justify-center items-center'>
        <div className='text-red-600'>{errorMsg}</div>
      </div>
    )
  }

  const renderformSection = () =>{
    return(
      <form className="url-input-cont" onSubmit={submitUrlForm}>
        <LinkIcon  className='url-link-icon'/>
        <input
          ref= {urlInputref}
          type="text"
          className="input-field text-gray-600 font-medium" 
          placeholder='Enter your URL here...'
          required
        />
        <button className="form-button" type='submit'>
          <ArrowCircleRightIcon  
            className='btn'
            fontSize='large'
          />
        </button>
      </form>
    )
  }

  const renderheadingSection = () =>{
    return(
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-black text-center font-medium text-2xl"><b className='text-blue-600'>Shorten</b> Your Link</h1>
        <p className="text-gray-600 text-center font-medium my-1">Paste a long URL to shorten it.</p>
      </div>
    )
  }
  return(
    <>
      <div className="main-section flex flex-col justify-center items-center w-screen h-screen p-4">
        <div className="w-8/12 h-1/2 p-8 m-4">
          {renderheadingSection()}
          {renderformSection()}
          {isCopy && renderCopyShortUrl()}
          {isError && renderErrorMsg()}

        </div>
      </div>
    </>
  ) 
}
