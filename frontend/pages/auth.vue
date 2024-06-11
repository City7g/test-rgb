<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <section class="container">
    <h1>User info</h1>

    <ul>
      <li>User name: {{ authStore.user?.name ?? '---' }}</li>
      <li>User email: {{ authStore.user?.email ?? '---' }}</li>
    </ul>
  </section>
</template>
