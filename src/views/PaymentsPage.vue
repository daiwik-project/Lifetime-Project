<!-- src/views/PaymentsPage.vue -->
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
            <h1>Billing & Payments</h1>
            <p>Manage your subscription, payment methods, and view invoices.</p>
          </div>
  
          <div class="billing-grid">
              <!-- Current Plan Card -->
              <div class="dashboard-card current-plan-card">
                  <h3>Current Plan</h3>
                  <div v-if="currentPlan">
                      <p class="plan-name">{{ currentPlan.name }}</p>
                      <p class="plan-price">${{ currentPlan.price }}/month</p>
                      <p class="plan-details">{{ currentPlan.details }}</p>
                      <p class="next-billing">Next billing date: {{ formatDate(currentPlan.nextBillingDate) }}</p>
                      <RouterLink to="/pricing" class="btn btn-secondary plan-action-btn">Change Plan</RouterLink>
                  </div>
                  <div v-else class="no-data-message">No active plan. <RouterLink to="/pricing">Choose a plan</RouterLink>.</div>
              </div>
  
              <!-- Payment Methods Card -->
              <div class="dashboard-card payment-methods-card">
                  <h3>Payment Methods</h3>
                  <div v-if="paymentMethods.length > 0" class="payment-method-list">
                      <div v-for="method in paymentMethods" :key="method.id" class="payment-method-item">
                          <span class="card-brand">{{ method.brand }}</span>
                          <span>**** **** **** {{ method.last4 }}</span>
                          <span class="card-expiry">Exp: {{ method.expMonth }}/{{ method.expYear }}</span>
                          <span v-if="method.isDefault" class="default-badge">Default</span>
                          <button @click="removePaymentMethod(method.id)" class="remove-btn">×</button>
                      </div>
                  </div>
                  <div v-else class="no-data-message">No payment methods saved.</div>
                  <button @click="showAddPaymentModal = true" class="btn btn-primary add-payment-btn">Add New Payment Method</button>
              </div>
          </div>
  
          <div class="dashboard-card billing-history-card">
              <h3>Billing History</h3>
              <p>View your past invoices and payment history.</p>
              <RouterLink :to="`/user-dashboard/${userId}/invoices`" class="btn btn-secondary">View Invoices</RouterLink>
          </div>
  
          <!-- Add Payment Method Modal (Placeholder) -->
          <div v-if="showAddPaymentModal" class="modal-overlay" @click.self="showAddPaymentModal = false">
              <div class="modal-content add-payment-modal">
                  <button @click="showAddPaymentModal = false" class="close-modal-btn">×</button>
                  <h3>Add New Payment Method</h3>
                  <!-- Placeholder for Stripe Elements or similar payment form -->
                  <div class="payment-form-placeholder">
                      <p>Secure payment form (e.g., Stripe Elements) will be embedded here.</p>
                      <form @submit.prevent="handleAddPaymentMethod">
                          <div class="form-group">
                              <label for="card-number">Card Number</label>
                              <input type="text" id="card-number" placeholder="•••• •••• •••• ••••" required>
                          </div>
                          <div class="form-group-row">
                              <div class="form-group">
                                  <label for="expiry-date">Expiry (MM/YY)</label>
                                  <input type="text" id="expiry-date" placeholder="MM/YY" required>
                              </div>
                              <div class="form-group">
                                  <label for="cvc">CVC</label>
                                  <input type="text" id="cvc" placeholder="•••" required>
                              </div>
                          </div>
                          <button type="submit" class="btn btn-primary">Add Card</button>
                      </form>
                  </div>
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
    name: 'PaymentsPage',
    components: {
      MainLayout,
      RouterLink
    },
    setup() {
      const router = useRouter();
      const userId = ref('mockUserId'); // Replace with actual user ID
      const currentPlan = ref(null);
      const paymentMethods = ref([]);
      const showAddPaymentModal = ref(false);
  
      const fetchBillingInfo = () => {
          console.log("Fetching billing info...");
          // Simulate API call
          setTimeout(() => {
              currentPlan.value = {
                  name: 'Pro Plan',
                  price: 49,
                  details: 'Unlimited model training, priority support.',
                  nextBillingDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString() // Approx 20 days from now
              };
              paymentMethods.value = [
                  { id: 'pm_1', brand: 'Visa', last4: '4242', expMonth: '12', expYear: '2025', isDefault: true },
                  { id: 'pm_2', brand: 'Mastercard', last4: '5555', expMonth: '08', expYear: '2024', isDefault: false },
              ];
          }, 1000);
      };
  
      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
  
      const removePaymentMethod = (methodId) => {
          if (confirm("Are you sure you want to remove this payment method?")) {
              console.log("Removing payment method:", methodId);
              paymentMethods.value = paymentMethods.value.filter(pm => pm.id !== methodId);
              // Add API call to backend
          }
      };
  
      const handleAddPaymentMethod = () => {
          console.log("Handling add payment method submission...");
          // Integrate with Stripe Elements or similar for actual card processing
          // On success from payment provider:
          // 1. Send token to your backend to save the payment method
          // 2. Refetch paymentMethods or add locally
          // 3. Close modal
          alert("Payment method added (simulation)!");
          showAddPaymentModal.value = false;
      };
  
      const logout = () => {
        console.log("Logout action triggered");
        router.push('/login');
      };
  
      onMounted(fetchBillingInfo);
  
      return {
        logout,
        userId,
        currentPlan,
        paymentMethods,
        showAddPaymentModal,
        formatDate,
        removePaymentMethod,
        handleAddPaymentMethod
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


  /*  above is user Dashboard page */
  .billing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
  }
  
  .current-plan-card, .payment-methods-card, .billing-history-card {
      /* Inherits from .dashboard-card */
  }
  .current-plan-card h3, .payment-methods-card h3, .billing-history-card h3 {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      color: var(--color-secondary);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 0.8rem;
  }
  
  .current-plan-card .plan-name {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--color-primary);
  }
  .current-plan-card .plan-price {
      font-size: 1.2rem;
      opacity: 0.9;
      margin: 0.3rem 0;
  }
  .current-plan-card .plan-details, .current-plan-card .next-billing {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-bottom: 0.5rem;
  }
  .current-plan-card .next-billing {
      margin-bottom: 1.5rem;
  }
  .plan-action-btn {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
      padding: 0.6rem 1.2rem;
  }
  .plan-action-btn:hover {
      background: rgba(255, 255, 255, 0.15);
  }
  
  .payment-method-list {
      margin-bottom: 1.5rem;
  }
  .payment-method-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 0.95rem;
  }
  .payment-method-item:last-child {
      border-bottom: none;
  }
  .card-brand {
      font-weight: 500;
      min-width: 80px; /* For alignment */
  }
  .card-expiry {
      opacity: 0.7;
      font-size: 0.9rem;
  }
  .default-badge {
      background-color: var(--color-secondary);
      color: var(--color-background);
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 10px;
      margin-left: auto; /* Push to right before remove button */
  }
  .remove-btn {
      background: none; border: none; color: #ef4444;
      font-size: 1.2rem; cursor: pointer; opacity: 0.7;
      margin-left: 0.5rem; /* If default badge is not present */
  }
  .remove-btn:hover { opacity: 1; }
  .add-payment-btn {
      display: block;
      width: 100%;
      margin-top: 1rem;
  }
  
  .billing-history-card p {
      opacity: 0.8;
      margin-bottom: 1.5rem;
  }
  .billing-history-card .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: var(--color-text);
  }
  
  .no-data-message {
      text-align: center;
      padding: 1rem 0;
      opacity: 0.7;
  }
  .no-data-message a {
      color: var(--color-primary);
      font-weight: 500;
  }
  
  /* Modal Styles (similar to CommunityQuestionsPage) */
  .modal-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background-color: rgba(0, 0, 0, 0.7); display: flex;
      align-items: center; justify-content: center; z-index: 1100;
      backdrop-filter: blur(5px);
  }
  .add-payment-modal {
      background-color: var(--color-background);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px; padding: 2rem; width: 90%;
      max-width: 500px; max-height: 90vh; display: flex;
      flex-direction: column; position: relative;
  }
  .add-payment-modal h3 { margin-bottom: 1.5rem; color: var(--color-primary); }
  .close-modal-btn {
      position: absolute; top: 1rem; right: 1rem; background: none;
      border: none; font-size: 1.8rem; color: var(--color-text);
      opacity: 0.7; cursor: pointer; line-height: 1;
  }
  .payment-form-placeholder {
      text-align: center;
      padding: 2rem 0;
      border: 1px dashed rgba(255,255,255,0.2);
      border-radius: 5px;
  }
  .payment-form-placeholder p {
      margin-bottom: 1.5rem;
      opacity: 0.8;
  }
  .payment-form-placeholder .form-group { margin-bottom: 1rem; text-align: left; }
  .payment-form-placeholder label { display: block; font-size: 0.9rem; margin-bottom: 0.3rem; opacity: 0.8; }
  .payment-form-placeholder input[type="text"] {
    width: 100%; padding: 0.7rem 1rem; border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text); font-size: 1rem;
  }
  .form-group-row { display: flex; gap: 1rem; }
  .form-group-row .form-group { flex: 1; }
  .payment-form-placeholder .btn-primary { margin-top: 1rem; width: 100%; }
  
  </style>