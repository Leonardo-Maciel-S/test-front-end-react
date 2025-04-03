import { SetStateAction } from "react";
import Item, { IToDoItem } from "./Item";

interface ItemListProps {
  list: IToDoItem[];
  setList: React.Dispatch<SetStateAction<IToDoItem[]>>;
}

const ItemList = ({ list, setList }: ItemListProps) => {
  const deleteItem = (item: number) =>
    setList(list.filter((_, pos) => pos != item));

  return (
    <ul className="flex flex-col gap-2">
      {list.map((item, index) => (
        <Item key={index} item={item} index={index} deleteItem={deleteItem} />
      ))}
    </ul>
  );
};

export default ItemList;
