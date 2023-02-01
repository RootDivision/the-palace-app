import type { FC } from "react";
import Link from "next/link";

interface Props {
  url: string;
  text: string;
}

const CustomLink: FC<Props> = ({ url, text }) => {
  return (
    <Link className=" mx-2 bg-green-200 p-2" href={url}>
      {text}
    </Link>
  );
};

export default CustomLink;
