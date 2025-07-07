import { Table, TableHeader, TableHeaderCell, TableRow, TableCell, TableBody } from "./ui/table";
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/Card";
import { Modal } from "./ui/modal";
import FetchData from "../Utils/FetchData";
import toast from "react-hot-toast";
import DeleteModal from "./DeleteDialogModal";
import { BiRotateLeft } from "react-icons/bi";
import { FaEdit, FaTrash } from "react-icons/fa";

const Roles = {
    "Staff": { name: "Staff", value: 0 },
    "DeptAdmin": { name: "Department Admin", value: 1 },
    "SuperAdmin": { name: "Super Admin", value: 2 },
};

const UserTable = ({ users, onUserUpdate }) => {
    const [selected, setSelected] = useState(null);
    const [editForm, setEditForm] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [passwordResetModal, setPasswordResetModal] = useState(false);
    const [passwordResetUserId, setPasswordResetUserId] = useState(null);
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "https://localhost:7161";

    const fetchDepartments = async () => {
        try {
            const data = await FetchData(`${baseUrl}/api/departments`);
            setDepartments(data);
            return data; 
        } catch (err) {
            console.error("Error fetching departments: ", err);
            return [];
        }
    };

    const handleEdit = async (user) => {
        const fetchedDepartments = await fetchDepartments();
        let userDepartments = user.departments;
        // If userDepartments is a string, split to array
        if (typeof userDepartments === "string") {
            userDepartments = userDepartments.split(",").map((d) => d.trim());
        }
        // Map department names to IDs
        const departmentIds = userDepartments
            .map((name) => {
                const found = fetchedDepartments.find((dept) => dept.name === name);
                return found ? found.id : null;
            })
            .filter((id) => id !== null);

        setSelected(user);
        setEditForm({
            id: user.id,
            name: user.name,
            email: user.email,
            role: typeof user.role === "string" && Roles[user.role] ? Roles[user.role].value : user.role,
            departmentIds: departmentIds,
        });
    };

    const handleEditChange = (e) => {
        const { name, value, options, type } = e.target;
        if (name === "departmentIds" && type === "select-multiple") {
            const selectedOptions = Array.from(options)
                .filter((opt) => opt.selected)
                .map((opt) => opt.value);
            setEditForm((prev) => ({
                ...prev,
                departmentIds: selectedOptions.map(Number),
            }));
        } else if (name === "role") {
            setEditForm((prev) => ({
                ...prev,
                role: Number(value), // Convert role to number
            }));
        } else {
            setEditForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleConfirm = async () => {
        // You can handle the update logic here (e.g., API call)
        // For now, just close the modal
        console.log("Edit Form Data: ", editForm);
        try{
            const res = await fetch(`${baseUrl}/api/users`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(editForm),
            });
            const data = await res.json();
            if(res.ok){
                toast(data.message || "user updated successfully");
                console.log(data.message);
                setSelected(null);
                setEditForm(null);
                if (onUserUpdate) onUserUpdate();
            }else{
                toast.error(data.message || "failed to update user");
            }
        }catch(err){
            console.error("failed to update user: ", err);
            toast.error("check your internet connection");
        }
    };

    const handleDelete = async (userId) => {
        try {
            const res = await fetch(`${baseUrl}/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            });
            const data = await res.json();
            if (res.ok) {
                toast(data.message || "User deleted successfully");
                if (onUserUpdate) onUserUpdate();
            } else {
                toast.error(data.message || "Failed to delete user");
            }
        } catch (err) {
            console.error("Failed to delete user: ", err);
            toast.error("Check your internet connection");
        }
    };

    const handlePasswordReset = async (userId) => {
        try {
            const res = await fetch(`${baseUrl}/api/users/${userId}/reset-password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });
            const data = await res.json();
            if(res.ok){
                toast.success(data.message + ", email sent" || "Password reset successfully, email sent");
                setPasswordResetModal(false);
            }else{
                toast.error(data.message || "Failed to reset password");
            }
        }catch (err){
            console.error("Failed to reset password: ", err);
            toast.error("Check your internet connection");
        }
    };

    const headings = () => (<>
                        <TableRow className="px-1 py-1 sm:px-2 sm:py-2 md:px-4 md:py-2 border-b-2 border-gray-200 text-left font-semibold text-gray-700 whitespace-nowrap">
                            <TableHeaderCell>S/N</TableHeaderCell>
                            <TableHeaderCell>Name</TableHeaderCell>
                            <TableHeaderCell>Email</TableHeaderCell>
                            <TableHeaderCell>Role</TableHeaderCell>
                            <TableHeaderCell>Department(s)</TableHeaderCell>
                            <TableHeaderCell>Created</TableHeaderCell>
                            <TableHeaderCell>Actions</TableHeaderCell>
                        </TableRow>
                    </>);

    const rows = users.map((user, idx) => (
        <TableRow key={user.id} className="hover:bg-gray-100 transition-colors duration-200">
            <TableCell className="px-1 py-1 sm:px-2 sm:py-2 md:px-4 md:py-2 border-b border-gray-200 text-gray-700 whitespace-nowrap">{idx + 1}</TableCell>
            <TableCell className="px-1 py-1 sm:px-2 sm:py-2 md:px-4 md:py-2 border-b border-gray-200 text-gray-700 whitespace-nowrap">{user.name}</TableCell>
            <TableCell className="px-1 py-1 sm:px-2 sm:py-2 md:px-4 md:py-2 border-b border-gray-200 text-gray-700 whitespace-nowrap">{user.email}</TableCell>
            <TableCell className="px-1 py-1 sm:px-2 sm:py-2 md:px-4 md:py-2 border-b border-gray-200 text-gray-700 whitespace-nowrap">{user.role}</TableCell>
            <TableCell className="px-1 py-1 sm:px-2 sm:py-2 md:px-4 md:py-2 border-b border-gray-200 text-gray-700 whitespace-nowrap">{user.departments.length > 1 ?user.departments.map((id) => {
                const dept = departments.find((d) => d.id === id);
                return dept ? dept.name : id;
            }).join(", ") : user.departments}</TableCell>
            <TableCell className="px-1 py-1 sm:px-2 sm:py-2 md:px-4 md:py-2 border-b border-gray-200 text-gray-700 whitespace-nowrap">{new Date(user.createdAt).toLocaleString()}</TableCell>
            <TableCell className="px-1 py-1 sm:px-2 sm:py-2 md:px-4 md:py-2 border-b border-gray-200 text-gray-700 whitespace-nowrap flex justify-between">
                <div className="flex items-center space-x-2">
                <Button title="Edit User" className="py-2" variant="primary" onClick={() => handleEdit(user)}><FaEdit className="inline-block" /></Button>
                <DeleteModal buttonTitle={"Delete User"} title="User" onConfirm={() => handleDelete(user.id)} />
                </div>
                <Button title="Reset Password" variant="outline" onClick={() => {setPasswordResetUserId(user.id); setPasswordResetModal(true);}} className=" hover:bg-gray-200" > <BiRotateLeft /></Button>
            </TableCell>
        </TableRow>
    ));

    return (
        <div>
            <Card className="overflow-x-auto w-full">
                <Table className="min-w-full bg-white text-xs sm:text-sm md:text-base">
                    <TableHeader>
                        {headings()}
                    </TableHeader>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </Card>
            {selected && editForm && (
                <Modal isOpen={!!selected} onClose={() => { setSelected(null); setEditForm(null); }}>
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit User</h2>
                        <form className="space-y-4" onSubmit={(e)=> {e.preventDefault()}}>
                            <div>
                                <label className="block text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editForm.name}
                                    onChange={handleEditChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editForm.email}
                                    onChange={handleEditChange}
                                    className="w-full border rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Role</label>
                                <select
                                    name="role"
                                    value={editForm.role}
                                    onChange={handleEditChange}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    <option value={editForm.role} disabled hidden>
                                        {Object.values(Roles).find(r => r.value == editForm.role)?.name || editForm.role}
                                    </option>
                                    {Object.values(Roles)
                                        .filter(roleObj => roleObj.value != editForm.role)
                                        .map((roleObj) => (
                                            <option key={roleObj.value} value={roleObj.value}>
                                                {roleObj.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Departments</label>
                                <select
                                    name="departmentIds"
                                    multiple
                                    value={editForm.departmentIds}
                                    onChange={handleEditChange}
                                    className="w-full border rounded px-3 py-2"
                                >
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="text-xs text-gray-500 mt-1">
                                    Hold Ctrl (Windows) or Cmd (Mac) to select multiple departments.
                                </div>
                            </div>
                            <Button
                                variant="primary"
                                className="w-full mt-4"
                                onClick={handleConfirm}
                            >
                                Confirm
                            </Button>
                        </form>
                    </div>
                </Modal>
            )}
            {passwordResetModal && (
                <Modal isOpen={passwordResetModal} onClose={() => setPasswordResetModal(false)}>
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reset Password</h2>
                        <p className="text-gray-700 mb-4">
                            Are you sure you want to reset the password for this user? This action cannot be undone.
                        </p>
                        <div className="flex justify-around">
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    handlePasswordReset(passwordResetUserId);
                                }}>
                                Reset Password
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setPasswordResetModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default UserTable;