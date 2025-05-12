<!-- src/views/PerformanceAnalyticsPage.vue -->
<template>
    <MainLayout>
        <div class="dashboard-layout">
            <!-- Admin Sidebar -->
            <aside class="dashboard-sidebar">
                <div class="sidebar-header">
                    <RouterLink to="/admin/dashboard" class="sidebar-logo">
                        Admin<span class="gradient-text">Panel</span>
                    </RouterLink>
                </div>
                <nav class="sidebar-nav">
                    <ul>
                        <li><RouterLink to="/admin/dashboard" active-class="active-link"><span>Dashboard</span></RouterLink></li>
                        <li><RouterLink to="/admin/user-management" active-class="active-link"><span>User Management</span></RouterLink></li>
                        <!-- Link below now points to this page which includes behavior controls -->
                        <li><RouterLink to="/admin/performance-analytics" :class="{'active-link': isActiveSection('behavior')}" @click="scrollToSection('behaviorControls')"><span>AI Behavior & Safety</span></RouterLink></li>
                        <li><RouterLink to="/admin/performance-analytics" :class="{'active-link': isActiveSection('analytics')}" @click="scrollToSection('modelAnalyticsHeader')"><span>Model Analytics</span></RouterLink></li>
                        <li><RouterLink to="/admin/server-management" active-class="active-link"><span>Server Status</span></RouterLink></li>
                         <li><RouterLink to="/user/usage" active-class="active-link"><span>User Usage Data</span></RouterLink></li>
                    </ul>
                </nav>
                <div class="sidebar-footer">
                    <button @click="logout" class="logout-button"><span>Logout</span></button>
                </div>
            </aside>

            <!-- Main Content Area -->
            <main class="dashboard-content combined-admin-content">
                <div class="content-header" id="mainContentHeader">
                    <h1>Platform Oversight</h1>
                    <p>Monitor model performance and configure global AI behavior & safety.</p>
                </div>

                <!-- MODEL PERFORMANCE ANALYTICS PART -->
                <div class="content-section-header" id="modelAnalyticsHeader">
                    <h2>Model Performance Analytics</h2>
                    <p>Track usage, latency, and operational health of your deployed AI models.</p>
                </div>

                <div class="analytics-filters">
                    <label for="date-range">Date Range:</label>
                    <select id="date-range" v-model="selectedDateRange">
                        <option value="last_24_hours">Last 24 Hours</option>
                        <option value="last_7_days">Last 7 Days</option>
                        <option value="last_30_days">Last 30 Days</option>
                    </select>
                    <label for="model-filter" v-if="allModelNames.length > 0">Filter by Model:</label>
                    <select id="model-filter" v-model="selectedModelFilter" v-if="allModelNames.length > 0">
                        <option value="all">All Models</option>
                        <optgroup label="Your Custom GPTs">
                            <option v-for="modelName in customGptModelNames" :key="modelName" :value="modelName">{{ modelName }}</option>
                        </optgroup>
                        <optgroup label="Model Types">
                            <option value="type_ml">ML Models (Avg)</option>
                            <option value="type_dl">DL Models (Avg)</option>
                            <option value="type_nlp">NLP Models (Avg)</option>
                            <option value="type_rag">RAG Models (Avg)</option>
                            <option value="type_gpt_other">Other GPTs (Avg)</option>
                        </optgroup>
                    </select>
                </div>

                <div v-if="isLoadingAnalytics" class="loading-overlay analytics-loader">
                    <div class="spinner"></div>
                    <p>Loading Model Analytics Data...</p>
                </div>

                <div v-else class="analytics-data-container">
                    <!-- Your Custom GPT Models Section -->
                    <section class="analytics-section" v-if="shouldShowAnalyticsSection('yourCustomGptModels') && analyticsData.yourCustomGptModels.length > 0">
                        <h3>Your Custom GPT Models</h3>
                        <div class="model-cards-grid">
                            <div v-for="model in analyticsData.yourCustomGptModels" :key="model.id" class="model-card gpt-card"
                                 v-show="selectedModelFilter === 'all' || selectedModelFilter === model.name">
                                <div class="card-header"><h4>{{ model.name }}</h4><span class="status-badge" :class="model.status.toLowerCase()">{{ model.status }}</span></div>
                                <div class="metrics-grid">
                                    <div class="metric-item"><span>Inferences:</span> <strong>{{ (model.metrics?.inferenceCount ?? 0).toLocaleString() }}</strong></div>
                                    <div class="metric-item"><span>Avg Latency:</span> <strong>{{ model.metrics?.avgLatencyMs ?? 0 }}ms</strong></div>
                                    <div class="metric-item"><span>P95 Latency:</span> <strong>{{ model.metrics?.p95LatencyMs ?? 0 }}ms</strong></div>
                                    <div class="metric-item"><span>Error Rate:</span> <strong>{{ model.metrics?.errorRate ?? 0 }}%</strong></div>
                                    <div class="metric-item"><span>Tokens Processed:</span> <strong>{{ (model.metrics?.tokensProcessed ?? 0).toLocaleString() }}</strong></div>
                                    <div class="metric-item" v-if="model.metrics?.userFeedbackScore !== undefined"><span>User Feedback:</span> <strong>{{ (model.metrics.userFeedbackScore ?? 0).toFixed(1) }}/5</strong></div>
                                </div>
                                <div class="chart-placeholder-small">Chart: {{model.name}} - Trend & Latency</div>
                            </div>
                        </div>
                    </section>
                    <section class="analytics-section" v-else-if="shouldShowAnalyticsSection('yourCustomGptModels') && selectedModelFilter !== 'all' && !customGptModelNames.includes(selectedModelFilter)">
                        <p class="no-data-message">No data for selected custom GPT model.</p>
                    </section>

                    <!-- Aggregated Model Type Sections -->
                    <section class="analytics-section" v-if="shouldShowAnalyticsSection('mlModels')">
                        <h3>Machine Learning (ML) Models - Aggregated</h3>
                        <div class="model-summary-card">
                            <div class="metrics-grid">
                                <div class="metric-item"><span>Total Inferences:</span> <strong>{{ (analyticsData.mlModels?.totalInferenceCount ?? 0).toLocaleString() }}</strong></div>
                                <div class="metric-item"><span>Avg Latency:</span> <strong>{{ analyticsData.mlModels?.avgLatencyMs ?? 0 }}ms</strong></div>
                                <div class="metric-item"><span>Overall Accuracy:</span> <strong>{{ analyticsData.mlModels?.avgAccuracy ?? 0 }}%</strong></div>
                            </div>
                            <div class="chart-placeholder">Chart: ML Models - KPIs</div>
                        </div>
                    </section>
                    <section class="analytics-section" v-if="shouldShowAnalyticsSection('dlModels')">
                        <h3>Deep Learning (DL) Models - Aggregated</h3>
                        <div class="model-summary-card">
                             <div class="metrics-grid">
                                <div class="metric-item"><span>Total Inferences:</span> <strong>{{ (analyticsData.dlModels?.totalInferenceCount ?? 0).toLocaleString() }}</strong></div>
                                <div class="metric-item"><span>Avg Latency (GPU):</span> <strong>{{ analyticsData.dlModels?.avgLatencyMs ?? 0 }}ms</strong></div>
                                <div class="metric-item"><span>GPU Utilization (Avg):</span> <strong>{{ analyticsData.dlModels?.avgGpuUtilization ?? 0 }}%</strong></div>
                            </div>
                            <div class="chart-placeholder">Chart: DL Models - Throughput & GPU</div>
                        </div>
                    </section>
                     <!-- NLP, RAG, Other GPT sections similarly -->
                </div>
                <!-- END OF MODEL PERFORMANCE ANALYTICS PART -->


                <!-- AI BEHAVIOR & SAFETY CONTROLS PART -->
                <div class="content-section-header" id="behaviorControlsHeader">
                    <h2>Global AI Behavior & Safety Controls</h2>
                    <p>Define platform-wide guardrails, output styles, and personality traits for all AI models.</p>
                </div>

                 <!-- Word/Phrase Blocking Section -->
                <section class="control-section">
                    <h3>Global Blocklist Management</h3>
                    <div class="blocklist-manager">
                        <div class="add-term-form">
                            <input type="text" v-model="newBlockedTerm" placeholder="Enter word or phrase to block..." @keyup.enter="addBlockedTerm"/>
                            <button @click="addBlockedTerm" class="btn btn-primary btn-small">Add to Blocklist</button>
                        </div>
                        <div class="current-blocklist">
                            <h4>Currently Blocked Terms ({{ blockedTerms.length }}):</h4>
                            <ul v-if="blockedTerms.length > 0">
                                <li v-for="(term, index) in blockedTerms" :key="index">
                                    <span>{{ term }}</span>
                                    <button @click="removeBlockedTerm(index)" class="btn-remove-term" title="Remove term">×</button>
                                </li>
                            </ul>
                            <p v-else class="empty-list-message">No terms are currently blocked globally.</p>
                        </div>
                    </div>
                </section>

                <!-- AI Output Style Controls -->
                <section class="control-section">
                    <h3>AI Output Style & Safety Configuration</h3>
                    <div class="sliders-grid">
                        <div class="slider-control">
                            <label for="appropriateness">Content Appropriateness (Strictness)</label>
                            <input type="range" id="appropriateness" min="0" max="100" v-model.number="outputStyle.appropriateness" class="styled-slider"/>
                            <span class="slider-value">{{ outputStyle.appropriateness }}%</span>
                            <small>Higher values = stricter adherence to safety guidelines, less risky content.</small>
                        </div>
                        <div class="slider-control">
                            <label for="annoyanceFactor">"Annoyance" Factor (e.g., Sarcasm, Verbosity)</label>
                            <input type="range" id="annoyanceFactor" min="0" max="100" v-model.number="outputStyle.annoyanceFactor" class="styled-slider"/>
                            <span class="slider-value">{{ outputStyle.annoyanceFactor }}%</span>
                            <small>Higher values allow for more playful, verbose, or potentially "sarcastic" responses.</small>
                        </div>
                        <div class="slider-control">
                            <label for="engagementStyle">Engagement Style (Direct vs. Conversational)</label>
                            <input type="range" id="engagementStyle" min="0" max="100" v-model.number="outputStyle.engagementStyle" class="styled-slider"/>
                            <span class="slider-value">{{ outputStyle.engagementStyle }}%</span>
                            <small>0% = Very Direct & Factual, 100% = Highly Conversational & Engaging.</small>
                        </div>
                        <div class="slider-control">
                            <label for="inputReliance">Reliance on User Input (Creativity vs. Adherence)</label>
                            <input type="range" id="inputReliance" min="0" max="100" v-model.number="outputStyle.inputReliance" class="styled-slider"/>
                            <span class="slider-value">{{ outputStyle.inputReliance }}%</span>
                            <small>0% = Highly Creative/Deviates from prompt, 100% = Strictly Adheres to prompt.</small>
                        </div>
                    </div>
                </section>

                <!-- AI Personality/Behavior Controls -->
                <section class="control-section">
                    <h3>AI Personality Traits (Global Default Tendencies)</h3>
                    <div class="sliders-grid personality-sliders">
                        <div class="slider-control" v-for="trait in personalityTraits" :key="trait.id">
                            <label :for="trait.id">{{ trait.label }}</label>
                            <input type="range" :id="trait.id" min="0" max="100" v-model.number="trait.value" class="styled-slider"/>
                            <span class="slider-value">{{ trait.value }}%</span>
                            <small>{{trait.description}}</small>
                        </div>
                    </div>
                </section>

                <div class="save-actions">
                    <button @click="saveGlobalAISettings" class="btn btn-primary btn-large" :disabled="isSavingAISettings">
                        <span v-if="isSavingAISettings">Saving AI Settings...</span>
                        <span v-else>Save Global AI Settings</span>
                    </button>
                </div>
                <!-- END OF AI BEHAVIOR & SAFETY CONTROLS PART -->

            </main>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import { RouterLink, useRouter, useRoute } from 'vue-router'; // Added useRoute
