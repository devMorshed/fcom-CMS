"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./category-cell-action";

export type CategoryColumns = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumns>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
