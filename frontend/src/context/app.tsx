import { createContext } from "react";

export const AppContext = createContext({
    selectedImage: null,
    setSelectedImage: (image: File) => {},
} as any)