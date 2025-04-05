<template>
  <div
    class="game-card draggable"
    :data-id="game.id"
    :data-index="index"
    :class="{
      dragging: draggingId === game.id,
      'drag-over': dragOverId === game.id,
    }"
    draggable="true"
    @dragstart="$emit('drag-start', $event, game.id, index)"
    @dragend="$emit('drag-end')"
  >
    <div class="game-card__header">
      <div class="game-item">
        <h4 class="game-item__subtitle">№</h4>
        <div class="game-item__info">{{ absoluteOrder }}</div>
      </div>
      <div class="game-item">
        <h4 class="game-item__subtitle">Name</h4>
        <div class="game-item__info">
          <IconsFolder size="18px" color="#92A1BF" />
          <span>{{ game.name }}</span>
        </div>
      </div>
      <div class="game-item">
        <h4 class="game-item__subtitle">Page Order</h4>
        <div class="game-item__info">{{ index + 1 }}</div>
      </div>
      <div class="game-item">
        <h4 class="game-item__subtitle">Sub categories</h4>
        <div class="game-item__info">
          <ul v-if="game.sub_categories.length" class="sub-categories-list">
            <li
              v-for="(sub, i) in truncatedSubCategories"
              :key="i"
              class="truncate"
            >
              {{ sub
              }}<span v-if="i < truncatedSubCategories.length - 1">/</span
              ><span
                v-if="
                  i === truncatedSubCategories.length - 1 &&
                  game.sub_categories.length > 6
                "
                >...</span
              >
            </li>
          </ul>
          <span v-else>---</span>
        </div>
      </div>
      <div class="game-item game-item__count">
        <div class="game-item__info">
          <span class="game-count">{{ game.sub_categories.length }}</span>
        </div>
      </div>
      <div class="game-actions">
        <BaseActionBtn
          v-if="game.sub_categories.length"
          @click="$emit('toggle-list', game.id)"
          type="primary"
        >
          <IconsArrowDown
            size="16px"
            color="#fff"
            :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
          />
        </BaseActionBtn>
        <div class="popover">
          <BaseActionBtn @click="togglePopover(game.id)" type="second">
            <IconsDots size="24px" color="#fff" />
          </BaseActionBtn>
          <div class="popover-list" v-if="activePopoverId === game.id">
            <div class="popover-item">
              <IconsEdit size="20px" color="#92A1BF" />
              <span>Edit</span>
            </div>
            <div class="popover-item">
              <IconsTrash size="20px" color="#92A1BF" />
              <span>Remove</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="game-card__list" v-show="isOpen">
      <div
        class="game-card__item"
        v-for="(item, subIndex) in game.sub_categories"
        :key="item"
      >
        <div class="game-item">
          <h4 class="game-item__subtitle">№</h4>
          <div class="game-item__info">{{ subIndex + 1 }}</div>
        </div>
        <div class="game-item">
          <h4 class="game-item__subtitle">Name</h4>
          <div class="game-item__info">
            <IconsFile size="18px" color="#92A1BF" />
            <span>{{ item }}</span>
          </div>
        </div>
        <div class="game-item">
          <h4 class="game-item__subtitle">Order</h4>
          <div class="game-item__info">{{ subIndex + 1 }}</div>
        </div>
        <div class="game-actions">
          <div class="popover">
            <BaseActionBtn
              @click.stop="togglePopover(`${game.id}-${subIndex}`)"
              type="second"
            >
              <IconsDots size="24px" color="#fff" />
            </BaseActionBtn>
            <div
              class="popover-list"
              v-if="activePopoverId === `${game.id}-${subIndex}`"
            >
              <div class="popover-item">
                <IconsEdit size="20px" color="#92A1BF" />
                <span>Edit</span>
              </div>
              <div class="popover-item">
                <IconsTrash size="20px" color="#92A1BF" />
                <span>Remove</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  game: { id: number; name: string; sub_categories: string[] };
  index: number;
  draggingId: number | null;
  dragOverId: number | null;
  isOpen: boolean;
  activePopoverId: number | null | string;
}>();

const emit = defineEmits<{
  (e: "drag-start", event: DragEvent, id: number, index: number): void;
  (e: "drag-end"): void;
  (e: "toggle-list", id: number): void;
  (e: "toggle-popover", id: number): void;
}>();

function togglePopover(id: number | string) {
  emit("toggle-popover", id);
}

const absoluteOrder = computed(() => props.index + 1);

const truncatedSubCategories = computed(() =>
  props.game.sub_categories
    .slice(0, 6)
    .map((item: any) => (item.length > 15 ? item.substring(0, 15) + "..." : item))
);

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const popover = target.closest('.popover');
  
  if (!popover) {
    emit('toggle-popover', null);
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>
