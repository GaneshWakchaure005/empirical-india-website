"use client";

import { motion } from "framer-motion";
import { UserCheck, ShieldAlert, Award } from "lucide-react";

interface LeadershipMember {
  name: string;
  role: string;
  status: string;
}

interface LeadershipProps {
  sectionTitle: string;
  disclaimer: string;
  members: readonly LeadershipMember[];
}

export default function LeadershipSection({
  sectionTitle,
  disclaimer,
  members,
}: LeadershipProps) {
  return (
    <section className="relative bg-[#f8fafc] py-20 sm:py-28 overflow-hidden border-b border-steel-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-steel-100 border border-steel-200 text-steel-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <UserCheck className="w-3.5 h-3.5 text-navy-700" />
            <span>Governance & Direction</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-steel-900 tracking-tight">
            {sectionTitle}
          </h2>

          <p className="mt-3.5 text-xs sm:text-sm text-steel-500 max-w-xl mx-auto leading-relaxed">
            {disclaimer}
          </p>
        </motion.div>

        {/* Leadership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {members.map((member, idx) => (
            <motion.div
              key={member.name}
              className="rounded-3xl border border-steel-200/90 bg-white p-7 text-center shadow-2xs hover:shadow-md transition-all flex flex-col items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
            >
              <div className="w-full flex flex-col items-center">
                {/* Monogram Badge (Authentic placeholder per AGENTS.md — no stock photos) */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-navy-900 to-steel-800 text-white font-mono font-bold text-xl flex items-center justify-center mb-5 shadow-sm">
                  {member.name
                    .split(" ")
                    .filter((p) => !p.startsWith("M"))
                    .map((n) => n[0])
                    .join("") || "EI"}
                </div>

                <h3 className="text-lg font-bold text-steel-900 tracking-tight">
                  {member.name}
                </h3>

                <p className="text-xs font-semibold text-navy-700 mt-1 uppercase tracking-wider">
                  {member.role}
                </p>

                <p className="text-xs text-steel-500 mt-3 leading-relaxed max-w-xs">
                  Guiding Empirical India&apos;s mechanical engineering direction, custom machinery manufacturing, and quality processes in Nashik.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-steel-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-steel-400 font-mono">
                <Award className="w-3.5 h-3.5 text-navy-600" />
                <span>Executive Management</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Governance Notice per AGENTS.md rule 4 & 13 */}
        <div className="mt-12 max-w-xl mx-auto rounded-xl p-3.5 bg-white border border-steel-200/80 text-center text-xs text-steel-500">
          <p>
            Authentic facility and team photography is prioritized across the website in place of generic stock portraits.
          </p>
        </div>
      </div>
    </section>
  );
}
