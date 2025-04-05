<template>
  <button :class="typeColor" class="action-btn"><slot></slot></button>
</template>

<script setup lang="ts">
const props: any = defineProps(["type"]);
const typeColor = computed<string>(() => {
  switch (props.type) {
    case "primary":
      return "pr-action-btn";
    case "second":
      return "second-action-btn";
    default:
      return "";
  }
});
</script>
