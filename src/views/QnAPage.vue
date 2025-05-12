<!-- src/views/QandAPage.vue -->
<template>
    <MainLayout>
        <HeroSection title="Q&A Hub"
            subtitle="Ask questions, find answers, and share your knowledge with the GenAI Labs community."
            bgShape="square" />

        <section class="section qna-section">
            <div class="container">
                <div class="qna-header">
                    <h2 class="section-title">Ask & <span class="gradient-text">Answer</span></h2>
                    <div class="qna-actions">
                        <input type="text" v-model="searchQuery" placeholder="Search questions..." class="search-input">
                        <RouterLink to="/qna/ask" class="btn btn-primary">Ask Question</RouterLink>
                    </div>
                </div>

                <!-- Filters: All, Unanswered, My Questions, Tags -->
                <div class="qna-filters">
                    <button v-for="filter in filters" :key="filter.id" @click="activeFilter = filter.id"
                        :class="{ active: activeFilter === filter.id }" class="filter-btn">
                        {{ filter.name }}
                    </button>
                </div>

                <div v-if="filteredQuestions.length > 0" class="questions-list">
                    <div class="question-item" v-for="question in filteredQuestions" :key="question.id">
                        <div class="question-stats">
                            <div class="stat-item"><span>{{ question.votes }}</span> votes</div>
                            <div
                                :class="['stat-item', { 'has-answers': question.answers > 0, 'accepted': question.hasAcceptedAnswer }]">
                                <span>{{ question.answers }}</span> answers
                            </div>
                            <div class="stat-item"><span>{{ question.views }}</span> views</div>
                        </div>
                        <div class="question-summary">
                            <h3 class="question-title">
                                <RouterLink :to="`/qna/question/${question.slug}`">{{ question.title }}</RouterLink>
                            </h3>
                            <div class="question-tags">
                                <span v-for="tag in question.tags" :key="tag" class="tag">{{ tag }}</span>
                            </div>
                            <p class="question-meta">
                                Asked by <RouterLink :to="`/user/${question.authorSlug}`" class="author-link">{{
                                    question.author }}</RouterLink>
                                <span class="timestamp"> {{ timeAgo(question.date) }}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else class="no-questions">
                    <p>No questions found matching your criteria. Be the first to <RouterLink to="/qna/ask"
                            class="ask-link">ask a question</RouterLink>!</p>
                </div>

                <!-- Pagination -->
                <div class="pagination" v-if="totalPages > 1">
                    <button @click="currentPage--" :disabled="currentPage === 1">« Prev</button>
                    <span>Page {{ currentPage }} of {{ totalPages }}</span>
                    <button @click="currentPage++" :disabled="currentPage === totalPages">Next »</button>
                </div>

            </div>
        </section>
    </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import HeroSection from '../components/HeroSection.vue';
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';

