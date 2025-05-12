<!-- src/views/GraphPredictorPage.vue -->
<template>
    <MainLayout>
        <HeroSection class="page-title-hero"
                     title="Graph Predictor AI"
                     subtitle="Upload a graph image or use your camera to derive equations and make predictions."
                     bgShape="none" />

        <section class="section graph-predictor-section">
            <div class="container predictor-container">

                <!-- Input Mode Selection -->
                <div class="input-mode-selector">
                    <button @click="setInputMode('image')" :class="{ active: inputMode === 'image' }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        Upload Image
                    </button>
                    <button @click="setInputMode('video')" :class="{ active: inputMode === 'video' }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
                        Use Camera
                    </button>
                </div>

                <div class="predictor-main-area">
                    <!-- Input Area -->
                    <div class="input-area">
                        <div v-if="inputMode === 'image'" class="image-upload-section">
                            <h4>Upload Graph Image</h4>
                            <input type="file" @change="handleImageUpload" accept="image/*" ref="imageUploader" class="file-input-styled" id="graphImageUpload"/>
                            <label for="graphImageUpload" class="btn btn-secondary file-upload-label">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                Choose Image
                            </label>
                            <div v-if="uploadedImageUrl" class="image-preview-container">
                                <img :src="uploadedImageUrl" alt="Uploaded Graph Preview" class="image-preview" />
                                <button @click="removeImage" class="btn-remove-image" title="Remove image">×</button>
                            </div>
                            <small v-if="!uploadedImageUrl">Supports JPG, PNG, GIF. Max 5MB.</small>
                        </div>

                        <div v-if="inputMode === 'video'" class="video-capture-section">
                            <h4>Use Live Camera Feed</h4>
                            <div class="video-feed-container">
                                <video ref="videoPlayer" autoplay playsinline class="video-feed" :class="{'active-feed': isCameraActive}"></video>
                                <canvas ref="videoCanvas" style="display:none;"></canvas>
                                <div v-if="!isCameraActive && !cameraError" class="video-placeholder">Camera feed will appear here.</div>
                                <div v-if="cameraError" class="error-message camera-error">{{ cameraError }}</div>
                            </div>
                            <div class="video-controls">
                                <button v-if="!isCameraActive" @click="startCamera" class="btn btn-secondary">Start Camera</button>
                                <button v-if="isCameraActive" @click="stopCamera" class="btn btn-danger">Stop Camera</button>
                                <button v-if="isCameraActive" @click="captureFrameAndProcess" class="btn btn-primary" :disabled="isProcessing">
                                    Capture & Analyze Frame
                                </button>
                            </div>
                        </div>

                        <button v-if="inputMode === 'image' && uploadedImageUrl" @click="processInput" class="btn btn-primary btn-process animate-pulse-grow" :disabled="isProcessing">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
                            {{ isProcessing ? 'Analyzing...' : 'Analyze Graph Image' }}
                        </button>
                         <small class="help-text">Ensure the graph is clear, well-lit, and axes are visible for best results.</small>
                    </div>

                    <!-- Output Area -->
                    <div class="output-area">
                        <h4>Analysis Results</h4>
                        <div v-if="isProcessing" class="processing-indicator">
                            <div class="spinner"></div>
                            <p>AI is analyzing the graph, please wait...</p>
                        </div>

                        <div v-if="!isProcessing && derivedEquation" class="results-display">
                            <div class="result-item equation-result">
                                <label>Derived Equation:</label>
                                <pre class="equation-text">{{ derivedEquation }}</pre>
                            </div>

                            <div class="result-item prediction-input-section">
                                <label for="predictX">Predict Y for X =</label>
                                <div class="prediction-form">
                                    <input type="number" id="predictX" v-model.number="predictionInputX" placeholder="Enter X value" />
                                    <button @click="makePrediction" class="btn btn-secondary btn-small" :disabled="!predictionInputXIsValid">Predict</button>
                                </div>
                            </div>

                            <div v-if="predictedValueY !== null" class="result-item prediction-output">
                                <label>Predicted Y Value:</label>
                                <p class="predicted-y-value">{{ predictedValueY }}</p>
                            </div>
                             <div class="result-item chart-output-placeholder">
                                <label>Visualized Equation (Placeholder):</label>
                                <div class="chart-placeholder">Graph rendering of derived equation</div>
                            </div>
                        </div>
                        <p v-if="!isProcessing && !derivedEquation && analysisAttempted" class="no-results-message">
                            Could not derive an equation from the provided input. Please try a clearer image or different graph.
                        </p>
                        <p v-if="!isProcessing && !derivedEquation && !analysisAttempted" class="no-results-message">
                            Upload an image or capture a frame to see results.
                        </p>
                        <div v-if="errorMessage" class="error-message analysis-error">{{ errorMessage }}</div>
                    </div>
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import HeroSection from '../components/HeroSection.vue';
import { ref, computed, onUnmounted, nextTick } from 'vue';

