<template>
  <div class="spinner"></div>
</template>

<style lang="scss">
.spinner {
  width: 32px;
  height: 32px;
  border: 4px solid #39b100;
  border-right-color: transparent;
  border-radius: 50%;
  animation: 0.75s linear infinite spinner-border;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}
</style>
