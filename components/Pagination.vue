<template>
  <div class="game-list__footer">
    <div class="game-list__size">
      Showing {{ store.paginatedGames.length }} of {{ store.totalItems }}
    </div>
    <nav
      v-if="store.totalPages > 1"
      class="pagination-nav"
      aria-label="Game list navigation"
    >
      <ul class="pagination-controls">
        <li class="page-item" :class="{ disabled: store.currentPage === 1 }">
          <a
            class="page-link prev-next"
            href="#"
            @click.prevent="$emit('prev-page')"
            aria-label="Previous"
          >
            <
          </a>
        </li>

        <li
          v-for="(page, index) in paginationNumbers"
          :key="index"
          class="page-item"
          :class="{
            active: page === store.currentPage,
            disabled: page === '...',
          }"
        >
          <span v-if="page === '...'" class="page-link ellipsis">...</span>
          <a
            v-else
            class="page-link"
            href="#"
            @click.prevent="$emit('go-to-page', page)"
          >
            {{ page }}
          </a>
        </li>

        <li
          class="page-item"
          :class="{ disabled: store.currentPage === store.totalPages }"
        >
          <a
            class="page-link prev-next"
            href="#"
            @click.prevent="$emit('next-page')"
            aria-label="Next"
          >
            >
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  store: any;
  paginationNumbers: (number | string)[];
}>();

defineEmits<{
  (e: "go-to-page", page: number | string): void;
  (e: "next-page"): void;
  (e: "prev-page"): void;
}>();
</script>
