import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import { Trash2, User, Shield, CheckCircle } from "lucide-react";

const Usermanagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/register");
      setUsers(res.data.alluser);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-black tracking-tight">Access Control</h1>
            <p className="text-gray-400 text-sm mt-1">System user directory and privilege management.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Directory</p>
            <p className="text-2xl font-light text-black">{users.length} <span className="text-sm text-gray-400">Users</span></p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase">Identify</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase">Authorization</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase">Enrollment</th>
                {/* <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase text-right">Action</th> */}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-black text-white flex items-center justify-center text-xs font-bold rounded-full">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-black">{user.name}</div>
                        <div className="text-xs text-gray-400 font-mono">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${
                      user.role === "ADMIN" ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200"
                    }`}>
                      {user.role === "ADMIN" ? <Shield size={10} /> : <User size={10} />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-xs text-gray-500 font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  {/* <td className="px-6 py-5 text-right">
                    <button className="text-gray-300 hover:text-black transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-10 text-center text-gray-400 animate-pulse">Synchronizing Data...</div>}
        </div>
      </div>
    </div>
  );
};

export default Usermanagement;