<template>
  <main>
    <div class="game-list">
      <div class="container">
        <div class="game-list__header">
          <h2 class="game-list__title">
            Games List <span class="badge">Found: {{ store.totalItems }}</span>
          </h2>
          <div class="game-list__actions">
            <BaseActionBtn @click="handleUndo" :disabled="!store.canUndo">
              <IconsUndo size="16px" color="#E5EDFF" />
            </BaseActionBtn>
            <BaseActionBtn @click="handleRedo" :disabled="!store.canRedo">
              <IconsRedo size="16px" color="#E5EDFF" />
            </BaseActionBtn>
          </div>
        </div>

        <div
          class="game-list__wrapper"
          @dragover.prevent="handleDragOver"
          @dragenter.prevent
          @dragleave="handleDragLeave"
          @drop="handleDrop"
        >
          <GameCard
            v-for="(element, index) in store.paginatedGames"
            :key="element.id"
            :game="element"
            :index="index"
            :dragging-id="draggingElementId"
            :drag-over-id="dragOverElementId"
            :is-open="openedLists.includes(element.id)"
            @drag-start="handleDragStart"
            @drag-end="handleDragEnd"
            @toggle-list="toggleList"
            :active-popover-id="activePopoverId"
            @toggle-popover="handlePopoverToggle"
          />

          <div
            v-if="!store.paginatedGames.length && store.totalItems > 0"
            class="empty-page-message"
          >
            Loading...
          </div>
          <div v-if="store.totalItems === 0" class="empty-list-message">
            Empty
          </div>
        </div>

        <Pagination
          v-if="store.totalItems > 0"
          :store="store"
          :pagination-numbers="paginationNumbers"
          @go-to-page="goToPage"
          @next-page="nextPage"
          @prev-page="prevPage"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useGamesStore } from "@/stores/games";

const store = useGamesStore();
const draggingElementId = ref<number | null>(null);
const draggingElementIndex = ref<number | null>(null);
const dragOverElementId = ref<number | null>(null);
const openedLists = ref<number[]>([]);
const activePopoverId = ref<number | null | string>(null);

function handlePopoverToggle(id: number) {
  if (activePopoverId.value === id) {
    activePopoverId.value = null;
  } else {
    activePopoverId.value = id;
  }
}
onMounted(async () => {
  const loadedFromStorage = store.loadHistoryFromLocalStorage();
  if (!loadedFromStorage) {
    await store.fetchAllGames();
  } else {
    store.updatePaginatedGames();
  }
});

const handleDragStart = (event: DragEvent, id: number, index: number) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id.toString());
    draggingElementId.value = id;
    draggingElementIndex.value = index;
    setTimeout(() => {
      (event.target as HTMLElement)?.classList.add("dragging-effect");
    }, 0);
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  const targetElement = (event.target as HTMLElement).closest(".game-card");
  if (targetElement) {
    const targetId = parseInt(targetElement.getAttribute("data-id") || "0", 10);
    dragOverElementId.value =
      targetId !== draggingElementId.value ? targetId : null;
  } else {
    dragOverElementId.value = null;
  }
};

const handleDragLeave = (event: DragEvent) => {
  const relatedTarget = event.relatedTarget as Node | null;
  const currentTarget = event.currentTarget as Node;
  if (!currentTarget?.contains(relatedTarget)) {
    dragOverElementId.value = null;
  }
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const draggedId = parseInt(
    event.dataTransfer?.getData("text/plain") || "0",
    10
  );
  if (!draggedId || draggingElementIndex.value === null) return;

  const oldIndex = calculateAbsoluteIndex(draggingElementIndex.value);
  const targetElement = (event.target as HTMLElement).closest(".game-card");
  const newIndex = targetElement
    ? calculateAbsoluteIndex(
        parseInt(targetElement.getAttribute("data-index") || "0", 10)
      )
    : store.allGames.length - 1;

  if (oldIndex !== newIndex) {
    store.moveGame(oldIndex, newIndex);
  }
  dragOverElementId.value = null;
};

const handleDragEnd = () => {
  const draggingElem = document.querySelector(
    `.game-card[data-id="${draggingElementId.value}"]`
  );
  draggingElem?.classList.remove("dragging-effect");
  draggingElementId.value = null;
  draggingElementIndex.value = null;
  dragOverElementId.value = null;
};

const calculateAbsoluteIndex = (pageIndex: number): number => {
  return (store.currentPage - 1) * store.itemsPerPage + pageIndex;
};

const paginationNumbers = computed(() => {
  const current = store.currentPage;
  const last = store.totalPages;
  const delta = 1;
  const range = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  if (last <= 1) return [];

  for (let i = 1; i <= last; i++) {
    if (
      i === 1 ||
      i === last ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  const uniqueRange = [...new Set(range)];
  for (const i of uniqueRange) {
    if (l !== undefined && i - l > 1) {
      rangeWithDots.push(i - l === 2 ? l + 1 : "...");
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
});

const goToPage = (page: number | string) => {
  if (typeof page === "number" && page !== store.currentPage) {
    store.setCurrentPage(page);
  }
};

const nextPage = () =>
  store.currentPage < store.totalPages && goToPage(store.currentPage + 1);
const prevPage = () => store.currentPage > 1 && goToPage(store.currentPage - 1);
const handleUndo = () => store.undo();
const handleRedo = () => store.redo();
const toggleList = (id: number) => {
  const index = openedLists.value.indexOf(id);
  if (index === -1) {
    openedLists.value.push(id);
  } else {
    openedLists.value.splice(index, 1);
  }
};
</script>
