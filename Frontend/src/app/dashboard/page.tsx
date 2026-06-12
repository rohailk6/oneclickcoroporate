"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Bell, Download, FileUp, ReceiptText, Settings, UserRound,
  LayoutDashboard, MessageSquare, Upload, CheckCircle2,
  Clock, DollarSign, AlertCircle, ChevronRight, Plus, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Button, ButtonLink } from "@/components/ui/button";
import { StatusTimeline } from "@/components/dashboard/status-timeline";
import { useAuth } from "@/lib/auth-context";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type Tab = "overview" | "applications" | "documents" | "billing" | "notifications" | "profile" | "support";

const navItems: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: "overview",       label: "Overview",       icon: LayoutDashboard },
  { id: "applications",   label: "Applications",   icon: FileUp          },
  { id: "documents",      label: "Documents",      icon: FileUp          },
  { id: "billing",        label: "Payments",       icon: ReceiptText     },
  { id: "notifications",  label: "Notifications",  icon: Bell            },
  { id: "profile",        label: "Profile",        icon: UserRound       },
  { id: "support",        label: "Support",        icon: MessageSquare   },
];

type Doc = {
  id: string;
  fileName: string;
  documentType: string;
  size: number | null;
  mimeType: string | null;
  uploadDate: string;
  fileUrl: string;
};

const DOC_TYPES = ["Identity", "Address Proof", "Operating Agreement", "EIN", "Bank Letter", "Other"];

const notifications = [
  { icon: CheckCircle2, color: "text-emerald-500", title: "Application submitted",                      time: "Dec 15, 2024 · 3:42 PM", read: true  },
  { icon: Clock,        color: "text-brand-red",   title: "Filing in progress — estimated 2 more days", time: "Dec 17, 2024 · 9:00 AM", read: false },
  { icon: AlertCircle,  color: "text-yellow-500",  title: "2 documents pending review",                 time: "Dec 17, 2024 · 11:30 AM",read: false },
];

