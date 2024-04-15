"use client";
import * as React from "react";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  smtp_username: z.string(),
  smtp_password: z.string(),
  region: z.string(),
});

export function SettingsForm() {
  const [setup, isSetup] = useState(false);
  const { data, isLoading } = api.settings.isSetup.useQuery();
  const { mutate, isSuccess, isError, isPending } =
    api.settings.verifySetup.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  useEffect(() => {
    if (data?.isSetup) {
      isSetup(true);
    }

    if (isSuccess) {
      toast.success("Settings saved", {
        description: "Your AWS SES credentials have been saved.",
      });
    }

    if (isError) {
      toast.error("Error", {
        description:
          "There was an error saving your settings. Please try again.",
      });
    }
  }, [isSuccess, isError, data]);

  if (isLoading) return "Loading...";

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">AWS SES Setup</CardTitle>
          <CardDescription>
            Enter your AWS SES credentials to setup email sending.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Region</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={data?.region ?? field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="us-east-1">
                          US East (N. Virginia)
                        </SelectItem>
                        <SelectItem value="us-east-2">
                          US East (Ohio)
                        </SelectItem>
                        <SelectItem value="us-west-1">
                          US West (N. California)
                        </SelectItem>
                        <SelectItem value="us-west-2">
                          US West (Oregon)
                        </SelectItem>
                        <SelectItem value="eu-west-1">
                          Europe (Ireland)
                        </SelectItem>
                        <SelectItem value="eu-central-1">
                          Europe (Frankfurt)
                        </SelectItem>
                        <SelectItem value="eu-west-2">
                          Europe (London)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the AWS SES region you configured.
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
                      <Input
                        defaultValue={data?.smtp_username ?? field.value}
                        placeholder="username"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the SMTP username provided by AWS SES.
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
                      Enter the SMTP password provided by AWS SES.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} variant="outline">
                {setup ? "Update Credentials" : "Verify Credentials"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          {setup ? (
            <p className="text-sm text-muted-foreground">
              You have already setup AWS SES. You can update your credentials
              above.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              You have not setup AWS SES yet. Please enter your credentials
              above.
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
