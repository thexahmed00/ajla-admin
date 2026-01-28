import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="flex min-h-screen bg-background text-text-main">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Content */}
      <main className="flex-1 p-4 md:p-8 md:mt-0 mt-16 overflow-x-hidden bg-surface/50">
        {children}
      </main>
    </div>
  );
}
