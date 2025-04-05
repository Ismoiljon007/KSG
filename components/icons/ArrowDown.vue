<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M4 6L8 10L12 6"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size: string;
  color: string;
}

const props = defineProps<Props>();

const size = props.size || "14px";
const color = props.color || "#000000";
</script>

<style lang="scss" scoped></style>