import { ref, onMounted, watch, computed } from 'vue';

export default {
    name: 'PerformanceAnalyticsPage', // Kept name, as it now serves dual purpose
    components: {
        MainLayout,
        RouterLink
    },
    setup() {
        const router = useRouter();
        const route = useRoute(); // To read query params for active section

        // --- Refs for Model Analytics ---
        const selectedDateRange = ref('last_7_days');
        const selectedModelFilter = ref('all');
        const isLoadingAnalytics = ref(true);
        const analyticsData = ref({
            yourCustomGptModels: [],
            mlModels: { totalInferenceCount: 0, avgLatencyMs: 0, avgAccuracy: 0, avgErrorRate: 0, activeModelCount: 0, avgCpuUsage: 0, avgRamUsage: 0, topPerformers: [] },
            dlModels: { totalInferenceCount: 0, avgLatencyMs: 0, p99LatencyMs: 0, avgErrorRate: 0, avgGpuUtilization: 0, deployedModelCount: 0, topPerformers: [] },
            nlpModels: { totalRequests: 0, avgProcessingTimeMs: 0, totalTokensProcessed: 0, avgIntentAccuracy: 0, fallbackRate: 0 },
            ragModels: { totalQueries: 0, avgRetrievalTimeMs: 0, avgGenerationTimeMs: 0, avgRelevanceScore: 0, estimatedHallucinationRate: 0 },
            otherGptModels: { totalInferenceCount: 0, avgLatencyMs: 0, avgTokensPerRequest: 0, estimatedCostUSD: 0 }
        });

        // --- Refs for AI Behavior Controls ---
        const newBlockedTerm = ref('');
        const blockedTerms = ref([]);
        const outputStyle = ref({
            appropriateness: 80, annoyanceFactor: 10, engagementStyle: 50, inputReliance: 70,
        });
        const personalityTraits = ref([
            { id: 'helpful', label: 'Helpfulness', value: 70, description: 'Degree of proactive assistance and supportiveness.' },
            { id: 'flirty', label: 'Flirtatiousness', value: 5, description: 'Tendency towards playful romantic banter.' },
            { id: 'romantic', label: 'Romanticism', value: 5, description: 'Expression of romantic sentiments.' },
            { id: 'humorous', label: 'Humor Level', value: 30, description: 'Frequency and type of humor used.'},
            { id: 'formal', label: 'Formality', value: 40, description: '0% = Very Casual, 100% = Very Formal.' },
            { id: 'empathetic', label: 'Empathy', value: 60, description: 'Ability to understand and share feelings.'},
            { id: 'angry', label: 'Anger Expression', value: 2, description: 'Tendency to express anger (use with extreme caution).' },
            { id: 'offensive', label: 'Offensiveness Potential', value: 1, description: 'Likelihood of generating offensive content (target: 0%).' },
            { id: 'hurtful', label: 'Hurtfulness Potential', value: 1, description: 'Likelihood of generating hurtful content (target: 0%).' },
        ]);
        const isSavingAISettings = ref(false);
        const currentActiveSection = ref('analytics'); // 'analytics' or 'behavior'


        // --- Computed Properties for Analytics ---
        const customGptModelNames = computed(() => analyticsData.value.yourCustomGptModels.map(m => m.name));
        const allModelNames = computed(() => [...customGptModelNames.value]);


        // --- Methods for Analytics ---
        const fetchModelAnalyticsData = async () => {
            isLoadingAnalytics.value = true;
            console.log(`Fetching analytics for: ${selectedDateRange.value}, Filter: ${selectedModelFilter.value}`);
            await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API

            const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const randomFloat = (min, max, decimals = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

            analyticsData.value.yourCustomGptModels = [ /* ... (same mock data as before) ... */ ];
            // ... (populate other analyticsData.mlModels, .dlModels etc. as before)
             analyticsData.value.yourCustomGptModels = [
                {
                    id: 'custom-gpt-alpha', name: 'Customer Service ProBot', status: 'Online',
                    metrics: { inferenceCount: randomInt(50000, 100000), avgLatencyMs: randomInt(150, 300), p95LatencyMs: randomInt(350, 600), errorRate: randomFloat(0.1, 1.5), tokensProcessed: randomInt(1000000, 5000000), avgInputTokens: randomInt(50, 200), avgOutputTokens: randomInt(100, 500), activeEndpoints: randomInt(2,5), userFeedbackScore: randomFloat(3.5, 4.8, 1) }
                },
                {
                    id: 'custom-gpt-beta', name: 'Internal Knowledge Assistant', status: 'Online',
                    metrics: { inferenceCount: randomInt(10000, 30000), avgLatencyMs: randomInt(100, 250), p95LatencyMs: randomInt(280, 450), errorRate: randomFloat(0.05, 0.8), tokensProcessed: randomInt(500000, 2000000), avgInputTokens: randomInt(80, 300), avgOutputTokens: randomInt(150, 600), activeEndpoints: randomInt(1,3), userFeedbackScore: randomFloat(4.0, 4.9, 1) }
                },
            ];
            analyticsData.value.mlModels = {
                totalInferenceCount: randomInt(200000, 500000), avgLatencyMs: randomInt(20, 80), avgAccuracy: randomFloat(85, 98, 1), avgErrorRate: randomFloat(0.5, 2.5), activeModelCount: randomInt(10, 25), avgCpuUsage: randomInt(30,60), avgRamUsage: randomInt(40,70),
                topPerformers: [{name: 'FraudDetectorX', metricValue: '99.2% Acc'}, {name: 'DemandForecaster', metricValue: '15ms Lat'}]
            };
            // ... other model types
            isLoadingAnalytics.value = false;
        };

        const shouldShowAnalyticsSection = (sectionKey) => {
            if (selectedModelFilter.value === 'all') return true;
            if (customGptModelNames.value.includes(selectedModelFilter.value)) {
                return sectionKey === 'yourCustomGptModels';
            }
            if (selectedModelFilter.value.startsWith('type_')) {
                const type = selectedModelFilter.value.split('_')[1]; // e.g., 'ml'
                if (sectionKey === `${type}Models`) return true;
                if (type === 'gpt' && sectionKey === 'otherGptModels' && selectedModelFilter.value === 'type_gpt_other') return true; // Special case for other gpts
                return false;
            }
            return false;
        };

        // --- Methods for AI Behavior Controls ---
        const fetchAIBehaviorSettings = async () => {
            console.log("Fetching initial AI behavior settings...");
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            blockedTerms.value = ['example_blocked', 'another_one'];
            outputStyle.value = { appropriateness: 75, annoyanceFactor: 15, engagementStyle: 60, inputReliance: 65 };
            // personalityTraits.value could also be fetched
            console.log("AI behavior settings loaded.");
        };

        const addBlockedTerm = () => {
            const term = newBlockedTerm.value.trim().toLowerCase();
            if (term && !blockedTerms.value.includes(term)) {
                blockedTerms.value.push(term);
                newBlockedTerm.value = '';
            }
        };
        const removeBlockedTerm = (index) => {
            blockedTerms.value.splice(index, 1);
        };
        const saveGlobalAISettings = async () => {
            isSavingAISettings.value = true;
            console.log("Saving Global AI Settings:", { blockedTerms: blockedTerms.value, outputStyle: outputStyle.value, personalityTraits: personalityTraits.value });
            await new Promise(resolve => setTimeout(resolve, 1500));
            isSavingAISettings.value = false;
            alert("Global AI settings saved (simulated)!");
        };

        // --- Common Methods ---
        const logout = () => router.push('/admin/login');

        const scrollToSection = (sectionId) => {
            const element = document.getElementById(sectionId + 'Header'); // Scroll to section header
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (sectionId === 'behaviorControls') currentActiveSection.value = 'behavior';
                else currentActiveSection.value = 'analytics';

                // Update URL hash without full page reload for better UX
                router.replace({ path: route.path, hash: `#${sectionId}` });
            }
        };

        const isActiveSection = (section) => {
            return currentActiveSection.value === section;
        };


        onMounted(() => {
            fetchModelAnalyticsData();
            fetchAIBehaviorSettings();

            // Check for hash on initial load
            if (route.hash) {
                const sectionId = route.hash.substring(1); // Remove #
                 if (sectionId === 'behaviorControls') currentActiveSection.value = 'behavior';
                 else currentActiveSection.value = 'analytics'; // Default to analytics for other/no hash

                // Use nextTick to ensure DOM is ready for scrolling after initial render
                router.isReady().then(() => {
                    const element = document.getElementById(sectionId + 'Header');
                    if (element) {
                        element.scrollIntoView({ behavior: 'auto', block: 'start' });
                    }
                });
            }
        });

        watch(selectedDateRange, fetchModelAnalyticsData);
        watch(selectedModelFilter, fetchModelAnalyticsData);


        return {
            selectedDateRange, selectedModelFilter, analyticsData, isLoadingAnalytics,
            customGptModelNames, allModelNames, shouldShowAnalyticsSection,

            newBlockedTerm, blockedTerms, outputStyle, personalityTraits, isSavingAISettings,
            addBlockedTerm, removeBlockedTerm, saveGlobalAISettings,

            currentActiveSection, isActiveSection, scrollToSection,
            logout
        };
    }
};
</script>