export default {
    name: 'GraphPredictorPage',
    components: {
        MainLayout,
        HeroSection
    },
    setup() {
        const inputMode = ref('image'); // 'image' or 'video'
        const uploadedImageFile = ref(null);
        const uploadedImageUrl = ref(null);
        const imageUploader = ref(null); // Ref for file input

        const videoPlayer = ref(null);
        const videoCanvas = ref(null);
        const videoStream = ref(null);
        const isCameraActive = ref(false);
        const cameraError = ref('');

        const isProcessing = ref(false);
        const analysisAttempted = ref(false);
        const derivedEquation = ref(''); // e.g., "y = 2.5x + 1.3"
        const predictionInputX = ref(null);
        const predictedValueY = ref(null);
        const errorMessage = ref('');

        const setInputMode = (mode) => {
            inputMode.value = mode;
            errorMessage.value = ''; // Clear errors when switching mode
            if (mode === 'image' && isCameraActive.value) {
                stopCamera();
            } else if (mode === 'video' && uploadedImageUrl.value) {
                removeImage();
            }
        };

        const handleImageUpload = (event) => {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    errorMessage.value = "File size exceeds 5MB limit.";
                    return;
                }
                uploadedImageFile.value = file;
                uploadedImageUrl.value = URL.createObjectURL(file);
                errorMessage.value = '';
                derivedEquation.value = ''; // Clear previous results
                predictedValueY.value = null;
                analysisAttempted.value = false;
            } else {
                errorMessage.value = "Please upload a valid image file (JPG, PNG, GIF).";
            }
        };

        const removeImage = () => {
            uploadedImageFile.value = null;
            if (uploadedImageUrl.value) {
                URL.revokeObjectURL(uploadedImageUrl.value);
            }
            uploadedImageUrl.value = null;
            if(imageUploader.value) imageUploader.value.value = ''; // Reset file input
        };

        const startCamera = async () => {
            cameraError.value = '';
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                    videoStream.value = stream;
                    if (videoPlayer.value) {
                        videoPlayer.value.srcObject = stream;
                        isCameraActive.value = true;
                    }
                } catch (err) {
                    console.error("Error accessing camera:", err);
                    cameraError.value = "Could not access camera. Please ensure permissions are granted and no other app is using it.";
                    isCameraActive.value = false;
                }
            } else {
                cameraError.value = "Camera access is not supported by your browser.";
            }
        };

        const stopCamera = () => {
            if (videoStream.value) {
                videoStream.value.getTracks().forEach(track => track.stop());
            }
            if (videoPlayer.value) {
                videoPlayer.value.srcObject = null;
            }
            isCameraActive.value = false;
            videoStream.value = null;
        };

        const captureFrame = () => {
            if (!isCameraActive.value || !videoPlayer.value || !videoCanvas.value) return null;
            const canvas = videoCanvas.value;
            const video = videoPlayer.value;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL('image/png'); // Returns a base64 encoded PNG
        };


        const processInput = async () => {
            if (inputMode.value === 'image' && !uploadedImageFile.value) {
                errorMessage.value = "Please upload an image first.";
                return;
            }
            if (inputMode.value === 'video' && !isCameraActive.value) {
                errorMessage.value = "Please start the camera and capture a frame.";
                return;
            }

            isProcessing.value = true;
            analysisAttempted.value = true;
            derivedEquation.value = '';
            predictedValueY.value = null;
            errorMessage.value = '';

            // SIMULATE AI PROCESSING
            console.log("Simulating AI graph analysis...");
            // In a real app, you'd send uploadedImageFile.value or capturedFrameDataURL to your backend API
            await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

            // Simulate some possible outcomes
            const outcome = Math.random();
            if (outcome < 0.7) { // Successful analysis
                const slope = (Math.random() * 5 + 0.5).toFixed(2);
                const intercept = (Math.random() * 10 - 5).toFixed(2);
                const isLinear = Math.random() < 0.6;
                if (isLinear) {
                     derivedEquation.value = `y = ${slope}x ${intercept >= 0 ? '+': '-'} ${Math.abs(intercept)}`;
                } else {
                     derivedEquation.value = `y = ${slope}x^2 ${intercept >= 0 ? '+': '-'} ${Math.abs(intercept)}x + ${(Math.random()*3).toFixed(2)}`;
                }
            } else if (outcome < 0.9) { // Could not determine
                errorMessage.value = "AI could not confidently determine an equation from the input. Try a clearer image.";
            } else { // Error
                errorMessage.value = "An unexpected error occurred during analysis.";
            }
            isProcessing.value = false;
        };

        const captureFrameAndProcess = () => {
            const frameDataURL = captureFrame(); // This is a base64 string
            if (frameDataURL) {
                console.log("Frame captured, proceeding to analysis (simulation)...");
                // For simulation, we don't actually need to *use* frameDataURL here,
                // but in a real app, you'd send this data for processing.
                // To show something, we can temporarily set it as the uploaded image URL for visual feedback
                uploadedImageUrl.value = frameDataURL; // For preview if desired
                uploadedImageFile.value = null; // Since it's not a File object
                processInput(); // Then call the main processing logic
            } else {
                errorMessage.value = "Could not capture frame from video."
            }
        };


        const makePrediction = () => {
            if (!derivedEquation.value || predictionInputX.value === null || isNaN(parseFloat(predictionInputX.value))) {
                predictedValueY.value = "Invalid input or no equation.";
                return;
            }
            // VERY SIMPLISTIC EVALUATION - DO NOT USE FOR COMPLEX/UNTRUSTED EQUATIONS
            // This is a huge security risk if equation comes from an untrusted source.
            // A proper math parser/evaluator library is needed for a real app.
            try {
                let eq = derivedEquation.value.replace(/y\s*=/i, '').trim(); // Remove "y ="
                eq = eq.replace(/x/g, `(${predictionInputX.value})`);       // Replace x with (value)
                // Attempt to evaluate using Function constructor (safer than direct eval)
                const result = new Function(`return ${eq}`)();
                predictedValueY.value = parseFloat(result.toFixed(4));
            } catch (e) {
                console.error("Error evaluating equation:", e);
                predictedValueY.value = "Error in prediction";
                errorMessage.value = "Could not predict: Equation format might be too complex for this demo."
            }
        };

        const predictionInputXIsValid = computed(() => {
            return predictionInputX.value !== null && predictionInputX.value !== '' && !isNaN(parseFloat(predictionInputX.value));
        });


        onUnmounted(() => {
            stopCamera(); // Ensure camera is off when component is destroyed
            if (uploadedImageUrl.value) {
                URL.revokeObjectURL(uploadedImageUrl.value);
            }
        });


        return {
            inputMode, setInputMode,
            uploadedImageUrl, handleImageUpload, removeImage, imageUploader,
            videoPlayer, videoCanvas, isCameraActive, startCamera, stopCamera, cameraError, captureFrameAndProcess,
            isProcessing, analysisAttempted, derivedEquation,
            predictionInputX, predictedValueY, makePrediction, predictionInputXIsValid,
            errorMessage,
            processInput // Expose the combined processing function
        };
    }
};
</script>

