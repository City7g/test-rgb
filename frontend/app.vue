<script setup lang="ts"></script>

<template>
  <Suspense>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <template #fallback>
      <BaseSpinner />
    </template>
  </Suspense>

  <!-- <NuxtLayout>
    <NuxtPage />
  </NuxtLayout> -->
</template>
