import React, { useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CenterFocusIcon } from "@hugeicons/core-free-icons";
import axios from "axios";
import { type CartItem } from "./App";

type Cart = {
    setCartItem: React.Dispatch<React.SetStateAction<CartItem[]>>
}


export default function CameraViewport(setCartItems : Cart) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleSnapProduct = async () => {
        if (!videoRef.current || !canvasRef.current) {
            return;
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const width = video.videoWidth;
        const height = video.videoHeight;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        ctx.drawImage(video, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg');

        const blob = await fetch(dataUrl).then(res => res.blob());

        console.log(blob.size);

        const formData = new FormData();
        formData.append('image', blob, 'receipt.jpg')

        const response = await axios.post<any>("http://127.0.0.1:8000/api/cart/scan", formData);

        setCartItems.setCartItem((prev) => {
            return [
                ...prev,
                ...response.data.response
            ]
        })

        return response;
    }

    //CAMERA PERMISSION
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({
            video : { facingMode: 'environment' }
        })
        .then((stream) => {
            if(videoRef.current) {
                videoRef.current.srcObject = stream;    
            }
        })
        .catch((error) => {
            console.error('Camera access was blocked: ', error);
        });
    }, []);


    return ( 
        <>  
            <div className="relative">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover border-red-500 border-2"/>
                <canvas ref={canvasRef} className='hidden'></canvas>

                <div className="absolute bottom-0 left-0 right-0 text-center">
                    <button onClick={handleSnapProduct} className='relative bottom-10'> <HugeiconsIcon icon={CenterFocusIcon} size={30}/> </button>
                </div>
            </div>
        </>
    )
}