<style scoped>
/* --- PAGE TITLE HERO (Less prominent) --- */
.page-title-hero {
    padding-top: 1rem !important;
    padding-bottom: 0.5rem !important;
    margin-bottom: 1.5rem !important; /* Reduced margin */
    text-align: center;
}
:deep(.page-title-hero .hero-title) { /* Using :deep to target child component style */
    font-size: 2rem !important; /* Smaller */
    margin-bottom: 0.25rem !important;
}
:deep(.page-title-hero .hero-subtitle) {
    font-size: 1rem !important;
    margin-bottom: 0 !important;
    opacity: 0.8;
}

/* --- MAIN SECTION & CONTAINER --- */
.graph-predictor-section {
    padding: 1rem 0 3rem 0; /* Reduced top padding */
}
.predictor-container {
    max-width: 1000px; /* Adjusted max-width */
    margin: 0 auto;
    padding: 0 1rem; /* Responsive padding */
}

/* --- INPUT MODE SELECTOR --- */
.input-mode-selector {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 0.5rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}
.input-mode-selector button {
    flex: 1;
    padding: 0.7rem 1rem;
    border: none;
    background-color: transparent;
    color: var(--color-text);
    opacity: 0.7;
    font-weight: 500;
    cursor: pointer;
    border-radius: 6px;
    transition: background-color 0.3s, opacity 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.9rem;
}
.input-mode-selector button.active {
    background-color: var(--color-primary);
    color: var(--color-background);
    opacity: 1;
}
.input-mode-selector button:hover:not(.active) {
    background-color: rgba(255, 255, 255, 0.1);
    opacity: 0.9;
}

