<!-- src/views/UserApiKeysPage.vue -->
<template>
    <MainLayout>
      <div class="dashboard-layout">
        <!-- Sidebar (Copy from UserDashboardPage.vue or use a shared component) -->
        <aside class="dashboard-sidebar">
          <!-- ... Sidebar HTML ... -->
           <div class="sidebar-header">
            <RouterLink to="/" class="sidebar-logo">
              GenAI<span class="gradient-text">Labs</span>
            </RouterLink>
          </div>
          <nav class="sidebar-nav">
            <ul>
              <li>
                <RouterLink :to="`/s/user-dashboard/${userId}`" exact-active-class="active-link">
                  <svg><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  <span>Overview</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/projects/some-project-id" active-class="active-link">
                   <svg><path d="M2 6 L2 22 L14 22 L14 10 L22 10 L22 2 L10 2 L10 6 Z"></path></svg>
                  <span>Projects</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/user-dashboard/metrics" active-class="active-link">
                  <svg><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                  <span>Metrics</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/marketplace/models" active-class="active-link">
                   <svg><path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.7A2 2 0 0 0 15 11H9a2 2 0 0 0-2.3 2H4"></path></svg>
                  <span>Model Hub</span>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/user-dashboard/api-keys" active-class="active-link">
                  <svg><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                  <span>API Keys</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/user/usage" active-class="active-link">
                   <svg><path d="M12 8V4H8"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect><path d="M4 12h8"></path><path d="M12 12v8"></path></svg>
                  <span>Usage</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/payments" active-class="active-link">
                   <svg><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                  <span>Billing</span>
                </RouterLink>
              </li>
               <li>
                <RouterLink to="/docs" active-class="active-link">
                   <svg><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  <span>Documentation</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
          <div class="sidebar-footer">
             <RouterLink to="/user/profile" active-class="active-link">
               <svg><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
               <span>Profile</span>
             </RouterLink>
             <RouterLink to="/user/security" active-class="active-link">
               <svg><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
               <span>Security</span>
             </RouterLink>
             <button @click="logout" class="logout-button">
               <svg><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
               <span>Logout</span>
             </button>
          </div>
        </aside>
  
        <!-- Main Content Area -->
        <main class="dashboard-content">
          <div class="content-header">
            <h1>API Keys</h1>
            <p>Manage your API keys for accessing GenAI Labs services programmatically.</p>
            <button @click="showCreateKeyModal = true" class="btn btn-primary header-action">Create New API Key</button>
          </div>
  
          <div class="dashboard-card api-keys-table-card">
            <div v-if="isLoading" class="loading-indicator">Loading API keys...</div>
            <div v-else-if="apiKeys.length > 0">
              <table>
                <thead>
                  <tr>
                    <th>Name / Label</th>
                    <th>Key (Prefix)</th>
                    <th>Created At</th>
                    <th>Last Used</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="key in apiKeys" :key="key.id">
                    <td>{{ key.name }}</td>
                    <td><code>{{ key.prefix }}...</code></td>
                    <td>{{ formatDate(key.createdAt) }}</td>
                    <td>{{ key.lastUsed ? formatDate(key.lastUsed) : 'Never' }}</td>
                    <td><span :class="['status-badge', key.isActive ? 'status-active' : 'status-inactive']">{{ key.isActive ? 'Active' : 'Inactive' }}</span></td>
                    <td>
                      <button @click="editKey(key)" class="action-btn edit-btn" title="Edit Label">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                      </button>
                      <button @click="toggleKeyStatus(key)" class="action-btn status-toggle-btn" :title="key.isActive ? 'Deactivate Key' : 'Activate Key'">
                          <svg v-if="key.isActive" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> <!-- Deactivate icon -->
                          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> <!-- Activate icon -->
                      </button>
                      <button @click="deleteKey(key.id)" class="action-btn delete-btn" title="Delete Key">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="no-data-message">
              You haven't created any API keys yet.
            </div>
          </div>
  
          <!-- Create/Show API Key Modal -->
          <div v-if="showCreateKeyModal || newApiKey.value" class="modal-overlay" @click.self="closeModal">
              <div class="modal-content api-key-modal">
                  <button @click="closeModal" class="close-modal-btn">×</button>
                  <h3 v-if="!newApiKey.value">Create New API Key</h3>
                  <h3 v-else>API Key Created Successfully!</h3>
  
                  <div v-if="newApiKey.value" class="new-key-display">
                      <p><strong>Important:</strong> This is the only time you will see this API key. Please copy it and store it securely.</p>
                      <div class="key-value-container">
                          <code>{{ newApiKey.value }}</code>
                          <button @click="copyToClipboard(newApiKey.value)" class="copy-key-btn">Copy</button>
                      </div>
                      <p><strong>Label:</strong> {{ newApiKey.name }}</p>
                      <button @click="closeModal" class="btn btn-primary modal-close-confirm">I have copied my API key</button>
                  </div>
  
                  <form v-else @submit.prevent="handleCreateKey">
                      <div class="form-group">
                          <label for="key-name">Key Name / Label:</label>
                          <input type="text" id="key-name" v-model="newApiKey.name" required placeholder="e.g., My Production App">
                      </div>
                      <!-- Add permission scopes selection here if applicable -->
                      <button type="submit" class="btn btn-primary" :disabled="isCreatingKey">
                          <span v-if="isCreatingKey">Creating...</span>
                          <span v-else>Generate Key</span>
                      </button>
                  </form>
              </div>
          </div>
  
        </main>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref, reactive, onMounted } from 'vue';
  
  export default {
    name: 'UserApiKeysPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const isLoading = ref(false);
      const apiKeys = ref([]);
      const showCreateKeyModal = ref(false);
      const isCreatingKey = ref(false);
      const newApiKey = reactive({ name: '', value: null }); // To store newly generated key
  
      const fetchApiKeys = () => {
        isLoading.value = true;
        console.log("Fetching API keys...");
        setTimeout(() => {
          apiKeys.value = [
            { id: 'key_1', name: 'Production App', prefix: 'sk_live_abc123', createdAt: '2023-10-01T10:00:00Z', lastUsed: '2024-03-09T12:00:00Z', isActive: true },
            { id: 'key_2', name: 'Development Script', prefix: 'sk_test_xyz789', createdAt: '2024-01-15T14:30:00Z', lastUsed: null, isActive: true },
            { id: 'key_3', name: 'Old Integration (Inactive)', prefix: 'sk_live_old456', createdAt: '2022-05-20T09:00:00Z', lastUsed: '2023-08-01T11:00:00Z', isActive: false },
          ];
          isLoading.value = false;
        }, 1000);
      };
  
      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString(undefined, options);
      };
  
      const handleCreateKey = () => {
          if (!newApiKey.name.trim()) {
              alert("Please provide a name for the API key.");
              return;
          }
          isCreatingKey.value = true;
          console.log("Creating API key:", newApiKey.name);
          setTimeout(() => {
              // Simulate backend generating a key
              newApiKey.value = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
              // Don't add to apiKeys list yet, user needs to acknowledge copying it.
              isCreatingKey.value = false;
              // showCreateKeyModal remains true to show the key
          }, 1500);
      };
  
      const closeModal = () => {
          if (newApiKey.value) { // If a key was just created
              fetchApiKeys(); // Refetch to include the new key (or add locally if backend doesn't return full list)
          }
          showCreateKeyModal.value = false;
          newApiKey.name = '';
          newApiKey.value = null;
      };
  
      const copyToClipboard = (text) => {
          navigator.clipboard.writeText(text).then(() => {
              alert('API Key copied to clipboard!');
          }).catch(err => {
              console.error('Failed to copy: ', err);
              alert('Failed to copy API Key. Please copy it manually.');
          });
      };
  
      const editKey = (key) => {
          const newName = prompt("Enter new name/label for this API key:", key.name);
          if (newName && newName.trim() !== key.name) {
              console.log(`Updating key ${key.id} name to: ${newName}`);
              key.name = newName.trim(); // Update locally, API call to backend
          }
      };
      const toggleKeyStatus = (key) => {
          console.log(`${key.isActive ? 'Deactivating' : 'Activating'} key: ${key.id}`);
          key.isActive = !key.isActive; // Update locally, API call to backend
      };
      const deleteKey = (keyId) => {
          if (confirm("Are you sure you want to delete this API key? This action cannot be undone.")) {
              console.log("Deleting API key:", keyId);
              apiKeys.value = apiKeys.value.filter(k => k.id !== keyId);
              // API call to backend
          }
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(fetchApiKeys);
  
      return {
        logout,
        userId,
        isLoading,
        apiKeys,
        formatDate,
        showCreateKeyModal,
        isCreatingKey,
        newApiKey,
        handleCreateKey,
        closeModal,
        copyToClipboard,
        editKey,
        toggleKeyStatus,
        deleteKey
      };
    }
  };
  </script>
 <style scoped>
 /* Import or reuse dashboard layout styles */
 /* @import './UserDashboardPage.css'; */
 .dashboard-layout {
   display: flex;
   min-height: calc(100vh - 80px); /* Full height minus navbar */
   background-color: var(--color-background); /* Ensure background consistency */
 }
 
 /* Sidebar Styles */
 .dashboard-sidebar {
   width: 260px;
   background: rgba(15, 23, 42, 0.8); /* Slightly darker/different background */
   border-right: 1px solid rgba(255, 255, 255, 0.1);
   padding: 1.5rem 0;
   display: flex;
   flex-direction: column;
   transition: width 0.3s ease; /* For potential collapse */
 }
 
 .sidebar-header {
     padding: 0 1.5rem 1.5rem 1.5rem;
     border-bottom: 1px solid rgba(255, 255, 255, 0.1);
     margin-bottom: 1rem;
 }
 .sidebar-logo {
     font-size: 1.5rem;
     font-weight: 700;
 }
 
 .sidebar-nav {
     flex-grow: 1;
     overflow-y: auto; /* Scroll if content overflows */
 }
 .sidebar-nav ul {
   list-style: none;
   padding: 0;
   margin: 0;
 }
 
 .sidebar-nav li a, .sidebar-footer a, .logout-button {
   display: flex;
   align-items: center;
   gap: 1rem;
   padding: 0.9rem 1.5rem;
   color: var(--color-text);
   opacity: 0.7;
   font-weight: 500;
   transition: all 0.2s ease-in-out;
   border-left: 3px solid transparent; /* Indicator for active link */
   text-decoration: none;
   font-size: 0.95rem;
 }
 .sidebar-nav li a:hover, .sidebar-footer a:hover, .logout-button:hover {
   opacity: 1;
   background-color: rgba(255, 255, 255, 0.05);
 }
 
 .sidebar-nav li a.active-link, .sidebar-footer a.active-link {
   opacity: 1;
   color: var(--color-primary);
   border-left-color: var(--color-primary);
   background-color: rgba(229, 170, 132, 0.1); /* Primary color tint */
 }
 
 .sidebar-nav svg, .sidebar-footer svg {
     width: 20px;
     height: 20px;
     stroke: currentColor;
     stroke-width: 2;
     fill: none;
     stroke-linecap: round;
     stroke-linejoin: round;
     opacity: 0.8;
 }
 .sidebar-nav li a.active-link svg, .sidebar-footer a.active-link svg {
     opacity: 1;
 }
 
 .sidebar-footer {
     margin-top: auto; /* Pushes footer to bottom */
     padding: 1rem 0;
     border-top: 1px solid rgba(255, 255, 255, 0.1);
 }
 .logout-button {
     width: 100%;
     text-align: left;
     background: none;
     border: none;
     cursor: pointer;
     color: var(--color-text); /* Or a red color */
 }
 .logout-button:hover {
     color: #ef4444; /* Red hover */
 }
 .logout-button svg {
     stroke: #ef4444; /* Red icon */
 }
 
 
 /* Main Content Styles (from UserDashboardPage.css) */
 .dashboard-content {
   flex: 1;
   padding: 2.5rem;
   overflow-y: auto; /* Allow content scrolling */
 }
 
 /* This .content-header is from UserDashboardPage.css and styles the main page title area */
 .content-header {
     margin-bottom: 2.5rem;
     padding-bottom: 1.5rem;
     border-bottom: 1px solid rgba(255, 255, 255, 0.1);
 }
 .content-header h1 {
   font-size: 1.8rem;
   font-weight: 600;
   margin-bottom: 0.5rem;
 }
 .content-header p {
     opacity: 0.8;
 }
 
 .dashboard-grid { /* From UserDashboardPage.css, may not be used directly by UserApiKeysPage */
   display: grid;
   gap: 1.5rem;
   grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
 }
 
 .dashboard-card { /* General card style from UserDashboardPage.css */
   background: rgba(255, 255, 255, 0.03);
   padding: 1.5rem;
   border-radius: 8px;
   border: 1px solid rgba(255, 255, 255, 0.1);
 }
 .dashboard-card h3 {
     font-size: 1.1rem;
     font-weight: 600;
     margin-bottom: 1rem;
 }
 .dashboard-card p.stat {
     font-size: 2rem;
     font-weight: bold;
     color: var(--color-secondary);
     margin-bottom: 1rem;
 }
 .dashboard-card ul {
     list-style: none;
     padding: 0;
     margin-bottom: 1rem;
     font-size: 0.9rem;
     opacity: 0.8;
 }
 .dashboard-card li {
     margin-bottom: 0.5rem;
     padding-bottom: 0.5rem;
     border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
 }
 .dashboard-card li:last-child {
     border-bottom: none;
     margin-bottom: 0;
 }
 .dashboard-card a {
     color: var(--color-primary);
     font-weight: 500;
     font-size: 0.9rem;
     text-decoration: none;
 }
 .dashboard-card a:hover {
     text-decoration: underline;
 }
 .quick-actions { /* From UserDashboardPage.css, may not be used directly by UserApiKeysPage */
     display: flex;
     flex-direction: column;
     gap: 1rem;
 }
 .quick-actions .btn {
     width: 100%;
     text-align: center;
 }
 
 /* Responsive adjustments if needed (from UserDashboardPage.css) */
 @media (max-width: 768px) {
   .dashboard-layout {
     flex-direction: column;
   }
   .dashboard-sidebar {
     width: 100%;
     height: auto;
     border-right: none;
     border-bottom: 1px solid rgba(255, 255, 255, 0.1);
     /* Consider making sidebar collapsible on mobile */
   }
   .dashboard-content { /* This rule is also defined in the "model training" block, ensure consistency or specificity */
     padding: 1.5rem;
   }
 }
 /* above code is of user dashboard */
 /* Import or reuse table styles from ModelTrainingJobsPage */
 /* @import './ModelTrainingJobsPage.css'; For table and status badge styles */
 
