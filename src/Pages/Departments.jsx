import React, {useState} from 'react';
import { Outlet} from 'react-router-dom';
import CreateDepartment from '../Components/CreateDepartment';
import Button from '../Props/Button';
import DepartmentList from '../Components/DepartmentList';



const Departments = () => {
    const [open, setOpen] = useState(false);

    
  return (
    <>
    <div>
      <Button
      label="New Department"
      onClick={() => setOpen(true)}
      className='border rounded-xl w-40 cursor-pointer hover:bg-green-700 bg-green-500 p-3'
      />
      <CreateDepartment
        open={open}
        onClose={() => setOpen(false)}
        onUserCreated={() => toast.success("User created!")}
        />
    </div>
    <div className='mt-2'>
      <DepartmentList />
    </div>
     <Outlet />
    </>
  );
}

export default Departments;