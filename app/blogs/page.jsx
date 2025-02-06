// "use client"
import React from "react";
import BlogBanner from "../../components/BlogBanner";
import BlogOffer from "../../components/BlogOffer";
import { BentoGridNew } from "../../components/BentoBlog";
import { cn } from "../../@/lib/utils";

const page = () => {
  return (
    <div className="px-5 xl:px-[10%] flex flex-col gap-7 transition-all">
      <BlogBanner />
      <BlogOffer />
      <BentoGridNew />
    </div>
  );
};

export default page;
