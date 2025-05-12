<!-- src/views/PerformanceAnalyticsPage.vue -->
<template>
    <MainLayout>
        <div class="dashboard-layout">
            <!-- Admin Sidebar (Keep your existing sidebar structure) -->
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
                        <li><RouterLink to="/admin/content-management" active-class="active-link"><span>Content Moderation</span></RouterLink></li>
                        <li><RouterLink to="/admin/performance-analytics" exact-active-class="active-link"><span>Model Analytics</span></RouterLink></li>
                        <li><RouterLink to="/admin/server-management" active-class="active-link"><span>Server Status</span></RouterLink></li>
                    </ul>
                </nav>
                <div class="sidebar-footer">
                    <button @click="logout" class="logout-button"><span>Logout</span></button>
                </div>
            </aside>

            <!-- Main Content Area -->
            <main class="dashboard-content model-analytics-content">
                <div class="content-header">
                    <h1>Model Performance Analytics</h1>
                    <p>Track usage, latency, and operational health of your deployed AI models.</p>
                </div>

                <div class="analytics-filters">
                    <label for="date-range">Date Range:</label>
                    <select id="date-range" v-model="selectedDateRange">
                        <option value="last_24_hours">Last 24 Hours</option>
                        <option value="last_7_days">Last 7 Days</option>
                        <option value="last_30_days">Last 30 Days</option>
                        <option value="custom">Custom Range</option>
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

                <div v-if="isLoading" class="loading-overlay">
                    <div class="spinner"></div>
                    <p>Loading Analytics Data...</p>
                </div>

                <div v-else>
                    <!-- Your Custom GPT Models Section -->
                    <section class="analytics-section" v-if="shouldShowSection('custom_gpt') && analyticsData.yourCustomGptModels.length > 0">
                        <h2>Your Custom GPT Models</h2>
                        <div class="model-cards-grid">
                            <div v-for="model in analyticsData.yourCustomGptModels" :key="model.id" class="model-card gpt-card"
                                 v-show="selectedModelFilter === 'all' || selectedModelFilter === model.name">
                                <div class="card-header">
                                    <h3>{{ model.name }}</h3>
                                    <span class="status-badge" :class="model.status.toLowerCase()">{{ model.status }}</span>
                                </div>
                                <div class="metrics-grid">
                                    <div class="metric-item"><span>Inferences:</span> <strong>{{ (model.metrics?.inferenceCount ?? 0).toLocaleString() }}</strong></div>
                                    <div class="metric-item"><span>Avg Latency:</span> <strong>{{ model.metrics?.avgLatencyMs ?? 0 }}ms</strong></div>
                                    <div class="metric-item"><span>P95 Latency:</span> <strong>{{ model.metrics?.p95LatencyMs ?? 0 }}ms</strong></div>
                                    <div class="metric-item"><span>Error Rate:</span> <strong>{{ model.metrics?.errorRate ?? 0 }}%</strong></div>
                                    <div class="metric-item"><span>Tokens Processed:</span> <strong>{{ (model.metrics?.tokensProcessed ?? 0).toLocaleString() }}</strong></div>
                                    <div class="metric-item"><span>Avg Input Tokens:</span> <strong>{{ model.metrics?.avgInputTokens ?? 0 }}</strong></div>
                                    <div class="metric-item"><span>Avg Output Tokens:</span> <strong>{{ model.metrics?.avgOutputTokens ?? 0 }}</strong></div>
                                    <div class="metric-item"><span>Active Endpoints:</span> <strong>{{ model.metrics?.activeEndpoints ?? 0 }}</strong></div>
                                    <div class="metric-item" v-if="model.metrics?.userFeedbackScore !== undefined"><span>User Feedback:</span> <strong>{{ (model.metrics.userFeedbackScore ?? 0).toFixed(1) }}/5</strong></div>
                                </div>
                                <div class="chart-placeholder-small">Chart: {{model.name}} - Inference Trend & Latency Dist.</div>
                            </div>
                        </div>
                    </section>
                    <section class="analytics-section" v-else-if="shouldShowSection('custom_gpt') && selectedModelFilter !== 'all' && !customGptModelNames.includes(selectedModelFilter)">
                        <p class="no-data-message">No data available for the selected custom GPT model in this date range.</p>
                    </section>


                    <!-- Aggregated Model Type Sections -->
                    <section class="analytics-section" v-if="shouldShowSection('type_ml')">
                        <h2>Machine Learning (ML) Models - Aggregated</h2>
                        <div class="model-summary-card">
                            <div class="metrics-grid">
                                <div class="metric-item"><span>Total Inferences:</span> <strong>{{ (analyticsData.mlModels?.totalInferenceCount ?? 0).toLocaleString() }}</strong></div>
                                <div class="metric-item"><span>Avg Latency:</span> <strong>{{ analyticsData.mlModels?.avgLatencyMs ?? 0 }}ms</strong></div>
                                <div class="metric-item"><span>Overall Accuracy:</span> <strong>{{ analyticsData.mlModels?.avgAccuracy ?? 0 }}%</strong></div>
                                <div class="metric-item"><span>Error Rate:</span> <strong>{{ analyticsData.mlModels?.avgErrorRate ?? 0 }}%</strong></div>
                                <div class="metric-item"><span>Active Models:</span> <strong>{{ analyticsData.mlModels?.activeModelCount ?? 0 }}</strong></div>
                                <div class="metric-item"><span>Avg Resource Usage:</span> <strong>CPU {{ analyticsData.mlModels?.avgCpuUsage ?? 0 }}%, RAM {{analyticsData.mlModels?.avgRamUsage ?? 0}}%</strong></div>
                            </div>
                            <div class="chart-placeholder">Chart: ML Models - Overall Usage & Performance KPIs</div>
                            <div class="top-performing-models" v-if="analyticsData.mlModels?.topPerformers?.length > 0">
                                <h4>Top ML Performers:</h4>
                                <ul><li v-for="model in analyticsData.mlModels.topPerformers" :key="model.name">{{ model.name }} ({{ model.metricValue }})</li></ul>
                            </div>
                        </div>
                    </section>

                    <section class="analytics-section" v-if="shouldShowSection('type_dl')">
                        <h2>Deep Learning (DL) Models - Aggregated</h2>
                        <div class="model-summary-card">
                            <div class="metrics-grid">
                                <div class="metric-item"><span>Total Inferences:</span> <strong>{{ (analyticsData.dlModels?.totalInferenceCount ?? 0).toLocaleString() }}</strong></div>
                                <div class="metric-item"><span>Avg Latency (GPU):</span> <strong>{{ analyticsData.dlModels?.avgLatencyMs ?? 0 }}ms</strong></div>
                                <div class="metric-item"><span>P99 Latency:</span> <strong>{{ analyticsData.dlModels?.p99LatencyMs ?? 0 }}ms</strong></div>
                                <div class="metric-item"><span>Error Rate:</span> <strong>{{ analyticsData.dlModels?.avgErrorRate ?? 0 }}%</strong></div>
                                <div class="metric-item"><span>GPU Utilization (Avg):</span> <strong>{{ analyticsData.dlModels?.avgGpuUtilization ?? 0 }}%</strong></div>
                                <div class="metric-item"><span>Models Deployed:</span> <strong>{{ analyticsData.dlModels?.deployedModelCount ?? 0 }}</strong></div>
                            </div>
                            <div class="chart-placeholder">Chart: DL Models - Throughput & GPU Metrics</div>
                             <div class="top-performing-models" v-if="analyticsData.dlModels?.topPerformers?.length > 0">
                                <h4>Top DL Performers:</h4>
                                <ul><li v-for="model in analyticsData.dlModels.topPerformers" :key="model.name">{{ model.name }} ({{ model.metricValue }})</li></ul>
                            </div>
                        </div>
                    </section>

                    <section class="analytics-section" v-if="shouldShowSection('type_nlp')">
                        <h2>Natural Language Processing (NLP) Models - Aggregated</h2>
                        <div class="model-summary-card">
                            <div class="metrics-grid">
                                <div class="metric-item"><span>Total Requests:</span> <strong>{{ (analyticsData.nlpModels?.totalRequests ?? 0).toLocaleString() }}</strong></div>
                                <div class="metric-item"><span>Avg Processing Time:</span> <strong>{{ analyticsData.nlpModels?.avgProcessingTimeMs ?? 0 }}ms</strong></div>
                                <div class="metric-item"><span>Total Tokens Handled:</span> <strong>{{ (analyticsData.nlpModels?.totalTokensProcessed ?? 0).toLocaleString() }}</strong></div>
                                <div class="metric-item"><span>Intent Accuracy (Avg):</span> <strong>{{ analyticsData.nlpModels?.avgIntentAccuracy ?? 0 }}%</strong></div>
                                <div class="metric-item"><span>Fallbacks:</span> <strong>{{ analyticsData.nlpModels?.fallbackRate ?? 0 }}%</strong></div>
                            </div>
                            <div class="chart-placeholder">Chart: NLP Models - Request Volume & Accuracy Trends</div>
                        </div>
                    </section>

                    <section class="analytics-section" v-if="shouldShowSection('type_rag')">
                        <h2>Retrieval Augmented Generation (RAG) Models - Aggregated</h2>
                        <div class="model-summary-card">
                            <div class="metrics-grid">
                                <div class="metric-item"><span>Total Queries:</span> <strong>{{ (analyticsData.ragModels?.totalQueries ?? 0).toLocaleString() }}</strong></div>
                                <div class="metric-item"><span>Avg Retrieval Time:</span> <strong>{{ analyticsData.ragModels?.avgRetrievalTimeMs ?? 0 }}ms</strong></div>
                                <div class="metric-item"><span>Avg Generation Time:</span> <strong>{{ analyticsData.ragModels?.avgGenerationTimeMs ?? 0 }}ms</strong></div>
                                <div class="metric-item"><span>Relevance Score (Avg):</span> <strong>{{ (analyticsData.ragModels?.avgRelevanceScore ?? 0).toFixed(2) }}</strong></div>
                                <div class="metric-item"><span>Hallucination Rate (Est.):</span> <strong>{{ analyticsData.ragModels?.estimatedHallucinationRate ?? 0 }}%</strong></div>
                            </div>
                            <div class="chart-placeholder">Chart: RAG Models - Query Latency & Relevance Metrics</div>
                        </div>
                    </section>

                    <section class="analytics-section" v-if="shouldShowSection('type_gpt_other')">
                        <h2>Other GPT Models (Non-Custom) - Aggregated</h2>
                        <div class="model-summary-card">
                            <div class="metrics-grid">
                                <div class="metric-item"><span>Total Inferences:</span> <strong>{{ (analyticsData.otherGptModels?.totalInferenceCount ?? 0).toLocaleString() }}</strong></div>
                                <div class="metric-item"><span>Avg Latency:</span> <strong>{{ analyticsData.otherGptModels?.avgLatencyMs ?? 0 }}ms</strong></div>
                                <div class="metric-item"><span>Avg Tokens/Req:</span> <strong>{{ analyticsData.otherGptModels?.avgTokensPerRequest ?? 0 }}</strong></div>
                                <div class="metric-item"><span>Cost Incurred (Est.):</span> <strong>${{ (analyticsData.otherGptModels?.estimatedCostUSD ?? 0).toLocaleString() }}</strong></div>
                            </div>
                            <div class="chart-placeholder">Chart: Other GPTs - Usage by Model Family & Cost</div>
                        </div>
                    </section>
                </div>

            </main>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import { RouterLink, useRouter } from 'vue-router';
