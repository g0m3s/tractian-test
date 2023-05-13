import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "~/theme/base";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}
