
// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const API_BASE = import.meta.env.VITE_API_BASE_URL;

// const DemoSession = ({ onExit, mode }) => {
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   const [active, setActive] = useState(false);
//   const [error, setError] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [showVisionTip, setShowVisionTip] = useState(false);
//   const [showAudioTip, setShowAudioTip] = useState(false);
//   const [activeResult, setActiveResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // CAMERA AND MICROPHONE
//   useEffect(() => {
//     const startDevices = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });

//         streamRef.current = stream;

//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }

//         setActive(true);
//       } catch {
//         setError("Camera or microphone permission denied");
//       }
//     };

//     startDevices();

//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((t) => t.stop());
//         streamRef.current = null;
//       }
//     };
//   }, []);

//   const stopDevices = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((t) => t.stop());
//       streamRef.current = null;
//     }

//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }

//     setActive(false);
//   };

//   const handleExit = () => {
//     if (mediaRecorderRef.current?.state === "recording") {
//       mediaRecorderRef.current.stop();
//     }

//     stopDevices();
//     onExit();
//   };

//   // CAPTURE IMAGE
//   const captureImage = () => {
//     if (!videoRef.current?.videoWidth) {
//       setError("Camera is not ready yet");
//       return null;
//     }

//     const canvas = document.createElement("canvas");

//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(videoRef.current, 0, 0);

//     return canvas;
//   };

//   // VISION ANALYSIS
//   const handleAnalyzeScene = async () => {
//     const canvas = captureImage();

//     if (!canvas) return;

//     setLoading(true);
//     setError(null);
//     setActiveResult(null);
//     setShowVisionTip(true);
//     setShowAudioTip(false);

//     canvas.toBlob(async (blob) => {
//       if (!blob) {
//         setLoading(false);
//         setError("Unable to capture image");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("image", blob);

//       try {
//         const res = await fetch(`${API_BASE}/api/infer`, {
//           method: "POST",
//           body: formData,
//         });

//         if (!res.ok) throw new Error("Failed");

//         const data = await res.json();

//         const text =
//           data?.label?.trim() ||
//           data?.result?.trim() ||
//           data?.message?.trim();

//         if (text) {
//           setActiveResult({
//             type: "vision",
//             data: { text },
//           });
//         }
//       } catch {
//         setError("Vision analysis failed");
//       } finally {
//         setLoading(false);
//       }
//     }, "image/jpeg");
//   };

//   // AUDIO RECORDING
//   const startRecording = () => {
//     if (!streamRef.current || !window.MediaRecorder) {
//       setError("Audio recording is unavailable");
//       return;
//     }

//     setError(null);
//     setActiveResult(null);
//     setShowAudioTip(true);
//     setShowVisionTip(false);

//     const recorder = new MediaRecorder(streamRef.current);

//     mediaRecorderRef.current = recorder;
//     audioChunksRef.current = [];

//     recorder.ondataavailable = (e) => {
//       if (e.data.size > 0) {
//         audioChunksRef.current.push(e.data);
//       }
//     };

//     recorder.onstop = async () => {
//       setLoading(true);

//       const audioBlob = new Blob(audioChunksRef.current, {
//         type: "audio/wav",
//       });

//       const formData = new FormData();
//       formData.append("audio", audioBlob);

//       try {
//         const res = await fetch(`${API_BASE}/api/audio/process`, {
//           method: "POST",
//           body: formData,
//         });

//         if (!res.ok) throw new Error("Failed");

//         const data = await res.json();

//         if (data?.transcript?.trim()) {
//           setActiveResult({
//             type: "audio",
//             data,
//           });
//         } else {
//           setError("No speech detected");
//         }
//       } catch {
//         setError("Audio processing failed");
//       } finally {
//         setLoading(false);
//       }
//     };

