import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/list.css";
import "../styles/utils.css";
import "../styles/nav.css";
import { RecoilRoot } from "recoil";
function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