function fmt(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/* ── Documents Tab ── */
function DocumentsTab({ token }: { token: string | null }) {
  const [docs, setDocs]           = useState<Doc[]>([]);
  const [loading, setLoading]     = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging]   = useState(false);
  const [docType, setDocType]     = useState(DOC_TYPES[0]);
  const fileRef                   = useRef<HTMLInputElement>(null);

  const fetchDocs = useCallback(async () => {
    try {
      const res = await fetch(`${API}/documents`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setDocs(data.documents ?? []);
    } catch {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchDocs(); }, [fetchDocs]);

  async function uploadFile(file: File) {
    if (!file) return;
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF, JPEG, PNG, or WebP files are allowed.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10 MB.");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("documentType", docType);

      const res = await fetch(`${API}/documents`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        credentials: "include",
        body,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Upload failed");
      }
      toast.success(`${file.name} uploaded successfully`);
      await fetchDocs();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDownload(doc: Doc) {
    window.open(doc.fileUrl, "_blank");
  }

  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Document Center</h1>
        <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Upload, preview and download your legal documents.</p>
      </div>

      {/* Document type selector */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-brand-dark-gray dark:text-white/70">Document type:</span>
        <div className="flex flex-wrap gap-2">
          {DOC_TYPES.map(t => (
            <button key={t} type="button" onClick={() => setDocType(t)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                docType === t
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-brand-light-gray bg-white text-brand-dark-gray/70 hover:border-brand-red hover:text-brand-red dark:border-white/15 dark:bg-white/5 dark:text-white/60"
              }`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => !uploading && fileRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed bg-white p-10 text-center transition-all dark:bg-white/5 ${
          dragging ? "border-brand-red bg-brand-red/5" : "border-brand-light-gray hover:border-brand-red dark:border-white/15"
        }`}
      >
        <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-brand-red/10">
          {uploading
            ? <Loader2 className="size-6 animate-spin text-brand-red" />
            : <Upload className="size-6 text-brand-red" />}
        </div>
        <p className="font-semibold text-brand-black dark:text-white">
          {uploading ? "Uploading…" : "Drop files here or click to upload"}
        </p>
        <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">PDF, JPEG, PNG, or WebP · Max 10 MB · Type: <strong>{docType}</strong></p>
        {!uploading && (
          <Button variant="outline" className="mt-5 pointer-events-none">Choose File</Button>
        )}
        <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden" onChange={onFileChange} />
      </div>

      {/* Document list */}
      <div className="rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
        <div className="border-b border-brand-light-gray p-5 dark:border-white/10">
          <h2 className="font-bold text-brand-black dark:text-white">
            Uploaded Files {!loading && <span className="ml-1 text-sm font-normal text-brand-dark-gray/40 dark:text-white/30">({docs.length})</span>}
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-brand-dark-gray/40 dark:text-white/30">
            <Loader2 className="size-4 animate-spin" /> Loading documents…
          </div>
        ) : docs.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-brand-off-white dark:bg-white/5">
              <FileUp className="size-5 text-brand-dark-gray/30 dark:text-white/20" />
            </div>
            <p className="text-sm font-medium text-brand-dark-gray/50 dark:text-white/40">No documents yet</p>
            <p className="mt-1 text-xs text-brand-dark-gray/30 dark:text-white/20">Upload your first file above</p>
          </div>
        ) : (
          <div className="divide-y divide-brand-light-gray dark:divide-white/10">
            {docs.map(doc => (
              <div key={doc.id} className="flex items-center gap-4 px-5 py-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                  <FileUp className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-brand-black dark:text-white">{doc.fileName}</p>
                  <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">
                    {doc.documentType} · {fmt(doc.size)} · {new Date(doc.uploadDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDownload(doc)}
                  title="Download"
                  className="grid size-8 place-items-center rounded-lg border border-brand-light-gray text-brand-dark-gray/50 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:text-white/40"
                >
                  <Download className="size-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function DashboardPage() {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const firstName = user?.fullName?.split(" ")[0] ?? "there";
  const initials  = user?.fullName?.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() ?? "?";

  const mockPayments = [
    { invoice: "INV-1001", desc: "Wyoming LLC Formation",      amount: "$250", date: "Dec 15, 2024", status: "Paid"     },
    { invoice: "INV-1002", desc: "Registered Agent (Year 1)", amount: "$0",   date: "Dec 15, 2024", status: "Included" },
  ];

  return (
    <div className="min-h-screen bg-brand-off-white dark:bg-brand-black">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex gap-6 lg:items-start">

          {/* Sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
              <div className="border-b border-brand-light-gray p-4 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-brand-red text-sm font-bold text-white">{initials}</div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-brand-black dark:text-white">{user?.fullName ?? "—"}</p>
                    <p className="truncate text-xs text-brand-dark-gray/50 dark:text-white/40">{user?.role === "ADMIN" ? "Admin" : "Customer"}</p>
                  </div>
                </div>
              </div>
              <nav className="p-3">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setActiveTab(id)}
                    className={`mb-0.5 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-150 ${
                      activeTab === id
                        ? "bg-brand-red/10 text-brand-red"
                        : "text-brand-dark-gray/70 hover:bg-brand-off-white hover:text-brand-dark-gray dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
                    }`}>
                    <Icon className="size-4" />{label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile tab bar */}
          <div className="mb-4 flex gap-2 overflow-x-auto pb-2 lg:hidden w-full">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === id
                    ? "bg-brand-red text-white"
                    : "border border-brand-light-gray bg-white text-brand-dark-gray/70 dark:border-white/10 dark:bg-white/5 dark:text-white/60"
                }`}>
                <Icon className="size-3.5" />{label}
              </button>
            ))}
          </div>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>

                {/* ── OVERVIEW ── */}
                {activeTab === "overview" && (
                  <div className="grid gap-5">
                    <div>
                      <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Good morning, {firstName} 👋</h1>
                      <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Here&apos;s a snapshot of your LLC formation status.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <MetricCard icon={<Clock className="size-5 text-brand-red" />}        label="Formation Status" value="Filing In Progress" sub="~2 more business days" />
                      <MetricCard icon={<FileUp className="size-5 text-brand-red" />}        label="Documents"        value="Upload files"         sub="Go to Documents tab"  />
                      <MetricCard icon={<DollarSign className="size-5 text-brand-red" />}   label="Total Paid"       value="$250.00"              sub="INV-1001 · Dec 15"    />
                    </div>
                    <div className="grid gap-5 lg:grid-cols-2">
                      <div className="rounded-2xl border border-brand-light-gray bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
                        <div className="mb-5 flex items-center justify-between">
                          <h2 className="font-bold text-brand-black dark:text-white">Application Progress</h2>
                          <button onClick={() => setActiveTab("applications")} className="flex items-center gap-1 text-xs text-brand-red hover:underline">
                            Details <ChevronRight className="size-3" />
                          </button>
                        </div>
                        <StatusTimeline active={2} />
                      </div>
                      <div className="rounded-2xl border border-brand-light-gray bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
                        <div className="mb-5 flex items-center justify-between">
                          <h2 className="font-bold text-brand-black dark:text-white">Recent Notifications</h2>
                          <button onClick={() => setActiveTab("notifications")} className="flex items-center gap-1 text-xs text-brand-red hover:underline">
                            All <ChevronRight className="size-3" />
                          </button>
                        </div>
                        <div className="grid gap-3">
                          {notifications.map(n => (
                            <div key={n.title} className={`flex items-start gap-3 rounded-xl p-3 ${!n.read ? "bg-brand-red/5 dark:bg-brand-red/10" : "bg-brand-off-white dark:bg-white/5"}`}>
                              <n.icon className={`mt-0.5 size-4 shrink-0 ${n.color}`} />
                              <div>
                                <p className="text-sm font-medium text-brand-black dark:text-white">{n.title}</p>
                                <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{n.time}</p>
                              </div>
                              {!n.read && <span className="ml-auto mt-1.5 size-2 shrink-0 rounded-full bg-brand-red" />}
                            </div>
                          ))}
                        </div>
                        <button onClick={() => setActiveTab("documents")}
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-light-gray py-3 text-sm font-medium text-brand-dark-gray/50 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:text-white/30">
                          <Plus className="size-4" /> Upload document
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── APPLICATIONS ── */}
                {activeTab === "applications" && (
                  <div className="grid gap-5">
                    <div>
                      <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>My Applications</h1>
                      <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Track all your LLC formation applications.</p>
                    </div>
                    <div className="rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
                      <div className="border-b border-brand-light-gray p-5 dark:border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="font-bold text-brand-black dark:text-white">Wyoming LLC</h2>
                            <p className="text-sm text-brand-dark-gray/50 dark:text-white/40">Application #APP-2024-001</p>
                          </div>
                          <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-medium text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400">Filing In Progress</span>
                        </div>
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-brand-light-gray dark:bg-white/10">
                          <div className="h-full w-[65%] rounded-full bg-brand-red" />
                        </div>
                        <p className="mt-1 text-xs text-brand-dark-gray/40 dark:text-white/30">65% complete</p>
                      </div>
                      <div className="p-5">
                        <StatusTimeline active={2} />
                      </div>
                    </div>
                    <ButtonLink href="/register-company" variant="outline" className="self-start">
                      <Plus className="size-4" /> Start new application
                    </ButtonLink>
                  </div>
                )}

                {/* ── DOCUMENTS ── */}
                {activeTab === "documents" && <DocumentsTab token={token} />}

                {/* ── BILLING ── */}
                {activeTab === "billing" && (
                  <div className="grid gap-5">
                    <div>
                      <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Payments & Billing</h1>
                      <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">View your payment history and download receipts.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <MetricCard icon={<DollarSign className="size-5 text-brand-red" />}        label="Total Paid"       value="$250.00"        sub="All time"                  />
                      <MetricCard icon={<CheckCircle2 className="size-5 text-emerald-500" />}    label="Payment Status"   value="All cleared"    sub="No outstanding balance"    />
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
                      <div className="border-b border-brand-light-gray p-5 dark:border-white/10">
                        <h2 className="font-bold text-brand-black dark:text-white">Transaction History</h2>
                      </div>
                      <div className="divide-y divide-brand-light-gray dark:divide-white/10">
                        {mockPayments.map(p => (
                          <div key={p.invoice} className="flex items-center gap-4 px-5 py-4">
                            <div className="flex size-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                              <ReceiptText className="size-5" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-brand-black dark:text-white">{p.desc}</p>
                              <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{p.invoice} · {p.date}</p>
                            </div>
                            <p className="font-bold text-brand-black dark:text-white">{p.amount}</p>
                            <StatusBadge status={p.status} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── NOTIFICATIONS ── */}
                {activeTab === "notifications" && (
                  <div className="grid gap-5">
                    <div>
                      <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Notifications</h1>
                      <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Stay up to date on your formation status.</p>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
                      <div className="divide-y divide-brand-light-gray dark:divide-white/10">
                        {notifications.map(n => (
                          <div key={n.title} className={`flex items-start gap-4 px-5 py-4 ${!n.read ? "bg-brand-red/5 dark:bg-brand-red/10" : ""}`}>
                            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-off-white dark:bg-white/5">
                              <n.icon className={`size-4 ${n.color}`} />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-brand-black dark:text-white">{n.title}</p>
                              <p className="mt-0.5 text-xs text-brand-dark-gray/50 dark:text-white/40">{n.time}</p>
                            </div>
                            {!n.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand-red" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── PROFILE ── */}
                {activeTab === "profile" && (
                  <div className="grid gap-5">
                    <div>
                      <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Profile Settings</h1>
                      <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Manage your account information.</p>
                    </div>
                    <div className="rounded-2xl border border-brand-light-gray bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex size-16 items-center justify-center rounded-full bg-brand-red text-2xl font-black text-white">{initials}</div>
                        <div>
                          <p className="font-bold text-brand-black dark:text-white">{user?.fullName}</p>
                          <p className="text-sm text-brand-dark-gray/50 dark:text-white/40">{user?.email} · {user?.role === "ADMIN" ? "Admin" : "Customer"}</p>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {[
                          { label: "Full Name", value: user?.fullName ?? "—" },
                          { label: "Email",     value: user?.email     ?? "—" },
                        ].map(({ label, value }) => (
                          <div key={label} className="rounded-xl border border-brand-light-gray p-4 dark:border-white/10">
                            <p className="text-xs text-brand-dark-gray/40 dark:text-white/30">{label}</p>
                            <p className="mt-1 font-medium text-brand-black dark:text-white">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── SUPPORT ── */}
                {activeTab === "support" && (
                  <div className="grid gap-5">
                    <div>
                      <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Support Center</h1>
                      <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Get help from the OneClick Corporate team.</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        { title: "Email Support", sub: "support@oneclickcorporate.com", icon: MessageSquare },
                        { title: "Response Time", sub: "Within 24 hours",               icon: Clock        },
                        { title: "Hours",         sub: "Mon–Fri, 9am–6pm EST",          icon: Settings     },
                      ].map(({ title, sub, icon: Icon }) => (
                        <div key={title} className="rounded-2xl border border-brand-light-gray bg-white p-5 shadow-card dark:border-white/10 dark:bg-white/5">
                          <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red"><Icon className="size-5" /></div>
                          <p className="font-semibold text-brand-black dark:text-white">{title}</p>
                          <p className="text-sm text-brand-dark-gray/50 dark:text-white/40">{sub}</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl border border-brand-light-gray bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
                      <h2 className="mb-5 font-bold text-brand-black dark:text-white">Submit a Support Ticket</h2>
                      <form className="grid gap-4">
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Subject</label>
                          <input className="h-11 w-full rounded-lg border border-brand-light-gray bg-brand-off-white px-3 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 dark:border-white/15 dark:bg-white/5 dark:text-white" placeholder="What can we help you with?" />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Message</label>
                          <textarea className="min-h-32 w-full rounded-lg border border-brand-light-gray bg-brand-off-white px-3 py-3 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 dark:border-white/15 dark:bg-white/5 dark:text-white" placeholder="Describe your issue in detail…" />
                        </div>
                        <Button className="self-start">Send ticket</Button>
                      </form>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-brand-light-gray bg-white p-5 shadow-card dark:border-white/10 dark:bg-white/5">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-brand-off-white dark:bg-white/5">{icon}</div>
        <p className="text-sm text-brand-dark-gray/50 dark:text-white/40">{label}</p>
      </div>
      <p className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>{value}</p>
      {sub && <p className="mt-0.5 text-xs text-brand-dark-gray/40 dark:text-white/30">{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Approved: "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
    Pending:  "bg-yellow-50 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400",
    Paid:     "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
    Included: "bg-brand-off-white text-brand-dark-gray/60 dark:bg-white/5 dark:text-white/40",
  };
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status] ?? "bg-brand-off-white text-brand-dark-gray/60"}`}>
      {status}
    </span>
  );
}
