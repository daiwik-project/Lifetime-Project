<!-- src/views/UserInvoicesPage.vue -->
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
            <h1>Invoice History</h1>
            <p>Review and download your past invoices for user: {{ userId }}.</p>
            <!-- Breadcrumbs: User Dashboard > Billing > Invoices -->
          </div>
  
          <div class="dashboard-card invoices-table-card">
            <div v-if="isLoading" class="loading-indicator">Loading invoices...</div>
            <div v-else-if="invoices.length > 0">
              <table>
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="invoice in invoices" :key="invoice.id">
                    <td>{{ invoice.id }}</td>
                    <td>{{ formatDate(invoice.date) }}</td>
                    <td>${{ invoice.amount.toFixed(2) }}</td>
                    <td><span :class="['status-badge', `status-${invoice.status.toLowerCase()}`]">{{ invoice.status }}</span></td>
                    <td>{{ invoice.description }}</td>
                    <td>
                      <button @click="downloadInvoice(invoice.id)" class="action-btn download-btn" title="Download PDF">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="no-data-message">
              No invoices found.
            </div>
          </div>
          <!-- Add Pagination if many invoices -->
        </main>
      </div>
    </MainLayout>
  </template>
  
  <script>
  import MainLayout from '../layouts/MainLayout.vue';
  import { RouterLink, useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'UserInvoicesPage',
    components: {
      MainLayout,
      RouterLink
    },
    props: {
        userId: { type: String, required: true }
    },
    setup(props) {
      const router = useRouter();
      const isLoading = ref(false);
      const invoices = ref([]);
  
      const fetchInvoices = () => {
        isLoading.value = true;
        console.log(`Fetching invoices for user: ${props.userId}`);
        // Simulate API call
        setTimeout(() => {
          invoices.value = [
            { id: 'INV-2024-001', date: '2024-03-01T00:00:00Z', amount: 49.00, status: 'Paid', description: 'Pro Plan Subscription - March 2024' },
            { id: 'INV-2024-002', date: '2024-02-01T00:00:00Z', amount: 49.00, status: 'Paid', description: 'Pro Plan Subscription - February 2024' },
            { id: 'INV-2024-003', date: '2024-01-01T00:00:00Z', amount: 29.00, status: 'Paid', description: 'Basic Plan Subscription - January 2024' },
            // Add more mock invoices
          ];
          isLoading.value = false;
        }, 1000);
      };
  
      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  
      const downloadInvoice = (invoiceId) => {
          console.log("Downloading invoice:", invoiceId);
          // Simulate PDF download
          alert(`Simulating download for invoice ${invoiceId}.pdf`);
          // In real app: window.location.href = `/api/invoices/${invoiceId}/pdf` or similar
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(fetchInvoices);
  
      return {
        logout,
        isLoading,
        invoices,
        formatDate,
        downloadInvoice,
        userId: props.userId // Expose to template
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
/* above is user dashboard page  */
/* The duplicated CSS block for dashboard layout that was previously here has been removed. */


/* Import or reuse table styles from ModelTrainingJobsPage */
/* @import './ModelTrainingJobsPage.css'; For table and status badge styles */

/* The following .content-header is from ModelTrainingJobsPage.css.
   It is kept here to maintain the integrity of the "copied block" from ModelTrainingJobsPage.css.
   For UserInvoicesPage.vue, the .content-header defined above (from UserDashboardPage.css)
   is likely the one primarily affecting the layout due to the HTML structure.
   This rule might be overridden by or be additive to the .content-header rule above,
   depending on CSS specificity and order, but given the current HTML of UserInvoicesPage,
   its specific flex properties might not have a visible effect. */
.content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
.header-action { /* This class is not used in UserInvoicesPage.vue's current HTML */
    margin-left: auto; /* Push button to right */
    padding: 0.6rem 1.2rem; /* Smaller button */
    font-size: 0.9rem;
}

/* Styles for the table card, adapted from .jobs-table-card in ModelTrainingJobsPage.css */
/* UserInvoicesPage.vue uses <div class="dashboard-card invoices-table-card"> */
.invoices-table-card {
    /* .dashboard-card (applied via HTML class) provides base background, border, radius */
    /* Overriding padding from .dashboard-card and setting margin based on original .jobs-table-card / specific invoice style */
    padding: 0; /* Remove card padding for table */
    margin-top: 2rem;
}

.invoices-table-card table {
    width: 100%;
    border-collapse: collapse;
}
.invoices-table-card th, .invoices-table-card td {
    padding: 1rem 1.5rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    vertical-align: middle;
}
.invoices-table-card th {
    font-weight: 600;
    font-size: 0.9rem;
    opacity: 0.8;
    background-color: rgba(255, 255, 255, 0.02);
}
.invoices-table-card tbody tr:last-child td {
    border-bottom: none;
}
.invoices-table-card tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.03);
}
.invoices-table-card td {
    font-size: 0.95rem;
}

.status-badge {
    padding: 0.3rem 0.7rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
    text-transform: capitalize;
    display: inline-block;
}
.status-completed { background-color: rgba(52, 168, 83, 0.2); color: #34a853; }
.status-running { background-color: rgba(66, 133, 244, 0.2); color: #4285f4; animation: pulse-blue 2s infinite; }
.status-failed { background-color: rgba(234, 67, 53, 0.2); color: #ea4335; }
.status-stopped { background-color: rgba(251, 188, 5, 0.2); color: #fbbc05; }
/* Add other statuses as needed */

@keyframes pulse-blue {
  0% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0.4); }
  70% { box-shadow: 0 0 0 5px rgba(66, 133, 244, 0); }
  100% { box-shadow: 0 0 0 0 rgba(66, 133, 244, 0); }
}

.action-btn {
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
    stroke: currentColor;
}
.logs-btn { color: var(--color-secondary); } /* From ModelTrainingJobsPage, may not be used here */
.stop-btn { color: #fbbc05; } /* From ModelTrainingJobsPage, may not be used here */

.loading-indicator, .no-data-message {
    text-align: center;
    padding: 3rem;
    opacity: 0.7;
}

.logs-modal { /* From ModelTrainingJobsPage, kept for block integrity */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1100; /* Above navbar */
    backdrop-filter: blur(5px);
}
.modal-content { /* From ModelTrainingJobsPage */
    background-color: var(--color-background);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 2rem;
    width: 90%;
    max-width: 800px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    position: relative;
}
.modal-content h3 { /* From ModelTrainingJobsPage */
    margin-bottom: 1.5rem;
    color: var(--color-primary);
}
.modal-content pre { /* From ModelTrainingJobsPage */
    flex-grow: 1;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #ccc;
    font-family: monospace;
    font-size: 0.85rem;
    padding: 1rem;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-all;
}
.close-modal-btn { /* From ModelTrainingJobsPage */
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.8rem;
    color: var(--color-text);
    opacity: 0.7;
    cursor: pointer;
    line-height: 1;
}
.close-modal-btn:hover { /* From ModelTrainingJobsPage */
    opacity: 1;
}

@media (max-width: 768px) {
    .header-action { /* From ModelTrainingJobsPage, .header-action not in UserInvoicesPage.vue HTML */
        margin-left: 0;
        margin-top: 1rem;
        width: 100%;
    }
    .invoices-table-card th, .invoices-table-card td { /* Adapted from .jobs-table-card */
        padding: 0.8rem;
        font-size: 0.9rem;
    }
    /* Consider making table responsive (e.g., stack columns) */
}
/* above is model trainjobs page */


/* Styles specific to UserInvoicesPage */
/* Status badge for 'Paid' */
.status-paid { background-color: rgba(52, 168, 83, 0.2); color: #34a853; }
/* Add other invoice statuses like 'Pending', 'Overdue' */

.action-btn.download-btn {
    color: var(--color-secondary);
}
</style>