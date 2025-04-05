import { defineEventHandler, getQuery } from "h3";
import { mockGames } from "../data/mockGames";
export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = parseInt((query.page as string) || "1", 10);
  const size = parseInt((query.size as string) || "6", 10);

  const gamesSource = [...mockGames];

  const totalItems = gamesSource.length;
  const totalPages = Math.ceil(totalItems / size);

  const validPage = Math.max(1, Math.min(page, totalPages || 1));

  const startIndex = (validPage - 1) * size;
  const endIndex = startIndex + size;

  const items = gamesSource.slice(startIndex, endIndex);

  return {
    items: items,
    total: totalItems,
    page: validPage,
    size: size,
    totalPages: totalPages,
  };
});
