"use client"

import { useState, useCallback, useRef } from "react"
import { Upload, Camera, X, Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FoodUploadProps {
  onImageSelected: (imageBase64: string) => void
  isAnalyzing: boolean
}

export function FoodUpload({ onImageSelected, isAnalyzing }: FoodUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setPreview(base64)
        onImageSelected(base64)
      }
      reader.readAsDataURL(file)
    },
    [onImageSelected]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files[0]
      if (file) {
        processFile(file)
      }
    },
    [processFile]
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        processFile(file)
      }
    },
    [processFile]
  )

  const clearPreview = useCallback(() => {
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (cameraInputRef.current) cameraInputRef.current.value = ""
  }, [])

  return (
    <div className="w-full">
      {!preview ? (
        <div
          className={cn(
            "relative rounded-2xl border-2 border-dashed transition-all duration-200",
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-secondary/30"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center px-6 py-16 md:py-24">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <ImageIcon className="h-10 w-10 text-primary" />
            </div>

            <h3 className="mb-2 text-xl font-semibold">
              Upload your food photo
            </h3>
            <p className="mb-8 max-w-sm text-center text-muted-foreground">
              Drag and drop an image here, or use the buttons below to upload or
              take a photo
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="min-w-[140px]"
              >
                <Upload className="mr-2 h-4 w-4" />
                Browse Files
              </Button>
              <Button
                onClick={() => cameraInputRef.current?.click()}
                className="min-w-[140px]"
              >
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Supports JPG, PNG, WEBP up to 10MB
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative aspect-video w-full overflow-hidden bg-secondary/30 md:aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Food preview"
              className="h-full w-full object-contain"
            />

            {isAnalyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
                <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
                <p className="text-lg font-medium">Analyzing your meal...</p>
                <p className="text-sm text-muted-foreground">
                  This may take a few seconds
                </p>
              </div>
            )}
          </div>

          {!isAnalyzing && (
            <div className="flex items-center justify-between border-t border-border p-4">
              <p className="text-sm text-muted-foreground">
                Image ready for analysis
              </p>
              <Button variant="ghost" size="sm" onClick={clearPreview}>
                <X className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
