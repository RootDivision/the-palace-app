import clsx from "clsx";
import type { FC, MouseEventHandler } from "react";

interface Props {
  classNames?: string;
  text: string;
  onClick: MouseEventHandler;
}

const Button: FC<Props> = ({ classNames, onClick, text }) => {
  return (
    <button
      className={clsx(
        classNames,
        "rounded-xl border border-indigo-600 bg-yellow-200  p-2 hover:bg-green-300"
      )}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