<style scoped>
/* --- BASE DASHBOARD LAYOUT (Mobile First) --- */
.dashboard-layout {
    display: flex;
    flex-direction: column; /* Stack sidebar and content on mobile */
    min-height: calc(100vh - 80px); /* Assuming 80px navbar */
    background-color: var(--color-background);
}

.dashboard-sidebar {
    width: 100%; /* Full width on mobile */
    background: rgba(15, 23, 42, 0.95); /* Slightly more opaque */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Border for mobile */
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    z-index: 990; /* Below navbar, above content if overlapping before JS */
    /* Transition for smooth appearance if shown/hidden with JS on mobile */
    /* For now, it's always visible and stacks */
}

.sidebar-header {
    padding: 0 1.5rem 1rem 1.5rem; /* Adjusted padding */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1rem;
    text-align: center; /* Center logo on mobile */
}

.sidebar-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    text-decoration: none;
}
.sidebar-logo .gradient-text { /* Ensure gradient text in logo is styled if not global */
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent-3));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
}


.sidebar-nav {
    flex-grow: 1;
    overflow-y: auto;
    /* Max height for mobile if sidebar content is very long */
    max-height: calc(100vh - 200px); /* Example, adjust as needed */
}
.sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
.sidebar-nav li a, .logout-button {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem 1.5rem;
    color: var(--color-text);
    opacity: 0.7;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    border-left: 3px solid transparent;
    text-decoration: none;
    font-size: 0.95rem;
}
.sidebar-nav li a:hover, .logout-button:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.05);
}
.sidebar-nav li a.active-link {
    opacity: 1;
    color: var(--color-primary);
    border-left-color: var(--color-primary);
    background-color: rgba(var(--color-primary-rgb, 229, 170, 132), 0.1);
}

