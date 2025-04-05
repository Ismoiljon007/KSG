export interface Game {
  id: number;
  name: string;
  sub_categories: string[];
}

export const mockGames: Game[] = [
  {
    id: 1,
    name: "DOTA2",
    sub_categories: [
      "Head",
      "Weapon",
      "Back",
      "Shoulders",
      "Arms",
      "Bracers",
      "Collection",
      "Event",
      "Treasure",
      "Belt",
      "Legs",
    ],
  },
  { id: 2, name: "CS2", sub_categories: ["Gloves", "Knives", "Pistols"] },
  { id: 3, name: "RUST", sub_categories: [] },
  { id: 4, name: "PUBG", sub_categories: ["Helmet", "Vest", "Backpack"] },
  { id: 5, name: "Fortnite", sub_categories: ["Skins", "Emotes"] },
  {
    id: 6,
    name: "Apex Legends",
    sub_categories: ["Legends", "Weapons", "Packs"],
  },
  { id: 7, name: "Valorant", sub_categories: ["Agents", "Guns"] },
  {
    id: 8,
    name: "Overwatch 2",
    sub_categories: ["Heroes", "Skins", "Loot Boxes"],
  },
  { id: 9, name: "Minecraft", sub_categories: ["Blocks", "Mobs", "Tools"] },
  { id: 10, name: "Cyberpunk 2077", sub_categories: ["Weapons", "Cyberware"] },
  {
    id: 11,
    name: "The Witcher 3",
    sub_categories: ["Armor", "Swords", "Alchemy"],
  },
  { id: 12, name: "GTA V", sub_categories: ["Cars", "Weapons", "Apartments"] },
  {
    id: 13,
    name: "Red Dead Redemption 2",
    sub_categories: ["Horses", "Guns", "Outfits"],
  },
  { id: 14, name: "FIFA 23", sub_categories: ["Teams", "Players", "Kits"] },
  { id: 15, name: "NBA 2K23", sub_categories: ["Teams", "MyPlayer", "Shoes"] },
  {
    id: 16,
    name: "Mortal Kombat 11",
    sub_categories: ["Characters", "Fatalities"],
  },
  { id: 17, name: "Tekken 8", sub_categories: ["Fighters", "Costumes"] },
  { id: 18, name: "Street Fighter 6", sub_categories: ["Fighters", "Moves"] },
  { id: 19, name: "Halo Infinite", sub_categories: ["Weapons", "Armor"] },
  { id: 20, name: "Battlefield 2042", sub_categories: ["Guns", "Vehicles"] },
];

// let currentOrder = [...mockGames];

// export function getOrderedGames() {
//     return currentOrder;
// }

// export function updateOrder(newOrder: Game[]) {
//     currentOrder = newOrder;
// }
