"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";
import Heading from "./heading";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
  title: string;
  desc: string;
}

const ApiList: React.FC<ApiListProps> = ({
  entityIdName,
  entityName,
  title,
  desc,
}) => {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <div className="my-10 flex-col gap-2 flex">
      <Heading title={title} desc={desc} />
      <ApiAlert
        title="GET"
        variant="public"
        desc={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        desc={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        desc={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        desc={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        desc={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </div>
  );
};

export default ApiList;
