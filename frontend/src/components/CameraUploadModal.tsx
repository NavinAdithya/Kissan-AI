import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, X, RefreshCw, Sun, Check, ArrowRight, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface CameraUploadModalProps {
  isOpen: boolean;
  initialMode: 'camera' | 'upload';
  onClose: () => void;
  onAnalyze: (file: File, previewUrl: string) => void;
}

export const CameraUploadModal: React.FC<CameraUploadModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onAnalyze,
}) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>(initialMode);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode]);

  // Handle camera stream initialization & cleanup
  useEffect(() => {
    if (isOpen && activeTab === 'camera' && !previewUrl) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, activeTab, previewUrl]);

  const nativeCameraInputRef = useRef<HTMLInputElement | null>(null);

  const startCamera = async () => {
    setCameraError(null);

    // Check secure context requirement for WebRTC
    if (window.isSecureContext === false && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      setCameraError('Camera access requires HTTPS in production (or localhost during local development).');
      setIsCameraActive(false);
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera API is not supported in this browser. You can use native camera capture or upload an image instead.');
      setIsCameraActive(false);
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' }, // Rear camera preferred on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err: unknown) {
      console.warn('Camera access error:', err);
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setCameraError('Camera access is required. Allow camera access in your browser settings, or upload a leaf photo instead.');
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          setCameraError('No camera found on this device. Please upload a leaf photo instead.');
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
          setCameraError('Camera is already in use by another application or tab.');
        } else {
          setCameraError(`Camera error (${err.name}). Allow camera access in browser settings or upload a photo.`);
        }
      } else {
        setCameraError('Camera access is required. Allow camera access in your browser settings, or upload a leaf photo instead.');
      }
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `leaf-capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const url = URL.createObjectURL(blob);
      setSelectedFile(file);
      setPreviewUrl(url);
      stopCamera();
    }, 'image/jpeg', 0.92);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processSelectedFile(files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file (JPEG, PNG, WEBP)');
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleRetake = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (activeTab === 'camera') {
      startCamera();
    }
  };

  const handleProceedAnalyze = () => {
    if (selectedFile && previewUrl) {
      onAnalyze(selectedFile, previewUrl);
    }
  };

  const handleCloseModal = () => {
    stopCamera();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-forest-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-cream-300 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header with Mode Switcher & Close button */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-cream-200 bg-cream-50/70">
          
          {/* Tab buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-cream-200/70 rounded-xl">
            <button
              onClick={() => {
                setActiveTab('camera');
                if (previewUrl) handleRetake();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'camera'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-forest-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Camera</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('upload');
                stopCamera();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'upload'
                  ? 'bg-forest-900 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-forest-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File</span>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={handleCloseModal}
            className="w-9 h-9 rounded-full bg-cream-200/80 hover:bg-cream-300 text-charcoal-700 flex items-center justify-center transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

        </div>

        {/* Hidden inputs for gallery and native system camera */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />
        <input
          ref={nativeCameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 pb-safe">
          
          {/* If preview is selected, show Large Preview */}
          {previewUrl ? (
            <div className="space-y-4">
              <div className="relative aspect-[4/3] max-h-[50vh] rounded-2xl overflow-hidden bg-charcoal-900 border-2 border-forest-900/20 shadow-inner group">
                <img
                  src={previewUrl}
                  alt="Captured leaf preview"
                  className="w-full h-full object-contain"
                />
                
                <div className="absolute top-3 left-3 bg-forest-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-leaf-400" />
                  <span>Photo looks good ✓</span>
                </div>

                {selectedFile && (
                  <div className="absolute bottom-3 left-3 right-3 bg-charcoal-900/80 text-white/90 text-[11px] font-mono px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center justify-between">
                    <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                    <span>{(selectedFile.size / 1024).toFixed(1)} KB</span>
                  </div>
                )}
              </div>

              {/* Action Buttons for Preview (48px thumb-friendly targets) */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={handleRetake}
                  className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-cream-300 bg-white hover:bg-cream-100 active:scale-98 text-charcoal-800 font-bold text-sm transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retake</span>
                </button>

                <button
                  onClick={handleProceedAnalyze}
                  className="min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 active:scale-98 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>Analyze Photo</span>
                  <ArrowRight className="w-4 h-4 text-leaf-400" />
                </button>
              </div>
            </div>
          ) : activeTab === 'camera' ? (
            /* CAMERA MODE */
            <div className="space-y-3">
              
              {cameraError ? (
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-4">
                  <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
                  <div>
                    <h4 className="font-bold text-amber-950 text-base">Camera access is required</h4>
                    <p className="text-xs text-amber-900 leading-relaxed max-w-sm mx-auto mt-1">
                      Allow camera access in your browser settings, or upload a leaf photo instead.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                    <button
                      onClick={startCamera}
                      className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>TRY CAMERA AGAIN</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('upload')}
                      className="w-full sm:w-auto min-h-[44px] flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>UPLOAD PHOTO</span>
                    </button>
                  </div>

                  {/* Fallback button to launch system camera directly */}
                  <div className="pt-2 border-t border-amber-200/80">
                    <button
                      onClick={() => nativeCameraInputRef.current?.click()}
                      className="text-xs text-amber-900 hover:text-amber-950 font-semibold underline underline-offset-2 flex items-center justify-center gap-1.5 mx-auto"
                    >
                      <Camera className="w-3.5 h-3.5 text-amber-700" />
                      <span>Or snap with system camera fallback</span>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Live Viewport with leaf framing reticle */}
                  <div className="relative aspect-[4/3] max-h-[50vh] rounded-2xl overflow-hidden bg-black border border-forest-900/30 shadow-inner">
                    
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />

                    {/* Centered Leaf Framing Guide */}
                    <div className="absolute inset-8 sm:inset-10 border-2 border-dashed border-white/60 rounded-2xl pointer-events-none flex items-center justify-center">
                      
                      {/* Leaf Silhouette Outline in center */}
                      <div className="text-white/25 text-7xl select-none pointer-events-none">
                        🍃
                      </div>

                      {/* Corner Markers */}
                      <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-leaf-400 rounded-tl-lg" />
                      <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-leaf-400 rounded-tr-lg" />
                      <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-leaf-400 rounded-bl-lg" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-leaf-400 rounded-br-lg" />
                    </div>

                    {/* Framing Guide Header badge */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-charcoal-900/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold border border-white/20 flex items-center gap-1.5 shadow-sm">
                      <span>Keep leaf inside frame</span>
                    </div>

                    {/* Natural Light Hint at bottom of viewport */}
                    <div className="absolute bottom-3 left-3 right-3 bg-charcoal-900/75 backdrop-blur-md text-leaf-300 px-3 py-1.5 rounded-xl text-[11px] font-medium border border-white/10 flex items-center justify-center gap-1.5">
                      <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Use bright, indirect natural sunlight for best accuracy</span>
                    </div>

                  </div>

                  {/* Big Farmer-Friendly Shutter Button (min 48px, thumb friendly) */}
                  <div className="flex items-center justify-center pt-2">
                    <button
                      onClick={handleCapturePhoto}
                      disabled={!isCameraActive}
                      aria-label="Capture Photo"
                      className="group relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-forest-900 text-white shadow-xl hover:bg-forest-800 active:scale-95 transition-all border-4 border-cream-200 disabled:opacity-50"
                      title="Snap Leaf Photo"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/80 group-hover:scale-90 transition-transform bg-leaf-500 flex items-center justify-center">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </button>
                  </div>
                </>
              )}

            </div>
          ) : (
            /* UPLOAD MODE */
            <div className="space-y-4">
              
              {/* Mobile Quick Action Buttons (Take Photo OR Choose Gallery) */}
              <div className="grid grid-cols-2 gap-3 sm:hidden">
                <button
                  type="button"
                  onClick={() => nativeCameraInputRef.current?.click()}
                  className="min-h-[48px] flex items-center justify-center gap-2 p-3 rounded-2xl bg-forest-900 text-white font-bold text-xs shadow-sm active:scale-98"
                >
                  <Camera className="w-4 h-4 text-leaf-400" />
                  <span>Take Photo</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="min-h-[48px] flex items-center justify-center gap-2 p-3 rounded-2xl bg-cream-200 text-forest-950 font-bold text-xs border border-cream-300 active:scale-98"
                >
                  <ImageIcon className="w-4 h-4 text-leaf-600" />
                  <span>Choose Gallery</span>
                </button>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                  isDragging
                    ? 'border-leaf-500 bg-leaf-50/60 scale-[1.01]'
                    : 'border-cream-300 hover:border-forest-700 bg-cream-50/50 hover:bg-cream-100/50'
                }`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-forest-900/5 text-forest-900 flex items-center justify-center border border-forest-900/10">
                  <ImageIcon className="w-6 h-6 sm:w-7 sm:h-7 text-leaf-600" />
                </div>

                <div>
                  <h4 className="font-bold text-forest-950 text-sm sm:text-base">
                    Click to select or drag photo here
                  </h4>
                  <p className="text-xs text-charcoal-600 mt-1">
                    Supports high-resolution JPEG, PNG, or WEBP from phone camera
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-200 text-charcoal-700 text-xs font-semibold">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose from device</span>
                </div>
              </div>

              {/* Guidance card for high-quality leaf shots */}
              <div className="p-3.5 rounded-xl bg-forest-900/5 border border-forest-900/10 text-xs space-y-1 text-charcoal-700">
                <span className="font-bold text-forest-950">Photo Tips for Maximum Diagnostic Trust:</span>
                <ul className="list-disc list-inside space-y-0.5 text-charcoal-600 text-[11px]">
                  <li>Ensure the leaf lesion is sharply in focus (not blurry)</li>
                  <li>Photograph against a plain background or foliage</li>
                  <li>Avoid direct glaring flashlight reflections</li>
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
