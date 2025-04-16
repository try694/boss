"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[380px] bg-transparent text-white">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      {showSocial && (
        <CardFooter className="flex flex-col gap-4">
          <Social />
        </CardFooter>
      )}
      <CardContent>
        {children}
      </CardContent>
    
      <CardFooter>
        <BackButton
          href={backButtonHref}
          label={backButtonLabel}
        />
      </CardFooter>
    </Card>
  );
};