import { ref, onMounted, watch, computed } from 'vue';

export default {
    name: 'PerformanceAnalyticsPage',
    components: {
        MainLayout,
        RouterLink
    },
    setup() {
        const router = useRouter();
        const selectedDateRange = ref('last_7_days');
        const selectedModelFilter = ref('all');
        const isLoading = ref(true); // Start with loading true

        // Initialize with default structure and numeric values
        const analyticsData = ref({
            yourCustomGptModels: [],
            mlModels: { totalInferenceCount: 0, avgLatencyMs: 0, avgAccuracy: 0, avgErrorRate: 0, activeModelCount: 0, avgCpuUsage: 0, avgRamUsage: 0, topPerformers: [] },
            dlModels: { totalInferenceCount: 0, avgLatencyMs: 0, p99LatencyMs: 0, avgErrorRate: 0, avgGpuUtilization: 0, deployedModelCount: 0, topPerformers: [] },
            nlpModels: { totalRequests: 0, avgProcessingTimeMs: 0, totalTokensProcessed: 0, avgIntentAccuracy: 0, fallbackRate: 0 },
            ragModels: { totalQueries: 0, avgRetrievalTimeMs: 0, avgGenerationTimeMs: 0, avgRelevanceScore: 0, estimatedHallucinationRate: 0 },
            otherGptModels: { totalInferenceCount: 0, avgLatencyMs: 0, avgTokensPerRequest: 0, estimatedCostUSD: 0 }
        });

        const customGptModelNames = computed(() => analyticsData.value.yourCustomGptModels.map(m => m.name));
        const allModelNames = computed(() => [
            ...customGptModelNames.value,
        ]);

        const fetchData = async () => {
            isLoading.value = true;
            console.log(`Fetching analytics for: ${selectedDateRange.value}, Filter: ${selectedModelFilter.value}`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

            const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
            const randomFloat = (min, max, decimals = 2) => parseFloat((Math.random() * (max - min) + min).toFixed(decimals));

            analyticsData.value.yourCustomGptModels = [
                {
                    id: 'custom-gpt-alpha', name: 'Customer Service ProBot', status: 'Online',
                    metrics: { inferenceCount: randomInt(50000, 100000), avgLatencyMs: randomInt(150, 300), p95LatencyMs: randomInt(350, 600), errorRate: randomFloat(0.1, 1.5), tokensProcessed: randomInt(1000000, 5000000), avgInputTokens: randomInt(50, 200), avgOutputTokens: randomInt(100, 500), activeEndpoints: randomInt(2,5), userFeedbackScore: randomFloat(3.5, 4.8, 1) }
                },
                {
                    id: 'custom-gpt-beta', name: 'Internal Knowledge Assistant', status: 'Online',
                    metrics: { inferenceCount: randomInt(10000, 30000), avgLatencyMs: randomInt(100, 250), p95LatencyMs: randomInt(280, 450), errorRate: randomFloat(0.05, 0.8), tokensProcessed: randomInt(500000, 2000000), avgInputTokens: randomInt(80, 300), avgOutputTokens: randomInt(150, 600), activeEndpoints: randomInt(1,3), userFeedbackScore: randomFloat(4.0, 4.9, 1) }
                },
                 {
                    id: 'custom-gpt-gamma', name: 'Code Generation Helper', status: 'Degraded',
                    metrics: { inferenceCount: randomInt(5000, 15000), avgLatencyMs: randomInt(300, 500), p95LatencyMs: randomInt(600, 900), errorRate: randomFloat(1.5, 3.0), tokensProcessed: randomInt(200000, 1000000), avgInputTokens: randomInt(100, 400), avgOutputTokens: randomInt(200, 800), activeEndpoints: 1, userFeedbackScore: randomFloat(3.0, 4.2, 1) }
                }
            ];
            analyticsData.value.mlModels = {
                totalInferenceCount: randomInt(200000, 500000), avgLatencyMs: randomInt(20, 80), avgAccuracy: randomFloat(85, 98, 1), avgErrorRate: randomFloat(0.5, 2.5), activeModelCount: randomInt(10, 25), avgCpuUsage: randomInt(30,60), avgRamUsage: randomInt(40,70),
                topPerformers: [{name: 'FraudDetectorX', metricValue: '99.2% Acc'}, {name: 'DemandForecaster', metricValue: '15ms Lat'}]
            };
            analyticsData.value.dlModels = {
                totalInferenceCount: randomInt(500000, 1000000), avgLatencyMs: randomInt(50, 150), p99LatencyMs: randomInt(200, 400), avgErrorRate: randomFloat(0.2, 1.8), avgGpuUtilization: randomInt(40, 75), deployedModelCount: randomInt(5,15),
                topPerformers: [{name: 'ImageClassifierV5', metricValue: '1.2M Inf/day'}, {name: 'StyleTransferGAN', metricValue: '92% GPU'}]
            };
            analyticsData.value.nlpModels = {
                totalRequests: randomInt(300000, 700000), avgProcessingTimeMs: randomInt(30, 100), totalTokensProcessed: randomInt(5000000, 20000000), avgIntentAccuracy: randomFloat(90,99,1), fallbackRate: randomFloat(1,5,1)
            };
            analyticsData.value.ragModels = {
                totalQueries: randomInt(50000, 150000), avgRetrievalTimeMs: randomInt(80, 200), avgGenerationTimeMs: randomInt(200, 500), avgRelevanceScore: randomFloat(0.8, 0.95), estimatedHallucinationRate: randomFloat(1, 4, 1)
            };
            analyticsData.value.otherGptModels = {
                totalInferenceCount: randomInt(100000, 300000), avgLatencyMs: randomInt(200, 600), avgTokensPerRequest: randomInt(200, 1000), estimatedCostUSD: randomInt(500, 2000)
            };
            isLoading.value = false;
        };

        const shouldShowSection = (sectionKey) => {
            if (selectedModelFilter.value === 'all') return true;

            // If a specific custom GPT model is selected from the dropdown
            if (customGptModelNames.value.includes(selectedModelFilter.value)) {
                return sectionKey === 'custom_gpt'; // Only show the custom_gpt section, individual cards will be filtered by v-show
            }

            // If a "type_*" filter is selected
            if (selectedModelFilter.value.startsWith('type_')) {
                if (sectionKey === 'custom_gpt' && selectedModelFilter.value !== 'type_gpt_other') return false; // Hide individual custom gpts if a general type is selected (unless it's other gpts)

                if (sectionKey === 'mlModels' && selectedModelFilter.value === 'type_ml') return true;
                if (sectionKey === 'dlModels' && selectedModelFilter.value === 'type_dl') return true;
                if (sectionKey === 'nlpModels' && selectedModelFilter.value === 'type_nlp') return true;
                if (sectionKey === 'ragModels' && selectedModelFilter.value === 'type_rag') return true;
                if (sectionKey === 'otherGptModels' && selectedModelFilter.value === 'type_gpt_other') return true;
                return false; // Hide other type sections
            }
            return false; // Should not be reached if filter is 'all' or one of the known types/names
        };


        onMounted(fetchData);
        watch(selectedDateRange, fetchData);
        watch(selectedModelFilter, fetchData);

        const logout = () => {
            router.push('/admin/login');
        };

        return {
            selectedDateRange,
            selectedModelFilter,
            analyticsData,
            isLoading,
            customGptModelNames,
            allModelNames,
            shouldShowSection,
            logout
        };
    }
};
</script>

<style scoped>
/* Reusing common dashboard layout styles - ensure these are loaded */
.dashboard-layout { display: flex; min-height: calc(100vh - 80px); background-color: var(--color-background); }
.dashboard-sidebar { width: 260px; background: rgba(15, 23, 42, 0.8); border-right: 1px solid rgba(255, 255, 255, 0.1); padding: 1.5rem 0; display: flex; flex-direction: column; }
.sidebar-header { padding: 0 1.5rem 1.5rem 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 1rem; }
.sidebar-logo { font-size: 1.5rem; font-weight: 700; }
.sidebar-nav { flex-grow: 1; } .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
.sidebar-nav li a, .logout-button { display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1.5rem; color: var(--color-text); opacity: 0.7; font-weight: 500; transition: all 0.2s ease-in-out; border-left: 3px solid transparent; text-decoration: none; font-size: 0.95rem; }
.sidebar-nav li a:hover, .logout-button:hover { opacity: 1; background-color: rgba(255, 255, 255, 0.05); }
.sidebar-nav li a.active-link { opacity: 1; color: var(--color-primary); border-left-color: var(--color-primary); background-color: rgba(229, 170, 132, 0.1); }
.sidebar-footer { margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1); }
.logout-button { width: 100%; text-align: left; background: none; border: none; cursor: pointer; }
.dashboard-content { flex: 1; padding: 2.5rem; overflow-y: auto; position: relative; }
.content-header { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
.content-header h1 { font-size: 1.8rem; font-weight: 600; margin-bottom: 0.5rem; } .content-header p { opacity: 0.8; }

@media (max-width: 768px) {
    .dashboard-layout { flex-direction: column; }
    .dashboard-sidebar { width: 100%; height: auto; border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .dashboard-content { padding: 1.5rem; }
}

/* Model Analytics Specific Styles */
.model-analytics-content {}

.analytics-filters {
    margin-bottom: 2.5rem;
    padding: 1rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
}
.analytics-filters label { font-weight: 500; opacity: 0.8; font-size: 0.9rem; }
.analytics-filters select {
    padding: 0.7rem 1rem;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.08);
    color: var(--color-text);
    font-size: 0.9rem;
    outline: none;
}
.analytics-filters select:focus { border-color: var(--color-primary); }

.analytics-section {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background-color: rgba(255,255,255,0.02);
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.07);
}
.analytics-section h2 {
    font-size: 1.6rem;
    color: var(--color-secondary);
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.model-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); /* Slightly wider cards */
    gap: 1.5rem;
}