/* --- PREDICTOR MAIN AREA (Flex Layout) --- */
.predictor-main-area {
    display: flex;
    flex-direction: column; /* Stack on mobile */
    gap: 2rem;
    background-color: rgba(255, 255, 255, 0.03);
    padding: 1.5rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.input-area, .output-area {
    flex: 1; /* Each takes half space on desktop */
    padding: 1rem;
    border-radius: 8px;
    background-color: rgba(255,255,255,0.02);
}
.input-area h4, .output-area h4 {
    font-size: 1.2rem;
    color: var(--color-secondary);
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

/* --- IMAGE UPLOAD --- */
.image-upload-section .file-input-styled {
    display: none; /* Hide default input */
}
.file-upload-label { /* Style the label like a button */
    display: inline-flex; /* Use inline-flex for icon alignment */
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
    /* Your .btn .btn-secondary styles from global should apply */
}
.image-preview-container {
    position: relative;
    max-width: 100%;
    margin-bottom: 1rem;
    border: 2px dashed rgba(255,255,255,0.2);
    padding: 0.5rem;
    border-radius: 6px;
    min-height: 150px; /* Min height for drop area feel */
    display: flex;
    align-items: center;
    justify-content: center;
}
.image-preview {
    max-width: 100%;
    max-height: 300px;
    border-radius: 4px;
    object-fit: contain;
}
.btn-remove-image {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(0,0,0,0.6);
    color: white;
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
}
.btn-remove-image:hover { opacity: 1; }
.image-upload-section small { font-size: 0.8rem; opacity: 0.7; display: block; }

/* --- VIDEO CAPTURE --- */
.video-capture-section {}
.video-feed-container {
    position: relative;
    background-color: #000;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 1rem;
    border: 1px solid rgba(255,255,255,0.1);
    min-height: 200px; /* Min height for video area */
    display: flex;
    align-items: center;
    justify-content: center;
}
.video-feed {
    display: block;
    width: 100%;
    max-height: 350px;
    object-fit: cover; /* Or contain, depending on preference */
    border-radius: 6px;
}
.video-feed:not(.active-feed) { display: none; }
.video-placeholder { color: #666; font-style: italic; }
.camera-error { padding: 1rem; text-align: center;}

.video-controls {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap; /* Allow buttons to wrap on small screens */
}
.video-controls .btn { flex-grow: 1; } /* Buttons take equal space */
@media (min-width: 500px) {
    .video-controls .btn { flex-grow: 0; } /* Buttons take natural width */
}


/* --- PROCESS BUTTON --- */
.btn-process {
    width: 100%;
    padding: 0.9rem 1.5rem;
    font-size: 1.1rem;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
}
.animate-pulse-grow:not(:disabled):hover {
    animation: pulse-grow 1.5s infinite ease-in-out;
}
@keyframes pulse-grow {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.03); }
}
.help-text {
    font-size: 0.8rem;
    opacity: 0.6;
    text-align: center;
    display: block;
    margin-top: 1rem;
}


/* --- OUTPUT AREA --- */
.processing-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    min-height: 200px;
}
.processing-indicator .spinner {
    width: 40px; height: 40px;
    border: 4px solid rgba(255,255,255,0.2);
    border-radius: 50%; border-top-color: var(--color-primary);
    animation: spin 1s linear infinite; margin-bottom: 1rem;
}
@keyframes spin { to { transform: rotate(360deg); } }
.processing-indicator p { font-size: 1rem; opacity: 0.8; }

