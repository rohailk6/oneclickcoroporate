"use client";

import { useState } from "react";
import {
  DollarSign, FileText, Search, Users, LayoutDashboard, Settings,
  TrendingUp, ChevronRight, Filter, Download, Eye, Edit2,
  CheckCircle2, Clock, AlertCircle, Upload, RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

type AdminTab = "overview" | "applications" | "users" | "payments" | "documents";

const adminTabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "users", label: "Users", icon: Users },
  { id: "payments", label: "Payments", icon: DollarSign },
  { id: "documents", label: "Documents", icon: FileText }
];

const applications = [
  { id: "APP-001", company: "Atlas Ledger LLC", customer: "Rohail Khan", state: "Wyoming", status: "Filing In Progress", date: "Dec 15, 2024", amount: "$250" },
  { id: "APP-002", company: "Northline Labs LLC", customer: "Ahmed Al-Rashid", state: "Texas", status: "In Review", date: "Dec 14, 2024", amount: "$390" },
  { id: "APP-003", company: "Bright Harbor LLC", customer: "Maria González", state: "Florida", status: "Submitted", date: "Dec 13, 2024", amount: "$320" },
  { id: "APP-004", company: "Zenith Digital LLC", customer: "Priya Sharma", state: "New York", status: "Completed", date: "Dec 10, 2024", amount: "$340" },
  { id: "APP-005", company: "Summit Tech LLC", customer: "James Wilson", state: "Wyoming", status: "Completed", date: "Dec 8, 2024", amount: "$250" }
];

const users = [
  { name: "Rohail Khan", email: "rohail@example.com", role: "Customer", joined: "Dec 15, 2024", applications: 1, status: "Active" },
  { name: "Ahmed Al-Rashid", email: "ahmed@example.com", role: "Customer", joined: "Dec 14, 2024", applications: 1, status: "Active" },
  { name: "Maria González", email: "maria@example.com", role: "Customer", joined: "Dec 13, 2024", applications: 1, status: "Active" },
  { name: "Admin User", email: "admin@oneclickcorporate.com", role: "Admin", joined: "Jan 1, 2024", applications: 0, status: "Active" }
];

const payments = [
  { id: "INV-1001", customer: "Rohail Khan", desc: "Wyoming LLC", amount: "$250", date: "Dec 15, 2024", status: "Paid", txn: "txn_demo_001" },
  { id: "INV-1002", customer: "Ahmed Al-Rashid", desc: "Texas LLC", amount: "$390", date: "Dec 14, 2024", status: "Paid", txn: "txn_demo_002" },
  { id: "INV-1003", customer: "Maria González", desc: "Florida LLC", amount: "$320", date: "Dec 13, 2024", status: "Pending", txn: "txn_demo_003" },
  { id: "INV-1004", customer: "Priya Sharma", desc: "New York LLC", amount: "$340", date: "Dec 10, 2024", status: "Paid", txn: "txn_demo_004" }
];

const documents = [
  { name: "Passport.pdf", customer: "Rohail Khan", type: "Identity", size: "2.4 MB", date: "Dec 15, 2024", status: "Approved" },
  { name: "Address-Proof.pdf", customer: "Rohail Khan", type: "Address", size: "1.1 MB", date: "Dec 15, 2024", status: "Approved" },
  { name: "Operating-Agreement.pdf", customer: "Ahmed Al-Rashid", type: "Legal", size: "4.2 MB", date: "Dec 14, 2024", status: "Review" },
  { name: "Passport.pdf", customer: "Maria González", type: "Identity", size: "1.8 MB", date: "Dec 13, 2024", status: "Pending" }
];

