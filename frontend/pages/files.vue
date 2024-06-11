<script setup lang="ts">
const POSTS_PER_PAGE = 3

const files = ref([])
const currentPage = ref<number>(0)

const currentFiles = computed(() => {
  if (files.value) {
    return [...files.value].splice(
      POSTS_PER_PAGE * currentPage.value,
      POSTS_PER_PAGE * currentPage.value > files.value.length
        ? files.value.length % POSTS_PER_PAGE
        : POSTS_PER_PAGE
    )
  } else {
    return []
  }
})

onMounted(async () => {
  const { data } = await instance('/files')
  files.value = data
})
</script>

<template>
  <section class="files">
    <div class="container">
      <template v-if="files?.length">
        <BaseTable :table="currentFiles" />

        <BasePagination
          v-if="files.length > POSTS_PER_PAGE"
          :count="Math.ceil(files.length / POSTS_PER_PAGE)"
          v-model="currentPage"
          class="files__pagination"
        />
      </template>
    </div>
  </section>
</template>

<style lang="scss">
.files {
  padding-bottom: 40px;
}

.files__pagination {
  margin-top: 40px;
}
</style>