//     recorder.start();
//     setIsRecording(true);
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current?.state === "recording") {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   // CUSTOM MODEL
//   const handleCustomModel = async () => {
//     const canvas = captureImage();

//     if (!canvas) return;

//     setLoading(true);
//     setError(null);
//     setActiveResult(null);
//     setShowVisionTip(true);
//     setShowAudioTip(false);

//     canvas.toBlob(async (blob) => {
//       if (!blob) {
//         setLoading(false);
//         setError("Unable to capture image");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("image", blob);

//       try {
//         const res = await fetch(`${API_BASE}/api/custom/infer`, {
//           method: "POST",
//           body: formData,
//         });

//         if (!res.ok) throw new Error("Failed");

//         const data = await res.json();

//         const text =
//           data?.result?.trim() ||
//           data?.label?.trim() ||
//           data?.message?.trim();

//         if (text) {
//           setActiveResult({
//             type: "custom",
//             data: { text },
//           });
//         }
//       } catch {
//         setError("Custom model failed");
//       } finally {
//         setLoading(false);
//       }
//     }, "image/jpeg");
//   };

//   return (
//     <section className="min-h-screen w-full overflow-hidden bg-[#e8effb] px-4 py-6 text-[#142039] md:px-8 md:py-10">

//       <div className="mx-auto max-w-[1500px]">

//         {/* HEADER */}
//         <motion.header
//           initial={{ opacity: 0, y: -15 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-8 flex items-center justify-between"
//         >
//           <button
//             onClick={handleExit}
//             className="text-3xl font-black tracking-[-0.08em]"
//           >
//             AUGEN<span className="text-blue-600">.</span>
//           </button>

//           <button
//             onClick={handleExit}
//             className="rounded-full border border-slate-300 px-5 py-2.5 text-sm text-slate-600 transition hover:border-slate-800 hover:text-slate-900"
//           >
//             Exit Demo <span className="ml-2">×</span>
//           </button>
//         </motion.header>

//         {/* TITLE */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="mb-8"
//         >
//           <h1 className="text-4xl font-bold tracking-[-0.06em] md:text-6xl">
//             Experience the
//             <span className="font-light italic text-blue-600"> future.</span>
//           </h1>

//           <p className="mt-3 text-sm text-slate-500 md:text-base">
//             Explore intelligent vision through an interactive experience.
//           </p>
//         </motion.div>

//         {/* MAIN LAYOUT */}
//         <div className="grid items-stretch gap-5 lg:grid-cols-[1.65fr_0.85fr]">

//           {/* CAMERA PANEL */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.98 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7 }}
//             className="relative min-h-[350px] overflow-hidden rounded-[28px] bg-[#101827] shadow-xl shadow-blue-900/10 md:min-h-[570px]"
//           >
//             <video
//               ref={videoRef}
//               autoPlay
//               muted
//               playsInline
//               className="absolute inset-0 h-full w-full object-cover"
//             />

//             {/* CAMERA STATUS */}
//             <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 backdrop-blur-xl">
//               <span
//                 className={`h-2 w-2 rounded-full ${
//                   active
//                     ? "bg-green-400 shadow-[0_0_10px_#4ade80]"
//                     : "bg-red-500"
//                 }`}
//               />

//               <span className="text-xs font-medium text-white">
//                 {active ? "Camera active" : "Camera offline"}
//               </span>
//             </div>

//             {/* CAMERA PLACEHOLDER */}
//             {!active && (
//               <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#101827] px-6 text-center">
//                 <div className="mb-4 text-4xl text-white/30">◉</div>

//                 <p className="text-lg font-medium text-white">
//                   Waiting for camera
//                 </p>

//                 <p className="mt-2 text-sm text-white/40">
//                   Allow camera access to begin your experience.
//                 </p>
//               </div>
//             )}

//             {/* CAMERA BOTTOM */}
//             <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-6 pb-6 pt-20">
//               <div>
//                 <p className="text-lg font-medium text-white">
//                   Live Preview
//                 </p>

//                 <p className="mt-1 text-xs text-white/60">
//                   {mode || "Augen Vision Experience"}
//                 </p>
//               </div>

//               <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur-md">
//                 {active ? "Live" : "Offline"}
//               </div>
//             </div>
//           </motion.div>

//           {/* CONTROL PANEL */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.7, delay: 0.15 }}
//             className="flex flex-col rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-xl shadow-blue-900/5 backdrop-blur-xl md:p-7"
//           >

//             {/* PANEL HEADER */}
//             <div className="mb-7 flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold tracking-tight">
//                   Your experience
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Choose what you want to explore.
//                 </p>
//               </div>

//               {loading && (
//                 <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
//               )}
//             </div>

//             {/* RESULT DISPLAY */}
//             <div className="mb-5 min-h-[180px] flex-1 rounded-2xl bg-[#edf3fc] p-5 md:p-6">

//               <AnimatePresence mode="wait">
//                 {loading ? (
//                   <motion.div
//                     key="loading"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex min-h-[140px] flex-col items-center justify-center text-center"
//                   >
//                     <div className="mb-4 h-8 w-8 animate-spin rounded-full border-[3px] border-blue-600/20 border-t-blue-600" />

//                     <p className="font-semibold text-[#142039]">
//                       Processing your request
//                     </p>

//                     <p className="mt-2 text-xs text-slate-500">
//                       Please wait a moment...
//                     </p>
//                   </motion.div>
//                 ) : !activeResult ? (
//                   <motion.div
//                     key="empty"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="flex min-h-[140px] flex-col items-center justify-center text-center"
//                   >
//                     <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl text-blue-600 shadow-sm">
//                       ✳
//                     </div>

//                     <p className="font-semibold text-[#142039]">
//                       Your results will appear here
//                     </p>

//                     <p className="mt-2 text-xs text-slate-500">
//                       Choose an experience to get started.
//                     </p>
//                   </motion.div>
//                 ) : (
//                   <motion.div
//                     key={activeResult.type}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="space-y-4"
//                   >
//                     <h3 className="text-xl font-bold tracking-tight text-[#142039]">
//                       {activeResult.type === "vision"
//                         ? "Scene analysis"
//                         : activeResult.type === "audio"
//                         ? "Speech transcription"
//                         : "Custom model result"}
//                     </h3>

//                     {activeResult.type === "audio" ? (
//                       <>
//                         <p className="text-sm leading-7 text-slate-600">
//                           {activeResult.data.transcript}
//                         </p>

//                         {activeResult.data.translation && (
//                           <div className="border-t border-slate-300 pt-4">
//                             <p className="mb-2 text-xs font-semibold text-blue-600">
//                               Spanish translation
//                             </p>

//                             <p className="text-base font-medium text-[#142039]">
//                               {activeResult.data.translation}
//                             </p>
//                           </div>
//                         )}
//                       </>
//                     ) : (
//                       <p className="text-lg leading-8 text-slate-700">
//                         {activeResult.data.text}
//                       </p>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* TIPS */}
//             <AnimatePresence mode="wait">
//               {showVisionTip && (
//                 <motion.div
//                   key="vision-tip"
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="mb-4 overflow-hidden"
//                 >
//                   <p className="rounded-xl bg-blue-50 p-3 text-xs leading-5 text-blue-700">
//                     Make sure your surroundings are well lit and your camera
//                     is positioned clearly.
//                   </p>
//                 </motion.div>
//               )}

//               {showAudioTip && (
//                 <motion.div
//                   key="audio-tip"
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   className="mb-4 overflow-hidden"
//                 >
//                   <p className="rounded-xl bg-purple-50 p-3 text-xs leading-5 text-purple-700">
//                     Speak in English. Speech transcription and Spanish
//                     translation will happen automatically.
//                   </p>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* ACTIONS */}
//             <div className="space-y-3">

//               <button
//                 onClick={handleAnalyzeScene}
//                 disabled={loading || !active}
//                 className="flex w-full items-center justify-between rounded-full bg-[#142039] px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 Analyze Scene
//                 <span className="text-lg">↗</span>
//               </button>

//               <button
//                 onClick={isRecording ? stopRecording : startRecording}
//                 disabled={(loading && !isRecording) || !active}
//                 className={`flex w-full items-center justify-between rounded-full border px-6 py-4 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 ${
//                   isRecording
//                     ? "border-red-300 bg-red-50 text-red-600"
//                     : "border-slate-200 bg-white text-[#142039] hover:border-blue-400 hover:text-blue-700"
//                 }`}
//               >
//                 {isRecording ? "Stop Listening" : "Start Listening"}

//                 <span className="text-lg">
//                   {isRecording ? "■" : "◉"}
//                 </span>
//               </button>

//               <button
//                 onClick={handleCustomModel}
//                 disabled={loading || !active}
//                 className="flex w-full items-center justify-between rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-[#142039] transition-all duration-300 hover:border-blue-400 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
//               >
//                 Custom Model
//                 <span className="text-lg">↗</span>
//               </button>
//             </div>

//             {/* ERROR */}
//             <AnimatePresence>
//               {error && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="mt-4 flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-3"
//                 >
//                   <span className="text-xs text-red-600">
//                     {error}
//                   </span>

//                   <button
//                     onClick={() => setError(null)}
//                     className="ml-3 text-red-600"
//                   >
//                     ×
//                   </button>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">
//               This interactive demo uses limited model capabilities.
//             </p>
//           </motion.div>
//         </div>

//         {/* FOOTER */}
//         <div className="mt-8 flex items-center justify-between border-t border-slate-300/60 pt-5">
//           <span className="text-xs font-semibold tracking-tight text-slate-500">
//             AUGEN.
//           </span>

//           <span className="text-xs text-slate-400">
//             Experience a different perspective.
//           </span>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default DemoSession;
