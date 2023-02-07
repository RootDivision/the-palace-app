import type { GetServerSideProps } from "next";
import type { AppProps } from "next/app";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";

interface ProviderType {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

const SignIn = ({ providers }: { providers: AppProps }) => {
  const { data } = useSession();

  const { data: secretMessage } = api.item.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: data?.user !== undefined }
  );

  return (
    <div className="p-6">
      {data && data.user && data.user.image ? (
        <>
          <h1>Logged in as {data.user.name}</h1>
          <p>{data.user.email}</p>
          <p>{data.user.id}</p>
          <p>{data.user.image}</p>

          <button
            className="border-cyan-800 bg-red-400 p-2"
            onClick={data ? () => void signOut() : () => void signIn()}
          >
            {data ? "Sign out" : "Sign in"}
          </button>

          <div className="text-center text-3xl text-red-600">
            {secretMessage && (
              <span>Discogs Access Token: {secretMessage}</span>
            )}
          </div>
        </>
      ) : (
        <>
          <h1>Sign in</h1>
          <div>
            {Object.values(providers).map((provider: ProviderType) => (
              <button
                className="border-cyan-800 bg-red-400 p-2"
                key={provider.id}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: "http://localhost:3000/signin",
                  })
                }
              >
                Google
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};
