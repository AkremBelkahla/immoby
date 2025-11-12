import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function NotificationsDropdown() {
  const notifications = [
    {
      id: 1,
      title: "Nouveau ticket",
      description: "Fuite d'eau signalée - Appartement 12",
      time: "Il y a 5 min",
      unread: true,
    },
    {
      id: 2,
      title: "Bail à renouveler",
      description: "Le bail de M. Dupont expire dans 30 jours",
      time: "Il y a 2h",
      unread: true,
    },
    {
      id: 3,
      title: "Paiement reçu",
      description: "Loyer de septembre - Studio Paris 15e",
      time: "Hier",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary">{unreadCount} non lues</Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem 
              key={notification.id}
              className="flex flex-col items-start p-4 cursor-pointer"
            >
              <div className="flex items-start gap-2 w-full">
                {notification.unread && (
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center text-primary cursor-pointer">
          Voir toutes les notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
