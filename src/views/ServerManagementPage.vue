<!-- src/views/ServerManagementPage.vue -->
<template>
  <MainLayout>
    <div class="dashboard-layout">
      <!-- Sidebar (Assuming you have a reusable sidebar or copy it here) -->
      <aside class="dashboard-sidebar">
        <div class="sidebar-header">
          <RouterLink to="/admin/dashboard" class="sidebar-logo">
            GenAI<span class="gradient-text">Admin</span>
          </RouterLink>
        </div>
        <nav class="sidebar-nav">
          <ul>
            <li>
              <RouterLink to="/admin/dashboard" active-class="active-link">
                <svg><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span>Admin Overview</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/admin/users" active-class="active-link">
                <svg><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span>User Management</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/admin/server-management" exact-active-class="active-link">
                <svg><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
                <span>Server Management</span>
              </RouterLink>
            </li>
             <li>
              <RouterLink to="/admin/system-logs" active-class="active-link">
                <svg><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span>System Logs</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
        <div class="sidebar-footer">
           <button @click="logout" class="logout-button">
             <svg><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
             <span>Logout</span>
           </button>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="dashboard-content server-management-content">
        <div class="content-header">
          <h1>Server Fleet Management</h1>
          <p>Real-time monitoring and control of your GenAI Labs infrastructure.</p>
        </div>

        <!-- Server List Section -->
        <section class="pane-section server-list-section">
          <div class="section-header-controls">
            <h3>Core Application Servers</h3>
            <div class="header-actions">
                <span class="last-updated">Last updated: {{ lastUpdatedTime }}</span>
                <button class="btn btn-secondary btn-small" @click="forceRefreshAllData" :disabled="isLoading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="{'animate-spin': isLoading}"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                  {{ isLoading ? 'Refreshing...' : 'Refresh All' }}
                </button>
            </div>
          </div>

          <div class="server-grid">
            <div v-for="server in coreServers" :key="server.id" class="server-card" :class="`status-${server.status.toLowerCase()}`">
              <div class="card-header">
                <h4 class="server-name">
                  <svg v-if="server.icon" class="server-icon" v-html="server.icon" viewBox="0 0 24 24" width="20" height="20"></svg>
                  {{ server.name }}
                </h4>
                <span class="status-indicator" :title="server.status"></span>
              </div>
              <div class="server-info">
                <p><strong>ID:</strong> <span class="info-value">{{ server.id }}</span></p>
                <p><strong>IP:</strong> <span class="info-value">{{ server.ip }}</span></p>
                <p><strong>Region:</strong> <span class="info-value">{{ server.region }}</span></p>
                <p><strong>Type:</strong> <span class="info-value">{{ server.type }}</span></p>
                <p><strong>OS:</strong> <span class="info-value">{{ server.os }}</span></p>
                <p v-if="server.uptime"><strong>Uptime:</strong> <span class="info-value">{{ server.uptime }}</span></p>
              </div>

              <div class="server-specs" v-if="server.specs">
                <div v-if="server.specs.cpuModel"><strong>CPU Model:</strong> <span class="info-value">{{ server.specs.cpuModel }}</span></div>
                <div v-if="server.specs.cores"><strong>Cores:</strong> <span class="info-value">{{ server.specs.cores }}</span></div>
                <div v-if="server.specs.ramSize"><strong>RAM Size:</strong> <span class="info-value">{{ server.specs.ramSize }}</span></div>
                <div v-if="server.specs.diskSize"><strong>Disk Size:</strong> <span class="info-value">{{ server.specs.diskSize }}</span></div>
                <div v-if="server.specs.gpuType"><strong>GPU:</strong> <span class="info-value">{{ server.specs.gpuType }} ({{ server.specs.gpuCount || 1 }})</span></div>
              </div>

              <div class="server-metrics">
                <div class="metric">
                  <span class="metric-label">CPU</span>
                  <div class="progress-bar-container">
                    <div class="progress-bar" :style="{ width: server.cpuUsage + '%', backgroundColor: getUsageColor(server.cpuUsage) }"></div>
                  </div>
                  <span class="metric-value">{{ server.cpuUsage }}%</span>
                </div>
                <div class="metric">
                  <span class="metric-label">RAM</span>
                   <div class="progress-bar-container">
                    <div class="progress-bar" :style="{ width: server.ramUsage + '%', backgroundColor: getUsageColor(server.ramUsage) }"></div>
                  </div>
                  <span class="metric-value">{{ server.ramUsage }}%</span>
                </div>
                 <div class="metric">
                  <span class="metric-label">Disk</span>
                   <div class="progress-bar-container">
                    <div class="progress-bar" :style="{ width: server.diskUsage + '%', backgroundColor: getUsageColor(server.diskUsage, true) }"></div>
                  </div>
                  <span class="metric-value">{{ server.diskUsage }}%</span>
                </div>
                <div class="metric" v-if="server.networkTraffic !== undefined">
                    <span class="metric-label">Net I/O</span>
                    <span class="metric-value net-traffic">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg> {{ server.networkTraffic.up }} /
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg> {{ server.networkTraffic.down }}
                    </span>
                </div>
                 <div class="metric" v-if="server.gpuUsage !== undefined">
                    <span class="metric-label">GPU</span>
                    <div class="progress-bar-container">
                        <div class="progress-bar" :style="{ width: server.gpuUsage + '%', backgroundColor: getUsageColor(server.gpuUsage) }"></div>
                    </div>
                    <span class="metric-value">{{ server.gpuUsage }}%</span>
                </div>
              </div>

              <div class="server-specific-info" v-if="server.specifics">
                  <p v-if="server.specifics.activeConnections"><strong>Connections:</strong> {{ server.specifics.activeConnections }}</p>
                  <p v-if="server.specifics.requestsPerSec"><strong>Req/s:</strong> {{ server.specifics.requestsPerSec }}</p>
                  <p v-if="server.specifics.errorRate"><strong>Error Rate:</strong> {{ server.specifics.errorRate }}%</p>
                  <p v-if="server.specifics.currentJob"><strong>Current Job:</strong> {{ server.specifics.currentJob }}</p>
                  <p v-if="server.specifics.vectorCount"><strong>Vectors:</strong> {{ server.specifics.vectorCount }}</p>
                  <p v-if="server.specifics.indexSize"><strong>Index Size:</strong> {{ server.specifics.indexSize }}</p>
                  <p v-if="server.specifics.queryLatency"><strong>Avg. Query Latency:</strong> {{ server.specifics.queryLatency }}ms</p>
                  <p v-if="server.specifics.tasksProcessed"><strong>Tasks Processed:</strong> {{ server.specifics.tasksProcessed }}</p>
                  <p v-if="server.specifics.queueLength"><strong>Queue:</strong> {{ server.specifics.queueLength }}</p>
                  <p v-if="server.specifics.tokensPerSec"><strong>Tokens/sec:</strong> {{ server.specifics.tokensPerSec }}</p>
                  <p v-if="server.specifics.activeSessions"><strong>Sessions:</strong> {{ server.specifics.activeSessions }}</p>
              </div>

              <div class="server-actions">
                <button class="action-btn" @click="performServerAction(server.id, 'restart')">Restart</button>
                <button class="action-btn" @click="performServerAction(server.id, 'logs')">View Logs</button>
                <button class="action-btn" @click="performServerAction(server.id, 'console')">Console</button>
                <button class="action-btn" @click="performServerAction(server.id, 'details')">More Details</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Custom GPT Host Server Section -->
        <section class="pane-section custom-gpt-host-section">
          <h3>Custom GPT Host Server (Orchestrator)</h3>
          <div v-if="customGptServer" class="server-card wide-card" :class="`status-${customGptServer.status.toLowerCase()}`">
             <div class="card-header">
                <h4 class="server-name">
                    <svg class="server-icon" viewBox="0 0 24 24" width="20" height="20" v-html="customGptServer.icon"></svg>
                    {{ customGptServer.name }}
                </h4>
                <span class="status-indicator" :title="customGptServer.status"></span>
              </div>
              <div class="server-details-grid">
                <div class="server-info">
                    <p><strong>ID:</strong> <span class="info-value">{{ customGptServer.id }}</span></p>
                    <p><strong>IP:</strong> <span class="info-value">{{ customGptServer.ip }}</span></p>
                    <p><strong>Region:</strong> <span class="info-value">{{ customGptServer.region }}</span></p>
                    <p><strong>Purpose:</strong> <span class="info-value">{{ customGptServer.purpose }}</span></p>
                    <p v-if="customGptServer.uptime"><strong>Uptime:</strong> <span class="info-value">{{ customGptServer.uptime }}</span></p>
                </div>
                 <div class="server-metrics">
                    <div class="metric">
                        <span class="metric-label">CPU</span>
                        <div class="progress-bar-container"><div class="progress-bar" :style="{ width: customGptServer.cpuUsage + '%', backgroundColor: getUsageColor(customGptServer.cpuUsage) }"></div></div>
                        <span class="metric-value">{{ customGptServer.cpuUsage }}%</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">RAM</span>
                        <div class="progress-bar-container"><div class="progress-bar" :style="{ width: customGptServer.ramUsage + '%', backgroundColor: getUsageColor(customGptServer.ramUsage) }"></div></div>
                        <span class="metric-value">{{ customGptServer.ramUsage }}%</span>
                    </div>
                    <div class="metric" v-if="customGptServer.gpuTemp !== undefined">
                        <span class="metric-label">GPU Temp</span>
                        <span class="metric-value temp-value">{{ customGptServer.gpuTemp }}°C</span>
                    </div>
                    <div class="metric" v-if="customGptServer.networkTraffic">
                        <span class="metric-label">Net I/O</span>
                        <span class="metric-value net-traffic">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg> {{ customGptServer.networkTraffic.up }} /
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg> {{ customGptServer.networkTraffic.down }}
                        </span>
                    </div>
                 </div>
              </div>
              <div class="custom-host-specifics">
                  <p><strong>Connected Models:</strong> <span>{{ customGptServer.connectedModels.join(', ') }}</span></p>
                  <p><strong>Active GPT Sessions:</strong> <span>{{ customGptServer.specifics.activeGptSessions }}</span></p>
                  <p><strong>Orchestrated Services:</strong></p>
                  <ul>
                      <li v-for="service in customGptServer.specifics.orchestratedServices" :key="service.name">
                          {{ service.name }}: <span :class="`status-text-${service.status.toLowerCase()}`">{{ service.status }}</span>
                      </li>
                  </ul>
              </div>
              <div class="server-actions">
                <button class="action-btn" @click="performServerAction(customGptServer.id, 'restart_orchestrator')">Restart Orchestrator</button>
                <button class="action-btn" @click="performServerAction(customGptServer.id, 'deploy_gpt_update')">Deploy GPT Model Update</button>
                <button class="action-btn" @click="performServerAction(customGptServer.id, 'system_diagnostics')">Run Diagnostics</button>
              </div>
          </div>
           <div v-else><p>Custom GPT Host server details not available.</p></div>
        </section>

        <!-- Bandwidth Management & Technical Systems -->
        <section class="pane-section technical-systems-section">
          <h3>Global Infrastructure & Systems</h3>
          <div class="systems-grid">
            <div class="system-module">
              <h4>Global Bandwidth Monitor</h4>
              <p><strong>Total Ingress (24h):</strong> {{ globalStats.bandwidth.ingress24h }}</p>
              <p><strong>Total Egress (24h):</strong> {{ globalStats.bandwidth.egress24h }}</p>
              <p><strong>Peak Throughput (1h):</strong> {{ globalStats.bandwidth.peakThroughput1h }}</p>
              <p><strong>Overall Latency (Avg):</strong> {{ globalStats.latency.avgGlobal }}ms</p>
              <div class="placeholder-chart">Real-time Bandwidth Graph</div>
              <button class="action-btn" @click="manageFirewall">Global Firewall Policies</button>
            </div>
            <div class="system-module">
              <h4>Load Balancing Clusters</h4>
              <p><strong>API Cluster:</strong> <span :class="`status-text-${globalStats.loadBalancers.api.status.toLowerCase()}`">{{ globalStats.loadBalancers.api.status }}</span> ({{ globalStats.loadBalancers.api.nodes }} nodes)</p>
              <p><strong>Inference Cluster:</strong> <span :class="`status-text-${globalStats.loadBalancers.inference.status.toLowerCase()}`">{{ globalStats.loadBalancers.inference.status }}</span> ({{ globalStats.loadBalancers.inference.nodes }} nodes)</p>
              <RouterLink to="/admin/load-balancer-config" class="action-btn">Manage Clusters</RouterLink>
            </div>
            <div class="system-module">
              <h4>Data Backup & Replication</h4>
              <p><strong>Primary DB Backup:</strong> {{ globalStats.backups.primaryDB.lastBackup }} (<span :class="`status-text-${globalStats.backups.primaryDB.status.toLowerCase()}`">{{ globalStats.backups.primaryDB.status }}</span>)</p>
              <p><strong>Vector DB Replication:</strong> {{ globalStats.backups.vectorDB.replicationLag }} lag (<span :class="`status-text-${globalStats.backups.vectorDB.status.toLowerCase()}`">{{ globalStats.backups.vectorDB.status }}</span>)</p>
              <button class="action-btn" @click="triggerBackup('all')">Initiate Full System Backup</button>
            </div>
             <div class="system-module">
              <h4>Security Operations Center (SOC)</h4>
              <p><strong>Threat Level:</strong> <span :style="{color: getThreatColor(globalStats.security.threatLevel)}">{{ globalStats.security.threatLevel }}</span></p>
              <p><strong>Incidents (24h):</strong> {{ globalStats.security.incidents24h }} ({{ globalStats.security.criticalIncidents }} critical)</p>
              <p><strong>Last PenTest:</strong> {{ globalStats.security.lastPenTest }}</p>
              <RouterLink to="/admin/security-dashboard" class="action-btn">Access SOC Dashboard</RouterLink>
            </div>
          </div>
        </section>

      </main>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import { RouterLink, useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Server icons (simple SVG paths)
const icons = {
  api: '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.92V12H5V6.3l7-3.11v8.8z"></path>', // Shield icon
  ml: '<path d="M17.21 9l-4.38-6.36c-.19-.28-.51-.42-.83-.42s-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1s.45 1 1 1h4.79l4.38 6.36c.19.28.51.42.83.42s.64-.14.83-.43L17.21 11H22c.55 0 1-.45 1-1s-.45-1-1-1h-4.79z"></path>', // ML/Neural net like
  dl: '<path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>', // Focus/target
  rag: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path><path d="M14 2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h8l6-6V6l-6-4z"></path>', // Document/DB + Pen
  nlp: '<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>', // Chat bubble
  gpt: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"></path><path d="M11.5 5.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5S13.83 4 13 4s-1.5.67-1.5 1.5z"></path>', // Brain/AI like
  orchestrator: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 4h2v6h-2z"></path>', // Gear or abstract node
};


export default {
  name: 'ServerManagementPage',
  components: {
    MainLayout,
    RouterLink
  },
  setup() {
    const router = useRouter();
    const coreServers = ref([]);
    const customGptServer = ref(null);
    const globalStats = ref({ // Placeholder for global system stats
        bandwidth: { ingress24h: '0 TB', egress24h: '0 TB', peakThroughput1h: '0 Mbps' },
        latency: { avgGlobal: 0 },
        loadBalancers: {
            api: { status: 'Unknown', nodes: 0 },
            inference: { status: 'Unknown', nodes: 0 }
        },
        backups: {
            primaryDB: { lastBackup: 'N/A', status: 'Unknown' },
            vectorDB: { replicationLag: 'N/A', status: 'Unknown' }
        },
        security: { threatLevel: 'Low', incidents24h: 0, criticalIncidents: 0, lastPenTest: 'N/A' }
    });

    const isLoading = ref(false);
    const lastUpdatedTime = ref(new Date().toLocaleTimeString());
    let pollingInterval = null;

    const generateRandomUptime = () => {
        const days = Math.floor(Math.random() * 30);
        const hours = Math.floor(Math.random() * 24);
        const minutes = Math.floor(Math.random() * 60);
        return `${days}d ${hours}h ${minutes}m`;
    }

    const mockInitialServerData = () => {
      coreServers.value = [
        { id: 'api-syd-01', name: 'API Server (Sydney)', ip: '203.0.113.10', region: 'ap-southeast-2', type: 'Application Gateway', os: 'Ubuntu 22.04 LTS', status: 'Online', cpuUsage: 35, ramUsage: 60, diskUsage: 40, uptime: generateRandomUptime(), networkTraffic: {up: '10 Mbps', down: '50 Mbps'}, icon: icons.api, specs: {cpuModel: 'Intel Xeon E5-2680 v4', cores: 8, ramSize: '32 GB', diskSize: '500 GB SSD'}, specifics: { activeConnections: 150, requestsPerSec: 850, errorRate: 0.1 }},
        { id: 'ml-gpu-usw2-01', name: 'ML Training Cluster Node 1', ip: '198.51.100.11', region: 'us-west-2', type: 'Compute (GPU)', os: 'Ubuntu 22.04 LTS', status: 'Online', cpuUsage: 75, ramUsage: 80, diskUsage: 65, uptime: generateRandomUptime(), networkTraffic: {up: '5 Mbps', down: '20 Mbps'}, gpuUsage: 60, icon: icons.ml, specs: {cpuModel: 'AMD EPYC 7R32', cores: 16, ramSize: '128 GB', diskSize: '2 TB NVMe', gpuType: 'NVIDIA A100', gpuCount: 2}, specifics: { currentJob: 'ImageNet ResNet50 Fine-tuning', modulesLoaded: ['TensorFlow', 'PyTorch', 'CUDA 11.8'] }},
        { id: 'dl-infer-euc1-01', name: 'DL Inference Endpoint (Frankfurt)', ip: '192.0.2.12', region: 'eu-central-1', type: 'Compute (GPU)', os: 'Ubuntu 22.04 LTS', status: 'Degraded', cpuUsage: 90, ramUsage: 70, diskUsage: 50, uptime: generateRandomUptime(), networkTraffic: {up: '2 Mbps', down: '5 Mbps'}, gpuUsage: 85, icon: icons.dl, specs: {cpuModel: 'Intel Xeon Gold 6248R', cores: 4, ramSize: '16 GB', diskSize: '256 GB SSD', gpuType: 'NVIDIA T4'}, specifics: { modelLoaded: 'Object Detection v3.1', avgInferenceTime: '35ms' }},
        { id: 'rag-db-use1-01', name: 'RAG Vector Database (Primary)', ip: '203.0.113.13', region: 'us-east-1', type: 'Database (Vector)', os: 'Debian 11', status: 'Online', cpuUsage: 20, ramUsage: 50, diskUsage: 75, uptime: generateRandomUptime(), networkTraffic: {up: '1 Mbps', down: '1 Mbps'}, icon: icons.rag, specs: {cpuModel: 'Intel Xeon Scalable', cores: 8, ramSize: '64 GB', diskSize: '4 TB NVMe Array'}, specifics: { vectorCount: '150M', indexSize: '1.2 TB', queryLatency: 15, dbEngine: 'Milvus 2.3' }},
        { id: 'nlp-proc-usw2-01', name: 'NLP Processing Unit (Oregon)', ip: '198.51.100.14', region: 'us-west-2', type: 'Application (CPU Intensive)', os: 'Ubuntu 22.04 LTS', status: 'Offline', cpuUsage: 0, ramUsage: 0, diskUsage: 30, uptime: 'N/A', networkTraffic: {up: '0 Mbps', down: '0 Mbps'}, icon: icons.nlp, specs: {cpuModel: 'AMD EPYC 7502P', cores: 32, ramSize: '256 GB', diskSize: '1 TB SSD'}, specifics: { tasksProcessed: 0, queueLength: 0, supportedLanguages: ['EN', 'ES', 'FR', 'DE'] }},
        { id: 'gpt-infer-euc1-02', name: 'GPT Inference Node (Frankfurt)', ip: '192.0.2.15', region: 'eu-central-1', type: 'Compute (TPU/GPU)', os: 'Ubuntu 22.04 LTS', status: 'Online', cpuUsage: 60, ramUsage: 85, diskUsage: 55, uptime: generateRandomUptime(), networkTraffic: {up: '8 Mbps', down: '2 Mbps'}, gpuUsage: 70, icon: icons.gpt, specs: {cpuModel: 'Intel Xeon Gold 6248R', cores: 8, ramSize: '64 GB', diskSize: '1 TB NVMe', gpuType: 'Google TPU v4 / NVIDIA A10G'}, specifics: { tokensPerSec: 1200, activeSessions: 45, modelFamily: 'GPT-NeoX Based' }},
      ];
      customGptServer.value = {
        id: 'custom-gpt-orch-01', name: 'Custom GPT Orchestrator', ip: '10.0.0.5', region: 'Datacenter Alpha (On-Premise)', type: 'Orchestrator/Compute', os: 'Hardened RHEL 9', status: 'Online',
        purpose: 'Hosting Personal GPT Model & orchestrating connected services for advanced RAG.',
        connectedModels: ['MyPersonalGPT-v3-RAG', 'Internal Knowledge Base Model'],
        cpuUsage: 55, ramUsage: 70, gpuTemp: 65, diskUsage: 60, uptime: generateRandomUptime(), networkTraffic: {up: '50 Mbps', down: '10 Mbps'}, icon: icons.orchestrator,
        specs: {cpuModel: 'Dual Intel Xeon Platinum 8380H', cores: 56, ramSize: '512 GB ECC', diskSize: '10 TB NVMe RAID', gpuType: '4 x NVIDIA H100'},
        specifics: { activeGptSessions: 12, orchestratedServices: [{name: 'RAG DB Cluster', status: 'Online'}, {name: 'Document Ingestion Pipeline', status: 'Idle'}, {name: 'Real-time API Feed', status: 'Online'}]}
      };
    };

    const simulateMetricUpdates = () => {
        coreServers.value.forEach(server => {
            if (server.status === 'Online' || server.status === 'Degraded') {
                server.cpuUsage = Math.max(0, Math.min(100, server.cpuUsage + Math.floor(Math.random() * 11) - 5)); // Fluctuate +/- 5
                server.ramUsage = Math.max(0, Math.min(100, server.ramUsage + Math.floor(Math.random() * 7) - 3));
                if (server.gpuUsage !== undefined) {
                    server.gpuUsage = Math.max(0, Math.min(100, server.gpuUsage + Math.floor(Math.random() * 11) - 5));
                }
                 if (server.networkTraffic) {
                    server.networkTraffic.up = `${Math.floor(Math.random() * 50)} Mbps`;
                    server.networkTraffic.down = `${Math.floor(Math.random() * 100)} Mbps`;
                }
                 if(server.specifics) {
                    if(server.specifics.activeConnections !== undefined) server.specifics.activeConnections = Math.max(0, server.specifics.activeConnections + Math.floor(Math.random()*21)-10);
                    if(server.specifics.requestsPerSec !== undefined) server.specifics.requestsPerSec = Math.max(0, server.specifics.requestsPerSec + Math.floor(Math.random()*101)-50);
                    if(server.specifics.errorRate !== undefined) server.specifics.errorRate = Math.max(0, Math.min(10, parseFloat((server.specifics.errorRate + (Math.random()*0.2)-0.1).toFixed(1)) ));
                    if(server.specifics.queryLatency !== undefined) server.specifics.queryLatency = Math.max(5, server.specifics.queryLatency + Math.floor(Math.random()*5)-2);
                    if(server.specifics.queueLength !== undefined) server.specifics.queueLength = Math.max(0, server.specifics.queueLength + Math.floor(Math.random()*3)-1);
                    if(server.specifics.tokensPerSec !== undefined) server.specifics.tokensPerSec = Math.max(0, server.specifics.tokensPerSec + Math.floor(Math.random()*201)-100);
                    if(server.specifics.activeSessions !== undefined) server.specifics.activeSessions = Math.max(0, server.specifics.activeSessions + Math.floor(Math.random()*5)-2);
                 }
            }
        });
        if (customGptServer.value && (customGptServer.value.status === 'Online' || customGptServer.value.status === 'Degraded')) {
            customGptServer.value.cpuUsage = Math.max(0, Math.min(100, customGptServer.value.cpuUsage + Math.floor(Math.random() * 11) - 5));
            customGptServer.value.ramUsage = Math.max(0, Math.min(100, customGptServer.value.ramUsage + Math.floor(Math.random() * 7) - 3));
            if (customGptServer.value.gpuTemp !== undefined) {
                 customGptServer.value.gpuTemp = Math.max(30, Math.min(95, customGptServer.value.gpuTemp + Math.floor(Math.random() * 5) - 2));
            }
            if (customGptServer.value.networkTraffic) {
                customGptServer.value.networkTraffic.up = `${Math.floor(Math.random() * 100)} Mbps`;
                customGptServer.value.networkTraffic.down = `${Math.floor(Math.random() * 50)} Mbps`;
            }
            if (customGptServer.value.specifics.activeGptSessions !== undefined) {
                customGptServer.value.specifics.activeGptSessions = Math.max(0, customGptServer.value.specifics.activeGptSessions + Math.floor(Math.random()*3)-1);
            }
        }
        // Simulate global stats update
        globalStats.value.bandwidth.ingress24h = `${(Math.random()*5 + 1).toFixed(1)} TB`;
        globalStats.value.bandwidth.egress24h = `${(Math.random()*3 + 0.5).toFixed(1)} TB`;
        globalStats.value.bandwidth.peakThroughput1h = `${Math.floor(Math.random()*500 + 100)} Gbps`;
        globalStats.value.latency.avgGlobal = Math.floor(Math.random()*50 + 20);


        lastUpdatedTime.value = new Date().toLocaleTimeString();
    };

    const forceRefreshAllData = () => {
        if(isLoading.value) return;
        isLoading.value = true;
        console.log("Force refreshing all server data...");
        // In a real app, this would be an API call to fetch fresh data from the backend
        setTimeout(() => {
            mockInitialServerData(); // Re-initialize with base mock data
            simulateMetricUpdates(); // Apply one round of fluctuations
            isLoading.value = false;
            alert("All server data refreshed (simulated).");
        }, 1500);
    };

    onMounted(() => {
      mockInitialServerData();
      simulateMetricUpdates(); // Initial update
      pollingInterval = setInterval(simulateMetricUpdates, 1000); // Poll every second
    });

    onUnmounted(() => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    });

    const performServerAction = (serverId, action) => {
      alert(`Performing action '${action}' on server '${serverId}' (simulated).`);
    };
    const manageFirewall = () => alert("Opening firewall management interface (simulated).");
    const triggerBackup = (scope) => alert(`Manual backup for '${scope}' initiated (simulated).`);
    const logout = () => router.push('/admin/login');

    const getUsageColor = (usage, isDisk = false) => {
        const highThreshold = isDisk ? 85 : 80;
        const mediumThreshold = isDisk ? 70 : 60;
        if (usage >= highThreshold) return '#dc3545'; // Red
        if (usage >= mediumThreshold) return '#ffc107'; // Yellow
        return '#28a745'; // Green (or your var(--color-primary))
    };
     const getThreatColor = (level) => {
        if (level === 'Critical') return '#dc3545';
        if (level === 'High') return '#e57373';
        if (level === 'Medium') return '#ffc107';
        return '#28a745';
    };


    return {
      coreServers,
      customGptServer,
      globalStats,
      isLoading,
      lastUpdatedTime,
      forceRefreshAllData,
      performServerAction,
      manageFirewall,
      triggerBackup,
      logout,
      getUsageColor,
      getThreatColor
    };
  }
};
</script>

