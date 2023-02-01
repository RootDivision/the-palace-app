import type { Item } from "@prisma/client";
import type { QueryObserverResult } from "@tanstack/react-query";
import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { api } from "../utils/api";
import Button from "./button";

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  refetch: () => Promise<QueryObserverResult<Item[]>>;
}

const ItemModal: FC<ItemModalProps> = ({ setModalOpen, refetch }) => {
  const [input, setInput] = useState<string>("");
  const { mutate } = api.item.addItem.useMutation({
    onSuccess: async () => {
      await refetch();
    },
  });

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-blue-200">
      <div>
        <h3>Name of item</h3>
        <input
          className="my-3"
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />

        <div>
          <Button onClick={() => setModalOpen(false)} text="Cancel" />
          <Button
            onClick={() => {
              mutate({ name: input });
              setModalOpen(false);
            }}
            text="Add"
          />
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
