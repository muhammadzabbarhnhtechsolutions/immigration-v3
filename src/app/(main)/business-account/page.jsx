"use client";
import React, { useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  CreateBuisnessAccount,
  DeleteBusinessAccount,
  getBuisnessAccount,
  UpdateBuisnessAccount,
} from "../../../services/buisnessAccount";

export default function BusinessAccounts() {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const openEditModal = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBuisnessAccount(router);
      // if (data) {
      console.log(data, "data");
      setUsers(data?.data); // Adjust if the response structure is different
      // }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this account?"
    );
    if (!confirm) return;

    await DeleteBusinessAccount(router, id);

    // Refresh list after delete
    const data = await getBuisnessAccount(router);
    setUsers(data?.data || []);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-8">
      {/* Header */}
      <div className="flex justify-between items-center ">
        <h1 className="text-3xl font-bold text-[#88AE98] mb-12 mt-8">
          Business Accounts
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#88AE98] hover:bg-[#729781] text-white px-5 py-2.5 rounded-xl shadow-lg transition"
        >
          Add Business Account
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-6">
        {users?.map((user) => (
          <div
            key={user?.id}
            className="relative group cursor-pointer bg-white rounded-3xl p-6 pt-16 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
          >
            {/* Top Right: Status + Edit */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Pencil
                className="w-4 h-4 text-gray-400 hover:text-[#88AE98] cursor-pointer transition"
                onClick={() => openEditModal(user)}
              />
              <Trash2
                className="w-4 h-4 text-red-400 hover:text-red-600 cursor-pointer transition"
                onClick={() => handleDelete(user.id)}
              />
            </div>

            {/* Profile Image with Gradient Ring */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#88AE98] to-[#6c8a7f] p-[3px] rounded-full shadow-md group-hover:shadow-lg transition">
              <img
                src={user.profile}
                alt="Profile"
                className="w-28 h-28 object-cover rounded-full border-[3px] border-white"
              />
            </div>

            {/* Name Section */}
            <div className="mt-28 text-center">
              <p className="text-[21px] font-bold text-[#73a086] group-hover:text-[#8cb89e] transition">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-base text-gray-500 mt-1">{user.email}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <Modal
          title="Add New Business Account"
          onClose={() => setShowAddModal(false)}
        >
          <ModalForm onClose={() => setShowAddModal(false)} />
        </Modal>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <Modal title="Edit Account" onClose={() => setShowEditModal(false)}>
          <ModalForm
            user={editUser}
            onClose={() => setShowEditModal(false)}
            isEdit
          />
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, title, onClose }) {
  return (
    <div className="fixed animate-fade-in  transition mt-38 inset-0 bg-black bg-opacity-5 flex justify-center items-center z-[100]">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#88AE98]">{title}</h2>
        {children}
      </div>
    </div>
  );
}

function ModalForm({ user = {}, onClose, isEdit = false }) {
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const router = useRouter(); // 👈 Add this
  const [status, setStatus] = useState(user.status || "Active");
  const fetchData = async () => {
    try {
      const data = await getBuisnessAccount(router);
      console.log(data, "📦 fetched data");
      setUsers(data?.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch business accounts:", error);
    }
  };

  const handleSubmit = async () => {
    console.log("🔥 handleSubmit called");

    if (!firstName || !lastName || !email || (!isEdit && !password)) {
      toast.error("⚠️ All fields are required.");
      return;
    }

    try {
      let result;

      if (isEdit) {
        console.log("📡 calling Update API");
        await UpdateBuisnessAccount(
          router,
          {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
          },
          (newList) => {
            setUsers(newList);
            onClose(); // close modal
          }
        );

        // ✅ Close modal
        onClose();
        toast.success("Updated successfully!");
      } else {
        console.log("📡 calling Create API");
        await CreateBuisnessAccount(
          router,
          {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
          },
          (newList) => {
            setUsers(newList);
            onClose(); // close modal
          }
        );

        // ✅ Close modal
        onClose();
        toast.success("Created successfully!");
      }

      // 🔁 Wait for fresh data after success
    } catch (err) {
      console.error("❌ Error in submit:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <form className="space-y-4 pt-38">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88AE98]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88AE98]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88AE98]"
        />
      </div>
      {!isEdit && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88AE98]"
          />
        </div>
      )}

      {/* <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88AE98]"
        >
          <option>Active</option>
          <option>Delete</option>
        </select>
      </div> */}

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-[#88AE98] hover:bg-[#729781] text-white w-full py-2.5 rounded-lg shadow-md"
      >
        {isEdit ? "Update" : "Save Account"}
      </button>
    </form>
  );
}
