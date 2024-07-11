import { writeFile, appendFile } from 'fs/promises';


const outputFilePath = './src/database/data/itemsData.json';


 writeFile(outputFilePath, '[');

export const fetchItemNames = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/item/?limit=2169");
  const preList = await response.json();
  const itemsList = preList.results.map((preListItem: { name: string }) => preListItem.name);
  return itemsList;
};

export const fetchItemsFromNames = async (itemNames: string[]) => {
  const fetchedItems: any[] = [];
  for (const itemName of itemNames) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/item/${itemName}`);
      const item = await response.json();
      fetchedItems.push(item);

      const dbReadyItem = {
        id: item.id,
        name: item.name,
        sprite: item.sprites.default,
        cost: item.cost,
        effect: item.effect_entries[0].effect,
      };

      const itemString = JSON.stringify(dbReadyItem);
      if (fetchedItems.length > 1) {
        await appendFile(outputFilePath, ',');
      }
      await appendFile(outputFilePath, itemString);

    } catch (error) {
      console.error(`Error fetching item ${itemName}:`, error);
    }
  }
  return fetchedItems;
};

export const formatItemsForDBInsertion = (fetchedItems: any[]) => {
  const formattedItems = fetchedItems.map((item) => {
    const dbReadyItem = {
      id: item.id,
      name: item.name,
      sprite: item.sprites.default,
      cost: item.cost,
      effect: item.effect_entries[0].effect,
    };
    return dbReadyItem;
  });
  return formattedItems;
};

const testFunc = async () => {
  const itemNames = await fetchItemNames();
  const convertedItems = await fetchItemsFromNames(itemNames);


  await appendFile(outputFilePath, ']');

  const formattedItemsForDB = formatItemsForDBInsertion(convertedItems);
  console.log(formattedItemsForDB);
};

testFunc();
