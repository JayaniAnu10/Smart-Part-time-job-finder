import QuickActions from "@/components/adminDashboard/QuickActions";

export default function AdminSidebar() {
  return (
    <aside className="w-72 min-h-screen bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-4">
      
      {/* Wrapper that stretches */}
      <div className="h-full flex flex-col">
        
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6">
          
        </h2>

        {/* THIS PART FILLS THE FREE SPACE */}
        <div className="flex-1">
          <QuickActions />
        </div>

      </div>
    </aside>
  );
}
