<!-- src/views/TermsPage.vue -->
<template>
  <MainLayout>
    <HeroSection
      title="Terms of Service"
      subtitle="Please read these terms carefully before using our services."
      bgShape="none"
    />
    <section class="section text-content-section">
      <div class="container">
        <h2 class="section-title">GenAI Labs <span class="gradient-text">Terms</span></h2>
        <div class="content-prose">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing or using the GenAI Labs website, services, APIs, or applications (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.</p>

          <h3>2. Use License</h3>
          <p>Permission is granted to temporarily download one copy of the materials (information or software) on GenAI Labs' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on GenAI Labs' website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
          <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by GenAI Labs at any time.</p>

          <h3>3. Disclaimer</h3>
          <p>The materials on GenAI Labs' website are provided on an 'as is' basis. GenAI Labs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

          <h3>4. Limitations</h3>
          <p>In no event shall GenAI Labs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GenAI Labs' website, even if GenAI Labs or a GenAI Labs authorized representative has been notified orally or in writing of the possibility of such damage.</p>

          <h3>5. Modifications</h3>
          <p>GenAI Labs may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>

          <h3>6. Governing Law</h3>
          <p>These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction, e.g., California] and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>

          <p><em>Last Updated: {{ new Date().toLocaleDateString() }}</em></p>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import HeroSection from '../components/HeroSection.vue';

export default {
  name: 'TermsPage',
  components: {
    MainLayout,
    HeroSection
  }
};
</script>

<style scoped>
/* Reusing styles from PrivacyPolicyPage example */
.text-content-section {
  background-color: rgba(31, 41, 63, 0.1);
  padding-bottom: 6rem;
}

.content-prose {
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
  opacity: 0.9;
  color: var(--color-text);
}

.content-prose h3 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-primary);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
}
.content-prose h3:first-child {
    margin-top: 0;
}

.content-prose p {
  margin-bottom: 1.5rem;
}

.content-prose ul {
  list-style: disc;
  margin-left: 2rem;
  margin-bottom: 1.5rem;
}

.content-prose li {
  margin-bottom: 0.5rem;
}

.content-prose em {
    display: block;
    margin-top: 3rem;
    font-style: italic;
    opacity: 0.7;
    text-align: center;
}
</style>