"use client";

import { siteConfig } from "@/config/site";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export function LogoutForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      await signOut();
    } catch (error) {
      setIsLoading(false);
      console.error("Error during sign in:", error);
    }
  };
  return (
    <main className="mx-auto mt-8">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">{siteConfig.name}</CardTitle>
          <CardDescription>Are you sure you want to log out?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Button
              onClick={() => handleSignOut()}
              className="w-full font-bold"
              variant="destructive"
              disabled={isLoading}
            >
              Yes, I want to log out{" "}
              {isLoading && (
                <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground">
              See you soon! If you have any feedback, please let us know{" "}
              <a
                href={siteConfig.links.github}
                className="underline underline-offset-2"
              >
                here
              </a>
              .
            </p>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
