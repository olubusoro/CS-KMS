import { useEffect, useState } from "react";
import FetchData from "../Utils/FetchData";


const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true)
    const baseUrl = import.meta.env.VITE_BACKEND_URL || "https://localhost:7161";

    const fetchCategories = async () => {
        try{
        const data = await FetchData(`${baseUrl}/api/categories`);
        setCategories(data);
    }finally{
        setLoading(false);
    }

    }
    useEffect(() => {
        const fetchData = async () => {
            await fetchCategories();
        }
        fetchData();
    }, []);


    return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">No Categories found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border border-gray-300">Name</th>
                <th className="p-3 border border-gray-300">Description</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300">
                    {cat.name}
                  </td>
                  <td className="p-3 border border-gray-300">
                    {cat.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryList;