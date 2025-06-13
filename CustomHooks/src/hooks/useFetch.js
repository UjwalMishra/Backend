import { useEffect, useState } from "react";

export function useFetch(url, timeOut) {
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  //after every timeout, fetch again
  if (timeOut > 0) {
    useEffect(() => {
      const intervalId = setInterval(fetchData, timeOut * 1000);

      // ✅ Cleanup function
      return () => clearInterval(intervalId);
    }, [timeOut]);
  }

  return {
    data,
    loading,
  };
}
