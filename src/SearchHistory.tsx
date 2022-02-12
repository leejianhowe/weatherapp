import React from "react";
import { FormState, SearchHistoryItem } from "./types";

interface Props {
  search: (data: FormState) => void;
  delete: (time: number) => void;
  searchHistory: SearchHistoryItem[];
}
function SearchHistory(props: Props) {
  return (
    <div className="mb-2">
      <h3>Search History</h3>
      <hr />
      <div>
        {props.searchHistory.length > 0 ? (
          props.searchHistory.map((ele) => {
            return (
              <div
                key={ele.time}
                className="d-flex justify-content-between mt-2"
              >
                <div>
                  {ele.city}, {ele.country}
                </div>
                <div>
                  <span className="mr-2">
                    {new Date(ele.time).toLocaleString("en-GB", {
                      timeStyle: "medium",
                      dateStyle: "short",
                      hourCycle: "h12",
                    })}
                  </span>
                  <span
                    className="mr-2"
                    onClick={() =>
                      props.search({ city: ele.city, country: ele.country })
                    }
                  >
                    <i className="bi bi-search"></i>
                  </span>
                  <span onClick={() => props.delete(ele.time)}>
                    <i className="bi bi-trash"></i>
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center">
            <span style={{ color: "grey" }}>No Records</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchHistory;
