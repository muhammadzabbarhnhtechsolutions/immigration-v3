"use client";

import React, { useEffect, useRef, useState } from "react";
import { Pencil, Trash2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  CreateBuisnessAccount,
  DeleteBusinessAccount,
  getBuisnessAccount,
  UpdateBuisnessAccount,
} from "../../../services/buisnessAccount";
import { toast } from "react-toastify";

/* ─────────────────────── MAIN PAGE ─────────────────────── */
export default function BusinessAccounts() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const data = await getBuisnessAccount(router);
    setUsers(data?.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 md:px-8">
      {/* ── Top Bar ── */}
      <div className="flex flex-col sm:flex-row justify-center md:justify-between items-center md:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#3D61AB] mt-4">
          Business Accounts
        </h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#3D61AB] hover:bg-[#4168b4] text-white px-5 py-2.5 rounded-full shadow-md transition"
        >
          Add Business Account
        </button>
      </div>

      {/* ── Content ── */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {users.map((u) => (
            <AccountCard
              key={u.id}
              user={u}
              onEdit={() => { setEditUser(u); setShowEditModal(true); }}
              onDelete={() => setConfirmDeleteId(u.id)}
            />
          ))}
        </div>
      )}

      {/* ── Modals ── */}
      {showAddModal && (
        <Modal title="Add Business Account" onClose={() => setShowAddModal(false)}>
          <AccountForm mode="add" onClose={() => setShowAddModal(false)} refresh={fetchData} />
        </Modal>
      )}
      {showEditModal && (
        <Modal title="Edit Business Account" onClose={() => setShowEditModal(false)}>
          <AccountForm
            mode="edit"
            data={editUser}
            onClose={() => setShowEditModal(false)}
            refresh={fetchData}
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

/* ─────────────────────── COMPONENTS ─────────────────────── */

const LoadingSpinner = () => (
  <div className="mt-16 flex flex-col items-center gap-4 text-[#3D61AB]">
    <div className="h-10 w-10 border-4 border-current border-t-transparent rounded-full animate-spin"/>
    <p className="text-lg font-medium">Loading&nbsp;Accounts…</p>
  </div>
);

const AccountCard = ({ user, onEdit, onDelete }) => (
  <div className="relative bg-white rounded-3xl mt-12 p-6 pt-16 shadow-md hover:shadow-xl border border-gray-100 transition hover:-translate-y-1">
    {/* Action Icons */}
    <div className="absolute top-4 right-4 flex items-center gap-2 flex-wrap">
      <IconBtn icon={Pencil} onClick={onEdit} color="blue" />
      <IconBtn icon={Trash2} onClick={onDelete} color="red" />
    </div>

    {/* Avatar */}
    <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-[#3D61AB] to-[#4168b4] p-[3px] rounded-full">
      <img src={user.profile} className="w-28 h-28 rounded-full object-cover border-4 border-white" />
    </div>

    {/* Info */}
    <div className="mt-6 text-center">
      <p className="text-lg md:text-[21px] font-bold text-[#4168b4]">
        {user.first_name} {user.last_name}
      </p>
      <p className="text-gray-500">{user.email}</p>
    </div>
  </div>
);

const IconBtn = ({ icon: Icon, onClick, color }) => {
  const base = "w-8 h-8 p-1 rounded-lg border cursor-pointer transition hover:scale-110";
  const colors = color === "blue"
    ? "bg-blue-100 text-[#7aad90] hover:text-[#4CAF50]"
    : "bg-red-100 text-red-500 hover:text-red-700";
  return <Icon className={`${base} ${colors}`} onClick={onClick} />;
};

/* ── Generic Modal Wrapper ── */
const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-[100] bg-black/5 flex items-center justify-center px-4">
  <div className="w-[99%] max-w-md bg-white rounded-2xl mt-28 md:mt-1 shadow-xl p-6 max-h-[79vh] md:max-h-[99vh] overflow-y-auto scroll-hidden relative">
    <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500" onClick={onClose}>
      <X />
    </button>
    <h2 className="text-2xl font-bold mb-4 text-[#3D61AB]">{title}</h2>
    {children}
  </div>
</div>

);

/* ── Account Form (Add / Edit) ── */
function AccountForm({ mode, data = {}, onClose, refresh }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [first, setFirst]   = useState(data.first_name || "");
  const [last, setLast]     = useState(data.last_name  || "");
  const [email, setEmail]   = useState(data.email      || "");
  const [pass, setPass]     = useState("");
  const [image, setImage]   = useState(null);
  const [preview, setPreview]=useState(data.profile || "");
  const fileRef = useRef(null);

  /* image select / drop */
  const readFile = (file)=>{
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const onInput = e => e.target.files[0] && readFile(e.target.files[0]);
  const onDrop  = e => {e.preventDefault(); readFile(e.dataTransfer.files[0]);};

  const submit = async () => {
    if(!first||!last||!email||(mode==="add"&&!pass)){
      toast.error("All fields required"); return;
    }
    setLoading(true);
    try{
      if(mode==="add"){
        await CreateBuisnessAccount(router,{first_name:first,last_name:last,email,password:pass,profile:image});
      }else{
        const isFile = image instanceof File;
        await UpdateBuisnessAccount(router,{id:data.id,first_name:first,last_name:last,email, ...(isFile&&{profile:image})},isFile);
      }
      await refresh();
      onClose();
    }finally{setLoading(false);}
  };

  return (
    <form className="space-y-3">
      <FormInput label="First Name" value={first} setValue={setFirst}/>
      <FormInput label="Last Name"  value={last}  setValue={setLast}/>
      <FormInput label="Email"      value={email} setValue={setEmail} type="email"/>
      {mode==="add" && <FormInput label="Password" value={pass} setValue={setPass} type="password"/>}

      {/* Image uploader */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition ${image?"border-[#3D61AB] bg-blue-50":"border-gray-300"}`}
        onDrop={onDrop}
        onDragOver={e=>e.preventDefault()}
      >
        <Upload className="w-8 h-8 text-[#3D61AB] mx-auto mb-2"/>
        <p className="text-sm font-semibold text-gray-700">
          Drag & drop or <span className="text-[#4168b4] underline cursor-pointer" onClick={()=>fileRef.current?.click()}>Browse</span>
        </p>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onInput}/>
      </div>

      {preview && (
        <div className="flex items-center gap-3 mt-3">
          <img src={preview} className="h-16 w-16 rounded-lg object-cover border"/>
          <span className="text-sm text-gray-700 font-medium truncate max-w-[150px]">{image?.name || "Current Image"}</span>
        </div>
      )}

      <button type="button" onClick={submit} disabled={loading}
        className={`w-full py-2.5 rounded-lg text-white bg-[#3D61AB] hover:bg-[#4168b4] shadow-md flex justify-center ${loading&&"opacity-60 cursor-not-allowed"}`}>
        {loading ? <Spinner label={mode==="add"?"Creating…":"Updating…"} /> : (mode==="add"?"Create":"Update")}
      </button>
    </form>
  );
}

/* Helpers */
const FormInput = ({label,value,setValue,type="text"})=>(
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input type={type} value={value} onChange={e=>setValue(e.target.value)}
      className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D61AB]"/>
  </div>
);
const Spinner = ({label})=>(
  <div className="flex items-center gap-2">
    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>
    <span>{label}</span>
  </div>
);

/* ── Confirmation ── */
const ConfirmModal = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-800">Are you sure?</h2>
      <p className="text-gray-500 mt-2">This action cannot be undone.</p>
      <div className="mt-6 flex justify-center gap-4">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 shadow">
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
);
