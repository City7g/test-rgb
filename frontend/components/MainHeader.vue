<script setup lang="ts">
const authStore = useAuthStore()
</script>

<template>
  <header>
    <nav class="container">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/about">About</NuxtLink>

      <template v-if="authStore.status !== 'auth'">
        <NuxtLink to="/login">Login</NuxtLink>
        <NuxtLink to="/register">Register</NuxtLink>
      </template>

      <template v-else>
        <NuxtLink to="/update">Update</NuxtLink>
        <NuxtLink to="/file">File</NuxtLink>
        <NuxtLink to="/files">Files</NuxtLink>
        <NuxtLink @click.prevent="authStore.logout" to="/">Logout</NuxtLink>
      </template>

      <p>{{ authStore.user?.name ?? 'no login' }}</p>
    </nav>
  </header>
</template>

<style lang="scss">
header {
  padding: 20px 0;
  margin-bottom: 40px;
}

header nav {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

header nav a {
  position: relative;

  &.router-link-exact-active {
    color: #39b100;
  }

  &::after {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    right: 0;
    background-color: #39b100;
    content: '';
    transform: scaleX(0);
    transform-origin: left;
    transition: 0.3s transform ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transition-duration: 0.5s;
  }
}

header nav p {
  margin-left: auto;
}
</style>
