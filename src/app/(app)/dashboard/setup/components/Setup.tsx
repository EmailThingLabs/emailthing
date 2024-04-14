"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  domain: z.string(),
  smtp_username: z.string(),
  smtp_password: z.string(),
});

export function SetupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate, isSuccess, isError, isPending } =
    api.user.verifySetup.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "AWS SES has been setup successfully, redirecting...",
      });
      router.push("/dashboard");
    }

    if (isError) {
      toast({
        title: "Error",
        description:
          "There was an error setting up AWS SES. Please try again..",
      });
    }
  }, [isSuccess, isError]);

  return (
    <div className="mx-auto w-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Mail Setup</CardTitle>
          <CardDescription>
            Welcome to {siteConfig.name}, to continue you&apos;ll need to add
            your AWS SES credentials below. If you haven&apos;t already setup
            AWS SES, find the instructions here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="mail.domain.com"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormDescription>
                      This is the domain that will be used for sending emails.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="smtp_username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMTP Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} type="text" />
                    </FormControl>
                    <FormDescription>
                      This is the username for the SMTP server.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="smtp_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMTP Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormDescription>
                      This is the password for the SMTP server.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                Verify Credentials
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
