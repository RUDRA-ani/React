import { Outlet } from "react-router";
import { Toaster } from "sonner";

function RootLayout() {
  return (
    <>
      <Outlet />

      <Toaster
        position="bottom-right"
        richColors
        closeButton
      />
    </>
  );
}

export default RootLayout;