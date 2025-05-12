import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/home2',
    name: 'home2',
    component: () => import('../views/HomePage2.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutPage.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterPage.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgotPassword',
    component: () => import('../views/ForgotPasswordPage.vue')
  },
  {
    path: '/gen',
    name: 'gen',
    component: () => import('../views/GenPage.vue')
  },
  { path: '/reset_passwords/:token', name: 'resetPasswordToken', component: () => import('../views/ResetPasswordTokenPage.vue') }, // Added for token reset

  // // --- New Static/Informational Pages ---
  // { path: '/term-and-condition', name: 'termAndCondition', component: () => import('../views/TermsPage.vue') }, // Reusing TermsPage
  { path: '/privacy-policy', name: 'privacyPolicy', component: () => import('../views/PrivacyPolicyPage.vue') },
  { path: '/carrers', name: 'careers', component: () => import('../views/CareersPage.vue') }, // Corrected spelling
  { path: '/cookies-policy', name: 'cookiesPolicy', component: () => import('../views/CookiesPolicyPage.vue') },
  { path: '/pricing', name: 'pricing', component: () => import('../views/PricingPage.vue') },
  { path: '/blogs', name: 'blogs', component: () => import('../views/BlogsPage.vue') },
  { path: '/community', name: 'community', component: () => import('../views/CommunityPage.vue') },
  { path: '/terms', name: 'terms', component: () => import('../views/TermsPage.vue') }, // Reusing TermsPage
  { path: '/data-policy', name: 'dataPolicy', component: () => import('../views/DataPolicyPage.vue') },
  { path: '/support', name: 'support', component: () => import('../views/SupportPage.vue') },
  { path: '/faq', name: 'faq', component: () => import('../views/FaqPage.vue') },
  { path: '/docs', name: 'docs', component: () => import('../views/DocsPage.vue') },
  // { path: '/documentations', name: 'documentations', component: () => import('../views/DocsPage.vue') }, // Reusing DocsPage
  { path: '/developer', name: 'developer', component: () => import('../views/DeveloperPage.vue') },
  { path: '/developer/tools', name: 'developerTools', component: () => import('../views/DeveloperToolsPage.vue') },
  { path: '/explore/models', name: 'exploreModels', component: () => import('../views/ExploreModelsPage.vue') },
  { path: '/marketplace/models', name: 'marketplaceModels', component: () => import('../views/MarketplaceModelsPage.vue') },
  { path: '/search', name: 'search', component: () => import('../views/SearchPage.vue') },
  { path: '/api', name: 'api', component: () => import('../views/ApiPage.vue') }, // Added API page
  { path: '/expirements', name: 'experiments', component: () => import('../views/ExperimentsPage.vue') }, // Corrected spelling


  // new pages
  { path: '/adminlayout', name: 'adminLayout', component: () => import('../views/AdminLayout.vue') },
  { path: '/forums', name: 'forums', component: () => import('../views/DisformsPage.vue') }, // Added Forums page
  { path: '/qna', name: 'qna', component: () => import('../views/QnAPage.vue') }, // Added QnA page
  { path: '/newgpt', name: 'newgpt', component: () => import('../views/OurNewGPTPage.vue') }, // Added New GPT page
  { path: '/usermanagement', name: 'userManagement', component: () => import('../views/UserManagementPage.vue') }, // Added User Management page
  // there box where i add some words and txt it taakes it and block it for all models
  { path: '/content-management', name: 'contentManagement', component: () => import('../views/ContentModeratorPage.vue') }, // Added Content Management page
  { path: '/performance-analytics', name: 'performanceAnalytics', component: () => import('../views/PerformanceAnalyticsPage.vue') }, // Added Performance Analytics page
  { path: '/server-management', name: 'serverManagement', component: () => import('../views/ServerManagementPage.vue') }, // Added Server Management page 
  
  // not to imply it 
  {
    path: '/graph-predictor',
    name: 'graphPredictor',
    component: () => import('../views/GraphPredictorPage.vue')
  },


  // // --- New User Dashboard Pages ---
  // // Note: Using :userId for both single and business users for simplicity in routing
  // // You might differentiate logic inside the component based on user type fetched from backend
  { path: '/s/user-dashboard/:userId', name: 'userDashboardSingle', component: () => import('../views/UserDashboardPage.vue'), props: true },
  { path: '/b/user-dashboard/:userId', name: 'userDashboardBusiness', component: () => import('../views/UserDashboardPage.vue'), props: true },
  { path: '/user-dashboard/metrics', name: 'userDashboardMetrics', component: () => import('../views/UserMetricsPage.vue') }, // Assumes logged-in user context
  { path: '/user-dashboard/api', name: 'userDashboardApi', component: () => import('../views/UserApiDocsPage.vue') }, // User specific API docs/guide
  { path: '/user-dashboard/api-keys', name: 'userDashboardApiKeys', component: () => import('../views/UserApiKeysPage.vue') },
  { path: '/user/notifications', name: 'userNotifications', component: () => import('../views/UserNotificationsPage.vue') },
  { path: '/user/reports/saved', name: 'userSavedReports', component: () => import('../views/UserSavedReportsPage.vue') },
  { path: '/user/security', name: 'userSecurity', component: () => import('../views/UserSecurityPage.vue') },
  { path: '/user/profile', name: 'userProfile', component: () => import('../views/UserProfilePage.vue') },
  { path: '/user/usage', name: 'userUsage', component: () => import('../views/UserUsagePage.vue') },
  { path: '/user-dashboard/:userId/recent-activity', name: 'userRecentActivity', component: () => import('../views/UserRecentActivityPage.vue'), props: true },
  { path: '/user-dashboard/:userId/invoices', name: 'userInvoices', component: () => import('../views/UserInvoicesPage.vue'), props: true },
  { path: '/payments', name: 'payments', component: () => import('../views/PaymentsPage.vue') }, // Payment/Billing page

  // // --- New Model Creation/Usage Pages ---
  // // Using nested routes or separate pages. Separate pages are simpler initially.
  // // Assumes logged-in user context for creation/usage. modelId is the identifier.
  { path: '/s/user-dashboard/create/ml/model/:modelId', name: 'createMlModel', component: () => import('../views/CreateModelPage.vue'), props: route => ({ ...route.params, modelType: 'ml' }) },
  { path: '/user/user-dashboard/use/ml/model/:modelId', name: 'useMlModel', component: () => import('../views/UseModelPage.vue'), props: route => ({ modelId:'ml25', modelType: 'ml' }) },
  // { path: '/user-dashboard/create/dl/model/:modelId', name: 'createDlModel', component: () => import('../views/CreateModelPage.vue'), props: route => ({ ...route.params, modelType: 'dl' }) },
  // { path: '/user/user-dashboard/use/dl/model/:modelId', name: 'useDlModel', component: () => import('../views/UseModelPage.vue'), props: route => ({ ...route.params, modelType: 'dl' }) },
  // { path: '/user-dashboard/create/nlp/model/:modelId', name: 'createNlpModel', component: () => import('../views/CreateModelPage.vue'), props: route => ({ ...route.params, modelType: 'nlp' }) },
  // { path: '/user/user-dashboard/use/nlp/model/:modelId', name: 'useNlpModel', component: () => import('../views/UseModelPage.vue'), props: route => ({ ...route.params, modelType: 'nlp' }) },
  // { path: '/user-dashboard/create/rag/model/:modelId', name: 'createRagModel', component: () => import('../views/CreateModelPage.vue'), props: route => ({ ...route.params, modelType: 'rag' }) },
  // { path: '/user/user-dashboard/use/rag/model/:modelId', name: 'useRagModel', component: () => import('../views/UseModelPage.vue'), props: route => ({ ...route.params, modelType: 'rag' }) },
  // { path: '/user-dashboard/create/gpt/model/:modelId', name: 'createGptModel', component: () => import('../views/CreateModelPage.vue'), props: route => ({ ...route.params, modelType: 'gpt' }) },
  // { path: '/user/user-dashboard/use/gpt/model/:modelId', name: 'useGptModel', component: () => import('../views/UseModelPage.vue'), props: route => ({ ...route.params, modelType: 'gpt' }) },
  { path: '/user-dashboard/create/custom/model/:modelId', name: 'createCustomModel', component: () => import('../views/CreateCustomModelPage.vue'), props: route => ({ ...route.params, modelType: 'custom' }) },
  { path: '/user/user-dashboard/use/custom/model/:modelId', name: 'useCustomModel', component: () => import('../views/UseCustomModelPage.vue'), props: route => ({ ...route.params, modelType: 'custom' }) },
  { path: '/user-dashboard/:modelId/training-jobs', name: 'modelTrainingJobs', component: () => import('../views/ModelTrainingJobsPage.vue'), props: true },
  { path: '/projects/:projectId', name: 'projectDetails', component: () => import('../views/ProjectDetailsPage.vue'), props: true },

  // // --- New Community Pages ---
  { path: '/community/questions', name: 'communityQuestions', component: () => import('../views/CommunityQuestionsPage.vue') },

  // // --- New Admin Pages ---
  { path: '/admin/register', name: 'adminRegister', component: () => import('../views/AdminRegisterPage.vue') },
  { path: '/admin/login', name: 'adminLogin', component: () => import('../views/AdminLoginPage.vue') },
  { path: '/admin/dashboard', name: 'adminDashboard', component: () => import('../views/AdminDashboardPage.vue') }, // Requires auth guard
  { path: '/admin/profile', name: 'adminProfile', component: () => import('../views/AdminProfilePage.vue') }, // Requires auth guard
 
  // --- Error Pages ---
  // Catch-all route for 404
   { path: '/:pathMatch(.*)*', name: 'notFound', component: () => import('../views/ErrorPage.vue'), props: { errorCode: '404', message: 'Page Not Found' } },
  // Specific error routes if needed (e.g., for server errors redirected)
   { path: '/error', name: 'error', component: () => import('../views/ErrorPage.vue'), props: { errorCode: '500', message: 'Internal Server Error' } }, // Example

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// --- Navigation Guards (Example - Implement actual logic) ---
// You'll need to add navigation guards to protect routes like dashboards and admin areas
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
//   const isAuthenticated = // Check if user is logged in (e.g., from Pinia store)
//   const isAdmin = // Check if user is admin

//   if (requiresAuth && !isAuthenticated) {
//     next('/login');
//   } else if (requiresAdmin && !isAdmin) {
//     next('/'); // Or redirect to an unauthorized page
//   } else {
//     next();
//   }
// });
export default router
