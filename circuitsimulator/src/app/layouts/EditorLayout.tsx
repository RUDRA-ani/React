import { Outlet } from "react-router-dom";
 import {
  SidebarInset,
  SidebarProvider,
 } from "@/components/ui/sidebar";
import { EditorSidebar } from "@/components/Sidebar";
import TopToolbar from "@/components/editor/TopToolbar";
function EditorLayout() {
  return (
    <SidebarProvider defaultOpen>
      <EditorSidebar />

      <SidebarInset>
      <TopToolbar/>

        <main className="min-h-0 flex-1">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default EditorLayout;