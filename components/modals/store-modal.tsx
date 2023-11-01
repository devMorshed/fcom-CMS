"use client";

import axios from "axios";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  // form schema imported and implemented with hook form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/", values);
      window.location.assign(`${response.data.id}`);
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Store Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 flex items-center justify-end space-x-2">
              <Button
                type="button"
                disabled={loading}
                variant={"outline"}
                onClick={storeModal.onClose}
              >
                Cancel
              </Button>

              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
