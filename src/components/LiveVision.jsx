
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const INFERENCE_INTERVAL = 1800;

function getModelOutput(data) {
  if (typeof data === "string") return data;

  const possibleResults = [
    "prediction",
    "label",
    "result",
    "output",
    "detections",
    "objects",
    "message",
  ];

  for (const key of possibleResults) {
    if (data?.[key] !== undefined && data[key] !== null) {
      const value = data[key];
      return typeof value === "string"
        ? value
        : JSON.stringify(value, null, 2);
    }
  }

  return JSON.stringify(data, null, 2);
}

export default function LiveVision() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const busyRef = useRef(false);

  const [isRunning, setIsRunning] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Camera is offline");

  const analyzeFrame = useCallback(async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || busyRef.current) return;
    if (video.readyState < 2 || !video.videoWidth) return;

    busyRef.current = true;
    setIsProcessing(true);

    try {
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", 0.85);
      });

      if (!imageBlob) {
        throw new Error("Could not capture camera frame.");
      }

      const formData = new FormData();
      formData.append("image", imageBlob, "frame.jpg");

      const response = await fetch(`${API_BASE_URL}/api/infer`, {
        method: "POST",
        body: formData,
      });

      const rawText = await response.text();

      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        data = { message: rawText };
      }

      if (!response.ok) {
        throw new Error(
          data?.detail ||
          data?.error ||
          data?.message ||
          `Inference failed: ${response.status}`
        );
      }

      setPrediction(getModelOutput(data));
      setError("");
      setStatus("AI model is running");
    } catch (err) {
      console.error("Inference error:", err);
      setError(err.message || "Something went wrong during inference.");
      setStatus("Inference error");
    } finally {
      busyRef.current = false;
      setIsProcessing(false);
    }
  }, []);

  const startCamera = async () => {
    setIsStarting(true);
    setError("");
    setPrediction("");

    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera access is unavailable. Open this page using HTTPS or localhost."
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (!videoRef.current) {
        throw new Error("Camera preview could not be initialized.");
      }

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setIsRunning(true);
      setStatus("Camera connected");
    } catch (err) {
      console.error("Camera error:", err);
      setError(err.message || "Unable to access the camera.");
      setStatus("Camera unavailable");

      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    } finally {
      setIsStarting(false);
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsRunning(false);
    setIsProcessing(false);
    setStatus("Camera is offline");
  };

  useEffect(() => {
    if (!isRunning) return;

    // Analyze immediately, then continue at the configured interval.
    analyzeFrame();

    const interval = setInterval(() => {
      analyzeFrame();
    }, INFERENCE_INTERVAL);

    return () => clearInterval(interval);
  }, [isRunning, analyzeFrame]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <section
      id="live-vision"
      data-scroll-section
      className="relative isolate overflow-hidden px-5 py-24 md:px-10 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#080d19] via-[#263f70] via-[42%] to-[#e2edff]" />

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_48%_65%,rgba(255,255,255,0.35),transparent_55%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <p className="mb-5 text-xs font-semibold tracking-[0.35em] text-blue-200 uppercase">
            AUGEN INTELLIGENCE / 001
          </p>

          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-7xl">
            SEE THE WORLD.
            <br />
            <span className="text-[#b9d5ff]">UNDERSTAND IT.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-blue-100/80 md:text-base">
            Experience the vision system behind AUGEN. Activate your camera
            and let our AI model interpret what it sees.
          </p>
        </motion.div>

        {/* Main interface */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid overflow-hidden rounded-[28px] border border-white/40 bg-white/20 shadow-[0_30px_100px_rgba(8,13,25,0.2)] backdrop-blur-xl lg:grid-cols-[1.5fr_0.8fr]"
        >
          {/* Camera preview */}
          <div className="relative min-h-[320px] bg-[#080d19] p-3 sm:p-5">
            <div className="relative h-full min-h-[300px] overflow-hidden rounded-2xl bg-[#111b2d]">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={`absolute inset-0 h-full w-full object-cover ${
                  isRunning ? "opacity-100" : "opacity-0"
                }`}
              />

              {!isRunning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-blue-200/30 bg-blue-300/10">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-7 w-7 text-blue-200"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path
                        d="M14 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9"
                        strokeLinecap="round"
                      />
                      <path
                        d="m14 5 5 4 2-2-5-4-2 2Z"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>

                  <p className="text-lg font-medium text-white">
                    Camera not connected
                  </p>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-blue-100/60">
                    Start the camera to activate live AI vision.
                  </p>
                </div>
              )}

              {/* Live indicator */}
              {isRunning && (
                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-white">
                    LIVE
                  </span>
                </div>
              )}

              {/* Processing indicator */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3 py-2 backdrop-blur-md"
                  >
                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-300" />
                    <span className="text-xs text-white">
                      Analyzing frame...
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Corner details */}
              {isRunning && (
                <>
                  <div className="pointer-events-none absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2 border-blue-200/80" />
                  <div className="pointer-events-none absolute right-4 top-4 h-7 w-7 border-r-2 border-t-2 border-blue-200/80" />
                  <div className="pointer-events-none absolute bottom-4 left-4 h-7 w-7 border-b-2 border-l-2 border-blue-200/80" />
                  <div className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 border-b-2 border-r-2 border-blue-200/80" />
                </>
              )}
            </div>
          </div>

          {/* Controls and model output */}
          <div className="flex flex-col bg-white/75 p-6 text-[#10192e] sm:p-8">
            <div>
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#64799f] uppercase">
                Vision Interface
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <h3 className="text-2xl font-semibold tracking-tight">
                  Live Analysis
                </h3>

                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isRunning ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>

              <p className="mt-2 text-sm text-[#64799f]">{status}</p>
            </div>

            {/* Camera buttons */}
            <div className="mt-7 flex gap-3">
              {!isRunning ? (
                <button
                  onClick={startCamera}
                  disabled={isStarting}
                  className="flex-1 rounded-xl bg-[#10192e] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#263f70] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isStarting ? "Connecting..." : "Activate Camera"}
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="flex-1 rounded-xl bg-red-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Stop Camera
                </button>
              )}
            </div>

            {/* Output */}
            <div className="mt-8 flex flex-1 flex-col">
              <div className="flex items-center justify-between border-b border-[#10192e]/10 pb-3">
                <p className="text-[10px] font-bold tracking-[0.2em] text-[#64799f] uppercase">
                  Model Output
                </p>

                <span className="text-[10px] tracking-wider text-[#8494ad]">
                  AUGEN AI
                </span>
              </div>

              <div className="mt-4 min-h-[150px] flex-1 rounded-xl border border-[#263f70]/10 bg-white/60 p-4">
                {error ? (
                  <p className="whitespace-pre-wrap text-sm leading-6 text-red-600">
                    {error}
                  </p>
                ) : prediction ? (
                  <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-6 text-[#263f70]">
                    {prediction}
                  </pre>
                ) : (
                  <div className="flex h-full min-h-[110px] items-center justify-center text-center">
                    <p className="max-w-xs text-sm leading-6 text-[#8494ad]">
                      {isRunning
                        ? "Waiting for the first model prediction..."
                        : "Your model's predictions will appear here."}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between text-[10px] tracking-wider text-[#8494ad]">
              <span>FRAME-BASED INFERENCE</span>
              <span>{isProcessing ? "PROCESSING" : "READY"}</span>
            </div>
          </div>
        </motion.div>

        <p className="mt-6 text-center text-xs text-[#263f70]/70">
          Camera frames are sent to your configured inference server.
        </p>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
}
