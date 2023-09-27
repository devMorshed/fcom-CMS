"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Color } from "@prisma/client";
import { Trash } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ColorFormProps {
  initialData: Color | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/),
});

type ColorFormValues = z.infer<typeof formSchema>;

const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  console.log(initialData);

  const title = initialData ? "Update Color" : "Create Color";
  const desc = initialData ? "Update Color" : "Create Color";
  const toastMsg = initialData ? " Color Updated" : " Color Created";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between pb-2">
        <Heading title={title} desc={desc} />
        {!initialData && (
          <Button variant={"destructive"}>
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form className="pt-4 w-full space-y-4 ">
          <div className="md:grid grid-cols-3 gap-5 items-center">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Color" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input placeholder="#" {...field} />
                      <div
                        className="p-4 rounded-full border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ColorForm;
