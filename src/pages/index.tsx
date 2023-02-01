import { useState } from "react";
import { type NextPage } from "next";
import Link from "next/link";
import clsx from "clsx";

import { api } from "../utils/api";

import ItemModal from "../components/itemModal";
import Button from "../components/button";

const Home: NextPage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: items, isLoading, refetch } = api.item.getAll.useQuery();

  const { mutate: deleteItem } = api.item.deleteItem.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });
  const { mutate: checkItem } = api.item.checkItem.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <div className="py-6">
      {modalOpen && <ItemModal setModalOpen={setModalOpen} refetch={refetch} />}

      <main className="bg-green-50 p-2">
        <Button onClick={() => setModalOpen(true)} text="Add shopping item" />

        {items?.length === 0 && <p> the list is empty</p>}
        <div className="flex flex-col">
          {!isLoading && items ? (
            items.map(({ id, name, checked }) => (
              <div key={id} className="my-2 flex border border-indigo-500 p-2">
                <input
                  className="m-2"
                  type="checkbox"
                  checked={!!checked}
                  onChange={() => checkItem({ id, checked: !checked })}
                ></input>

                <Link className="flex-grow p-2" href={`/detail/${id}`}>
                  <label className={clsx({ "line-through": !!checked })}>
                    {name}
                  </label>
                </Link>

                <Button onClick={() => deleteItem({ id })} text="Delete" />
              </div>
            ))
          ) : (
            <p>loading...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
