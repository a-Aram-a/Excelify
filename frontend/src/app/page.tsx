'use client'
import FileSpreadsheetIcon from "@/components/icons/FileSpreadsheetIcon";
import { useContext, useState } from "react";
import { AppContext } from "@/context/app";
import FileSelect from "@/components/FileSelect";
import { useImageLoader } from "@/hooks/useImageLoader";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";

export default function Home() {
  const { selectedImage, setSelectedImage, loading, success, error, sendImageRequest } = useImageLoader()

  const appContext = useContext(AppContext);

  return (
    <AppContext.Provider value={{ selectedImage, setSelectedImage, loading, error }}>
      <main className="text-text">
        <div className="flex flex-col min-h-screen max-w-xl mx-auto">
          <header className="flex items-center justify-center flex-1 flex-col gap-2 p-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <FileSpreadsheetIcon className="h-12 w-12 bg-gradient-to-tr from-purple-500 to-fuchsia-500 rounded-lg p-3 text-white shadow-md" />
              <div className="text-2xl font-bold">Excelify</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Convert photos to spreadsheets</div>
            </div>
          </header>
          <div>
            { error && <ErrorMessage error={error} /> }
            { success && <SuccessMessage success={success} /> }
          </div>
          <div className="flex flex-col gap-4 p-4">
            <FileSelect />
            <div className="flex flex-col gap-2">
              <button className="btn btn-neutral w-full" disabled={!selectedImage || loading} onClick={sendImageRequest}>Convert to Excel</button>
              <button className="btn btn-neutral w-full" disabled={!selectedImage || loading} onClick={() => setSelectedImage(null)}>Clear</button>
            </div>
          </div>
        </div>
      </main>
    </AppContext.Provider>
  );
}
