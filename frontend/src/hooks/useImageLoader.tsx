import { axiosInstance } from "@/http";
import { saveAs } from "@/utils";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

export function useImageLoader() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
        setSuccess(null);
    }, [selectedImage]);

    async function sendImageRequest() {
      if (selectedImage) {
        setLoading(true);
        setError(null);
        setSuccess(null);
        const formData = new FormData();
        formData.append("image", selectedImage);
        formData.append("fillStr", "@");
        try {
          const response = await axiosInstance.post("/api/images", formData, {
            responseType: "blob",
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          saveAs(response.data, (selectedImage.name ?? "image") + ".xlsx");

          setSuccess('Image converted to Excel');
  
        } catch (error) {
          console.error(error);
          let message = ""
          if(error instanceof AxiosError && error.response?.data) {
              message = JSON.parse(await error.response?.data.text()).message ?? "Unknown error"
          } else {
              message = error instanceof Error ? error.message : "Unknown error"
          }

          setError(message);
        } finally {
          setLoading(false);
        }
      }
    }

    return { selectedImage, setSelectedImage, loading, success, error, sendImageRequest };
}