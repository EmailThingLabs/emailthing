"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  domain: z.string(),
});

export function AddDomainForm() {
  const router = useRouter();
  const {
    mutate,
    isSuccess: created,
    isError,
    isPending,
  } = api.domain.create.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  useEffect(() => {
    if (created) {
      toast.success("Domain added", {
        description: "New domain successfully added.",
      });
      router.push("/dashboard/setup/domains");
    }

    if (isError) {
      toast.error("Error", {
        description: "There was an error adding your domain. Please try again.",
      });
    }
  }, [created, isError]);

  return (
    <div className="container">
      <Card>
        <CardContent className="py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain Name</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={field.value}
                        placeholder="mail.yourdomain.com"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormDescription>
                      Tip: you must own this domain to send emails from it. We
                      recommend using a subdomain, e.g. mail.yourdomain.com.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                Add Domain
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
