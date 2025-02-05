import Image from "next/image";
import React from "react";
import capa from "../public/banner.jpg";
import { Dice1, Dice2, Dice3 } from "lucide-react";
import { motion } from "framer-motion";

const BlogOffer = () => {
  return (
    // <motion.section
    //   className="relative flex flex-col "
    //   initial={{ opacity: 0, y: 50 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.8, delay: 0.4 }}
    // >
    <div className="lg:flex flex-row items-center justify-center gap-4 px-10 mb-10 lg:mb-20 mx-auto transition-all">
      <div className="flex">
        <Image
          src={capa}
          alt="image"
          width={500}
          height={500}
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col items-start justify-center h-[400px] gap-5 lg:ml-10">
        <h1 className="mb-10 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          What we offer
        </h1>

        <div className="flex flex-row gap-3">
          <div className="pt-1">
            <Dice1 />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold">Latest News</span>
            <p className="text-base text-gray-400">
              Stay updated with the latest happening in the esports world.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="pt-1">
            <Dice2 />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold">Expert blogs</span>
            <p className="text-base text-gray-400">
              Read insights and analyses from industry experts.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="pt-1">
            <Dice3 />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold">Community Engagement</span>
            <p className="text-base text-gray-400">
              Join a community of like-minded people esports enthusiasts.
            </p>
          </div>
        </div>
      </div>
    </div>
    // </motion.section>
  );
};

export default BlogOffer;
