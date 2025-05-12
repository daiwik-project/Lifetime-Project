<!-- src/views/UserSecurityPage.vue -->
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
            <h1>Account Security</h1>
            <p>Manage your password, two-factor authentication, and active sessions.</p>
          </div>
  
          <div class="security-sections-grid">
              <!-- Change Password Section -->
              <div class="dashboard-card security-section">
                  <h3>Change Password</h3>
                  <form @submit.prevent="changePassword">
                      <div class="form-group">
                          <label for="current-password">Current Password</label>
                          <input type="password" id="current-password" v-model="passwords.current" required>
                      </div>
                      <div class="form-group">
                          <label for="new-password">New Password</label>
                          <input type="password" id="new-password" v-model="passwords.new" required>
                      </div>
                      <div class="form-group">
                          <label for="confirm-new-password">Confirm New Password</label>
                          <input type="password" id="confirm-new-password" v-model="passwords.confirm" required
                                 :class="{ 'input-error': passwords.new && passwords.confirm && passwords.new !== passwords.confirm }">
                          <small v-if="passwords.new && passwords.confirm && passwords.new !== passwords.confirm" class="error-text">Passwords do not match.</small>
                      </div>
                      <button type="submit" class="btn btn-primary" :disabled="isChangingPassword">
                          <span v-if="isChangingPassword">Updating...</span>
                          <span v-else>Update Password</span>
                      </button>
                  </form>
              </div>
  
              <!-- Two-Factor Authentication Section -->
              <div class="dashboard-card security-section">
                  <h3>Two-Factor Authentication (2FA)</h3>
                  <div v-if="twoFactor.enabled">
                      <p class="status-enabled">2FA is currently <strong>Enabled</strong> on your account.</p>
                      <p>Authenticator App: {{ twoFactor.method || 'Google Authenticator / Authy' }}</p>
                      <button @click="disableTwoFactor" class="btn btn-danger" :disabled="isUpdating2FA">Disable 2FA</button>
                  </div>
                  <div v-else>
                      <p class="status-disabled">2FA is currently <strong>Disabled</strong>.</p>
                      <p>Enhance your account security by enabling two-factor authentication.</p>
                      <button @click="enableTwoFactor" class="btn btn-primary" :disabled="isUpdating2FA">Enable 2FA</button>
                  </div>
                  <!-- Placeholder for 2FA setup (QR code, recovery codes) if enabling -->
                  <div v-if="twoFactor.setupKey" class="two-factor-setup">
                      <h4>Scan QR Code with your Authenticator App:</h4>
                      <div class="qr-code-placeholder">[QR Code for {{ twoFactor.setupKey }}]</div>
                      <p>Or enter this key manually: <strong>{{ twoFactor.setupKey }}</strong></p>
                      <div class="form-group">
                          <label for="2fa-code">Enter Verification Code:</label>
                          <input type="text" id="2fa-code" v-model="twoFactor.verificationCode" placeholder="6-digit code">
                      </div>
                      <button @click="verifyAndEnable2FA" class="btn btn-primary">Verify & Enable</button>
                  </div>
              </div>
          </div>
  
          <!-- Active Sessions Section (Optional) -->
          <div class="dashboard-card security-section active-sessions-section">
              <h3>Active Sessions</h3>
              <div v-if="activeSessions.length > 0">
                  <ul>
                      <li v-for="session in activeSessions" :key="session.id">
                          <span class="session-device">{{ session.device }} ({{ session.browser }})</span>
                          <span class="session-location">Location: {{ session.location }}</span>
                          <span class="session-last-active">Last active: {{ formatDate(session.lastActive) }}</span>
                          <button v-if="!session.isCurrent" @click="revokeSession(session.id)" class="revoke-session-btn">Revoke</button>
                          <span v-else class="current-session-badge">(Current Session)</span>
                      </li>
                  </ul>
                  <button @click="revokeAllOtherSessions" class="btn btn-secondary">Revoke All Other Sessions</button>
              </div>
              <div v-else class="no-data-message">No active session data available.</div>
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
    name: 'UserSecurityPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
  
      const passwords = reactive({ current: '', new: '', confirm: '' });
      const isChangingPassword = ref(false);
  
      const twoFactor = reactive({ enabled: false, method: '', setupKey: null, verificationCode: '' });
      const isUpdating2FA = ref(false);
  
      const activeSessions = ref([]);
  
      const fetchSecuritySettings = () => {
          console.log("Fetching security settings...");
          // Simulate API call
          setTimeout(() => {
              twoFactor.enabled = Math.random() > 0.5; // Randomly enable/disable for demo
              if (twoFactor.enabled) twoFactor.method = 'Authenticator App';
  
              activeSessions.value = [
                  { id: 'sess1', device: 'Desktop', browser: 'Chrome on Windows', location: 'New York, USA', lastActive: new Date(Date.now() - 1000 * 60 * 5).toISOString(), isCurrent: true },
                  { id: 'sess2', device: 'Mobile', browser: 'Safari on iOS', location: 'London, UK', lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), isCurrent: false },
              ];
          }, 500);
      };
  
      const changePassword = () => {
          if (passwords.new !== passwords.confirm) {
              alert("New passwords do not match."); return;
          }
          if (passwords.new.length < 8) {
              alert("New password must be at least 8 characters long."); return;
          }
          isChangingPassword.value = true;
          console.log("Changing password...");
          setTimeout(() => {
              isChangingPassword.value = false;
              alert("Password changed successfully (simulation)!");
              passwords.current = ''; passwords.new = ''; passwords.confirm = '';
          }, 1500);
      };
  
      const enableTwoFactor = () => {
          isUpdating2FA.value = true;
          console.log("Enabling 2FA...");
          setTimeout(() => {
              twoFactor.setupKey = 'ABCDE FGHJI KLMNO PQRST UVWXY Z1234'; // Example setup key
              isUpdating2FA.value = false;
              // In real app, backend generates this and QR code data
          }, 1000);
      };
      const verifyAndEnable2FA = () => {
          console.log("Verifying 2FA code:", twoFactor.verificationCode);
          // API call to verify code and enable 2FA
          setTimeout(() => {
              twoFactor.enabled = true;
              twoFactor.setupKey = null; // Clear setup key
              twoFactor.verificationCode = '';
              alert("2FA enabled successfully!");
          }, 1000);
      };
      const disableTwoFactor = () => {
          if (confirm("Are you sure you want to disable Two-Factor Authentication?")) {
              isUpdating2FA.value = true;
              console.log("Disabling 2FA...");
              setTimeout(() => {
                  twoFactor.enabled = false;
                  twoFactor.method = '';
                  isUpdating2FA.value = false;
                  alert("2FA disabled (simulation).");
              }, 1000);
          }
      };
  
      const revokeSession = (sessionId) => {
          if (confirm("Are you sure you want to revoke this session?")) {
              console.log("Revoking session:", sessionId);
              activeSessions.value = activeSessions.value.filter(s => s.id !== sessionId);
          }
      };
      const revokeAllOtherSessions = () => {
          if (confirm("Are you sure you want to revoke all other active sessions?")) {
              console.log("Revoking all other sessions...");
              activeSessions.value = activeSessions.value.filter(s => s.isCurrent);
          }
      };
  
       const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        // More detailed format for session times
        return new Date(dateString).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(fetchSecuritySettings);
  
      return {
        logout,
        userId,
        passwords,
        isChangingPassword,
        changePassword,
        twoFactor,
        isUpdating2FA,
        enableTwoFactor,
        verifyAndEnable2FA,
        disableTwoFactor,
        activeSessions,
        revokeSession,
        revokeAllOtherSessions,
        formatDate
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
  
  
  /* Main Content Styles */
  .dashboard-content {
    flex: 1;
    padding: 2.5rem;
    overflow-y: auto; /* Allow content scrolling */
  }
  
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
  
  .dashboard-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  
  .dashboard-card {
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
  .quick-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
  }
  .quick-actions .btn {
      width: 100%;
      text-align: center;
  }
  
  /* Responsive adjustments if needed */
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
    .dashboard-content {
      padding: 1.5rem;
    }
  }
  /* above is suer dashboard css */
  .security-sections-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
  }
  
  .security-section {
      /* Inherits from .dashboard-card */
  }
  .security-section h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--color-secondary);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 0.8rem;
  }
  .security-section .form-group { margin-bottom: 1.5rem; }
  .security-section label { display: block; font-size: 0.9rem; margin-bottom: 0.5rem; opacity: 0.8; }
  .security-section input[type="password"], .security-section input[type="text"] {
    width: 100%; padding: 0.8rem 1rem; border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text); font-size: 1rem;
  }
  .input-error { border-color: #ef4444 !important; }
  .error-text { color: #ef4444; font-size: 0.8rem; margin-top: 0.3rem; }
  
  .status-enabled { color: #34a853; margin-bottom: 0.5rem; }
  .status-disabled { color: #fbbc05; margin-bottom: 0.5rem; }
  .security-section p { opacity: 0.8; margin-bottom: 1rem; line-height: 1.6; }
  .security-section .btn { margin-top: 0.5rem; }
  .btn-danger {
      background-color: rgba(220, 38, 38, 0.8); color: var(--color-text);
      border: 1px solid rgba(220, 38, 38, 1);
  }
  .btn-danger:hover { background-color: rgba(220, 38, 38, 1); }
  
  .two-factor-setup {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .qr-code-placeholder {
      width: 150px; height: 150px; background-color: #fff; color: #333;
      display: flex; align-items: center; justify-content: center;
      margin: 1rem auto; border-radius: 5px;
  }
  
  .active-sessions-section ul { list-style: none; padding: 0; margin-bottom: 1.5rem; }
  .active-sessions-section li {
      padding: 1rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 1rem;
  }
  .active-sessions-section li:last-child { border-bottom: none; }
  .session-device { font-weight: 500; }
  .session-location, .session-last-active { font-size: 0.9rem; opacity: 0.7; }
  .revoke-session-btn {
      margin-left: auto; background: none; border: none;
      color: var(--color-primary); cursor: pointer; font-size: 0.9rem;
  }
  .revoke-session-btn:hover { text-decoration: underline; }
  .current-session-badge {
      font-size: 0.8rem; opacity: 0.6; margin-left: auto;
      font-style: italic;
  }
  .active-sessions-section .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  </style>