import { FormEvent, useState } from "react";
import Button from "./Button";

interface FormProps {
  setList: React.Dispatch<React.SetStateAction<string[]>>;
  list: string[];
}

const Form = ({ setList, list }: FormProps) => {
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!text) return;

    setList([...list, text]);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col  gap-4 font-bold text-center"
    >
      <h2>Digite Algo</h2>
      <label htmlFor="item" className="space-x-3">
        <span>Item</span>
        <input
          id="item"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border border-black rounded-2xl p-2"
        />
      </label>
      <Button type="submit">Adicionar</Button>
    </form>
  );
};

export default Form;
