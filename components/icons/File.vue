<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.59961 3.5998C3.59961 2.60569 4.4055 1.7998 5.39961 1.7998H9.52683C10.0042 1.7998 10.462 1.98944 10.7996 2.32702L13.8724 5.3998C14.21 5.73737 14.3996 6.19521 14.3996 6.67259V14.3998C14.3996 15.3939 13.5937 16.1998 12.5996 16.1998H5.39961C4.4055 16.1998 3.59961 15.3939 3.59961 14.3998V3.5998Z"
      :fill="color"
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
