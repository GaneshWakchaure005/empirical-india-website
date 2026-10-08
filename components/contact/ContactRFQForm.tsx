"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  X,
  Settings,
  Package,
  Cylinder,
  HelpCircle,
  Shield,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BusinessLine {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  questions: readonly string[];
  placeholder_requirement: string;
}

interface ContactRFQFormProps {
  businessLines: readonly BusinessLine[];
  uploadGuidance: {
    title: string;
    formats: string;
    description: string;
  };
  consentNote: string;
}

export default function ContactRFQForm({
  businessLines,
  uploadGuidance,
  consentNote,
}: ContactRFQFormProps) {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");

  // Selected business line (default to first or from URL parameter)
  const [selectedVertical, setSelectedVertical] = useState<string>(() => {
    if (productParam && businessLines.some((b) => b.id === productParam)) {
      return productParam;
    }
    return businessLines[0]?.id || "roll-forming-lines";
  });

  // Keep in sync with URL searchParams if it changes
  useEffect(() => {
    if (productParam && businessLines.some((b) => b.id === productParam)) {
      setSelectedVertical(productParam);
    }
  }, [productParam, businessLines]);

  // Form Fields State
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    phone: "",
    location: "",
    requirement: "",
    consent: false,
  });

  // Attached File State
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation & Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>("");

  const activeLine =
    businessLines.find((b) => b.id === selectedVertical) || businessLines[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit: 15MB
    const maxSize = 15 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError("File exceeds maximum allowed size of 15MB.");
      return;
    }

    setAttachedFile(file);
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company or organization name is required.";
    }
    if (!formData.workEmail.trim()) {
      newErrors.workEmail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone or mobile number is required.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Country and city are required.";
    }
    if (!formData.requirement.trim()) {
      newErrors.requirement = "Please describe your technical requirement or scope.";
    } else if (formData.requirement.trim().length < 15) {
      newErrors.requirement = "Please provide at least 15 characters describing the scope.";
    }
    if (!formData.consent) {
      newErrors.consent = "You must agree to the technical review terms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable submission process
    await new Promise((resolve) => setTimeout(resolve, 900));

    // Generate RFQ tracking reference ID
    const generatedRef = `EI-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceId(generatedRef);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      workEmail: "",
      phone: "",
      location: "",
      requirement: "",
      consent: false,
    });
    setAttachedFile(null);
    setFileError(null);
    setErrors({});
    setIsSuccess(false);
  };

  const getLineIcon = (id: string) => {
    switch (id) {
      case "roll-forming-lines":
        return Settings;
      case "modular-metal-pallets":
        return Package;
      case "trolley-bag-tubes":
        return Cylinder;
      default:
        return HelpCircle;
    }
  };

  return (
    <div className="rounded-3xl border border-steel-200/90 bg-white p-6 sm:p-10 shadow-[0_12px_45px_rgba(15,23,42,0.06)]">
      {/* ─────────────────────────────────────────────────────────────
          SUCCESS STATE
          ───────────────────────────────────────────────────────────── */}
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="py-12 px-4 text-center max-w-xl mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-block text-xs font-mono font-bold px-3 py-1 rounded-full bg-steel-100 text-steel-700 mb-3 border border-steel-200">
            Reference ID: {referenceId}
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-steel-900 tracking-tight">
            Technical Enquiry Received
          </h3>

          <p className="mt-4 text-sm sm:text-base text-steel-600 leading-relaxed font-normal">
            Thank you, <strong className="text-steel-800">{formData.fullName}</strong>. Your enquiry for{" "}
            <strong className="text-navy-900">{activeLine?.name}</strong> has been logged with our Nashik engineering team.
          </p>

          <div className="mt-8 p-5 rounded-2xl bg-steel-50 border border-steel-200 text-left space-y-2 text-xs text-steel-700">
            <div className="flex justify-between border-b border-steel-200/60 pb-2">
              <span className="text-steel-500">Business Line:</span>
              <span className="font-semibold">{activeLine?.name}</span>
            </div>
            <div className="flex justify-between border-b border-steel-200/60 pb-2">
              <span className="text-steel-500">Company:</span>
              <span className="font-semibold">{formData.companyName}</span>
            </div>
            <div className="flex justify-between border-b border-steel-200/60 pb-2">
              <span className="text-steel-500">Contact Email:</span>
              <span className="font-semibold">{formData.workEmail}</span>
            </div>
            {attachedFile && (
              <div className="flex justify-between pt-1">
                <span className="text-steel-500">Drawing Attached:</span>
                <span className="font-semibold truncate max-w-[220px]">
                  {attachedFile.name}
                </span>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-steel-300 hover:border-steel-400 bg-white hover:bg-steel-50 text-steel-800 font-semibold text-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Submit Another Requirement</span>
            </button>
          </div>
        </motion.div>
      ) : (

        <form onSubmit={handleSubmit} noValidate>
          {/* Step 1: Business Line Selection */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-2">
              1. Select Capability / Business Line <span className="text-red-600">*</span>
            </label>
            <p className="text-xs text-steel-500 mb-4">
              Selecting the appropriate business line loads technical prompt questions tailored to your application.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {businessLines.map((line) => {
                const Icon = getLineIcon(line.id);
                const isSelected = selectedVertical === line.id;

                return (
                  <button
                    key={line.id}
                    type="button"
                    onClick={() => setSelectedVertical(line.id)}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group",
                      isSelected
                        ? "border-navy-900 bg-navy-50/70 shadow-sm ring-2 ring-navy-900/10"
                        : "border-steel-200/80 bg-white hover:border-steel-300 hover:bg-steel-50/60"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                            isSelected
                              ? "bg-navy-900 text-white"
                              : "bg-steel-100 text-steel-600 group-hover:text-navy-900"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-steel-400 uppercase">
                          {line.badge}
                        </span>
                      </div>

                      <h4 className="text-xs font-bold text-steel-900 tracking-tight leading-snug">
                        {line.name}
                      </h4>
                    </div>

                    <span
                      className={cn(
                        "text-[11px] mt-2 block",
                        isSelected ? "text-navy-700 font-semibold" : "text-steel-400"
                      )}
                    >
                      {isSelected ? "Active Selection ✓" : "Click to select"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product-Specific Guidance Prompts Box */}
          {activeLine && (
            <motion.div
              key={activeLine.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#f8fafc] border border-steel-200/90"
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-navy-700" />
                <h5 className="text-xs font-bold text-steel-800 uppercase tracking-wider">
                  Technical Inputs Helpful For {activeLine.name}:
                </h5>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {activeLine.questions.map((q, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-steel-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-600 shrink-0 mt-1.5" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Contact Details */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wider mb-4">
              2. Your Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-medium text-steel-700 mb-1"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g., Rajesh Sharma"
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none",
                    errors.fullName
                      ? "border-red-500 bg-red-50/20 focus:border-red-600"
                      : "border-steel-200 bg-white focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
                  )}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-xs font-medium text-steel-700 mb-1"
                >
                  Company / Organization <span className="text-red-600">*</span>
                </label>
                <input
                  id="companyName"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="e.g., Precision Components Pvt Ltd"
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none",
                    errors.companyName
                      ? "border-red-500 bg-red-50/20 focus:border-red-600"
                      : "border-steel-200 bg-white focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
                  )}
                />
                {errors.companyName && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.companyName}</span>
                  </p>
                )}
              </div>

              {/* Work Email */}
              <div>
                <label
                  htmlFor="workEmail"
                  className="block text-xs font-medium text-steel-700 mb-1"
                >
                  Work Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="workEmail"
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  placeholder="rajesh@company.com"
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none",
                    errors.workEmail
                      ? "border-red-500 bg-red-50/20 focus:border-red-600"
                      : "border-steel-200 bg-white focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
                  )}
                />
                {errors.workEmail && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.workEmail}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-steel-700 mb-1"
                >
                  Phone / WhatsApp <span className="text-red-600">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none",
                    errors.phone
                      ? "border-red-500 bg-red-50/20 focus:border-red-600"
                      : "border-steel-200 bg-white focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
                  )}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="location"
                  className="block text-xs font-medium text-steel-700 mb-1"
                >
                  City & Country <span className="text-red-600">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Pune, India / Dubai, UAE / Export destination"
                  className={cn(
                    "w-full px-4 py-2.5 rounded-xl border text-sm transition-colors outline-none",
                    errors.location
                      ? "border-red-500 bg-red-50/20 focus:border-red-600"
                      : "border-steel-200 bg-white focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
                  )}
                />
                {errors.location && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.location}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Step 3: Technical Requirement */}
          <div className="mb-8">
            <label
              htmlFor="requirement"
              className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1"
            >
              3. Describe Your Requirement or Technical Scope{" "}
              <span className="text-red-600">*</span>
            </label>
            <p className="text-xs text-steel-500 mb-2">
              Share details such as profile section dimensions, material grade, production speed, pallet load rating, or tube dimensions.
            </p>
            <textarea
              id="requirement"
              name="requirement"
              rows={4}
              value={formData.requirement}
              onChange={handleInputChange}
              placeholder={activeLine?.placeholder_requirement}
              className={cn(
                "w-full px-4 py-3 rounded-xl border text-sm transition-colors outline-none resize-y",
                errors.requirement
                  ? "border-red-500 bg-red-50/20 focus:border-red-600"
                  : "border-steel-200 bg-white focus:border-navy-700 focus:ring-1 focus:ring-navy-700"
              )}
            />
            {errors.requirement && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.requirement}</span>
              </p>
            )}
          </div>

          {/* Step 4: Drawing / Specification File Attachment */}
          <div className="mb-8">
            <label className="block text-xs font-bold text-navy-800 uppercase tracking-wider mb-1">
              4. Attach Drawing, Sample Photo or RFQ Document (Optional)
            </label>
            <p className="text-xs text-steel-500 mb-3">
              {uploadGuidance.formats}
            </p>

            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.dwg,.dxf,.stp,.step,.png,.jpg,.jpeg"
              className="hidden"
              id="fileUploadInput"
            />

            {!attachedFile ? (
              <label
                htmlFor="fileUploadInput"
                className="border-2 border-dashed border-steel-200 hover:border-navy-600 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-steel-50/50 hover:bg-navy-50/30 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-steel-200 flex items-center justify-center text-steel-500 group-hover:text-navy-700 mb-2 shadow-2xs">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-steel-800 group-hover:text-navy-900">
                  Click to select drawing or document
                </span>
                <span className="text-[11px] text-steel-400 mt-0.5">
                  PDF, DWG, DXF, STP, CAD files or high-res photos up to 15MB
                </span>
              </label>
            ) : (
              <div className="p-3.5 rounded-xl border border-navy-200 bg-navy-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="w-5 h-5 text-navy-700 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-steel-900 truncate">
                      {attachedFile.name}
                    </p>
                    <p className="text-[10px] text-steel-400">
                      {(attachedFile.size / 1024 / 1024).toFixed(2)} MB • File attached
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 rounded-lg hover:bg-navy-100 text-steel-500 hover:text-red-600 transition-colors"
                  aria-label="Remove attached file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {fileError && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{fileError}</span>
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="mb-8">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
                className="mt-0.5 w-4 h-4 rounded text-navy-700 focus:ring-navy-600 border-steel-300 cursor-pointer"
              />
              <span className="text-xs text-steel-600 leading-normal">
                {consentNote}
              </span>
            </label>
            {errors.consent && (
              <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.consent}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-60 text-white font-semibold text-sm transition-all shadow-md active:scale-98 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Enquiry...</span>
                </>
              ) : (
                <>
                  <span>Submit Technical Enquiry / RFQ</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
