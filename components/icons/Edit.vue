<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M15.8708 6.16751C16.1858 5.85251 16.3591 5.43417 16.3591 4.98917C16.3591 4.54417 16.1858 4.12584 15.8708 3.81084L14.5491 2.48917C14.2341 2.17417 13.8158 2.00084 13.3708 2.00084C12.9258 2.00084 12.5074 2.17417 12.1933 2.48834L3.33325 11.3208V15H7.01075L15.8708 6.16751ZM13.3708 3.66751L14.6933 4.98834L13.3683 6.30834L12.0466 4.98751L13.3708 3.66751ZM4.99992 13.3333V12.0125L10.8666 6.16417L12.1883 7.48584L6.32242 13.3333H4.99992ZM3.33325 16.6667H16.6666V18.3333H3.33325V16.6667Z"
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
