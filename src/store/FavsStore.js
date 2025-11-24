import * as SecureStore from 'expo-secure-store';

const KEY = "sr_favs_v1"; // { [userId]: { ids: string[], items: { [id]: recipe } } }

async function loadAll() {
  try {
    const raw = await SecureStore.getItemAsync(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function saveAll(data) {
  await SecureStore.setItemAsync(KEY, JSON.stringify(data));
}

async function ensureUserNode(userId) {
  const all = await loadAll();
  if (!all[userId]) all[userId] = { ids: [], items: {} };
  return all;
}

export async function getFavIds(userId) {
  const all = await loadAll();
  return all[userId]?.ids || [];
}

export async function getFavItems(userId) {
  const all = await loadAll();
  const node = all[userId];
  if (!node) return [];
  return node.ids.map((id) => node.items[id]).filter(Boolean);
}

export async function isFav(userId, id) {
  const ids = await getFavIds(userId);
  return ids.includes(String(id));
}

export async function toggleFav(userId, recipe) {
  const recipeId = recipe?.id ?? recipe?._id;
  if (!userId || !recipeId) return { ids: await getFavIds(userId) };

  const id = String(recipeId);
  const all = await ensureUserNode(userId);
  const node = all[userId];

  const exists = node.ids.includes(id);
  if (exists) {
    node.ids = node.ids.filter((x) => x !== id);
    delete node.items[id];
  } else {
    node.ids.unshift(id);
    node.items[id] = { ...recipe, id };
  }
  await saveAll(all);
  return { ids: [...node.ids], items: { ...node.items } };
}