const statusColors: Record<string, string> = {
  Submitted: "bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
  "In Review": "bg-yellow-50 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400",
  "Filing In Progress": "bg-orange-50 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400",
  Completed: "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
  Paid: "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
  Pending: "bg-yellow-50 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400",
  Active: "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
  Admin: "bg-brand-red/10 text-brand-red",
  Customer: "bg-brand-off-white text-brand-dark-gray/60 dark:bg-white/5 dark:text-white/50",
  Approved: "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
  Review: "bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
};

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All");

  const filteredApplications = applications.filter((a) => {
    const matchSearch = !search || a.company.toLowerCase().includes(search.toLowerCase()) || a.customer.toLowerCase().includes(search.toLowerCase());
    const matchState = stateFilter === "All" || a.state === stateFilter;
    return matchSearch && matchState;
  });

  return (
    <div className="min-h-screen bg-brand-off-white dark:bg-brand-black">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Admin Dashboard</h1>
            <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Manage users, applications, payments, and documents.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-brand-light-gray bg-white px-3 py-2 text-sm text-brand-dark-gray/70 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:bg-white/5 dark:text-white/60">
              <RefreshCw className="size-4" />
              Refresh
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-brand-light-gray bg-white px-3 py-2 text-sm text-brand-dark-gray/70 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:bg-white/5 dark:text-white/60">
              <Download className="size-4" />
              Export
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-brand-light-gray bg-white p-1 shadow-card dark:border-white/10 dark:bg-white/5">
          {adminTabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === id
                  ? "bg-brand-red text-white shadow-sm"
                  : "text-brand-dark-gray/60 hover:text-brand-dark-gray dark:text-white/50 dark:hover:text-white"
              }`}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <div className="grid gap-5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <AdminMetric icon={<DollarSign className="size-5 text-brand-red" />} label="Total Revenue" value="$12,480" trend="+18% this month" positive />
                  <AdminMetric icon={<FileText className="size-5 text-brand-red" />} label="Applications" value="42" trend="8 this week" positive />
                  <AdminMetric icon={<Users className="size-5 text-brand-red" />} label="Customers" value="38" trend="5 new this week" positive />
                  <AdminMetric icon={<TrendingUp className="size-5 text-brand-red" />} label="Documents" value="116" trend="12 pending review" />
                </div>

                {/* Revenue by state */}
                <div className="rounded-2xl border border-brand-light-gray bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
                  <h2 className="mb-5 font-bold text-brand-black dark:text-white">Revenue by State</h2>
                  <div className="grid gap-4 sm:grid-cols-4">
                    {[
                      { state: "Wyoming", amount: "$4,750", apps: 19, pct: 38 },
                      { state: "Texas", amount: "$3,900", apps: 10, pct: 31 },
                      { state: "Florida", amount: "$2,240", apps: 7, pct: 18 },
                      { state: "New York", amount: "$1,590", apps: 5, pct: 13 }
                    ].map(({ state, amount, apps, pct }) => (
                      <div key={state} className="rounded-xl bg-brand-off-white p-4 dark:bg-white/5">
                        <p className="font-bold text-brand-black dark:text-white">{state}</p>
                        <p className="text-2xl font-black text-brand-red" style={{ letterSpacing: "-0.03em" }}>{amount}</p>
                        <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{apps} applications</p>
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-brand-light-gray dark:bg-white/10">
                          <div className="h-full rounded-full bg-brand-red" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent activity */}
                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="rounded-2xl border border-brand-light-gray bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="font-bold text-brand-black dark:text-white">Recent Applications</h2>
                      <button onClick={() => setActiveTab("applications")} className="flex items-center gap-1 text-xs text-brand-red hover:underline">
                        View all <ChevronRight className="size-3" />
                      </button>
                    </div>
                    <div className="grid gap-3">
                      {applications.slice(0, 4).map((app) => (
                        <div key={app.id} className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-xs font-bold text-brand-red">{app.state.slice(0, 2)}</div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-brand-black dark:text-white">{app.company}</p>
                            <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{app.customer} · {app.date}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[app.status] ?? ""}`}>{app.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-brand-light-gray bg-white p-6 shadow-card dark:border-white/10 dark:bg-white/5">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="font-bold text-brand-black dark:text-white">Recent Payments</h2>
                      <button onClick={() => setActiveTab("payments")} className="flex items-center gap-1 text-xs text-brand-red hover:underline">
                        View all <ChevronRight className="size-3" />
                      </button>
                    </div>
                    <div className="grid gap-3">
                      {payments.slice(0, 4).map((p) => (
                        <div key={p.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-brand-black dark:text-white">{p.customer}</p>
                            <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{p.id} · {p.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <p className="font-bold text-brand-black dark:text-white">{p.amount}</p>
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[p.status] ?? ""}`}>{p.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── APPLICATIONS ── */}
            {activeTab === "applications" && (
              <div className="grid gap-5">
                {/* Filters */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 size-4 text-brand-dark-gray/40" />
                    <input
                      className="h-11 w-full rounded-lg border border-brand-light-gray bg-white pl-9 pr-3 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
                      placeholder="Search by company or customer…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="size-4 text-brand-dark-gray/40" />
                    {["All", "Wyoming", "Texas", "Florida", "New York"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStateFilter(s)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                          stateFilter === s
                            ? "bg-brand-red text-white"
                            : "border border-brand-light-gray bg-white text-brand-dark-gray/60 hover:border-brand-red hover:text-brand-red dark:border-white/10 dark:bg-white/5 dark:text-white/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-light-gray bg-brand-off-white text-left dark:border-white/10 dark:bg-white/5">
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Company</th>
                        <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 sm:table-cell dark:text-white/40">State</th>
                        <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 md:table-cell dark:text-white/40">Date</th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Status</th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-light-gray dark:divide-white/10">
                      {filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-brand-off-white/50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-medium text-brand-black dark:text-white">{app.company}</p>
                            <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{app.customer} · {app.amount}</p>
                          </td>
                          <td className="hidden px-5 py-4 sm:table-cell">
                            <span className="rounded-full bg-brand-off-white px-2.5 py-0.5 text-xs font-medium text-brand-dark-gray dark:bg-white/5 dark:text-white/70">{app.state}</span>
                          </td>
                          <td className="hidden px-5 py-4 text-xs text-brand-dark-gray/50 md:table-cell dark:text-white/40">{app.date}</td>
                          <td className="px-5 py-4">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[app.status] ?? ""}`}>{app.status}</span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button className="grid size-7 place-items-center rounded-lg border border-brand-light-gray text-brand-dark-gray/50 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:text-white/40">
                                <Eye className="size-3.5" />
                              </button>
                              <button className="grid size-7 place-items-center rounded-lg border border-brand-light-gray text-brand-dark-gray/50 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:text-white/40">
                                <Edit2 className="size-3.5" />
                              </button>
                              <button className="grid size-7 place-items-center rounded-lg border border-brand-light-gray text-brand-dark-gray/50 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:text-white/40">
                                <Upload className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredApplications.length === 0 && (
                    <div className="py-12 text-center text-sm text-brand-dark-gray/40 dark:text-white/30">
                      No applications match your search.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── USERS ── */}
            {activeTab === "users" && (
              <div className="grid gap-5">
                <div className="relative">
                  <Search className="absolute left-3 top-3 size-4 text-brand-dark-gray/40" />
                  <input
                    className="h-11 w-full rounded-lg border border-brand-light-gray bg-white pl-9 pr-3 text-sm focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
                    placeholder="Search users by name or email…"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-light-gray bg-brand-off-white text-left dark:border-white/10 dark:bg-white/5">
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">User</th>
                        <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 sm:table-cell dark:text-white/40">Joined</th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Role</th>
                        <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 md:table-cell dark:text-white/40">Apps</th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-light-gray dark:divide-white/10">
                      {users.map((user) => (
                        <tr key={user.email} className="hover:bg-brand-off-white/50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">{user.name[0]}</div>
                              <div>
                                <p className="font-medium text-brand-black dark:text-white">{user.name}</p>
                                <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="hidden px-5 py-4 text-xs text-brand-dark-gray/50 sm:table-cell dark:text-white/40">{user.joined}</td>
                          <td className="px-5 py-4">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[user.role] ?? ""}`}>{user.role}</span>
                          </td>
                          <td className="hidden px-5 py-4 text-brand-dark-gray/70 md:table-cell dark:text-white/60">{user.applications}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-2">
                              <button className="grid size-7 place-items-center rounded-lg border border-brand-light-gray text-brand-dark-gray/50 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:text-white/40">
                                <Eye className="size-3.5" />
                              </button>
                              <button className="grid size-7 place-items-center rounded-lg border border-brand-light-gray text-brand-dark-gray/50 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:text-white/40">
                                <Settings className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── PAYMENTS ── */}
            {activeTab === "payments" && (
              <div className="grid gap-5">
                <div className="grid gap-4 sm:grid-cols-3">
                  <AdminMetric icon={<DollarSign className="size-5 text-brand-red" />} label="Total Revenue" value="$12,480" trend="All time" />
                  <AdminMetric icon={<CheckCircle2 className="size-5 text-emerald-500" />} label="Paid" value="$12,160" trend="97% collection rate" positive />
                  <AdminMetric icon={<Clock className="size-5 text-yellow-500" />} label="Pending" value="$320" trend="1 outstanding" />
                </div>
                <div className="overflow-hidden rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-light-gray bg-brand-off-white text-left dark:border-white/10 dark:bg-white/5">
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Invoice</th>
                        <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 sm:table-cell dark:text-white/40">Customer</th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Amount</th>
                        <th className="hidden px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 md:table-cell dark:text-white/40">Date</th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Status</th>
                        <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-light-gray dark:divide-white/10">
                      {payments.map((p) => (
                        <tr key={p.id} className="hover:bg-brand-off-white/50 dark:hover:bg-white/5 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-medium text-brand-black dark:text-white">{p.id}</p>
                            <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{p.txn}</p>
                          </td>
                          <td className="hidden px-5 py-4 text-brand-dark-gray/70 sm:table-cell dark:text-white/60">{p.customer}</td>
                          <td className="px-5 py-4 font-bold text-brand-black dark:text-white">{p.amount}</td>
                          <td className="hidden px-5 py-4 text-xs text-brand-dark-gray/50 md:table-cell dark:text-white/40">{p.date}</td>
                          <td className="px-5 py-4">
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status] ?? ""}`}>{p.status}</span>
                          </td>
                          <td className="px-5 py-4">
                            <button className="grid size-7 place-items-center rounded-lg border border-brand-light-gray text-brand-dark-gray/50 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:text-white/40">
                              <Download className="size-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── DOCUMENTS ── */}
            {activeTab === "documents" && (
              <div className="grid gap-5">
                <div className="overflow-hidden rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center justify-between border-b border-brand-light-gray p-5 dark:border-white/10">
                    <h2 className="font-bold text-brand-black dark:text-white">All Documents</h2>
                    <div className="flex items-center gap-2">
                      {["All", "Pending", "Review", "Approved"].map((f) => (
                        <button key={f} className="rounded-lg px-3 py-1 text-xs text-brand-dark-gray/60 hover:text-brand-red transition-colors dark:text-white/40">{f}</button>
                      ))}
                    </div>
                  </div>
                  <div className="divide-y divide-brand-light-gray dark:divide-white/10">
                    {documents.map((doc, i) => (
                      <div key={i} className="flex items-center gap-4 px-5 py-4">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                          <FileText className="size-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium text-brand-black dark:text-white">{doc.name}</p>
                          <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{doc.customer} · {doc.type} · {doc.size}</p>
                        </div>
                        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[doc.status] ?? ""}`}>{doc.status}</span>
                        <div className="flex items-center gap-2">
                          <button className="grid size-7 place-items-center rounded-lg border border-brand-light-gray text-brand-dark-gray/50 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:text-white/40">
                            <Eye className="size-3.5" />
                          </button>
                          <button className="grid size-7 place-items-center rounded-lg border border-emerald-200 text-emerald-500 hover:bg-emerald-50 transition-colors dark:border-emerald-400/20 dark:text-emerald-400">
                            <CheckCircle2 className="size-3.5" />
                          </button>
                          <button className="grid size-7 place-items-center rounded-lg border border-brand-light-gray text-brand-dark-gray/50 hover:border-brand-red hover:text-brand-red transition-colors dark:border-white/10 dark:text-white/40">
                            <Download className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function AdminMetric({ icon, label, value, trend, positive }: { icon: React.ReactNode; label: string; value: string; trend?: string; positive?: boolean }) {
  return (
    <div className="rounded-2xl border border-brand-light-gray bg-white p-5 shadow-card dark:border-white/10 dark:bg-white/5">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-brand-off-white dark:bg-white/5">{icon}</div>
        <p className="text-sm text-brand-dark-gray/50 dark:text-white/40">{label}</p>
      </div>
      <p className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>{value}</p>
      {trend && (
        <p className={`mt-0.5 text-xs ${positive ? "text-emerald-500" : "text-brand-dark-gray/40 dark:text-white/30"}`}>
          {trend}
        </p>
      )}
    </div>
  );
}
