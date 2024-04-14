"use client";
import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string(),
  domain: z.string(),
});

export function OnboardingForm() {
  const { toast } = useToast();
  const [isOrgSetup, setIsOrgSetup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, isSuccess, isError, isPending } =
    api.org.setupOrg.useMutation();
  const { data } = api.org.isOrgSetup.useQuery();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    mutate(values);
  }

  useEffect(() => {
    if (isSuccess) {
      setIsLoading(true);
      setIsOrgSetup(true);
      toast({
        title: "Success 🎉",
        description: "Your organization has been successfully set up.",
      });
    }

    if (isError) {
      setIsLoading(false);
      toast({
        title: "Error ⛔",
        description:
          "There was an error creating your organization. Please try again.",
      });
    }
  }, [isSuccess, isError, isOrgSetup, data, isLoading]);

  return (
    <div>
      {!isOrgSetup ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. Acme Inc." {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email domain name</FormLabel>
                  <FormControl>
                    <Input placeholder="mail.acme.com" {...field} type="text" />
                  </FormControl>
                  <FormDescription>
                    Important: this should be a domain you own, e.g.
                    mail.acme.com.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default" disabled={isPending}>
              Setup organization
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="mb-8 w-16 items-center justify-center self-center rounded-full bg-green-500 p-1 text-white ring-8 ring-green-500/30 dark:ring-green-500/50"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            ></path>
          </svg>
          <Button asChild className="flex flex-col space-y-4" variant="outline">
            <Link href="/dashboard">Continue to your dashboard</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
