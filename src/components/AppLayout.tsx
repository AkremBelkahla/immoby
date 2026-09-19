import { Link, Outlet, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Home, FileText, Wrench, Calculator, Search, FolderOpen, BarChart3, Calendar, Settings, Users, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NotificationsDropdown } from "@/components/NotificationsDropdown";
import { SettingsDropdown } from "@/components/SettingsDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";
import { useState } from "react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Rentals",
    icon: Building2,
    children: [
      { name: "Properties", href: "/locatif/biens" },
      { name: "Leases", href: "/locatif/baux" },
      { name: "Tenants", href: "/locatif/locataires" },
      { name: "Inspections", href: "/locatif/etats-lieux" },
    ],
  },
  {
    name: "Owners",
    icon: Users,
    children: [
      { name: "Owners list", href: "/proprietaires/liste" },
      { name: "Revenue per property", href: "/proprietaires/revenus" },
    ],
  },
  {
    name: "Support",
    icon: Wrench,
    children: [
      { name: "Tickets", href: "/sav/tickets" },
      { name: "Interventions", href: "/sav/interventions" },
      { name: "Contractors", href: "/sav/prestataires" },
    ],
  },
  {
    name: "Accounting",
    icon: Calculator,
    children: [
      { name: "Entries", href: "/compta/ecritures" },
      { name: "Invoices", href: "/compta/factures" },
      { name: "Payments", href: "/compta/reglements" },
      { name: "Accounting export", href: "/compta/export" },
    ],
  },
  {
    name: "Documents",
    icon: FolderOpen,
    href: "/documents",
  },
  {
    name: "Reports",
    icon: BarChart3,
    href: "/rapports",
  },
  {
    name: "Calendar",
    icon: Calendar,
    href: "/agenda",
  },
];

export function AppLayout() {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col border-r bg-sidebar transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex h-16 items-center border-b px-4 justify-between">
          {!sidebarCollapsed && (
            <Link to="/dashboard" className="flex items-center gap-2 font-bold text-lg">
              <img src={logo} alt="Immoby" className="h-8 w-auto" />
              <span>Immoby</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="ml-auto"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.href ? (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                  title={sidebarCollapsed ? item.name : undefined}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && item.name}
                </Link>
              ) : (
                <>
                  {!sidebarCollapsed && (
                    <div className="flex items-center gap-3 px-3 py-2 text-sm font-semibold text-sidebar-foreground">
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </div>
                  )}
                  {sidebarCollapsed && (
                    <div className="flex items-center justify-center px-3 py-2" title={item.name}>
                      <item.icon className="h-5 w-5" />
                    </div>
                  )}
                  {item.children && !sidebarCollapsed && (
                    <div className="ml-8 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-sm transition-colors",
                            location.pathname === child.href
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t mt-auto">
          <Link to="/parametres">
            <Button variant="outline" className={cn("w-full", sidebarCollapsed && "px-2")}>
              <Settings className={cn("h-4 w-4", !sidebarCollapsed && "mr-2")} />
              {!sidebarCollapsed && "Settings"}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <NotificationsDropdown />
            <SettingsDropdown />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
