const FetchData = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetched successfully");
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export default FetchData;