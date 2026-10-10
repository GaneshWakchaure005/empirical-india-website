"use client";

import { motion } from "framer-motion";
import { Lightbulb, UsersRound, ThumbsUp, Zap } from "lucide-react";

interface StatItem {
  title: string;
  description: string;
}

interface CompanyOverviewProps {
  approach: string;
  stats: readonly StatItem[];
}

const STAT_ICONS = [Lightbulb, UsersRound, ThumbsUp, Zap];

export default function CompanyOverviewSection({
  approach,
  stats,
}: CompanyOverviewProps) {
  return (
    <section className="bg-white py-20 sm:py-28 overflow-hidden border-b border-steel-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: Headline and Description */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 lg:gap-24 mb-16">
          
          {/* Left: Large Headline */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-steel-900 tracking-tight leading-[1.15]">
              Engineering the future of Manufacturing excellence.
            </h2>
          </motion.div>

          {/* Right: Description Text */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-base sm:text-lg text-steel-600 leading-relaxed font-normal">
              {approach}
            </p>
          </motion.div>
        </div>

        {/* Bottom Section: 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = STAT_ICONS[idx % STAT_ICONS.length] || Lightbulb;
            
            return (
              <motion.div
                key={stat.title}
                className="relative rounded-2xl p-[1px] bg-steel-200 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                {/* Gradient Border Background (visible on hover) */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400 via-teal-600 to-navy-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Inner Card Content */}
                <div className="relative bg-[#f8fafc] h-full w-full rounded-[15px] p-8 sm:p-10 flex flex-col items-center justify-center text-center z-10 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm border border-steel-100 text-teal-600 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-teal-700 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-navy-900 mb-3 tracking-tight group-hover:text-teal-900 transition-colors duration-300">
                    {stat.title}
                  </h3>
                  <p className="text-sm text-steel-600 leading-relaxed group-hover:text-steel-700 transition-colors duration-300">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
