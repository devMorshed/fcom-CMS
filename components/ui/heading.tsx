import React from "react";

interface HeddingProps {
  title: string;
  desc: string;
}
const Heading: React.FC<HeddingProps> = ({ title, desc }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
    </div>
  );
};

export default Heading;
