import { AppContext } from "@/context/app";
import ImageIcon from "./icons/ImageIcon";
import { createRef, useContext, useEffect, useState } from "react";
import { getImageDataUrl } from "@/utils";
import Image from "next/image";

function FileSelect() {
    const appContext = useContext(AppContext);
    const allowedTypes = ["image/png", "image/jpeg"];
    const [dragoverClasses, setDragoverClasses] = useState("");
    const [selectedImageDataUrl, setSelectedImageDataUrl] = useState<string>("");
    const inputFileRef = createRef<HTMLInputElement>();

    useEffect(() => {
        if (appContext.selectedImage) {
            getImageDataUrl(appContext.selectedImage).then(setSelectedImageDataUrl);
        } else {
            setSelectedImageDataUrl("");
        }
    }, [appContext.selectedImage]);

    function clickHandler(e: any) {
        e.preventDefault();
        inputFileRef.current?.click();
    }

    function dropHandler(e: any) {
        e.preventDefault();
        setDragoverClasses("");

        if (e.dataTransfer.items) {
            [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    if (file && allowedTypes.includes(file.type)) {
                        appContext.setSelectedImage(file);
                        return
                    }
                }
            });
        } else {
            [...e.dataTransfer.files].forEach((file, i) => {
                if (allowedTypes.includes(file.type)) {
                    appContext.setSelectedImage(file);
                    return
                }
            });
        }
    }

    function dragOverHandler(e: any) {
        e.preventDefault();
        setDragoverClasses("border-primary");
    }

    function dragLeaveHandler(e: any) {
        setDragoverClasses("");
    }

    return (
        <div className="flex flex-col gap-4 cursor-pointer">
            <div className={`border-dashed border-2 border-gray-200 rounded-lg w-full p-4 ${dragoverClasses}`}
                onDrop={dropHandler} onDragOver={dragOverHandler} onDragLeave={dragLeaveHandler} onClick={clickHandler}>
                <div className={`aspect-[1/1] flex items-center justify-center rounded-lg border border-dashed border-gray-200 w-full ${dragoverClasses}`}>
                    {
                        selectedImageDataUrl ?
                            <img src={selectedImageDataUrl} alt="selected image" className="rounded-lg max-w-full max-h-full" /> :
                            <ImageIcon className="h-8 w-8 text-gray-500" />
                    }
                    <span className="sr-only">Drag and drop your photos here</span>
                </div>
            </div>
            <button className="btn btn-neutral w-full" onClick={clickHandler}>Select photo</button>
            <input type="file" ref={inputFileRef} onChange={(e) => appContext.setSelectedImage(e.target.files![0])} accept={allowedTypes.join(",")} className="hidden" />
        </div>
    );
}

export default FileSelect;