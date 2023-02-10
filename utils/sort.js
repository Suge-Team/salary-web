export const SortOrder = {
  DESC: "desc",
  ASC: "asc",
};

export function sortCollection(collection, sortBy, sortOrder) {
  return collection.sort((a, b) => {
    if (typeof a[sortBy] === "number") {
      return sortOrder === SortOrder.ASC ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
    }

    if (typeof a[sortBy] === "string") {
      return sortOrder === SortOrder.ASC ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
    }
  });
}
