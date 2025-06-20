import React from 'react';
import Table from '../Components/Table';


const Logs = () => {
  const [logs, setLogs] = React.useState([]);
  const baseUrl = import.meta.env.VITE_BACKEND_URL || "https://localhost:7161";

  React.useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/logs`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setLogs(data);
          console.log("Logs fetched successfully");
        } else {
          console.error("Failed to fetch logs");
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

  return (
    <div>
      <div className='mt-5 p-5'>
        <Table data={logs} title={'Log'} />
      </div>
    </div>
  );
}

export default Logs;