<style scoped>
/* Import or reuse dashboard layout styles */
 /* @import './UserDashboardPage.css'; */ /* Ensure this path is correct or styles are global */

.dashboard-layout { display: flex; min-height: calc(100vh - 80px); background-color: var(--color-background); }
.dashboard-sidebar { width: 260px; background: rgba(15, 23, 42, 0.8); border-right: 1px solid rgba(255, 255, 255, 0.1); padding: 1.5rem 0; display: flex; flex-direction: column; }
.sidebar-header { padding: 0 1.5rem 1.5rem 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 1rem; }
.sidebar-logo { font-size: 1.5rem; font-weight: 700; }
.sidebar-nav { flex-grow: 1; overflow-y: auto; } .sidebar-nav ul { list-style: none; padding: 0; margin: 0; }
.sidebar-nav li a, .sidebar-footer a, .logout-button { display: flex; align-items: center; gap: 1rem; padding: 0.9rem 1.5rem; color: var(--color-text); opacity: 0.7; font-weight: 500; transition: all 0.2s ease-in-out; border-left: 3px solid transparent; text-decoration: none; font-size: 0.95rem; }
.sidebar-nav li a:hover, .sidebar-footer a:hover, .logout-button:hover { opacity: 1; background-color: rgba(255, 255, 255, 0.05); }
.sidebar-nav li a.active-link { opacity: 1; color: var(--color-primary); border-left-color: var(--color-primary); background-color: rgba(229, 170, 132, 0.1); }
.sidebar-nav svg { width: 20px; height: 20px; stroke: currentColor; stroke-width: 2; fill: none; stroke-linecap: round; stroke-linejoin: round; opacity: 0.8; }
.sidebar-footer { margin-top: auto; padding: 1rem 0; border-top: 1px solid rgba(255, 255, 255, 0.1); }
.logout-button { width: 100%; text-align: left; background: none; border: none; cursor: pointer; color: var(--color-text); }
.logout-button:hover { color: #ef4444; } .logout-button svg { stroke: #ef4444; }
.dashboard-content { flex: 1; padding: 2.5rem; overflow-y: auto; position: relative; }
.content-header { margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
.content-header h1 { font-size: 1.8rem; font-weight: 600; margin-bottom: 0.5rem; } .content-header p { opacity: 0.8; }
@media (max-width: 768px) { .dashboard-layout { flex-direction: column; } .dashboard-sidebar { width: 100%; height: auto; border-right: none; border-bottom: 1px solid rgba(255, 255, 255, 0.1); } .dashboard-content { padding: 1.5rem; } }


/* Server Management Specific Styles */
.server-management-content .content-header h1 {
    text-transform: capitalize;
}

.pane-section {
    background: rgba(255, 255, 255, 0.03);
    padding: 1.5rem 2rem;
    border-radius: 12px; /* Slightly more rounded */
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 2.5rem; /* Increased spacing */
    box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* Subtle shadow */
}
.pane-section:last-child { margin-bottom: 0; }

.pane-section h3 {
    font-size: 1.5rem; /* Slightly larger section titles */
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: var(--color-secondary);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1rem; /* Increased padding */
}

.section-header-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}
.section-header-controls h3 { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }

.header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.last-updated {
    font-size: 0.8rem;
    opacity: 0.6;
}

.btn-small { padding: 0.5rem 1rem; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.5rem; }
.btn-small svg { opacity: 0.8; }
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }


