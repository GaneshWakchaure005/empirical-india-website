"use client";

import { MapPin, Mail, Clock, ExternalLink, Building2, PhoneCall } from "lucide-react";

interface PlantLocationProps {
  companyInfo: {
    name: string;
    facility: string;
    location: string;
    email: string;
    plant_hours: string;
    google_maps_embed: string;
  };
}

export default function PlantLocationCard({ companyInfo }: PlantLocationProps) {
  return (
    <div className="rounded-3xl border border-steel-200/90 bg-[#f8fafc] p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-50 text-navy-800 border border-navy-100 text-xs font-semibold uppercase tracking-wider mb-4">
          <Building2 className="w-3.5 h-3.5" />
          <span>Manufacturing Plant</span>
        </div>

        <h3 className="text-xl font-extrabold text-steel-900 tracking-tight">
          {companyInfo.name}
        </h3>
        <p className="text-xs font-semibold text-navy-700 mt-0.5">
          {companyInfo.facility}
        </p>

        {/* Address & Timings */}
        <div className="mt-6 space-y-4 text-xs text-steel-600">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-steel-200 flex items-center justify-center shrink-0 mt-0.5 text-navy-700 shadow-2xs">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-steel-900 block text-xs font-semibold">
                Factory Location
              </strong>
              <span>
                {companyInfo.location}
              </span>
              <p className="text-[11px] text-steel-400 mt-0.5">
                Industrial Manufacturing Cluster, Maharashtra, India
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-steel-200 flex items-center justify-center shrink-0 mt-0.5 text-navy-700 shadow-2xs">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-steel-900 block text-xs font-semibold">
                Direct Email
              </strong>
              <a
                href={`mailto:${companyInfo.email}`}
                className="text-navy-700 hover:text-navy-900 font-medium underline transition-colors"
              >
                {companyInfo.email}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white border border-steel-200 flex items-center justify-center shrink-0 mt-0.5 text-navy-700 shadow-2xs">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-steel-900 block text-xs font-semibold">
                Working Schedule
              </strong>
              <span>{companyInfo.plant_hours}</span>
              <p className="text-[11px] text-steel-400 mt-0.5">
                Sunday Closed • Industrial holidays observed
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-steel-700 uppercase tracking-wide">
              Live Factory Location Pin:
            </span>
            <a
              href="https://maps.google.com/?q=Empirical+India+Roll+Forming+Machine+Manufacturer+Nashik"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-navy-700 hover:text-navy-900"
            >
              <span>View full map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="w-full h-[220px] rounded-2xl overflow-hidden border border-steel-200 shadow-sm relative bg-steel-100">
            <iframe
              src={companyInfo.google_maps_embed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Empirical India Google Maps Location"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-steel-200/80">
        <p className="text-[11px] text-steel-500 leading-relaxed">
          Planning an in-person plant trial or machine inspection? Please schedule an appointment in advance so our engineering team can prepare line demonstrations.
        </p>
      </div>
    </div>
  );
}
