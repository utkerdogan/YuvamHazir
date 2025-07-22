import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import React from "react";

const fetchUsers = async () => {
  const res = await api.get("/user");
  return res.data;
};

const UserTable = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div className="p-4">Yükleniyor...</div>;
  if (error) return <div className="p-4 text-red-500">Hata: {error.message}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Kullanıcı Listesi</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">İsim</th>
              <th className="p-3 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="p-3 border">{user.id}</td>
                <td className="p-3 border">{user.name || "-"}</td>
                <td className="p-3 border">{user.email || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
