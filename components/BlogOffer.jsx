"use client"
import Image from "next/image";
import React from "react";
import capa from "../public/banner.jpg";
import { Dice1, Dice2, Dice3, Dice4 } from "lucide-react";
import { motion } from "framer-motion";

const BlogOffer = () => {
  return (
    <motion.section
      className="relative flex flex-col "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
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

      <div className="flex flex-col items-start justify-center h-[400px] gap-3 lg:ml-10">
        <h1 className="mb-5 text-3xl font-semibold text-slate-50">
          Join Our Community
        </h1>

        <div className="flex flex-row gap-3">
          <div className="pt-1">
            <Dice1 />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg">Latest News</span>
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
            <span className="text-lg">Expert blogs</span>
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
            <span className="text-lg">Community Engagement</span>
            <p className="text-base text-gray-400">
              Join a community of like-minded people esports enthusiasts.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="pt-1">
            <Dice4 />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg">Opportunities for Growth</span>
            <p className="text-base text-gray-400">
             People from various fields can collaborate and grow together.
            </p>
          </div>
        </div>
      </div>
    </div>
     </motion.section>
  );
};

export default BlogOffer;