.results-display { display: flex; flex-direction: column; gap: 1.5rem; }
.result-item {
    background-color: rgba(255,255,255,0.05);
    padding: 1rem;
    border-radius: 6px;
}
.result-item label {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.7;
    margin-bottom: 0.5rem;
}
.equation-text {
    background-color: rgba(0,0,0,0.2);
    padding: 0.8rem;
    border-radius: 4px;
    font-family: monospace;
    font-size: 1.1rem;
    color: var(--color-accent-1);
    white-space: pre-wrap;
    word-break: break-all;
}
.prediction-form {
    display: flex;
    gap: 0.8rem;
    align-items: center;
}
.prediction-form input[type="number"] {
    flex-grow: 1;
    padding: 0.7rem;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,0.2);
    background-color: rgba(255,255,255,0.1);
    color: var(--color-text);
    font-size: 1rem;
}
.prediction-form .btn-small { padding: 0.7rem 1rem; }

.predicted-y-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--color-primary);
    margin: 0;
}
.chart-output-placeholder .chart-placeholder {
    min-height: 180px; background-color: rgba(0, 0, 0, 0.2); border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255, 255, 255, 0.4); font-style: italic; font-size: 0.9rem;
    border: 1px dashed rgba(255,255,255,0.1);
}

.no-results-message { text-align: center; opacity: 0.7; padding: 2rem 0; }
.error-message {
    background-color: rgba(220, 38, 38, 0.1); color: #ef4444;
    padding: 0.8rem; border-radius: 5px; font-size: 0.9rem;
    border: 1px solid rgba(220, 38, 38, 0.2); margin-top: 1rem;
}
.camera-error { margin: 0; /* Remove margin if inside video-feed-container */ }
.analysis-error { margin-top: 0; /* No top margin if it's the only thing in output area */ }


/* --- RESPONSIVE LAYOUT --- */
@media (min-width: 768px) {
    .predictor-main-area {
        flex-direction: row; /* Side-by-side on larger screens */
    }
    .input-area, .output-area {
        padding: 1.5rem; /* Slightly more padding on desktop */
    }
    .video-controls {
        flex-wrap: nowrap; /* Prevent wrapping on larger screens if space */
    }
    .btn-process {
        max-width: 300px; /* Limit width of process button */
        margin-left: auto;
        margin-right: auto;
    }
}


:root { /* Ensure this is globally defined or here */
    --color-primary-rgb: 229, 170, 132; /* Your primary color's RGB values */
}
</style>