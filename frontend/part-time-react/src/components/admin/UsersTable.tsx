import { useState } from "react";
import { Eye, User, Mail, Shield, Calendar, CheckCircle2, Clock } from "lucide-react";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import UserDetailsModal from "@/components/admin/UserDetailsModal";
import UserFilters from "@/components/admin/UserFilters";
import { motion } from "framer-motion";

export default function UsersTable() {
  const { users, loading, error, refetch } = useAdminUsers();

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("ALL");

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  
  const filteredUsers = users.filter((user) => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = role === "ALL" || user.role === role;

    return matchSearch && matchRole;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="w-10 h-10 border-4 border-secondary/20 dark:border-[#fbbf24]/20 border-t-secondary dark:border-t-[#fbbf24] rounded-full animate-spin" />
      <p className="text-slate-500 font-medium">Loading user database...</p>
    </div>
  );
  
  if (error) return (
    <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-center font-bold">
      {error}
    </div>
  );

  return (
    <>
      {/* Filters Area */}
      <div className="mb-8">
        <UserFilters
          search={search}
          role={role}
          onSearchChange={setSearch}
          onRoleChange={setRole}
        />
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-[#0f172a]/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm dark:shadow-2xl transition-all duration-500">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-5 font-bold uppercase tracking-wider text-left">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-secondary dark:text-[#fbbf24]" />
                    User
                  </div>
                </th>
                <th className="p-5 font-bold uppercase tracking-wider text-left">
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    Email
                  </div>
                </th>
                <th className="p-5 font-bold uppercase tracking-wider text-left">
                  <div className="flex items-center gap-2">
                    <Shield size={14} />
                    Role
                  </div>
                </th>
                <th className="p-5 font-bold uppercase tracking-wider text-left">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    Status
                  </div>
                </th>
                <th className="p-5 font-bold uppercase tracking-wider text-left">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    Joined
                  </div>
                </th>
                <th className="p-5 font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {filteredUsers.map((user) => (
                <motion.tr 
                  layout
                  key={user.id} 
                  className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors duration-300"
                >
                  <td className="p-5">
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-secondary dark:group-hover:text-[#fbbf24] transition-colors">
                      {user.name}
                    </p>
                  </td>
                  
                  <td className="p-5 text-slate-600 dark:text-slate-400 font-medium">
                    {user.email}
                  </td>

                  <td className="p-5">
                    <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-5">
                    {user.status === "VERIFIED" ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                        <CheckCircle2 size={12} className="mr-1.5" />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-[#fbbf24] text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                        <Clock size={12} className="mr-1.5" />
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="p-5 text-slate-500 dark:text-slate-500 font-medium whitespace-nowrap">
                    {user.createdAt}
                  </td>

                  <td className="p-5 text-right">
                    <button
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setOpen(true);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl 
                                 bg-secondary dark:bg-[#fbbf24] text-white dark:text-[#020617] 
                                 font-bold text-xs uppercase tracking-widest 
                                 hover:scale-105 active:scale-95 transition-all 
                                 shadow-md dark:shadow-[#fbbf24]/20 group/btn"
                    >
                      <Eye size={16} className="group-hover/btn:animate-pulse" />
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-20 text-center text-slate-400 font-medium italic">
                    No users found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserDetailsModal
        open={open}
        userId={selectedUserId}
        onClose={() => setOpen(false)}
        onStatusChange={refetch}
      />
    </>
  );
}