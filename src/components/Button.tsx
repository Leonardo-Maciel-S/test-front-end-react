import { HtmlHTMLAttributes } from "react";

interface ButtonProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  type: "submit" | "button";
}

const Button = ({ children, type, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      type={type}
      className="py-2 px-3 bg-blue-800 text-zinc-50 rounded-2xl cursor-pointer flex justify-center items-center"
    >
      {children}
    </button>
  );
};

export default Button;
