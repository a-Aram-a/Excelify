import { createContext } from "react";

export const AppContext = createContext({
    selectedImage: null,
    setSelectedImage: (image: File) => {},
    sendImageRequest: () => {},
    loading: false,
    error: null
} as any)