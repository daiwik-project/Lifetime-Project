<template>
  <div class="layout">
    <Navbar />
    <main class="main-content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'MainLayout',
  components: {
    Navbar,
    Footer
  }
}
</script>


<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 80px; /* Space for fixed navbar */
  width: 100%;
}
</style>
