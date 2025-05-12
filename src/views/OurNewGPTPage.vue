<!-- src/views/OurNewGPTPage.vue -->
<template>
    <MainLayout>
        <div class="aurora-chat-page-layout">
            <!-- Sidebar for Model Selection & Capabilities -->
            <aside class="aurora-sidebar" :class="{ 'is-open': sidebarOpen }">
                <div class="sidebar-toggle-mobile" @click="sidebarOpen = !sidebarOpen">
                    <svg v-if="!sidebarOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>

                <div class="sidebar-content">
                    <div class="sidebar-section">
                        <h4>Select AI Model</h4>
                        <select v-model="selectedModel" class="aurora-select">
                            <option v-for="model in availableModels" :key="model.id" :value="model.id">
                                {{ model.name }}
                            </option>
                        </select>
                    </div>

                    <div class="sidebar-section">
                        <h4>AI Capabilities</h4>
                        <ul class="capabilities-list">
                            <li v-for="cap in capabilities" :key="cap.id">
                                <label :for="cap.id" class="capability-label">
                                    <input type="checkbox" :id="cap.id" v-model="cap.enabled" class="aurora-checkbox">
                                    <span class="checkbox-custom"></span>
                                    {{ cap.label }}
                                </label>
                                <small class="capability-description">{{ cap.description }}</small>
                            </li>
                        </ul>
                    </div>

                     <div class="sidebar-section">
                        <h4>Attached Files ({{ attachedFiles.length }})</h4>
                        <div class="file-upload-sidebar">
                            <label for="file-upload-sidebar-input" class="btn btn-secondary btn-small file-upload-btn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                Add Files
                            </label>
                            <input type="file" id="file-upload-sidebar-input" @change="handleFileUpload" multiple style="display: none;" />
                        </div>
                        <ul v-if="attachedFiles.length > 0" class="attached-files-list">
                            <li v-for="(file, index) in attachedFiles" :key="index">
                                <span class="file-name" :title="file.name">{{ truncateFileName(file.name) }}</span>
                                <button @click="removeFile(index)" class="btn-remove-file" title="Remove file">×</button>
                            </li>
                        </ul>
                        <p v-else class="no-files-message">No files attached yet.</p>
                    </div>
                </div>
            </aside>

            <!-- Main Chat Content -->
            <main class="aurora-main-content">
                <HeroSection class="page-title-hero"
                             title="Meet 'Aurora'"
                             subtitle="Next-Gen AI for Conversation & Tasks"
                             bgShape="none" />

                <section class="section chat-interface-section">
                    <div class="container-chat">
                        <div class="chat-container">
                            <div class="chat-header">
                                <h3>Chat with {{ currentModelName }}</h3>
                                <div class="active-capabilities">
                                    Active: {{ activeCapabilitiesCount }} capabilities
                                </div>
                            </div>

                            <div class="chat-messages-area" ref="chatMessagesArea">
                                <div v-for="(message, index) in chatMessages" :key="index" class="chat-message"
                                    :class="{ 'user-message': message.role === 'user', 'aurora-message': message.role === 'aurora' }">
                                    <div class="message-avatar" :class="message.role">
                                        {{ message.role === 'user' ? 'You' : 'AI' }}
                                    </div>
                                    <div class="message-content">
                                        <p v-html="formatMessage(message.content)"></p>
                                        <div v-if="message.files && message.files.length > 0" class="message-files">
                                            <strong>Attached:</strong>
                                            <span v-for="file in message.files" :key="file.name" class="file-tag">{{ truncateFileName(file.name, 15) }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="isTyping" class="chat-message aurora-message typing-indicator">
                                    <div class="message-avatar aurora">AI</div>
                                    <div class="message-content">
                                        <span class="dot"></span><span class="dot"></span><span class="dot"></span>
                                    </div>
                                </div>
                            </div>

                            <form @submit.prevent="sendMessage" class="chat-input-form">
                                <button type="button" @click="triggerFileInput" class="btn-icon attach-btn" title="Attach files">
                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
                                </button>
                                <input type="file" ref="fileInput" @change="handleFileUpload" multiple style="display: none;" />

                                <textarea v-model="userInput" @keydown.enter.exact.prevent="sendMessage"
                                    placeholder="Type your message to Aurora..." rows="1" class="chat-input"
                                    :disabled="isTyping" ref="chatInputArea"></textarea>
                                <button type="submit" class="btn btn-primary send-btn"
                                    :disabled="isTyping || (!userInput.trim() && attachedFiles.length === 0)">
                                    Send
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                </button>
                            </form>
                            <div class="example-prompts">
                                <button @click="tryExample('Tell me a fun fact about space.')">Try: "Fun fact about space"</button>
                                <button @click="tryExample('Explain quantum entanglement in simple terms.')">Try: "Explain quantum entanglement"</button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import HeroSection from '../components/HeroSection.vue';
import { ref, nextTick, computed, watch } from 'vue';

export default {
    name: 'OurNewGPTPage',
    components: {
        MainLayout,
        HeroSection
    },
    setup() {
        const userInput = ref('');
        const chatMessages = ref([
            { role: 'aurora', content: "Hello! I'm Aurora. Select my capabilities and let's chat. You can also attach files." }
        ]);
        const isTyping = ref(false);
        const chatMessagesArea = ref(null);
        const chatInputArea = ref(null); // Ref for textarea
        const sidebarOpen = ref(false); // For mobile sidebar toggle

        const availableModels = ref([
            { id: 'aurora-v1', name: 'Aurora V1 (Balanced)' },
            { id: 'aurora-v2-creative', name: 'Aurora V2 (Creative)' },
            { id: 'aurora-v2-factual', name: 'Aurora V2 (Factual)' },
            { id: 'custom-internal-gpt', name: 'My Custom GPT' }
        ]);
        const selectedModel = ref('aurora-v1');

        const capabilities = ref([
            { id: 'deepThinking', label: 'Deep Thinking', enabled: true, description: 'Allows for more complex thought processes.' },
            { id: 'reasoning', label: 'Logical Reasoning', enabled: true, description: 'Enables step-by-step logical deduction.' },
            { id: 'dataAnalysis', label: 'Data Analysis', enabled: false, description: 'Processes and interprets uploaded data.' },
            { id: 'visualizeIdea', label: 'Visualize Concepts', enabled: false, description: 'Attempts to describe or generate visual ideas (text-based).'},
            { id: 'webSearch', label: 'Web Search', enabled: false, description: 'Can access and summarize web information.' },
            { id: 'dictate', label: 'Dictation Mode', enabled: false, description: 'Primarily listens and transcribes (conceptual).'},
            { id: 'voiceMode', label: 'Voice Interaction', enabled: false, description: 'Enables voice input/output (conceptual).'}
        ]);

        const attachedFiles = ref([]);
        const fileInput = ref(null); // Ref for hidden file input

        const currentModelName = computed(() => {
            const model = availableModels.value.find(m => m.id === selectedModel.value);
            return model ? model.name : 'AI';
        });

        const activeCapabilitiesCount = computed(() => {
            return capabilities.value.filter(c => c.enabled).length;
        });

        const scrollToBottom = () => {
            nextTick(() => {
                if (chatMessagesArea.value) {
                    chatMessagesArea.value.scrollTop = chatMessagesArea.value.scrollHeight;
                }
            });
        };

        const adjustTextareaHeight = () => {
            nextTick(() => {
                if (chatInputArea.value) {
                    chatInputArea.value.style.height = 'auto'; // Reset height
                    chatInputArea.value.style.height = `${chatInputArea.value.scrollHeight}px`;
                }
            });
        };

        watch(userInput, adjustTextareaHeight);


        const sendMessage = async () => {
            const messageContent = userInput.value.trim();
            if (!messageContent && attachedFiles.value.length === 0) return;

            const userMessage = {
                role: 'user',
                content: messageContent,
                files: [...attachedFiles.value] // Send a copy of current files
            };
            chatMessages.value.push(userMessage);

            userInput.value = '';
            attachedFiles.value = []; // Clear files after sending
            scrollToBottom();
            adjustTextareaHeight();
            isTyping.value = true;

            console.log("Sending to model:", selectedModel.value);
            console.log("Enabled capabilities:", capabilities.value.filter(c => c.enabled).map(c => c.id));
            console.log("Attached files with message:", userMessage.files.map(f => f.name));


            await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

            let aiResponse = `Simulated response from ${currentModelName.value}. `;
            if(userMessage.files.length > 0) {
                aiResponse += `I've "received" ${userMessage.files.length} file(s): ${userMessage.files.map(f => f.name).join(', ')}. `;
            }
            if(capabilities.value.find(c => c.id === 'dataAnalysis' && c.enabled) && userMessage.files.length > 0) {
                aiResponse += "I would analyze these files now. ";
            }
            if(capabilities.value.find(c => c.id === 'webSearch' && c.enabled) && messageContent.toLowerCase().includes("search for")) {
                aiResponse += "I'd perform a web search for that. ";
            }
            aiResponse += `You said: "${messageContent}".`;


            chatMessages.value.push({ role: 'aurora', content: aiResponse });
            isTyping.value = false;
            scrollToBottom();
        };

        const tryExample = (prompt) => {
            userInput.value = prompt;
            // sendMessage(); // User should press send or enter
        };

        const formatMessage = (text) => {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .replace(/`(.*?)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>');
        };

        const triggerFileInput = () => {
            if (fileInput.value) {
                fileInput.value.click();
            }
        };

        const handleFileUpload = (event) => {
            const files = event.target.files;
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    // Check for duplicates by name before adding
                    if (!attachedFiles.value.some(existingFile => existingFile.name === files[i].name)) {
                         if (attachedFiles.value.length < 5) { // Limit number of files
                            attachedFiles.value.push(files[i]);
                        } else {
                            alert("You can attach a maximum of 5 files.");
                            break;
                        }
                    }
                }
            }
            // Reset file input to allow selecting the same file again if removed
            if (fileInput.value) fileInput.value.value = '';
            if (event.target.id === 'file-upload-sidebar-input' && event.target) { // For sidebar input
                event.target.value = '';
            }
        };

        const removeFile = (index) => {
            attachedFiles.value.splice(index, 1);
        };

        const truncateFileName = (name, maxLength = 20) => {
            if (name.length <= maxLength) return name;
            const ext = name.substring(name.lastIndexOf('.'));
            const nameWithoutExt = name.substring(0, name.lastIndexOf('.'));
            return nameWithoutExt.substring(0, maxLength - ext.length - 3) + '...' + ext;
        };


        return {
            userInput, chatMessages, isTyping, sendMessage, chatMessagesArea, chatInputArea,
            tryExample, formatMessage,
            sidebarOpen, availableModels, selectedModel, capabilities, currentModelName, activeCapabilitiesCount,
            attachedFiles, fileInput, triggerFileInput, handleFileUpload, removeFile, truncateFileName
        };
    }
};
</script>

<style scoped>
/* --- GLOBAL RESETS & FOUNDATIONS --- */
*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0; /* Basic reset, can be adjusted if you have a more specific normalize.css */
    padding: 0; /* Basic reset */
}

html {
    height: 100%;
    scroll-behavior: smooth;
}

body {
    min-height: 100%;
    font-family: sans-serif; /* Fallback, use your project's font */
    /* Assuming these vars are defined globally or in MainLayout */
    /* color: var(--color-text); */
    /* background-color: var(--color-background); */
    line-height: 1.5; /* A good default */
}

/* Ensure your :root variables are defined, e.g., in your main CSS file or App.vue */
:root {
    /* These are examples, use your actual project variables */
    --color-background: #0f172a; /* Example: Slate 900 */
    --color-text: #e2e8f0;       /* Example: Slate 200 */
    --color-primary: #38bdf8;    /* Example: Sky 500 */
    --color-primary-rgb: 56, 189, 248; /* RGB for Sky 500 */
    --color-secondary: #818cf8;  /* Example: Indigo 400 */
    /* Add any other global variables your project uses */
}


/* --- BASE LAYOUT & HERO --- */
.aurora-chat-page-layout {
    display: flex;
    min-height: calc(100vh - 80px); /* Adjust 80px based on your MainLayout's navbar height */
    background-color: var(--color-background);
}

.page-title-hero {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
    margin-bottom: 1rem !important;
    text-align: center;
    flex-shrink: 0; /* Prevent hero from shrinking if content below is too large */
}
:deep(.page-title-hero .hero-title) {
    font-size: 2.2rem !important;
    margin-bottom: 0.5rem !important;
}
:deep(.page-title-hero .hero-subtitle) {
    font-size: 1rem !important;
    margin-bottom: 0 !important;
    opacity: 0.8;
}


/* --- SIDEBAR --- */
.aurora-sidebar {
    width: 280px;
    background: rgba(15, 23, 42, 0.9);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    /* gap: 1.5rem; Replaced by margin on .sidebar-section for better control with overflow */
    height: calc(100vh - 80px); /* Full height below navbar */
    overflow-y: auto;
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
    flex-shrink: 0;
}
.sidebar-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* This is fine here as it's inside the scrollable area */
}

.sidebar-section {
    /* Removed gap from .aurora-sidebar and apply margin here if needed,
       but .sidebar-content with gap is likely better.
       If sections themselves need specific spacing:
       &:not(:last-child) { margin-bottom: 1.5rem; }
    */
}

.sidebar-section h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-secondary);
    margin-bottom: 0.8rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
}

.aurora-select {
    width: 100%;
    padding: 0.7rem 1rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.08);
    color: var(--color-text);
    font-size: 0.9rem;
    outline: none;
}
.aurora-select:focus { border-color: var(--color-primary); }

.capabilities-list {
    list-style: none;
    /* padding: 0; Already reset by global */
    /* margin: 0; Already reset by global */
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}
.capability-label {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    color: var(--color-text);
    cursor: pointer;
    opacity: 0.9;
    transition: opacity 0.2s;
}
.capability-label:hover { opacity: 1; }

.aurora-checkbox {
    opacity: 0;
    width: 0;
    height: 0;
    /* margin-right: 0.7rem; Handled by .checkbox-custom margin */
}
.checkbox-custom {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: inline-block;
    margin-right: 0.7rem;
    position: relative;
    transition: background-color 0.2s, border-color 0.2s;
    flex-shrink: 0; /* Prevent shrinking */
}
.aurora-checkbox:checked + .checkbox-custom {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
}
.aurora-checkbox:checked + .checkbox-custom::after {
    content: '✓';
    position: absolute;
    color: var(--color-background); /* Ensure contrast */
    font-size: 12px;
    font-weight: bold;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.capability-description {
    font-size: 0.75rem;
    opacity: 0.6;
    padding-left: calc(18px + 0.7rem + 0.7rem); /* Align with text after checkbox */
    display: block;
    margin-top: 0.2rem;
    line-height: 1.3;
}

.file-upload-sidebar { margin-bottom: 0.5rem; }
.file-upload-btn { width: 100%; display: flex; justify-content: center; align-items:center; gap: 0.5rem; }
.file-upload-btn svg { stroke-width: 2; }

.attached-files-list {
    list-style: none;
    margin-top: 0.5rem;
    max-height: 150px; /* This is fine, controls scroll within this list */
    overflow-y: auto;
}
.attached-files-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    padding: 0.4rem 0.5rem;
    background-color: rgba(255,255,255,0.05);
    border-radius: 4px;
    margin-bottom: 0.3rem;
}
.file-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(100% - 30px); /* Adjusted for padding and button */
    opacity: 0.8;
}
.btn-remove-file {
    background: none; border: none; color: #f87171; font-size: 1.1rem;
    cursor: pointer; padding: 0 0.3rem; line-height: 1; flex-shrink: 0;
}
.no-files-message { font-size: 0.8rem; opacity: 0.6; text-align: center; margin-top: 0.5rem; }


.sidebar-toggle-mobile {
    display: none;
    position: absolute; /* Relative to .aurora-sidebar */
    top: 1rem;
    right: 1rem;
    z-index: 10; /* Above sidebar content if any overlap */
    background: rgba(var(--color-primary-rgb), 0.2);
    border-radius: 50%;
    padding: 0.5rem;
    cursor: pointer;
    /* Ensure SVGs inside are visible */
}
.sidebar-toggle-mobile svg { stroke: var(--color-primary); display: block; }
/* Note: If this button is for OPENING a closed sidebar, its position inside
   .aurora-sidebar means it will be hidden when the sidebar is translated off-screen.
   This is a structural consideration beyond CSS fixes if it needs to be always visible. */


/* --- MAIN CHAT CONTENT --- */
.aurora-main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 80px); /* Fixed height for the content area */
    overflow: hidden; /* Crucial: Prevents this container from overflowing */
    min-height: 0; /* Added for flex robustness */
}

.chat-interface-section {
    padding: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    min-height: 0; /* Added for flex robustness */
    overflow: hidden; /* Added to contain its children properly */
}

.container-chat {
    width: 100%;
    max-width: 900px;
    margin: 0 auto; /* Centering */
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 1rem 1rem 1rem; /* Top padding removed, bottom padding kept */
    min-height: 0; /* Added for flex robustness */
    /* overflow: hidden; /* Usually not needed here if children are managed */
}

.chat-container {
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    /* min-height: 300px; /* Can be removed if flex-grow is working correctly */
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    min-height: 0; /* CRUCIAL: Allows chat-messages-area to scroll correctly */
    overflow: hidden; /* Ensures children don't break out */
}

.chat-header {
    padding: 0.8rem 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0; /* Prevent shrinking */
}
.chat-header h3 { font-size: 1.1rem; font-weight: 600; color: var(--color-text); margin:0; }
.active-capabilities { font-size: 0.8rem; opacity: 0.7; }


.chat-messages-area {
    flex-grow: 1;
    overflow-y: auto; /* This is correct for scrolling messages */
    padding: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    /* min-height: 0; /* Not typically needed here as it's the primary scroll container */
}

.chat-message { display: flex; gap: 0.8rem; max-width: 80%; }
.message-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: bold; font-size: 0.85rem; flex-shrink: 0;
}
.message-avatar.user { background-color: var(--color-secondary); color: var(--color-background); }
.message-avatar.aurora { background-color: var(--color-primary); color: var(--color-background); }

.message-content {
    background-color: rgba(255, 255, 255, 0.08);
    padding: 0.7rem 1rem;
    border-radius: 10px;
    line-height: 1.6;
    word-break: break-word;
}
.message-content p { margin: 0; } /* Keep this if p tags are direct children */
.message-content code { background-color: rgba(0,0,0,0.25); padding: 0.1em 0.4em; border-radius: 4px; font-family: monospace; font-size: 0.9em; }
.message-files { margin-top: 0.5rem; font-size: 0.8rem; opacity: 0.8; }
.file-tag { background-color: rgba(0,0,0,0.2); padding: 0.2em 0.5em; border-radius: 3px; margin-right: 0.3em; display: inline-block; }


.user-message { align-self: flex-end; }
.user-message .message-content { background-color: var(--color-secondary); color: var(--color-background); border-top-right-radius: 0; }
.aurora-message { align-self: flex-start; }
.aurora-message .message-content { border-top-left-radius: 0; }

.typing-indicator .message-content { background: transparent; padding: 0.8rem 0; }
.typing-indicator .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-primary); margin: 0 2px; animation: pulse 1.4s infinite ease-in-out both; }
.typing-indicator .dot:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator .dot:nth-child(2) { animation-delay: -0.16s; }
@keyframes pulse { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }


.chat-input-form {
    display: flex;
    padding: 0.8rem 1.2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    gap: 0.8rem;
    align-items: flex-end; /* Important for multi-line textarea */
    flex-shrink: 0; /* Prevent shrinking */
}
.attach-btn {
    background: none; border: 1px solid rgba(255,255,255,0.2);
    color: var(--color-text); opacity: 0.7; transition: opacity 0.2s, border-color 0.2s;
    border-radius: 6px; padding: 0.6rem;
    height: calc(0.8rem * 2 + 1.5em); /* Approx height for single line textarea */
    min-height: 40px; /* Ensure a minimum clickable area */
    display: flex; align-items: center; justify-content: center;
    /* align-self: stretch; /* Can cause issues if textarea height is dynamic, flex-end is better */
}
.attach-btn:hover { opacity: 1; border-color: var(--color-primary); }

.chat-input {
    flex-grow: 1; padding: 0.8rem 1rem; border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.15); background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text); font-family: inherit; font-size: 1rem;
    resize: none; max-height: 120px; overflow-y: auto;
    line-height: 1.5;
    min-height: calc(0.8rem * 2 + 1.5em); /* Match button initial height */
}
.chat-input:focus { outline: none; border-color: var(--color-primary); }

.send-btn {
    padding: 0.8rem 1.2rem; display: flex; align-items: center; gap: 0.5rem;
    height: calc(0.8rem * 2 + 1.5em); /* Approx height for single line textarea */
    min-height: 40px; /* Ensure a minimum clickable area */
    /* align-self: stretch; */
}
.send-btn svg { stroke-width: 2.5; }

.example-prompts {
    display: flex; gap: 0.5rem; padding: 0.5rem 1.2rem 0.8rem; flex-wrap: wrap;
    flex-shrink: 0; /* Prevent shrinking */
    border-top: 1px solid rgba(255, 255, 255, 0.05); /* Optional: visual separation */
}
.example-prompts button { background-color: rgba(255,255,255,0.08); color: var(--color-text); padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.8rem; opacity: 0.7; transition: all 0.3s ease; border: none; cursor: pointer;}
.example-prompts button:hover { opacity: 1; background-color: rgba(var(--color-primary-rgb), 0.2); }


/* --- RESPONSIVENESS --- */
@media (max-width: 991px) { /* Tablet and Mobile - Sidebar becomes overlay */
    .aurora-sidebar {
        position: fixed;
        top: 80px; /* Below navbar, ensure this matches actual navbar height */
        left: 0;
        bottom: 0; /* This makes height calc(100vh - 80px) */
        transform: translateX(-100%);
        z-index: 1000;
        box-shadow: 5px 0 15px rgba(0,0,0,0.2);
        /* height: calc(100vh - 80px); /* Redundant due to top/bottom */
    }
    .aurora-sidebar.is-open {
        transform: translateX(0);
    }
    .sidebar-toggle-mobile {
        display: flex;
        /* position: fixed; /* If you want it fixed relative to viewport for opening */
        /* top: calc(80px + 1rem); /* Example if fixed */
        /* left: 1rem; /* Example if fixed */
    }
    .aurora-main-content {
        /* width: 100%; /* Not needed, flex-grow handles it */
    }
    .page-title-hero {
        padding-top: 0.5rem !important;
        margin-bottom: 0.5rem !important;
    }
    :deep(.page-title-hero .hero-title) { font-size: 1.8rem !important; }
    :deep(.page-title-hero .hero-subtitle) { font-size: 0.9rem !important; }

     .container-chat {
        padding: 0 0.5rem 0.5rem 0.5rem;
    }
    .chat-header { padding: 0.6rem 1rem; }
    .chat-header h3 { font-size: 1rem; }
    .chat-messages-area { padding: 1rem; gap: 1rem; }
    .chat-message { max-width: 90%; }
    .message-avatar { width: 32px; height: 32px; font-size: 0.8rem; }
    .message-content { padding: 0.6rem 0.9rem; }

    .chat-input-form { padding: 0.6rem 1rem; gap: 0.6rem; }
    .chat-input { font-size: 0.9rem; padding: 0.7rem; min-height: calc(0.7rem * 2 + 1.5em); }
    .attach-btn, .send-btn { padding: 0.7rem; height: calc(0.7rem * 2 + 1.5em); min-height: 36px; }

    .example-prompts { padding: 0.3rem 1rem 0.6rem; }
    .example-prompts button { font-size: 0.75rem; padding: 0.3rem 0.6rem; }
}

@media (max-width: 480px) { /* Smaller Mobiles */
    .aurora-sidebar { width: 250px; }
    :deep(.page-title-hero .hero-title) { font-size: 1.6rem !important; }
    :deep(.page-title-hero .hero-subtitle) { font-size: 0.85rem !important; }

    /* If you had these, they are fine:
    .metrics-grid { grid-template-columns: 1fr; }
    .sliders-grid { grid-template-columns: 1fr; }
    */
}
</style>