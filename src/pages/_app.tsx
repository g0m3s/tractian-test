import "./carrousel.css";
import { useEffect } from "react";
import { theme } from "~/theme/base";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { unitsState } from "~/atoms/units";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default appWithTranslation(App);
