"use client";
import * as React from "react";

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
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
  const { mutate, isSuccess, isError, isPending } =
    api.org.setupOrg.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success 🎉",
        description: "Your organization has been successfully set up.",
      });

      redirect("/dashboard");
    }

    if (isError) {
      toast({
        title: "Error ⛔",
        description:
          "There was an error creating your organization. Please try again.",
      });
    }
  }, [isSuccess, isError]);

  return (
    <div>
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
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
