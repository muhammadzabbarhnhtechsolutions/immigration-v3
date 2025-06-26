"use client";
import React, { useEffect, useState } from "react";
import { Pencil, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CreateBuisnessAccount,
  DeleteBusinessAccount,
  getBuisnessAccount,
  UpdateBuisnessAccount,
} from "../../../services/buisnessAccount";
import { toast } from "react-toastify";

export default function BusinessAccounts() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const router = useRouter();
const [confirmDeleteId, setConfirmDeleteId] = useState(null);

 const fetchData = async () => {
  setLoading(true);
  try {
    const data = await getBuisnessAccount(router);
    setUsers(data?.data || []);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
  }, []);

  const openEditModal = (user) => {
    setEditUser(user);
    setShowEditModal(true);
  };

  
  // const handleDelete = async (id) => {
  //   // if (!window.confirm("Are you sure you want to delete this account?")) return;
  //   await DeleteBusinessAccount(router, id);
  //   fetchData();
  // };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-8">
      <div className="flex justify-between items-center">
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

   {loading ? (
 <div className="mx-auto z-[150] bg-[#ebf0ed] px-4 mt-8 py-20 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
        {/* Spinner */}
        <div className="h-10 w-10 border-4 border-[#5bb180] border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-[#5bb180] text-lg font-medium">
          Loading Business Account...
        </p>
      </div> 
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-8 gap-6">
    {users?.map((user) => (
      <div
        key={user?.id}
        className="relative group cursor-pointer bg-white rounded-3xl p-6 pt-16 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
      >
        {/* Top Right: Status + Edit */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
  <Pencil
    className="w-8 h-8 rounded-lg border border-gray-200  p-1 bg-green-100  text-[#7aad90] hover:text-[#4CAF50] cursor-pointer transition-all duration-200 hover:scale-125 hover:drop-shadow-md"
    onClick={() => openEditModal(user)}
    title="Edit"
  />
  <Trash2
    className="w-8 h-8 rounded-lg border border-gray-200  p-1 bg-red-100 text-red-500 hover:text-red-700 cursor-pointer transition-all duration-200 hover:scale-125 hover:drop-shadow-md"
    onClick={() => setConfirmDeleteId(user.id)}
    title="Delete"
  />
</div>


        {/* Profile image */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#88AE98] to-[#6c8a7f] p-[3px] rounded-full shadow-md">
          <img
            src={user.profile}
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full border-[3px] border-white"
          />
        </div>

        {/* Name & email */}
        <div className="mt-28 text-center">
          <p className="text-[21px] font-bold text-[#73a086]">
            {user.first_name} {user.last_name}
          </p>
          <p className="text-base text-gray-500 mt-1">{user.email}</p>
        </div>
      </div>
    ))}
  </div>
)}


      {showAddModal && (
        <Modal title="Add New Business Account" onClose={() => setShowAddModal(false)}>
          <ModalForm
            isEdit={false}
            onClose={() => setShowAddModal(false)}
            router={router}
            fetchData={fetchData}
          />
        </Modal>
      )}

      {showEditModal && (
        <Modal title="Edit Business Account" onClose={() => setShowEditModal(false)}>
          <ModalForm
            isEdit={true}
            user={editUser}
            onClose={() => setShowEditModal(false)}
            router={router}
            fetchData={fetchData}
          />
        </Modal>
      )}
      {confirmDeleteId && (
  <ConfirmModal
    onCancel={() => setConfirmDeleteId(null)}
    onConfirm={async () => {
      await DeleteBusinessAccount(router, confirmDeleteId);
      setConfirmDeleteId(null);
      fetchData();
    }}
  />
)}


    </div>
  );
}

function Modal({ children, title, onClose }) {
  return (
    <div className="fixed animate-fade-in inset-0 bg-black bg-opacity-5 flex justify-center items-center z-[100]">
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

function ModalForm({ isEdit = false, user = {}, onClose, router, fetchData }) {
const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name || "");
  const [lastName, setLastName] = useState(user.last_name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
const [confirmDeleteId, setConfirmDeleteId] = useState(null);
const [image, setImage] = useState(null);
const [previewUrl, setPreviewUrl] = useState(null); // ✅

// Show preview when user selects image
const handleImageChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  }
};


  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || (!isEdit && !password)) {
      toast.error("⚠️ All fields are required.");
      return;
    }

    try {
      if (isEdit) {
        setLoading(true)
       await UpdateBuisnessAccount(router, {
  id: user.id,
  first_name: firstName,
  last_name: lastName,
  email,
  profile: image, // <--- Add this
});

        setLoading(false)
        // toast.success("✅ Updated successfully!");
      } else {
        setLoading(true)
      await CreateBuisnessAccount(router, {
  first_name: firstName,
  last_name: lastName,
  email,
  password,
  profile: image, // <--- Add this
});

        setLoading(false)
        // toast.success("✅ Created successfully!");
      }

      await fetchData(); // Refresh the list
      onClose(); // Close modal
    } catch (error) {
      toast.error("❌ Something went wrong.");
      console.error(error);
    }
  };

  return (
   <form className="space-y-4 ">
  {/* First Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700">First Name</label>
    <input
      type="text"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88AE98]"
    />
  </div>

  {/* Last Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Last Name</label>
    <input
      type="text"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88AE98]"
    />
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88AE98]"
    />
  </div>

  {/* Password only in add mode */}
  {!isEdit && (
    <div>
      <label className="block text-sm font-medium text-gray-700">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#88AE98]"
      />
    </div>
  )}

  {/* Image Upload */}
  <div>
    <label className="block text-sm font-medium text-gray-700">Profile Image</label>
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      className="mt-1 file:rounded-full file:bg-green-400 "
    />
  {/* {previewUrl && (
  <img
    src={previewUrl}
    alt="Preview"
    className="mt-3 h-28 rounded-md border object-cover"
  />
)} */}

  </div>

  {/* Submit Button */}
  <button
    type="button"
    onClick={handleSubmit}
    disabled={loading}
    className={`bg-[#88AE98] hover:bg-[#729781] text-white w-full py-2.5 rounded-lg shadow-md flex items-center justify-center ${
      loading ? "opacity-60 cursor-not-allowed" : ""
    }`}
  >
    {loading ? (
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <span>{isEdit ? "Updating..." : "Creating..."}</span>
      </div>
    ) : (
      <span>{isEdit ? "Update" : "Create"}</span>
    )}
  </button>
</form>

  );
}

function ConfirmModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center animate-fade-in">
        <h2 className="text-xl font-semibold text-gray-800">Are you sure?</h2>
        <p className="text-gray-500 mt-2">This action cannot be undone.</p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

