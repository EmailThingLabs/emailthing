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
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string(),
});

export function OnboardingForm() {
  const { toast } = useToast();
  const { data } = api.settings.isSetup.useQuery();
  const { mutate, isSuccess, isError, isPending } =
    api.org.setupOrg.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  useEffect(() => {
    if (!data?.isSetup) {
      redirect("/dashboard");
    }

    if (isSuccess) {
      toast({
        title: "Success 🎉",
        description: "Your organization has been successfully set up.",
      });
    }

    if (isError) {
      toast({
        title: "Error ⛔",
        description:
          "There was an error creating your organization. Please try again.",
      });
    }
  }, [isSuccess, isError, data]);

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
          <Button type="submit" variant="default" disabled={isPending}>
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
