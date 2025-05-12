<template>
  <header class="navbar">
    <div class="container navbar-container">
      <RouterLink to="/" class="navbar-logo" @click="closeMenu">
        <span class="logo-text">GenAI<span class="gradient-text">Labs</span></span>
      </RouterLink>

      <div class="navbar-menu-toggle" @click="toggleMenu">
        <div class="bar" :class="{ active: isMenuOpen }" />
        <div class="bar" :class="{ active: isMenuOpen }" />
        <div class="bar" :class="{ active: isMenuOpen }" />
      </div>

      <nav class="navbar-links" :class="{ 'active': isMenuOpen }">
        <RouterLink to="/" class="navbar-link" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/about" class="navbar-link" @click="closeMenu">About</RouterLink>
        <RouterLink to="/contact" class="navbar-link" @click="closeMenu">Contact</RouterLink>
        <RouterLink to="/gen" class="navbar-link navbar-link-highlight" @click="closeMenu">Gen AI</RouterLink>
        <div class="navbar-auth">
          <RouterLink to="/login" class="btn btn-login" @click="closeMenu">Login</RouterLink>
          <RouterLink to="/register" class="btn btn-primary" @click="closeMenu">Register</RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'Navbar',
  components: {
    RouterLink
  },
  setup() {
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    const closeMenu = () => {
      isMenuOpen.value = false
    }

    return {
      isMenuOpen,
      toggleMenu,
      closeMenu
    }
  }
}
</script>


<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(8, 12, 12, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 0;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-text);
  z-index: 1001;
}

.logo-text {
  margin-left: 0.5rem;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-link {
  position: relative;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar-link:hover {
  color: var(--color-primary);
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent-3));
  transition: width 0.3s ease;
}

.navbar-link:hover::after,
.router-link-active::after {
  width: 100%;
}

.navbar-link-highlight {
  color: var(--color-primary);
  font-weight: 600;
}

.navbar-auth {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: 2rem;
}

.btn-login {
  color: var(--color-text);
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.btn-login:hover {
  opacity: 1;
}

.navbar-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  z-index: 1001;
}

.bar {
  width: 30px;
  height: 2px;
  background-color: var(--color-text);
  transition: all 0.3s ease;
}

.bar.active:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.bar.active:nth-child(2) {
  opacity: 0;
}

.bar.active:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

@media (max-width: 768px) {
  .navbar-menu-toggle {
    display: flex;
  }

  .navbar-links {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--color-background);
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    padding: 2rem;
  }

  .navbar-links.active {
    transform: translateX(0);
  }

  .navbar-auth {
    flex-direction: column;
    margin-left: 0;
    width: 100%;
    margin-top: 2rem;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>
