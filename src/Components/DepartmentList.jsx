import { useEffect, useState } from "react";
import FetchData from "../Utils/FetchData";
import { Card } from "../ui/card";


const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true)
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "https://localhost:7161";

    const fetchDepartments = async () => {
        try{
        const data = await FetchData(`${baseUrl}/api/departments`);
        setDepartments(data);
    }finally{
        setLoading(false);
    }

    }
    useEffect(() => {
        const fetchData = async () => {
            await fetchDepartments();
        }
        fetchData();
    }, []);


    return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Departments</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : departments.length === 0 ? (
        <p className="text-gray-500">No Departments found.</p>
      ) : (
        <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border border-gray-300">Name</th>
                <th className="p-3 border border-gray-300">Description</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">
                    {dept.name}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {dept.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      )}
    </div>
  );
};

export default DepartmentList;