.model-card, .model-summary-card {
    background-color: rgba(30, 41, 59, 0.7); /* Darker card */
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.12); /* Slightly more visible border */
    transition: box-shadow 0.3s ease;
}
.model-card:hover, .model-summary-card:hover {
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}
.gpt-card { border-left: 4px solid var(--color-primary); }

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem; /* Increased margin */
}
.card-header h3 {
    font-size: 1.25rem; /* Slightly larger for model names */
    font-weight: 600;
    color: var(--color-text);
    margin: 0;
}
.status-badge {
    padding: 0.3rem 0.7rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
}
.status-badge.online { background-color: #28a745; }
.status-badge.offline { background-color: #dc3545; }
.status-badge.degraded { background-color: #ffc107; color: #333; }

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Adjust for more metrics */
    gap: 1rem; /* Increased gap */
    margin-bottom: 1.2rem;
}
.metric-item {
    font-size: 0.9rem;
    opacity: 0.9;
    background: rgba(255,255,255,0.05); /* Slightly lighter item background */
    padding: 0.8rem; /* Increased padding */
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.08);
}
.metric-item span { opacity: 0.7; font-size: 0.8em; display: block; margin-bottom: 0.25em; }
.metric-item strong {
    color: var(--color-primary);
    display: block;
    font-size: 1.2em; /* Larger metric value */
    font-weight: 600; /* Bolder metric value */
}

.chart-placeholder, .chart-placeholder-small {
    min-height: 150px;
    background-color: rgba(0, 0, 0, 0.2); /* Darker chart placeholder */
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.4); /* Lighter placeholder text */
    font-style: italic;
    font-size: 0.9rem;
    margin-top: 1rem;
    padding: 1rem;
    text-align: center;
    border: 1px dashed rgba(255,255,255,0.1);
}
.chart-placeholder-small { min-height: 100px; font-size: 0.8rem; }

.top-performing-models {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px dashed rgba(255,255,255,0.1);
}
.top-performing-models h4 {
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text-secondary, #bdc1c6);
    margin-bottom: 0.7rem;
}
.top-performing-models ul { list-style: none; padding-left: 0; }
.top-performing-models li {
    font-size: 0.9rem;
    opacity: 0.85;
    padding: 0.4rem 0;
     border-bottom: 1px solid rgba(255,255,255,0.05);
}
.top-performing-models li:last-child { border-bottom: none; }


.loading-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(8, 12, 12, 0.85); /* More opaque */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    color: var(--color-text);
    backdrop-filter: blur(3px);
}
.loading-overlay p { margin-top: 1.2rem; font-size: 1.1rem; opacity: 0.8; }
.spinner {
  width: 45px; height: 45px;
  border: 5px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border-top-color: var(--color-primary);
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.no-data-message {
    text-align: center;
    padding: 2rem;
    opacity: 0.7;
    font-style: italic;
}
</style>