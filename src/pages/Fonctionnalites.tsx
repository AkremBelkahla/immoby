import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileText, Wrench, Calculator, Users, BarChart3, Bell, Cloud } from "lucide-react";
import { PageHeaderBg } from "@/components/PageHeaderBg";
import { ParallaxCTA } from "@/components/ParallaxCTA";

const features = [
  {
    icon: Building2,
    title: "Property management",
    description: "Centralize all your property information: apartments, houses, commercial spaces.",
    benefits: [
      "Detailed property records",
      "Associated photos and documents",
      "Change history",
      "Real-time status",
    ],
  },
  {
    icon: FileText,
    title: "Lease management",
    description: "Track your rental agreements, due dates and renewals.",
    benefits: [
      "Create leases in a few clicks",
      "Due date alerts",
      "Security deposit management",
      "Automatic rent receipts",
    ],
  },
  {
    icon: Wrench,
    title: "After-sales service",
    description: "Manage intervention requests and property maintenance.",
    benefits: [
      "Ticket system",
      "Emergency prioritization",
      "Intervention tracking",
      "Tenant communication",
    ],
  },
  {
    icon: Calculator,
    title: "Integrated accounting",
    description: "Manage your finances with complete accounting tools.",
    benefits: [
      "Accounting entries",
      "Bank reconciliation",
      "Accounting exports",
      "Financial dashboards",
    ],
  },
  {
    icon: Users,
    title: "Multi-user",
    description: "Collaborate efficiently with your team.",
    benefits: [
      "Roles and permissions management",
      "Action history",
      "Real-time notifications",
      "Task assignment",
    ],
  },
  {
    icon: BarChart3,
    title: "Advanced reporting",
    description: "Analyze your performance with detailed reports.",
    benefits: [
      "Real-time KPIs",
      "Customizable charts",
      "Data export",
      "Financial forecasts",
    ],
  },
  {
    icon: Bell,
    title: "Smart notifications",
    description: "Stay informed about important events.",
    benefits: [
      "Customizable alerts",
      "Automatic reminders",
      "Email notifications",
      "Daily summaries",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Offline",
    description: "Access your data anywhere, even offline.",
    benefits: [
      "Automatic synchronization",
      "Offline mode",
      "Automatic backup",
      "Enhanced security",
    ],
  },
];

export default function Fonctionnalites() {
  return (
    <div>
      <PageHeaderBg 
        title="Features" 
        subtitle="A complete platform for your property management"
      />
      
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="mt-1">{feature.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="mr-2 text-primary">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <ParallaxCTA />
    </div>
  );
}
