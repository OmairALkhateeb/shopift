import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/font.css";
import "@/styles/globals.css";
import { HostnameProvider } from "@/Components/Provider/HostnameProvider";

export default function App({ Component, pageProps }) {
  return (
    <HostnameProvider>
      <Component {...pageProps} />
    </HostnameProvider>
  );
}
