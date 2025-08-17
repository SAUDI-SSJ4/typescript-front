import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default CourseLayout;
