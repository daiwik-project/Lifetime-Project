<!-- src/layouts/AdminLayout.vue -->
<template>
    <div class="admin-layout-wrapper">
        <!-- Admin Sidebar -->
        <aside class="admin-sidebar">
            <div class="sidebar-header">
                <RouterLink to="/admin/dashboard" class="sidebar-logo">
                    GenAI<span class="gradient-text">Admin</span>
                </RouterLink>
            </div>
            <nav class="sidebar-nav">
                <ul>
                    <li>
                        <RouterLink to="/admin/dashboard" exact-active-class="active-link">
                            <svg><!-- Icon: Dashboard -->
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span>Dashboard</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/user-management" active-class="active-link">
                            <svg><!-- Icon: Users -->
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span>User Management</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/content-moderation" active-class="active-link">
                            <svg><!-- Icon: Shield/Moderation -->
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                            <span>Content Moderation</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/performance-analytics" active-class="active-link">
                            <svg><!-- Icon: Bar Chart -->
                                <line x1="12" y1="20" x2="12" y2="10"></line>
                                <line x1="18" y1="20" x2="18" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="16"></line>
                            </svg>
                            <span>Performance Analytics</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/server-management" active-class="active-link">
                            <svg><!-- Icon: Server -->
                                <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                                <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                                <line x1="6" y1="6" x2="6.01" y2="6"></line>
                                <line x1="6" y1="18" x2="6.01" y2="18"></line>
                            </svg>
                            <span>Server Management</span>
                        </RouterLink>
                    </li>
                    <!-- Add more admin links as needed -->
                </ul>
            </nav>
            <div class="sidebar-footer">
                <RouterLink to="/" class="logout-button"> <!-- Or a proper logout -->
                    <svg><!-- Icon: Log out -->
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span>Exit Admin</span>
                </RouterLink>
            </div>
        </aside>

        <!-- Main Admin Content -->
        <main class="admin-main-content">
            <slot /> <!-- Page content will be injected here -->
        </main>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
    name: 'AdminLayout',
    components: {
        RouterLink
    }
    // Add setup if any reactive logic is needed for the layout itself
};
</script>

<style scoped>
.admin-layout-wrapper {
    display: flex;
    min-height: 100vh;
    background-color: var(--color-background);
}

.admin-sidebar {
    width: 260px;
    background: #0A0F1A;
    /* Darker, distinct admin sidebar color */
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
    color: #a0aec0;
    /* Lighter text for contrast on dark bg */
}

.sidebar-header {
    padding: 0 1.5rem 1.5rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    margin-bottom: 1rem;
}

.sidebar-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    /* Keep logo text bright */
}

.sidebar-logo .gradient-text {
    /* Ensure gradient text is visible */
    background: linear-gradient(135deg, var(--color-primary), var(--color-accent-1));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
}


.sidebar-nav {
    flex-grow: 1;
    overflow-y: auto;
}

.sidebar-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar-nav li a,
.sidebar-footer a {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.9rem 1.5rem;
    color: #a0aec0;
    /* Admin sidebar link color */
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    border-left: 3px solid transparent;
    text-decoration: none;
    font-size: 0.95rem;
}

.sidebar-nav li a:hover,
.sidebar-footer a:hover {
    color: var(--color-text);
    background-color: rgba(255, 255, 255, 0.04);
}

.sidebar-nav li a.active-link {
    color: var(--color-primary);
    /* Active link color */
    border-left-color: var(--color-primary);
    background-color: rgba(229, 170, 132, 0.08);
    /* Primary color tint */
}

.sidebar-nav svg,
.sidebar-footer svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    stroke-width: 1.5;
    /* Slightly thinner for admin icons */
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.sidebar-footer {
    margin-top: auto;
    padding: 1rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.logout-button {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
}

.logout-button:hover svg {
    stroke: var(--color-accent-3);
    /* Red hover for exit */
}

.admin-main-content {
    flex: 1;
    padding: 2.5rem;
    overflow-y: auto;
    background-color: #0F172A;
    /* Slightly different main content bg for admin */
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .admin-layout-wrapper {
        flex-direction: column;
    }

    .admin-sidebar {
        width: 100%;
        height: auto;
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .admin-main-content {
        padding: 1.5rem;
    }
}
</style>