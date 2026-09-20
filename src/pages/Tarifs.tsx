import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { PageHeaderBg } from "@/components/PageHeaderBg";
import { ParallaxCTA } from "@/components/ParallaxCTA";

const plans = [
  {
    name: "Starter",
    price: "29€",
    description: "Perfect to get started",
    features: [
      "Up to 10 properties",
      "Full rental management",
      "Basic support tickets",
      "Email support",
      "1 user",
    ],
  },
  {
    name: "Pro",
    price: "79€",
    description: "For professionals",
    popular: true,
    features: [
      "Up to 50 properties",
      "All features",
      "Advanced support tickets",
      "Priority support",
      "5 users",
      "Custom reports",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Unlimited properties",
      "All features",
      "Dedicated 24/7 support",
      "Unlimited users",
      "Personalized training",
      "Custom integrations",
      "Guaranteed SLA",
    ],
  },
];

export default function Tarifs() {
  return (
    <div>
      <PageHeaderBg 
        title="Transparent pricing" 
        subtitle="Choose the plan that fits your needs"
      />
      
      <div className="container py-12">

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative ${
              plan.popular ? "border-primary shadow-lg scale-105" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">
                  Popular
                </span>
              </div>
            )}
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Custom" && (
                  <span className="text-muted-foreground">/month</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="block">
                <Button
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.price === "Custom" ? "Contact us" : "Start free trial"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 mb-16 text-center">
        <p className="text-muted-foreground">
          Need help choosing?{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact our team
          </Link>
        </p>
      </div>
      </div>
      
      <ParallaxCTA />
    </div>
  );
}
