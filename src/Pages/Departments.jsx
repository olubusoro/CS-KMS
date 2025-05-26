import React, {useState} from 'react';
import { Outlet} from 'react-router-dom';
import CreateDepartment from '../Components/CreateDepartment';
import Button from '../Props/Button';



const Departments = () => {
    const [open, setOpen] = useState(false);

    
  return (
    <>
    <div>
      <Button
      label="New Department"
      onClick={() => setOpen(true)}
      className='border rounded-xl w-40 cursor-pointer bg-green-500 p-3'
      />
      <CreateDepartment
        open={open}
        onClose={() => setOpen(false)}
        onUserCreated={() => console.log("User created!")}
        />
    </div>
     <Outlet />
    </>
  );
}

export default Departments;