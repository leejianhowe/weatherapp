import { useState, useEffect } from "react";

interface SearchItem {
  city: string;
  country: string;
  time: number;
}

function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<SearchItem[]>([]);
  const saveSearch = (city: string, country: string, time: number) => {
    const updatedHistory = [{ city, country, time }, ...searchHistory];
    setSearchHistory(updatedHistory);
    localStorage.setItem("weatherapp", JSON.stringify(updatedHistory));
  };
  const deleteSearchItem = (time: number) => {
    const updatedHistory = searchHistory.filter((ele) => ele.time !== time);
    setSearchHistory(updatedHistory);
    localStorage.setItem("weatherapp", JSON.stringify(updatedHistory));
  };
  useEffect(() => {
    const browserSearchHistory = localStorage.getItem("weatherapp");
    if (browserSearchHistory) {
      setSearchHistory(JSON.parse(browserSearchHistory));
    }
  }, []);

  return { searchHistory, saveSearch, deleteSearchItem };
}

export default useSearchHistory;
