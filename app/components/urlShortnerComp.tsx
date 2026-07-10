'use client'
import './urlShortner.css';
import Image from 'next/image';
import LinkIcon from '../assest/images/link-icon.png';
import { useRef, useState } from 'react';
import urlShortnerSubmit from '../actions/urlShortnerSubmit';
export const UrlShortnerPageComp = () =>{
  const urlInputref = useRef<HTMLInputElement>(null); 
  const [isCopy,setCopy] = useState(false); 
  const [copyUrl,setCopyUrl] = useState(""); 
  const submitUrlForm = async () =>{
    const url = urlInputref.current?.value || "";
    if(!url){
      alert("Please enter valid url!");
      return;
    }
    const res = await urlShortnerSubmit(url);
    if(res?.status){
      setCopy(true);
      setCopyUrl(res.msg || "");

      // console.log(res);
    }
  }

  const renderCopyShortUrl = () =>{
    return(
      <>
      <div className='text-green-400 text-start mt-2'>
        {copyUrl}
      </div>
      
      </>
    )
  }
  return(
    <>
      <div className="bg-gray-100 flex flex-col justify-start items-center w-screen h-screen p-4">
        <div className="bg-white w-8/12 h-1/2 shadow-xl rounded-xl p-8 m-4">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-black text-center font-bold text-3xl">Shortner Your Link</h1>
            <p className="text-gray-600 text-center font-medium my-1">Paste a long URL to shortner it</p>
          </div>
          <div className="url-input-cont">
            <Image src={LinkIcon} className='imag-url-icon'  alt="LinkIcon"/>
            <input
              ref= {urlInputref}
              type="text"
              className="input-field" 
              placeholder='Enter your URL here...'
            />
            <div className='flex justify-between items-center'>
              <div>
                {isCopy && renderCopyShortUrl()}
              </div>
              <button 
                className='btn'
                onClick={submitUrlForm}
              >Shortner
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) 
}
