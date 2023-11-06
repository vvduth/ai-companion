"use client";
import React, { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  // only load when we finished server sdie rendering and begin to load client side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      
    <CldUploadButton options={{ maxFiles: 1 }} onUpload={(result: any) => onChange(result.info.secure_url)} uploadPreset="bcckb1u7">
      <div 
        className="
          p-4 
          border-4 
          border-dashed
          border-primary/10 
          rounded-lg 
          hover:opacity-75 
          transition 
          flex 
          flex-col 
          space-y-2 
          items-center 
          justify-center
        "
      >
        <div className="relative h-40 w-40">
          <Image
            fill
            alt="Upload"
            src={value || "/next.svg"}
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </CldUploadButton>
  </div>
  );
};

export default ImageUpload;
