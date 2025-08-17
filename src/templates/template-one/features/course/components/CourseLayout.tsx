import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

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
