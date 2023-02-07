import type { NextPage } from "next";
import { api } from "../../utils/api";

const Collection: NextPage = () => {
  const { data, isLoading } = api.collection.getAll.useQuery();

  // add react query cache on this list
  // make use of React InfiniteQuery

  return (
    <div>
      <h1>Collection</h1>

      {!isLoading && data ? (
        data.releases.map(({ id }) => <p key={id}> {id}</p>)
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
};

export default Collection;
