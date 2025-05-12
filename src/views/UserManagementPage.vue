<!-- src/views/UserManagementPage.vue -->
<template>
    <AdminLayout>
        <div class="page-header">
            <h1>User Management</h1>
            <div class="header-actions">
                <input type="text" v-model="searchQuery" placeholder="Search users (name, email, ID)..."
                    class="search-input-admin">
                <button class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add New User
                </button>
            </div>
        </div>

        <div class="table-container card-admin">
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="filteredUsers.length === 0">
                        <td colspan="7" class="no-data">No users found matching your search.</td>
                    </tr>
                    <tr v-for="user in filteredUsers" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>
                            <div class="user-info">
                                <img :src="user.avatarUrl || defaultAvatar" alt="avatar" class="user-avatar-table">
                                {{ user.name }}
                            </div>
                        </td>
                        <td>{{ user.email }}</td>
                        <td><span :class="['role-badge', user.role.toLowerCase()]">{{ user.role }}</span></td>
                        <td><span :class="['status-badge', user.status.toLowerCase()]">{{ user.status }}</span></td>
                        <td>{{ formatDate(user.joinedDate) }}</td>
                        <td class="actions-cell">
                            <button class="action-btn view" title="View Details">
                                <svg>
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <button class="action-btn edit" title="Edit User">
                                <svg>
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button class="action-btn delete" title="Delete User">
                                <svg>
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                    </path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Pagination would go here -->
    </AdminLayout>
</template>

<script>
import AdminLayout from './AdminLayout.vue';
import { ref, computed } from 'vue';

export default {
    name: 'UserManagementPage',
    components: {
        AdminLayout
    },
    setup() {
        const searchQuery = ref('');
        const defaultAvatar = 'https://source.unsplash.com/random/50x50/?profile,avatar'; // Placeholder

        // Placeholder data
        const users = ref([
            { id: 'usr_123abc', name: 'Alice Wonderland', email: 'alice@example.com', role: 'User', status: 'Active', joinedDate: '2023-01-15T10:00:00Z', avatarUrl: 'https://source.unsplash.com/random/50x50/?woman,face' },
            { id: 'usr_456def', name: 'Bob The Builder', email: 'bob@example.com', role: 'User', status: 'Active', joinedDate: '2023-02-20T11:30:00Z', avatarUrl: 'https://source.unsplash.com/random/50x50/?man,face' },
            { id: 'usr_789ghi', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Admin', status: 'Active', joinedDate: '2022-12-01T09:00:00Z', avatarUrl: null },
            { id: 'usr_jklmno', name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Suspended', joinedDate: '2023-03-10T14:00:00Z', avatarUrl: 'https://source.unsplash.com/random/50x50/?person,portrait' },
        ]);

        const filteredUsers = computed(() => {
            if (!searchQuery.value) {
                return users.value;
            }
            const lowerQuery = searchQuery.value.toLowerCase();
            return users.value.filter(user =>
                user.name.toLowerCase().includes(lowerQuery) ||
                user.email.toLowerCase().includes(lowerQuery) ||
                user.id.toLowerCase().includes(lowerQuery)
            );
        });

        const formatDate = (dateString) => {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };

        return {
            searchQuery,
            filteredUsers,
            formatDate,
            defaultAvatar
        };
    }
};
</script>

<style scoped>
/* General Admin Page Styles (can be globalized for admin section) */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.page-header h1 {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--color-text);
}

.header-actions {
    display: flex;
    gap: 1rem;
}

.search-input-admin {
    padding: 0.6rem 1rem;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
    min-width: 250px;
}

.search-input-admin:focus {
    outline: none;
    border-color: var(--color-primary);
}

.header-actions .btn {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.header-actions .btn svg {
    width: 16px;
    height: 16px;
}


.card-admin {
    /* Common card style for admin content areas */
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.table-container {
    overflow-x: auto;
    /* Responsive tables */
}

table {
    width: 100%;
    border-collapse: collapse;
    color: #cbd5e1;
    /* Lighter text for table content */
}

th,
td {
    padding: 0.9rem 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-size: 0.9rem;
    vertical-align: middle;
}

th {
    font-weight: 600;
    color: var(--color-text);
    opacity: 0.8;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.5px;
}

tbody tr:hover {
    background-color: rgba(255, 255, 255, 0.02);
}

.no-data td {
    text-align: center;
    padding: 2rem;
    opacity: 0.6;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}

.user-avatar-table {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
}

.role-badge,
.status-badge {
    padding: 0.25rem 0.6rem;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: capitalize;
}

.role-badge.admin {
    background-color: rgba(229, 170, 132, 0.2);
    color: var(--color-primary);
}

.role-badge.user {
    background-color: rgba(89, 171, 230, 0.2);
    color: var(--color-secondary);
}

.status-badge.active {
    background-color: rgba(74, 222, 128, 0.2);
    color: #4ade80;
}

.status-badge.suspended {
    background-color: rgba(248, 113, 113, 0.2);
    color: #f87171;
}

.status-badge.pending {
    background-color: rgba(251, 191, 36, 0.2);
    color: #fbb03b;
}


.actions-cell {
    display: flex;
    gap: 0.5rem;
}

.action-btn {
    background: none;
    border: none;
    padding: 0.4rem;
    cursor: pointer;
    color: #a0aec0;
    border-radius: 4px;
}

.action-btn:hover {
    color: var(--color-text);
    background-color: rgba(255, 255, 255, 0.1);
}

.action-btn svg {
    width: 16px;
    height: 16px;
    stroke-width: 2;
}

.action-btn.view:hover {
    color: var(--color-secondary);
}

.action-btn.edit:hover {
    color: var(--color-primary);
}

.action-btn.delete:hover {
    color: #ef4444;
}
</style>