import {
  Sidebar,
  SidebarContent,
  SidebarHeader,

} from "@/components/ui/sidebar";

import QuickActions from "@/components/adminDashboard/QuickActions";

export default function AdminSidebar() {
  return (
    <Sidebar>
      
      <SidebarHeader>
        <h2 className="px-4 py-2 text-3xl font-medium text-secondary dark:text-primary">
          Quick Actions
        </h2>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <QuickActions />
      </SidebarContent>

      
    </Sidebar>
  );
}
