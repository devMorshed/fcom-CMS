"use client";

import React, { useState } from "react";
import { ColorColumn } from "./color-column";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";

interface CellActionProps {
  data: ColorColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Color ID Copied");
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/${params.storeId}/colors/${data.id}`);
      router.refresh();
      toast.success("Color Deleted");
    } catch (error) {
      console.log("COL_DEL", error);
      toast.error("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-0 h-8 w-8" variant={"ghost"}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="h-4 w-4 mr-2" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}
          >
            <Edit className="h-4 w-4 mr-2" /> Update Color
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" /> Delete Color
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      
    </>
  );
};

export default CellAction;
