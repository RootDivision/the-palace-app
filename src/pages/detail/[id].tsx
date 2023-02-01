import type { NextPage } from "next";
import { useRouter } from "next/router";

import { api } from "../../utils/api";

const Detail: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  const { data } = api.item.getUnique.useQuery({
    id: id as string,
  });

  return (
    <div className="mx-auto max-w-sm bg-blue-200">
      <h1>{data?.name}</h1>
      <p className="text-xs">{data?.id}</p>
    </div>
  );
};

export default Detail;
