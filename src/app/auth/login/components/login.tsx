"use client";
import { siteConfig } from "@/config/site";
import { useState } from "react";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { useSearchParams } from "next/navigation";

interface IProps {
  providers: Record<LiteralUnion<string, string>, ClientSafeProvider>;
}

export function LoginForm({ providers }: IProps) {
  const params = useSearchParams().get("handle") ?? "";
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (providerId: string) => {
    setIsLoading(true);

    try {
      await signIn(providerId, { redirect: false, handle: params });
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
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button
                  onClick={() => handleSignIn(provider.id)}
                  variant="outline"
                  className={`w-full`}
                  disabled={isLoading}
                >
                  Continue with {provider.name}{" "}
                </Button>
              </div>
            ))}
            <div>
              {isLoading && (
                <div className="flex justify-center">
                  <p className="flex flex-row text-xs text-muted-foreground">
                    Please wait while we sign you in{" "}
                    <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="mt-4">
            <p className="text-xs text-muted-foreground">
              If you create an account, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