/* --- START: Copied Base Dashboard & Sidebar Styles --- */
/* This entire duplicated block of dashboard and sidebar styles has been removed as it's defined above. */
/* --- END: Copied Base Dashboard & Sidebar Styles --- */


 /* Main Content Styles for UseModelPage (or similar, contains general .btn styles) */
 /* The .dashboard-content rule here might be redundant if the one from UserDashboardPage.css is sufficient.
    However, keeping it as part of the "copied block" integrity. */
 .dashboard-content { /* This rule is also defined above, ensure consistency or specificity */
   flex: 1;
   padding: 2.5rem; /* Consistent with above */
   overflow-y: auto;
 }

 /* This .content-header is from UseModelPage.css.
    It might be overridden by or be additive to the .content-header rule from UserDashboardPage.css,
    depending on CSS specificity and order. For UserApiKeysPage.vue, the .content-header
    from UserDashboardPage.css is likely the primary one styling the header. */
 .content-header {
     margin-bottom: 2.5rem; /* Consistent */
     padding-bottom: 1.5rem; /* Consistent */
     border-bottom: 1px solid var(--color-border); /* var(--color-border) vs rgba(255,255,255,0.1) - check variables */
 }
 .content-header h1 {
   font-size: 1.8rem; /* Consistent */
   font-weight: 600; /* Consistent */
   margin-bottom: 0.5rem; /* Consistent */
   color: var(--color-heading);
   text-transform: capitalize;
 }
 .content-header p {
     color: var(--color-text-muted);
     opacity: 0.8; /* Consistent */
 }

 /* General card style for input/output sections (from UseModelPage.css, may not be directly used by UserApiKeysPage's main table) */
 .dashboard-card {
   background: var(--color-background-mute);
   padding: 1.5rem 2rem;
   border-radius: 8px;
   border: 1px solid var(--color-border);
 }

 /* Styles from UseModelPage.css, likely not directly used by UserApiKeysPage's main structure but kept for comment block integrity */
 .model-interaction-layout {
   display: grid;
   grid-template-columns: 1fr 1.2fr; /* Input slightly smaller than output */
   gap: 2rem;
 }

 .input-section h3, .output-section h3 {
   font-size: 1.2rem;
   font-weight: 600;
   margin-bottom: 1.5rem;
   color: var(--color-secondary);
   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
   padding-bottom: 0.8rem;
}

 .input-section .form-group {
   margin-bottom: 1.5rem;
 }
 .input-section label {
   display: block;
   font-size: 0.9rem;
   margin-bottom: 0.5rem;
   opacity: 0.8;
   /* color: var(--color-text-muted); */
 }
 .input-section textarea, .input-section input[type="file"] {
   width: 100%;
   padding: 0.8rem 1rem;
   border-radius: 5px;
   border: 1px solid rgba(255, 255, 255, 0.1);
   background-color: rgba(255, 255, 255, 0.05);
   color: var(--color-text);
   font-size: 0.95rem; /* Slightly smaller font */
   font-family: inherit;
   transition: border-color 0.3s ease, box-shadow 0.3s ease;
   box-sizing: border-box;
 }
 .input-section textarea:focus, .input-section input[type="file"]:focus {
   border-color: var(--color-primary);
   outline: none;
   box-shadow: 0 0 0 2px var(--color-primary-transparent);
 }
 .input-section textarea {
     resize: vertical;
     min-height: 100px;
 }
 .input-section input[type="file"] {
   background: rgba(255, 255, 255, 0.1);
     padding: 0.6rem 0.8rem; /* Adjust padding for file input */
 }
 .file-info {
     font-size: 0.85rem;
     color: var(--color-text-muted);
     margin-top: 0.5rem;
       opacity: 0.8;
 }
 .input-hint {
     font-size: 0.8rem;
     color: var(--color-text-muted);
     opacity: 0.7;
     margin-top: 1rem;
     margin-bottom: 0.5rem;
 }

 .btn { /* General button styling - THIS IS USED BY UserApiKeysPage */
   padding: 0.7rem 1.5rem;
   font-size: 0.95rem;
   font-weight: 600;
   border-radius: 6px;
   cursor: pointer;
   transition: background-color 0.2s ease, opacity 0.2s ease;
   border: none;
   text-align: center;
 }
 .btn:disabled {
     opacity: 0.5;
     cursor: not-allowed;
 }
 .btn-primary { /* THIS IS USED */
     background-color: var(--color-primary);
     color: white;
 }
 .btn-primary:hover:not(:disabled) {
     background-color: #3a3ad8; /* Darker primary */
 }
 .btn-secondary { /* Potentially used if any secondary buttons are added */
     background-color: rgba(255, 255, 255, 0.1);
     color: var(--color-text);
     border: 1px solid var(--color-border);
 }
  .btn-secondary:hover:not(:disabled) {
     background-color: rgba(255, 255, 255, 0.15);
  }
 .btn-block { /* Potentially used */
     display: block;
     width: 100%;
     margin-top: 1rem;
 }

 /* Styles from UseModelPage.css, likely not directly used by UserApiKeysPage's main structure */
 .output-section {
     display: flex;
     flex-direction: column;
 }
 .loading-indicator { /* UserApiKeysPage has its own .loading-indicator style later */
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     flex-grow: 1;
     text-align: center;
     color: var(--color-text-muted);
     min-height: 200px; /* Ensure it takes some space */
 }
 .loading-indicator .spinner {
   width: 30px;
   height: 30px;
   border: 3px solid var(--color-primary-transparent);
   border-radius: 50%;
   border-top-color: var(--color-primary);
   animation: spin 1s linear infinite;
   margin-bottom: 1rem;
 }
 @keyframes spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
 }

 .output-placeholder {
     flex-grow: 1;
     display: flex;
     align-items: center;
     justify-content: center;
     text-align: center;
     color: var(--color-text-muted);
     border: 2px dashed var(--color-border);
     border-radius: 5px;
     padding: 2rem;
     min-height: 200px;
 }

 .output-content-wrapper {
     flex-grow: 1;
     display: flex;
     flex-direction: column;
 }
 .output-display {
     flex-grow: 1;
     background-color: rgba(0, 0, 0, 0.25);
     border-radius: 5px;
     padding: 1.5rem;
     font-family: 'Fira Code', Consolas, Monaco, monospace;
     font-size: 0.9rem;
     white-space: pre-wrap;
     word-break: break-word;
     overflow-y: auto;
     max-height: 450px;
     border: 1px solid var(--color-border);
     margin-bottom: 1.5rem;
 }
 .output-image {
     max-width: 100%;
     height: auto;
     border-radius: 4px;
     display: block;
     margin: 0 auto;
 }

 .output-actions {
     display: flex;
     gap: 1rem;
     padding-top: 1rem;
     border-top: 1px solid var(--color-border);
     margin-top: auto;
 }
 .output-actions .btn {
     padding: 0.6rem 1.2rem;
     font-size: 0.9rem;
 }
 .btn-pdf {
     /* background-color: var(--color-secondary);
     color: white; */
 }
 /* .btn-pdf:hover:not(:disabled) {
     background-color: #e05252;
 } */


 .error-message {
     color: var(--color-secondary);
     background-color: rgba(255, 107, 107, 0.1);
     border: 1px solid var(--color-secondary);
     padding: 0.8rem 1rem;
     border-radius: 5px;
     font-size: 0.9rem;
 }
 .output-error {
     margin-top: 1rem;
 }

 @media (max-width: 992px) { /* From UseModelPage.css */
     .model-interaction-layout {
         grid-template-columns: 1fr;
     }
     .dashboard-content { /* Consistent with UserDashboardPage.css responsive */
       padding: 1.5rem;
     }
 }
 @media (max-width: 768px) { /* From UseModelPage.css */
   /* .dashboard-layout and .dashboard-sidebar responsive styles are already defined above from UserDashboardPage.css */
   .output-actions {
       flex-direction: column;
   }
   .output-actions .btn {
       width: 100%;
   }
 }
 /* above code is of model training */


 /* Styles specific to UserApiKeysPage or adapted from ModelTrainingJobsPage */
 .content-header { /* This rule from ModelTrainingJobsPage adds flex properties to the header */
     display: flex;
     justify-content: space-between;
     align-items: center;
     flex-wrap: wrap;
 }
 .header-action { /* Used for "Create New API Key" button */
     margin-left: auto;
     padding: 0.6rem 1.2rem; /* Overrides general .btn padding for this specific button */
     font-size: 0.9rem;    /* Overrides general .btn font-size for this specific button */
 }
 
 .api-keys-table-card { /* Applied to the .dashboard-card that wraps the table */
     padding: 0; /* Removes padding from .dashboard-card to allow table to span full width */
     margin-top: 2rem;
 }
 /* Table styles (can be adapted from ModelTrainingJobsPage.css if a common table style is desired) */
 .api-keys-table-card table {
     width: 100%;
     border-collapse: collapse;
 }
 .api-keys-table-card th, .api-keys-table-card td {
     padding: 1rem 1.5rem;
     text-align: left;
     border-bottom: 1px solid rgba(255, 255, 255, 0.08);
     vertical-align: middle;
 }
 .api-keys-table-card th {
     font-weight: 600;
     font-size: 0.9rem;
     opacity: 0.8;
     background-color: rgba(255, 255, 255, 0.02);
 }
 .api-keys-table-card tbody tr:last-child td {
     border-bottom: none;
 }
 .api-keys-table-card tbody tr:hover {
     background-color: rgba(255, 255, 255, 0.03);
 }
 .api-keys-table-card td {
     font-size: 0.95rem;
 }
 .api-keys-table-card code { /* Style for the key prefix */
   font-family: monospace;
   background-color: rgba(255,255,255,0.05);
   padding: 0.2em 0.4em;
   border-radius: 3px;
   font-size: 0.9em;
 }


 .status-badge { /* General status badge style, from ModelTrainingJobsPage.css */
     padding: 0.3rem 0.7rem;
     border-radius: 15px;
     font-size: 0.8rem;
     font-weight: 500;
     text-transform: capitalize;
     display: inline-block;
 }
 .status-active { background-color: rgba(52, 168, 83, 0.2); color: #34a853; }
 .status-inactive { background-color: rgba(128, 128, 128, 0.2); color: #808080; }
 
 .action-btn { /* General action button style for table rows, from ModelTrainingJobsPage.css */
     background: none;
     border: none;
     padding: 0.3rem;
     margin-right: 0.5rem;
     cursor: pointer;
     opacity: 0.6;
     transition: opacity 0.2s ease;
 }
 .action-btn:hover {
     opacity: 1;
 }
 .action-btn svg {
     width: 18px;
     height: 18px;
     stroke: currentColor; /* Color will be inherited from specific button class */
 }
 .action-btn.edit-btn { color: var(--color-primary); }
 .action-btn.status-toggle-btn { color: var(--color-secondary); } /* Or a specific color for toggle */
 .action-btn.delete-btn { color: #ef4444; } /* Red for delete */
 
 .loading-indicator, .no-data-message { /* For table loading/empty state */
     text-align: center;
     padding: 3rem; /* More padding than the UseModelPage one */
     opacity: 0.7;
 }

 /* Modal Styles (similar to CommunityQuestionsPage, adapted for API Key Modal) */
 .modal-overlay {
     position: fixed; top: 0; left: 0; width: 100%; height: 100%;
     background-color: rgba(0, 0, 0, 0.7); display: flex;
     align-items: center; justify-content: center; z-index: 1100;
     backdrop-filter: blur(5px);
 }
 .modal-content.api-key-modal { /* Added .modal-content for consistency if other modals exist */
     background-color: var(--color-background);
     border: 1px solid rgba(255, 255, 255, 0.1);
     border-radius: 8px; padding: 2rem; width: 90%;
     max-width: 550px; max-height: 90vh; display: flex;
     flex-direction: column; position: relative;
     /* Removed box-shadow from here if it was present, rely on overlay for depth */
 }
 .api-key-modal h3 { margin-bottom: 1.5rem; color: var(--color-primary); }
 .close-modal-btn {
     position: absolute; top: 1rem; right: 1rem; background: none;
     border: none; font-size: 1.8rem; color: var(--color-text);
     opacity: 0.7; cursor: pointer; line-height: 1;
 }
 .close-modal-btn:hover {
     opacity: 1;
 }
 
 .api-key-modal .form-group { margin-bottom: 1.5rem; }
 .api-key-modal label { display: block; font-size: 0.9rem; margin-bottom: 0.5rem; opacity: 0.8; }
 .api-key-modal input[type="text"] {
   width: 100%; padding: 0.8rem 1rem; border-radius: 5px;
   border: 1px solid rgba(255, 255, 255, 0.1);
   background-color: rgba(255, 255, 255, 0.05);
   color: var(--color-text); font-size: 1rem; /* Slightly larger than input-section inputs */
   box-sizing: border-box; /* Ensure padding doesn't increase width */
 }
 .api-key-modal .btn-primary { /* Uses general .btn-primary styles from UseModelPage block */
   width: 100%;
   /* padding and font-size will be inherited from .btn */
 }
 
 .new-key-display p { opacity: 0.8; margin-bottom: 1rem; line-height: 1.6; }
 .new-key-display p strong { font-weight: 600; color: var(--color-accent-1); /* Ensure var(--color-accent-1) is defined */ }
 .key-value-container {
     background-color: rgba(0,0,0,0.3);
     padding: 1rem;
     border-radius: 5px;
     margin-bottom: 1rem;
     display: flex;
     align-items: center;
     justify-content: space-between;
     word-break: break-all; /* Break long keys */
 }
 .key-value-container code {
     font-family: monospace;
     font-size: 0.95rem;
     color: #c5e1a5; /* Light green for key */
 }
 .copy-key-btn { /* This is a button, should inherit .btn styles or have them explicitly */
     padding: 0.4rem 0.8rem; font-size: 0.85rem;
     background-color: rgba(255, 255, 255, 0.1);
     border: 1px solid rgba(255, 255, 255, 0.2);
     color: var(--color-text); border-radius: 4px;
     margin-left: 1rem;
     white-space: nowrap;
     cursor: pointer;
 }
 .copy-key-btn:hover {
     background-color: rgba(255, 255, 255, 0.2);
 }
 .modal-close-confirm { /* Uses general .btn .btn-primary styles */
   margin-top: 1rem;
 }

 /* Responsive adjustments for API Keys table and modal if needed */
 @media (max-width: 768px) {
     .header-action { /* From ModelTrainingJobsPage, for "Create New API Key" button */
         margin-left: 0;
         margin-top: 1rem;
         width: 100%;
     }
     .api-keys-table-card th, .api-keys-table-card td {
         padding: 0.8rem;
         font-size: 0.9rem;
     }
     /* Consider making table responsive (e.g., stack columns or horizontal scroll) */

     .api-key-modal { /* Make modal take more width on smaller screens */
         max-width: 95%;
     }
 }
 </style>