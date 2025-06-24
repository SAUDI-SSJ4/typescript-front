import Footer from "@/templates/template-one/components/footer";
import Header from "@/templates/template-one/components/header";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default HomeLayout;