export default {
    name: 'QandAPage',
    components: {
        MainLayout,
        HeroSection,
        RouterLink
    },
    setup() {
        const searchQuery = ref('');
        const activeFilter = ref('all');
        const currentPage = ref(1);
        const itemsPerPage = ref(10); // Example

        const filters = ref([
            { id: 'all', name: 'All Questions' },
            { id: 'unanswered', name: 'Unanswered' },
            { id: 'my-questions', name: 'My Questions' }, // Requires user auth
        ]);

        // Placeholder data - replace with actual data fetching and filtering logic
        const allQuestions = ref([
            { id: 1, slug: 'how-to-optimize-llm-inference', title: 'How to optimize LLM inference speed on a budget?', votes: 25, answers: 3, views: 1200, author: 'AI_Newbie', authorSlug: 'ai-newbie', date: '2024-03-10T10:00:00Z', tags: ['llm', 'optimization', 'inference'], hasAcceptedAnswer: true },
            { id: 2, slug: 'best-dataset-for-image-segmentation', title: 'What are the best public datasets for image segmentation tasks?', votes: 15, answers: 1, views: 850, author: 'DataSeeker', authorSlug: 'dataseeker', date: '2024-03-08T14:30:00Z', tags: ['dataset', 'image-segmentation'], hasAcceptedAnswer: false },
            { id: 3, slug: 'understanding-transformer-attention', title: 'Can someone explain the self-attention mechanism in Transformers simply?', votes: 42, answers: 5, views: 2500, author: 'CuriousCoder', authorSlug: 'curiouscoder', date: '2024-03-05T09:15:00Z', tags: ['transformer', 'nlp', 'attention'], hasAcceptedAnswer: true },
            { id: 4, slug: 'genai-labs-api-rate-limits', title: 'What are the API rate limits for GenAI Labs free tier?', votes: 8, answers: 0, views: 300, author: 'DevUser', authorSlug: 'devuser', date: '2024-03-12T11:00:00Z', tags: ['api', 'genai-labs', 'rate-limit'], hasAcceptedAnswer: false },
        ]);

        const filteredQuestions = computed(() => {
            let questions = allQuestions.value;
            if (searchQuery.value) {
                questions = questions.filter(q => q.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || q.tags.some(t => t.toLowerCase().includes(searchQuery.value.toLowerCase())));
            }
            if (activeFilter.value === 'unanswered') {
                questions = questions.filter(q => q.answers === 0);
            }
            // Add 'my-questions' filter logic if user auth is implemented
            // Paginate
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return questions.slice(start, end);
        });

        const totalPages = computed(() => {
            // Recalculate total pages based on filtered (before pagination) length
            let questions = allQuestions.value;
            if (searchQuery.value) {
                questions = questions.filter(q => q.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
            }
            if (activeFilter.value === 'unanswered') {
                questions = questions.filter(q => q.answers === 0);
            }
            return Math.ceil(questions.length / itemsPerPage.value);
        });


        const timeAgo = (dateString) => {
            const date = new Date(dateString);
            const seconds = Math.floor((new Date() - date) / 1000);
            let interval = seconds / 31536000;
            if (interval > 1) return Math.floor(interval) + " years ago";
            interval = seconds / 2592000;
            if (interval > 1) return Math.floor(interval) + " months ago";
            interval = seconds / 86400;
            if (interval > 1) return Math.floor(interval) + " days ago";
            interval = seconds / 3600;
            if (interval > 1) return Math.floor(interval) + " hours ago";
            interval = seconds / 60;
            if (interval > 1) return Math.floor(interval) + " minutes ago";
            return Math.floor(seconds) + " seconds ago";
        };

        return {
            searchQuery,
            activeFilter,
            filters,
            filteredQuestions,
            timeAgo,
            currentPage,
            totalPages
        };
    }
};
</script>

<style scoped>
.qna-section {
    background-color: rgba(31, 41, 63, 0.15);
    /* Slightly different shade */
}

.qna-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.qna-header .section-title {
    margin-bottom: 0;
    text-align: left;
}

.qna-actions {
    display: flex;
    gap: 1rem;
}

.search-input {
    padding: 0.75rem 1rem;
    border-radius: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
    min-width: 250px;
}

.search-input:focus {
    outline: none;
    border-color: var(--color-primary);
}

.qna-filters {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 2.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 1rem;
}

.filter-btn {
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.05);
    color: var(--color-text);
    opacity: 0.7;
    transition: all 0.3s ease;
}

.filter-btn:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.1);
}

.filter-btn.active {
    opacity: 1;
    background-color: var(--color-primary);
    color: var(--color-background);
    /* Or a dark text color */
    font-weight: 500;
}


.questions-list {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    /* Minimal gap, border will separate */
}

.question-item {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.question-item:last-child {
    border-bottom: none;
}

.question-stats {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: var(--color-text);
    opacity: 0.8;
    min-width: 80px;
    /* Ensure some space */
    text-align: right;
}

.stat-item span {
    font-weight: bold;
    display: block;
    font-size: 1.1rem;
}

.stat-item.has-answers {
    border: 1px solid var(--color-secondary);
    color: var(--color-secondary);
    padding: 0.2rem 0.5rem;
    border-radius: 3px;
}

.stat-item.has-answers.accepted {
    background-color: var(--color-secondary);
    color: var(--color-background);
}


.question-summary {
    flex-grow: 1;
}

.question-title {
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
}

.question-title a {
    color: var(--color-text);
    text-decoration: none;
}

.question-title a:hover {
    color: var(--color-primary);
}

.question-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 0.8rem;
}

.tag {
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--color-text);
    padding: 0.25rem 0.6rem;
    border-radius: 3px;
    font-size: 0.8rem;
    opacity: 0.8;
}

.question-meta {
    font-size: 0.85rem;
    opacity: 0.7;
}

.author-link {
    color: var(--color-secondary);
    font-weight: 500;
}

.author-link:hover {
    text-decoration: underline;
}

.no-questions {
    text-align: center;
    padding: 3rem 0;
    opacity: 0.8;
    font-size: 1.1rem;
}

.ask-link {
    color: var(--color-primary);
    font-weight: 500;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 3rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.pagination button {
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: var(--color-text);
}

.pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.15);
}

@media (max-width: 768px) {
    .qna-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .qna-actions {
        width: 100%;
        flex-direction: column;
    }

    .search-input {
        min-width: 100%;
    }

    .question-item {
        flex-direction: column;
        gap: 1rem;
    }

    .question-stats {
        flex-direction: row;
        gap: 1rem;
        min-width: auto;
        text-align: left;
        align-items: center;
    }

    .stat-item span {
        display: inline;
        margin-right: 0.3em;
    }
}
</style>