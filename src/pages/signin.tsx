import type { GetServerSideProps } from "next";
import type { AppProps } from "next/app";
import { getProviders, signIn } from "next-auth/react";

interface ProviderType {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

const SignIn = ({ providers }: { providers: AppProps }) => {
  return (
    <>
      <h1>Sign In</h1>
      <div>
        {Object.values(providers).map((provider: ProviderType) => (
          <button
            key={provider.id}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "http://localhost:3000",
              })
            }
          >
            Sign in with Google
          </button>
        ))}
      </div>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
};
