"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

type Props = {
  demo?: boolean;
};

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individual students",
    features: [
      "Track up to 5 courses",
      "Basic attendance analytics",
      "Email notifications",
    ],
  },
  {
    name: "Pro",
    price: "$5",
    description: "For students who need more",
    features: [
      "Unlimited courses",
      "Advanced analytics",
      "Priority support",
      "Export attendance reports",
      "Custom attendance criteria",
    ],
  },
];

export const runtime = "edge";

const PricingPageComp = ({ demo = false }: Props) => {
  return (
    <div className="flex flex-col gap-2 px-3">
      {/* <h1 className="text-3xl font-bold">Pricing</h1> */}
      <p className="text-muted-foreground">
        Choose the plan that works best for you
        {demo && " (This is a demo page)"}
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className="p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>
            </div>

            <ul className="mb-6 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              variant={plan.name === "Pro" ? "default" : "outline"}
            >
              Get Started
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default PricingPageComp;
