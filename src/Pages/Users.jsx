import React, {useState} from 'react';
import { Outlet} from 'react-router-dom';
import CreateUserModal from '../Components/CreateUserModal';
import Button from '../Props/Button';



const Users = () => {
    const [open, setOpen] = useState(false);

    
  return (
    <>
    <div>
      <Button
      label="New User"
      onClick={() => setOpen(true)}
      className='border rounded-xl w-30 cursor-pointer hover:bg-green-700 bg-green-500 p-3'
      />
      <CreateUserModal
        open={open}
        onClose={() => setOpen(false)}
        onUserCreated={() => console.log("User created!")}
        />
    </div>
     <Outlet />
    </>
  );
}

export default Users;
