<!-- src/views/DisformsPage.vue -->
<template>
    <MainLayout>
        <HeroSection title="Discussion Forums"
            subtitle="Connect, share, and learn with the GenAI Labs community. Find topics that interest you."
            bgShape="circle" />

        <section class="section forums-section">
            <div class="container">
                <div class="forums-header">
                    <h2 class="section-title">Community <span class="gradient-text">Forums</span></h2>
                    <div class="forums-actions">
                        <input type="text" placeholder="Search forums..." class="search-input">
                        <RouterLink to="/forums/new-topic" class="btn btn-primary">Start New Topic</RouterLink>
                    </div>
                </div>

                <div class="forum-categories">
                    <!-- Example Category (Repeat for other categories) -->
                    <div class="category-card" v-for="category in categories" :key="category.id">
                        <div class="category-header">
                            <div class="category-icon">{{ category.icon }}</div>
                            <h3 class="category-title">
                                <RouterLink :to="`/forums/category/${category.slug}`">{{ category.name }}</RouterLink>
                            </h3>
                        </div>
                        <p class="category-description">{{ category.description }}</p>
                        <div class="category-stats">
                            <span>{{ category.topics }} Topics</span>
                            <span>{{ category.posts }} Posts</span>
                        </div>
                        <div class="category-latest-post" v-if="category.latestPost">
                            <p><strong>Latest:</strong>
                                <RouterLink :to="`/forums/topic/${category.latestPost.slug}`">{{
                                    category.latestPost.title }}</RouterLink>
                            </p>
                            <p class="latest-post-meta">by {{ category.latestPost.author }} - {{
                                formatDate(category.latestPost.date) }}</p>
                        </div>
                        <RouterLink :to="`/forums/category/${category.slug}`"
                            class="btn btn-secondary view-category-btn">View Category</RouterLink>
                    </div>
                </div>
            </div>
        </section>
    </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import HeroSection from '../components/HeroSection.vue';
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

export default {
    name: 'DisformsPage',
    components: {
        MainLayout,
        HeroSection,
        RouterLink
    },
    setup() {
        // Placeholder data - replace with actual data fetching
        const categories = ref([
            { id: 1, slug: 'general-discussion', name: 'General Discussion', icon: '💬', description: 'Talk about anything related to AI and GenAI Labs.', topics: 120, posts: 1500, latestPost: { title: 'Excited about the new features!', slug: 'topic-1', author: 'UserA', date: '2024-03-14T10:00:00Z' } },
            { id: 2, slug: 'model-development', name: 'Model Development', icon: '🧠', description: 'Discuss techniques, challenges, and best practices for building AI models.', topics: 85, posts: 950, latestPost: { title: 'Tips for fine-tuning NLP models?', slug: 'topic-2', author: 'UserB', date: '2024-03-13T15:30:00Z' } },
            { id: 3, slug: 'platform-feedback', name: 'Platform Feedback', icon: '🛠️', description: 'Share your feedback and suggestions for the GenAI Labs platform.', topics: 40, posts: 300, latestPost: { title: 'Feature request: Dark mode for dashboard', slug: 'topic-3', author: 'UserC', date: '2024-03-12T09:00:00Z' } },
            { id: 4, slug: 'showcase-projects', name: 'Showcase & Projects', icon: '🏆', description: 'Share your projects built with GenAI Labs and get feedback.', topics: 30, posts: 200, latestPost: null },
        ]);

        const formatDate = (dateString) => {
            if (!dateString) return '';
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        };

        return {
            categories,
            formatDate
        };
    }
};
</script>

<style scoped>
.forums-section {
    background-color: rgba(31, 41, 63, 0.1);
}

.forums-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    flex-wrap: wrap;
    /* Allow wrapping on smaller screens */
    gap: 1rem;
}

.forums-header .section-title {
    margin-bottom: 0;
    /* Remove bottom margin from section title here */
    text-align: left;
}

.forums-actions {
    display: flex;
    gap: 1rem;
}

.search-input {
    padding: 0.75rem 1rem;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
    min-width: 200px;
}

.search-input:focus {
    outline: none;
    border-color: var(--color-primary);
}

.forum-categories {
    display: grid;
    gap: 2rem;
}

.category-card {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: box-shadow 0.3s ease;
}

.category-card:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.category-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.category-icon {
    font-size: 1.8rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}

.category-title a {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text);
    text-decoration: none;
}

.category-title a:hover {
    color: var(--color-primary);
}

.category-description {
    opacity: 0.8;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.category-stats {
    display: flex;
    gap: 1.5rem;
    font-size: 0.9rem;
    opacity: 0.7;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}

.category-latest-post {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
}

.category-latest-post strong {
    font-weight: 500;
    opacity: 0.8;
}

.category-latest-post a {
    color: var(--color-secondary);
    text-decoration: none;
}

.category-latest-post a:hover {
    text-decoration: underline;
}

.latest-post-meta {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-top: 0.3rem;
}

.view-category-btn {
    width: 100%;
    margin-top: auto;
    /* Push to bottom if card height varies */
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
}

.view-category-btn:hover {
    background: rgba(255, 255, 255, 0.12);
}

@media (max-width: 768px) {
    .forums-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .forums-header .section-title {
        margin-bottom: 1rem;
    }

    .forums-actions {
        width: 100%;
        flex-direction: column;
    }

    .search-input {
        min-width: 100%;
    }
}
</style>