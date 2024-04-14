"use client";
import * as React from "react";
import { siteConfig } from "@/config/site";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SettingsInstructions() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Setup Instructions</CardTitle>
          <CardDescription>
            Follow these steps to setup AWS SES for use with {siteConfig.name}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
