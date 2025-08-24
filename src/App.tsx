import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/lib/react-query";
import { router } from "@/routes/AppRoutes";

function App() {
  return (
    <ReactQueryProvider>
      <RouterProvider router={router} />
      <Toaster
        dir="rtl"
        richColors={false}
        position="top-center"
        expand
        visibleToasts={5}
        closeButton={false}
        toastOptions={{
          className: 'toast-redesigned',
          style: {
            fontFamily: 'Cairo, sans-serif',
            border: 'none',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
          },
          duration: 4000,
        }}
      />
    </ReactQueryProvider>
  );
}

export default App;
