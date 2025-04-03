import { HtmlHTMLAttributes } from "react";
import Button from "./Button";

export interface IToDoItem {
  id?: string;
  userId: number;
  title: string;
  completed?: boolean;
}

interface ItemProps extends HtmlHTMLAttributes<HTMLUListElement> {
  key: React.Key;
  item: IToDoItem;
  index: number;
  deleteItem: (index: number) => void;
}

const Item = ({ key, item, index, deleteItem }: ItemProps) => {
  return (
    <li
      key={key}
      className="border-2 border-black p-2 px-5 flex justify-between items-center"
    >
      {item.title}

      <Button
        type="button"
        onClick={() => deleteItem(index)}
        aria-label={`delete item ${index}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width={24}
          height={24}
        >
          <path d="M9 3V2h6v1h5v2H4V3h5zm1 5v10h2V8h-2zm4 0v10h2V8h-2zM5 6h14l-1 14H6L5 6z" />
        </svg>
      </Button>
    </li>
  );
};

export default Item;
