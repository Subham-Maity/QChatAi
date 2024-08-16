import React from "react";
import Container from "@/components/landing/global/container";
import SectionBadge from "@/components/landing/widget/section-badge";
import { pricingCards } from "@/data";
import Wrapper from "@/components/landing/global/wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import Link from "next/link";

const Pricing = () => {
  return (
    <Wrapper className="flex flex-col items-center justify-center py-12 relative">
      <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-blue-500 rounded-full blur-[10rem] -z-10"></div>
      <Container>
        <div className="max-w-md mx-auto text-start md:text-center">
          <SectionBadge title="Pricing" />
          <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
            Unlock the right plan for your business
          </h2>
          <p className="text-muted-foreground mt-6">
            Choose the best plan for your business and start building your dream
            website today
          </p>
        </div>
      </Container>
      <Container className="flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 py-10 md:py-20 flex-wrap max-w-4xl">
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={cn(
                "flex flex-col w-full border-neutral-700",
                card.title === "Unlimited Saas" && "border-2 border-primary",
              )}
            >
              <CardHeader className="border-b border-border">
                <span>{card.title}</span>
                <CardTitle
                  className={cn(
                    card.title !== "Unlimited Saas" && "text-muted-foreground",
                  )}
                >
                  {card.price}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-3">
                {card.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Zap className="w-4 h-4 fill-primary text-primary" />
                    <p>{feature}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="mt-auto">
                <Link
                  href="#"
                  className={cn(
                    "w-full text-center text-primary-foreground bg-primary p-2 rounded-md text-sm font-medium",
                    card.title !== "Unlimited Saas" &&
                      "!bg-foreground !text-background",
                  )}
                >
                  {card.buttonText}
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Wrapper>
  );
};

export default Pricing;
