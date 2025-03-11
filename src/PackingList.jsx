import { useState } from "react";

export default function PackingList({
  items,
  onDeleteItems,
  onToggleItem,
  onClear,
}) {
  const [sortedItems, setSortedItems] = useState("input");
  let sortItem;
  if (sortedItems === "input") sortItem = items;
  if (sortedItems === "description")
    sortItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortedItems === "packed")
    sortItem = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortItem.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleItem={onToggleItem}
            onClear={onClear}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortedItems}
          onChange={(e) => setSortedItems(e.target.value)}>
          <option value="input">Sort By Input</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packed</option>
        </select>
        <button onClick={onClear}>Clear list</button>
      </div>
    </div>
  );
}
function Item({ item, onDeleteItems, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>{" "}
    </li>
  );
}