.server-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 2rem; } /* Wider cards */

.server-card {
  background-color: rgba(30, 41, 59, 0.7); /* Darker card bg */
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 6px solid grey;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  display: flex;
  flex-direction: column;
}
.server-card:hover { box-shadow: 0 8px 25px rgba(0,0,0,0.25); transform: translateY(-3px); }

.server-card.status-online { border-left-color: #28a745; }
.server-card.status-offline { border-left-color: #dc3545; opacity: 0.7; }
.server-card.status-degraded { border-left-color: #ffc107; }

.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
.server-name { font-size: 1.2rem; font-weight: 600; color: var(--color-text); display: flex; align-items: center; gap: 0.5rem; }
.server-icon { fill: currentColor; opacity: 0.7; }


.status-indicator { width: 12px; height: 12px; border-radius: 50%; background-color: grey; }
.status-online .status-indicator { background-color: #28a745; box-shadow: 0 0 8px #28a745; }
.status-offline .status-indicator { background-color: #dc3545; }
.status-degraded .status-indicator { background-color: #ffc107; box-shadow: 0 0 8px #ffc107; }

.server-info { margin-bottom: 1rem; }
.server-info p { font-size: 0.85rem; opacity: 0.8; margin-bottom: 0.5rem; line-height: 1.5; display: flex; justify-content: space-between; }
.server-info p strong { font-weight: 500; opacity: 1; color: var(--color-text); margin-right: 0.5rem; }
.info-value { text-align: right; color: var(--color-text-secondary, #bdc1c6); /* A slightly lighter grey for values */ }

.server-specs {
    font-size: 0.8rem;
    opacity: 0.7;
    margin-bottom: 1rem;
    border-top: 1px dashed rgba(255,255,255,0.1);
    padding-top: 0.8rem;
}
.server-specs div { margin-bottom: 0.3rem; display: flex; justify-content: space-between;}


.server-metrics { margin: 1rem 0; }
.metric { display: flex; align-items: center; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.6rem; color: var(--color-text); opacity: 0.9; }
.metric-label { min-width: 35px; opacity: 0.8; }
.progress-bar-container { flex-grow: 1; height: 10px; background-color: rgba(255,255,255,0.1); border-radius: 5px; margin: 0 0.75rem; overflow: hidden; }
.progress-bar { height: 100%; border-radius: 5px; transition: width 0.3s ease-in-out, background-color 0.3s ease; }
.metric-value { min-width: 40px; text-align: right; font-weight: 500; }
.net-traffic { display: inline-flex; align-items: center; gap: 0.3rem; font-size: 0.8rem; }
.net-traffic svg { opacity: 0.7; }
.temp-value { color: var(--color-accent-1); font-weight: 500; }


.server-specific-info {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-bottom: 1rem;
    border-top: 1px dashed rgba(255,255,255,0.1);
    padding-top: 0.8rem;
}
.server-specific-info p { margin-bottom: 0.4rem; display: flex; justify-content: space-between;}
.server-specific-info p strong { margin-right: 0.5rem; }


.server-actions { margin-top: auto; /* Push to bottom of card */ display: flex; gap: 0.5rem; flex-wrap: wrap; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); }
.action-btn { background-color: rgba(255, 255, 255, 0.08); color: var(--color-text); padding: 0.6rem 1rem; border-radius: 5px; font-size: 0.8rem; border: 1px solid rgba(255,255,255,0.1); transition: background-color 0.2s ease; flex-grow: 1; text-align: center; }
.action-btn:hover { background-color: rgba(var(--color-primary-rgb, 229, 170, 132), 0.2); border-color: rgba(var(--color-primary-rgb, 229, 170, 132), 0.5); } /* Use your primary color */


.custom-gpt-host-section .server-card { /* Special styling for the main orchestrator */
    border-left-color: var(--color-accent-2); /* Unique accent */
}
.server-details-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 1rem; }
.custom-gpt-host-section .server-metrics .metric { justify-content: flex-start; gap: 0.5rem; }
.custom-host-specifics {
    padding: 1rem 0;
    border-top: 1px dashed rgba(255,255,255,0.1);
    margin-top: 1rem;
}
.custom-host-specifics p, .custom-host-specifics ul { font-size: 0.9rem; margin-bottom: 0.5rem; }
.custom-host-specifics ul { list-style: none; padding-left: 0.5rem; }
.custom-host-specifics li { margin-bottom: 0.3rem; }
.custom-host-specifics span { color: var(--color-text-secondary, #bdc1c6); }
.status-text-online { color: #28a745; }
.status-text-offline { color: #dc3545; }
.status-text-degraded { color: #ffc107; }
.status-text-idle { color: #6c757d; }


.systems-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.system-module { background-color: rgba(39, 51, 73, 0.6); border-radius: 10px; padding: 1.5rem; } /* Slightly different bg for modules */
.system-module h4 { font-size: 1.2rem; font-weight: 600; color: var(--color-primary); margin-bottom: 1rem; }
.system-module p { font-size: 0.9rem; opacity: 0.8; margin-bottom: 0.5rem; }
.placeholder-chart { height: 120px; background-color: rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center; color: #777; border-radius: 6px; margin: 1rem 0; font-size: 0.9rem; }
.alert-count.critical { color: #dc3545; font-weight: bold; }
.system-module .action-btn { margin-top: 1rem; background-color: rgba(255,255,255,0.1); }
.system-module .action-btn:hover { background-color: rgba(255,255,255,0.2); }

:root { /* Add this if not already defined globally for the color conversion */
    --color-primary-rgb: 229, 170, 132; /* RGB values for your primary color */
}

</style>