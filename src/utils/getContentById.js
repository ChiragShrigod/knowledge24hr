export default function getContentById(list, id) {
  return list.find(item => item.id === id) || null;
}
