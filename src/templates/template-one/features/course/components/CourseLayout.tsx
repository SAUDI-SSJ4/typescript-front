import Footer from "@/templates/template-one/components/footer";
import Header from "@/templates/template-one/components/header";

function CourseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header settings={{} as any} />
      {children}
      <Footer settings={{} as any} />
    </>
  );
}

export default CourseLayout;
