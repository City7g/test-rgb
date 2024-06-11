<script setup lang="ts">
import type { Files } from '~/types/Files'

defineProps<{
  table: Files
}>()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>User name</th>
        <th>File name</th>
        <th>File path</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in table" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.user.name }}</td>
        <td>{{ item.filename }}</td>
        <td>{{ item.path }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss">
table {
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

tr {
  border-bottom: 1px solid #dee2e6;
  transition: 0.1s all ease;

  @media (pointer: fine) {
    &:hover {
      background-color: #f2f2f2;
    }
  }
}

th,
td {
  padding: 12px 8px;
  max-width: 40%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
