import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { getSearchDetails } from "../services";
import { QAContext } from "../QAContext";

interface Props {}

export const SearchField = (props: Props) => {
  const { dispatch } = useContext(QAContext);
  const [SearchData, setSearchData] = useState("");
  const [Choice, setChoice] = useState("");
  

  const getdropdrownValue = (e: any) => {
    setChoice(e.target.value);
  };
  const myChangeHandler = (e: any) => {
    setSearchData(e.target.value);
  };
  const handleSearch = async () => {
    if(SearchData!=="")
  await getSearchDetails(SearchData, Choice, dispatch);
    else
    dispatch({ type: "clearSearch" });
  };
  return (
    <>
      <form id="searchName" className="form-inline searchForm">
        <select onClick={getdropdrownValue} className="dropDown">
          <option value="" selected disabled>
            Search By
          </option>
          <option value="category">Category</option>
          <option value="text">Text</option>
        </select>
        <input
          type="search"
          placeholder="search"
          onChange={myChangeHandler}
          className="form-control searchBar"
        ></input>
        <button className="searchBtn" type="button" onClick={handleSearch}>
          Search
        </button>
      </form>
    </>
  );
};
