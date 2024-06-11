<script setup lang="ts">
const currentPage = defineModel({ default: 0 })

defineProps<{
  count: number
}>()
</script>

<template>
  <nav aria-label="Files pagination">
    <ul class="pagination">
      <li class="pagination__item">
        <button
          @click="currentPage--"
          :disabled="currentPage === 0"
          class="pagination__link"
        >
          Prev
        </button>
      </li>

      <template v-for="item in count" :key="item">
        <li class="pagination__item">
          <button
            @click="currentPage = item - 1"
            class="pagination__link"
            :class="{ current: item - 1 === currentPage }"
            :disabled="item - 1 === currentPage"
          >
            {{ item }}
          </button>
        </li>
      </template>

      <li class="pagination__item">
        <button
          @click="currentPage++"
          :disabled="currentPage === count - 1"
          class="pagination__link"
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
}

.pagination__link {
  padding: 8px 16px;
  border-radius: 0;
  border: 1px solid #39b100;
  transition: 0.3s background-color ease, 0.3s color ease;

  @media (pointer: fine) {
    &:hover {
      background-color: rgba(#39b100, 0.1);
    }
  }

  &:active {
    background-color: rgba(#39b100, 0.2);
  }

  &:focus-visible {
    outline: 2px solid #39b100;
    outline-offset: -2px;
  }
}

.pagination__link.current {
  background-color: #39b100;
  color: white;
  cursor: not-allowed;
}

.pagination__item:first-child .pagination__link {
  border-radius: 4px 0 0 4px;
}

.pagination__item:last-child .pagination__link {
  border-radius: 0 4px 4px 0;
}

.pagination__item:not(:first-child) {
  margin-left: -1px;
}
</style>
