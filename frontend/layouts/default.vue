<script setup lang="ts">
const authStore = useAuthStore()

const router = useRouter()

try {
  if (localStorage.getItem('access_token')) {
    await authStore.me()
  }
} catch (err) {
  router.push('/login')
}
</script>

<template>
  <div>
    <MainHeader />

    <Suspense>
      <slot />
    </Suspense>
  </div>
</template>