.sidebar-footer {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.logout-button {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
}

.dashboard-content {
    flex: 1;
    padding: 1.5rem; /* Mobile padding */
    overflow-y: auto;
    position: relative;
}

/* --- Desktop Sidebar & Content Layout (using a breakpoint, e.g., 992px) --- */
@media (min-width: 992px) {
    .dashboard-layout {
        flex-direction: row; /* Side by side */
    }
    .dashboard-sidebar {
        width: 260px;
        height: calc(100vh - 80px); /* Full height minus navbar */
        position: fixed;
        top: 80px; /* Below navbar */
        left: 0;
        border-bottom: none; /* Remove bottom border */
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        padding: 1.5rem 0; /* Restore desktop padding */
        max-height: none; /* Remove max-height for scroll */
    }
    .sidebar-header {
        text-align: left; /* Align logo left on desktop */
    }
    .dashboard-content {
        margin-left: 260px; /* Space for fixed sidebar */
        padding: 2.5rem; /* Desktop padding */
    }
}


/* --- COMMON CONTENT STYLING --- */
.content-header {
    margin-bottom: 2rem; /* Consistent spacing */
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.content-header h1 {
    font-size: 1.6rem; /* Responsive base */
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--color-text);
}
.content-header p {
    opacity: 0.8;
    font-size: 0.95rem;
    color: var(--color-text);
}

.content-section-header {
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--color-primary);
}
.content-section-header:first-of-type { margin-top: 0; }
.content-section-header h2 {
    font-size: 1.5rem; /* Responsive base */
    color: var(--color-text);
    font-weight: 600;
}
.content-section-header p {
    opacity: 0.7;
    font-size: 0.9rem;
    margin-top: 0.3rem;
}

