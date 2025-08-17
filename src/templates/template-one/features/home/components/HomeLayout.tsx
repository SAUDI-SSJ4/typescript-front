import Footer from "@/templates/template-one/components/footer";
import Header from "@/templates/template-one/components/header";
import type { Settings } from "@/types/academy";
import { Helmet } from "react-helmet-async";

function HomeLayout({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Settings;
}) {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="This is the home page of our app." />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Helmet>
      <Header settings={settings} />
      {children}
      <Footer settings={settings} />
    </>
  );
}

export default HomeLayout;
