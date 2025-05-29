import React, {useState, useEffect} from 'react';
import { Outlet} from 'react-router-dom';
import CreateUserModal from '../Components/CreateUserModal';
import Button from '../Props/Button';
import Table from '../Components/Table';



const Users = () => {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://localhost:7161/api/users',{
               headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              });
            const data = await response.json();
            setUsers(data);
            console.log("Users fetched successfully");
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    
  return (
    <>
    <div>
      <Button
      label="New User"
      onClick={() => setOpen(true)}
      className='border rounded-xl w-30 cursor-pointer hover:bg-green-700 bg-green-500 p-3'
      />
      <Button
      label="Refresh"
      onClick={fetchUsers}
      className='border ml-2 rounded-xl w-30 cursor-pointer bg-green-500 p-3'/>
      <CreateUserModal
        open={open}
        onClose={() => (setOpen(false), fetchUsers())}  
        onUserCreated={() => console.log("User created!")}
        />
    </div>
    <div className='mt-5 p-5'>
      <Table data={users} title={'User'} />
    </div>
     <Outlet />
    </>
  );
}

export default Users;