/* Increase header sizes on larger screens */
@media (min-width: 768px) {
    .content-header h1 { font-size: 1.8rem; }
    .content-section-header h2 { font-size: 1.7rem; }
}


/* --- FILTERS --- */
.analytics-filters {
    margin-bottom: 2rem; /* Consistent spacing */
    padding: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    display: flex;
    flex-direction: column; /* Stack by default */
    align-items: stretch;
    gap: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
}
.analytics-filters label {
    font-weight: 500;
    opacity: 0.8;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;
    display: block; /* Ensure label is above select */
}
.analytics-filters select {
    width: 100%; /* Full width on mobile */
    padding: 0.7rem 1rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.08);
    color: var(--color-text);
    font-size: 0.9rem;
    outline: none;
}
.analytics-filters select:focus { border-color: var(--color-primary); }

/* Filters side-by-side on larger screens */
@media (min-width: 768px) {
    .analytics-filters {
        flex-direction: row;
        align-items: center;
        gap: 1.5rem;
    }
    .analytics-filters label {
        margin-bottom: 0; /* No bottom margin when inline */
    }
    .analytics-filters select {
        width: auto; /* Auto width for selects */
        min-width: 180px; /* Ensure decent width */
    }
}


/* --- ANALYTICS & CONTROL SECTIONS --- */
.analytics-section, .control-section {
    margin-bottom: 2rem; /* Consistent spacing */
    padding: 1.5rem;
    background-color: rgba(255,255,255,0.025); /* Slightly adjusted */
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.07);
}
/* Section-specific H3 titles */
.analytics-section h3 {
    font-size: 1.25rem; /* Responsive base */
    color: var(--color-accent-1);
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.control-section h3 {
    font-size: 1.25rem; /* Responsive base */
    color: var(--color-accent-2);
    margin-bottom: 1.2rem;
    padding-bottom: 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

@media (min-width: 768px) {
    .analytics-section, .control-section { padding: 2rem; }
    .analytics-section h3, .control-section h3 { font-size: 1.4rem; }
}


/* --- MODEL CARDS (Analytics) --- */
.model-cards-grid {
    display: grid;
    grid-template-columns: 1fr; /* Stack on mobile */
    gap: 1.5rem;
}
.model-card, .model-summary-card {
    background-color: rgba(30, 41, 59, 0.75); /* Slightly more opaque */
    border-radius: 8px;
    padding: 1.2rem; /* Adjusted padding */
    border: 1px solid rgba(255, 255, 255, 0.12);
    transition: box-shadow 0.3s ease;
}
.model-card:hover, .model-summary-card:hover { box-shadow: 0 5px 20px rgba(0,0,0,0.2); }
.gpt-card { border-left: 4px solid var(--color-primary); }

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
.card-header h4 { /* Model name */
    font-size: 1.15rem; /* Responsive base */
    font-weight: 600;
    color: var(--color-text);
    margin: 0;
}
.status-badge {
    padding: 0.3rem 0.7rem;
    border-radius: 12px;
    font-size: 0.7rem; /* Smaller badge text */
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    white-space: nowrap;
}
.status-badge.online { background-color: #28a745; }
.status-badge.offline { background-color: #dc3545; }
.status-badge.degraded { background-color: #ffc107; color: #333; }

/* Metrics Grid within cards */
.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); /* Allow more items if space */
    gap: 0.8rem;
    margin-bottom: 1rem;
}
.metric-item {
    font-size: 0.85rem; /* Responsive base */
    background: rgba(255,255,255,0.05);
    padding: 0.7rem;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.08);
}
.metric-item span { opacity: 0.7; font-size: 0.8em; display: block; margin-bottom: 0.25em; }
.metric-item strong {
    color: var(--color-primary);
    display: block;
    font-size: 1.1em; /* Relative to parent */
    font-weight: 600;
}

.chart-placeholder, .chart-placeholder-small {
    min-height: 120px; background-color: rgba(0, 0, 0, 0.2); border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255, 255, 255, 0.4); font-style: italic; font-size: 0.85rem;
    margin-top: 1rem; padding: 1rem; text-align: center; border: 1px dashed rgba(255,255,255,0.1);
}
.chart-placeholder-small { min-height: 80px; font-size: 0.75rem; }

.top-performing-models { margin-top: 1.2rem; padding-top: 0.8rem; border-top: 1px dashed rgba(255,255,255,0.1); }
.top-performing-models h4 { font-size: 0.95rem; font-weight: 500; color: var(--color-text-secondary, #bdc1c6); margin-bottom: 0.5rem; }
.top-performing-models ul { list-style: none; padding-left: 0; }
.top-performing-models li { font-size: 0.85rem; opacity: 0.85; padding: 0.3rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.top-performing-models li:last-child { border-bottom: none; }

/* Grid for model cards on larger screens */
@media (min-width: 768px) {
    .model-cards-grid { grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
    .card-header h4 { font-size: 1.25rem; }
    .metric-item { font-size: 0.9rem; }
    .metric-item strong { font-size: 1.2em; }
}

/* --- BLOCKLIST (Behavior Controls) --- */
.blocklist-manager { display: flex; flex-direction: column; gap: 1.5rem; }
.add-term-form {
    display: flex;
    flex-direction: column; /* Stack on mobile */
    gap: 0.8rem;
}
.add-term-form input[type="text"] {
    flex-grow: 1; padding: 0.8rem 1rem; border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.15); background-color: rgba(255, 255, 255, 0.08);
    color: var(--color-text); font-size: 0.9rem;
}
.add-term-form input[type="text"]:focus { border-color: var(--color-primary); outline: none; }
.btn-small { padding: 0.8rem 1.2rem; font-size: 0.9rem; } /* Used by "Add to Blocklist" */

.current-blocklist h4 { font-size: 1.05rem; font-weight: 500; margin-bottom: 0.8rem; opacity: 0.9; }
.current-blocklist ul { list-style: none; padding: 0; max-height: 180px; overflow-y: auto; background-color: rgba(0,0,0,0.15); border-radius: 6px; padding: 0.5rem; border: 1px solid rgba(255,255,255,0.1); }
.current-blocklist li { display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0.8rem; font-size: 0.9rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
.current-blocklist li:last-child { border-bottom: none; }
.btn-remove-term { background: none; border: none; color: #f87171; font-size: 1.3rem; cursor: pointer; padding: 0.2rem 0.5rem; line-height: 1; transition: color 0.2s; }
.btn-remove-term:hover { color: #dc2626; }
.empty-list-message { opacity: 0.7; font-style: italic; padding: 1rem 0; }

/* Blocklist form side-by-side on larger screens */
@media (min-width: 576px) {
    .add-term-form {
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }
}


/* --- SLIDERS (Behavior Controls) --- */
.sliders-grid {
    display: grid;
    grid-template-columns: 1fr; /* Stack on mobile */
    gap: 1.5rem;
}
.personality-sliders { gap: 1.2rem; } /* Slightly smaller gap */

.slider-control {
    background-color: rgba(255,255,255,0.05); padding: 1.2rem;
    border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);
    display: flex; flex-direction: column;
}
.slider-control label {
    display: block; font-size: 0.95rem; /* Responsive base */
    font-weight: 500; margin-bottom: 0.8rem;
    color: var(--color-text); opacity: 0.9;
}
.styled-slider {
    width: 100%; height: 10px; -webkit-appearance: none; appearance: none;
    background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));
    border-radius: 5px; outline: none; opacity: 0.85; transition: opacity .2s;
    margin-bottom: 0.6rem;
}
.styled-slider:hover { opacity: 1; }
.styled-slider::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none; width: 20px; height: 20px; /* Adjusted size */
    background: var(--color-text); border-radius: 50%; cursor: pointer;
    border: 2px solid var(--color-primary); box-shadow: 0 0 8px rgba(0,0,0,0.3);
}
.styled-slider::-moz-range-thumb {
    width: 18px; height: 18px; background: var(--color-text); border-radius: 50%;
    cursor: pointer; border: 2px solid var(--color-primary); box-shadow: 0 0 8px rgba(0,0,0,0.3);
}
.slider-value {
    display: block; text-align: right; font-size: 0.9rem;
    font-weight: bold; color: var(--color-primary); margin-bottom: 0.5rem;
}
.slider-control small {
    font-size: 0.8rem; opacity: 0.65; line-height: 1.4;
    display: block; min-height: 2.4em; margin-top: auto;
}

/* Sliders grid on larger screens */
@media (min-width: 768px) {
    .sliders-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
    .personality-sliders { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
    .slider-control label { font-size: 1rem; }
    .slider-control small { font-size: 0.85rem; }
}


/* --- SAVE ACTIONS & LOADING --- */
.save-actions {
    margin-top: 2.5rem; text-align: center; padding-top: 1.5rem;
    border-top: 1px solid rgba(255,255,255,0.1);
}
.btn-large {
    padding: 0.9rem 2.5rem; font-size: 1.1rem; font-weight: 600;
}
.btn-primary:disabled {
    opacity: 0.6; cursor: not-allowed;
    /* Ensure your global .btn-primary handles this or define here */
    /* background: var(--color-card-2); Example from previous code */
    background: linear-gradient(135deg, grey, dimgrey); /* Muted gradient */
}

.loading-overlay {
    position: fixed; /* Changed to fixed to cover viewport during save */
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(8, 12, 12, 0.85);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    z-index: 1050; /* Higher than sidebar */
    color: var(--color-text); backdrop-filter: blur(3px);
}
.loading-overlay p { margin-top: 1.2rem; font-size: 1.1rem; opacity: 0.8; }
/* .spinner {
    width: 45px; height: 45px; border: 5px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%; border-top-color: linear-gradient(9deg, var(--color-secondary), var(--color-primary));
    background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));

    animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.no-data-message { text-align: center; padding: 2rem; opacity: 0.7; font-style: italic; } */

.spinner {
    width: 40px;
    height: 40px;
    /* border-radius: 70%; (This works for a square, 50% is more standard for a circle) */
    border-radius: 50%; /* Ensures a perfect circle */
    position: relative;
    animation: spin 1s linear infinite;
    background: linear-gradient(90deg, var(--color-secondary), var(--color-primary));

    /* Masking to shape the gradient background */
    -webkit-mask-image:
        conic-gradient(black 25%, transparent 0),
        /* Change 5px to 3px (or your desired thickness) */
        radial-gradient(transparent calc(50% - 3px), black calc(50% - 3px));
    -webkit-mask-composite: source-in;

    mask-image:
        conic-gradient(black 25%, transparent 0),
        /* Change 5px to 3px (or your desired thickness) */
        radial-gradient(transparent calc(50% - 2px), black calc(50% - 2px));
    mask-composite: intersect;
}

.spinner::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    /* Corrected width and height to cover the parent */
    width: 100%;
    height: 100%;
    border-radius: 20%;
    /* Change border thickness to match the gradient ring's thickness */
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.no-data-message {
    text-align: center;
    padding: 2rem;
    opacity: 0.7;
    font-style: italic;
}

/* --- USER USAGE STYLES (If integrated directly) --- */
/* Styles for .usage-summary-grid, .usage-card, etc. would go here if UserUsagePage content is merged */
/* For now, this page primarily focuses on Model Analytics & AI Behavior */

/* Ensure primary color RGB variable for RGBA backgrounds */
:root {
    --color-primary-rgb: 229, 170, 132; /* Your primary color's RGB values */
}

</style>