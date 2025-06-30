import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import CreateCategory from "../Pages/CreateCategory";
import Button from "../Props/Button";
import CategoryList from "./CategoryList";

const Category = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <Button
          label="New Category"
          onClick={() => setOpen(true)}
          className="border rounded-xl w-40 cursor-pointer hover:bg-green-700 bg-green-500 p-3"
        />
        <CreateCategory
          open={open}
          onClose={() => setOpen(false)}
          onUserCreated={() => toast.success("User created!")}
        />
      </div>
      <div className="mt-2">
        <CategoryList />
      </div>
      <Outlet />
    </>
  );
};

export default Category;
