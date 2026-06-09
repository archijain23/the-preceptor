import appCss from "../styles.css?url";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export default function RootLayout() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>The Precetor — Premium Astrology Consultations</title>
        <meta
          name="description"
          content="Cinematic, modern astrology consultations for clarity in love, career, and life. Trusted by clients in the United States and worldwide."
        />
        <meta name="author" content="The Precetor" />
        <meta property="og:title" content="The Precetor — Premium Astrology Consultations" />
        <meta
          property="og:description"
          content="Luxury spiritual guidance and birth chart readings for international seekers."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@Lovable" />
        <link rel="stylesheet" href={appCss} />
      </Helmet>

      <div id="cosmic-bg" aria-hidden="true" />
      <div id="cosmic-grain" aria-hidden="true" />

      <Nav />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}