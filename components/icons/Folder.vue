<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M1.7998 5.39961C1.7998 4.4055 2.60569 3.59961 3.5998 3.59961H8.0998L9.8998 5.39961H14.3998C15.3939 5.39961 16.1998 6.2055 16.1998 7.19961V12.5996C16.1998 13.5937 15.3939 14.3996 14.3998 14.3996H3.5998C2.60569 14.3996 1.7998 13.5937 1.7998 12.5996V5.39961Z"
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
