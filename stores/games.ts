import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface Game {
  id: number;
  name: string;
  sub_categories: string[];
}

interface HistoryEntry {
  games: Game[];
}

const MAX_HISTORY_STEPS = 20;

export const useGamesStore = defineStore("games", () => {
  const games = ref<Game[]>([]);
  const totalItems = ref<number>(0);
  const currentPage = ref<number>(1);
  const itemsPerPage = ref<number>(6);

  const history = ref<HistoryEntry[]>([]);
  const historyIndex = ref<number>(-1);

  const totalPages = computed(() =>
    Math.ceil(totalItems.value / itemsPerPage.value)
  );
  const paginatedGames = computed(() => games.value);

  const canUndo = computed(() => historyIndex.value > 0);
  const canRedo = computed(() => historyIndex.value < history.value.length - 1);

  async function fetchGames(page: number = currentPage.value) {
    try {
      const { data, error } = await useFetch<{ items: Game[]; total: number }>(
        `/api/games?page=${page}&size=${itemsPerPage.value}`
      );

      if (error.value) {
        console.error(error.value);
        return;
      }

      if (data.value) {
        games.value = data.value.items;
        totalItems.value = data.value.total;
        currentPage.value = page;
      }
    } catch (err) {
      console.error(err);
    }
  }

  function recordHistory(newGamesState: Game[]) {
    if (historyIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, historyIndex.value + 1);
    }

    history.value.push({ games: JSON.parse(JSON.stringify(newGamesState)) });

    if (history.value.length > MAX_HISTORY_STEPS + 1) {
      history.value.shift();
    } else {
      historyIndex.value++;
    }
    if (
      history.value.length <= MAX_HISTORY_STEPS + 1 &&
      historyIndex.value < history.value.length - 1
    ) {
      historyIndex.value = history.value.length - 1;
    }
    historyIndex.value = history.value.length - 1;
    saveHistoryToLocalStorage();
  }

  const allGames = ref<Game[]>([]);
  async function fetchAllGames() {
    try {
      const { data, error } = await useFetch<{ items: Game[]; total: number }>(
        "/api/games?page=1&size=1000"
      );
      if (data.value) {
        allGames.value = data.value.items;
        totalItems.value = data.value.total;
        if (history.value.length === 0) {
          recordHistory(allGames.value);
          historyIndex.value = 0;
        } else {
          if (historyIndex.value >= 0 && history.value[historyIndex.value]) {
            allGames.value = JSON.parse(
              JSON.stringify(history.value[historyIndex.value].games)
            );
          }
        }
        updatePaginatedGames();
      } else if (error.value) {
        console.error(error.value);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function moveGame(oldAbsoluteIndex: number, newAbsoluteIndex: number) {
    if (
      oldAbsoluteIndex < 0 ||
      oldAbsoluteIndex >= allGames.value.length ||
      newAbsoluteIndex < 0 ||
      newAbsoluteIndex >= allGames.value.length
    ) {
      return;
    }

    const movedItem = allGames.value.splice(oldAbsoluteIndex, 1)[0];
    allGames.value.splice(newAbsoluteIndex, 0, movedItem);

    recordHistory(allGames.value);
    updatePaginatedGames();
  }

  function updatePaginatedGames() {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    games.value = allGames.value.slice(start, end);
  }

  function setCurrentPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
      updatePaginatedGames();
    }
  }

  function undo() {
    if (canUndo.value) {
      historyIndex.value--;
      const previousState = JSON.parse(
        JSON.stringify(history.value[historyIndex.value].games)
      );
      allGames.value = previousState;
      updatePaginatedGames();
      console.log(historyIndex.value);
      saveHistoryToLocalStorage();
    }
  }

  function redo() {
    if (canRedo.value) {
      historyIndex.value++;
      const nextState = JSON.parse(
        JSON.stringify(history.value[historyIndex.value].games)
      );
      allGames.value = nextState;
      updatePaginatedGames();
      console.log(historyIndex.value);
      saveHistoryToLocalStorage();
    }
  }

  const storageKey = "gamesHistory";

  function saveHistoryToLocalStorage() {
    try {
      const historyData = {
        history: history.value,
        historyIndex: historyIndex.value,
      };
      localStorage.setItem(storageKey, JSON.stringify(historyData));
    } catch (e) {
      console.error(e);
    }
  }

  function loadHistoryFromLocalStorage() {
    try {
      const savedHistory = localStorage.getItem(storageKey);
      if (savedHistory) {
        const parsedData = JSON.parse(savedHistory);
        if (
          parsedData &&
          Array.isArray(parsedData.history) &&
          typeof parsedData.historyIndex === "number"
        ) {
          history.value = parsedData.history;
          historyIndex.value = parsedData.historyIndex;

          if (historyIndex.value >= 0 && history.value[historyIndex.value]) {
            allGames.value = JSON.parse(
              JSON.stringify(history.value[historyIndex.value].games)
            );
            totalItems.value = allGames.value.length;
            updatePaginatedGames();
            return true;
          }
        } else {
          localStorage.removeItem(storageKey);
        }
      }
    } catch (e) {
      localStorage.removeItem(storageKey);
    }
    return false;
  }

  return {
    games,
    allGames,
    paginatedGames,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    history,
    historyIndex,
    canUndo,
    canRedo,
    fetchGames,
    fetchAllGames,
    moveGame,
    setCurrentPage,
    updatePaginatedGames,
    undo,
    redo,
    loadHistoryFromLocalStorage,
  };
});
