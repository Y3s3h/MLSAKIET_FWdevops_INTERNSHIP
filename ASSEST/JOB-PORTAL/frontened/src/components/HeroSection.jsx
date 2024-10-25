import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <span className="px-4 py-2 rounded-full bg-gray-300 text-[#F83002] font-medium">
        No.1 Job Hunt Website
      </span>
      <h1 className="text-5xl font-bold my-5">
        Search , Apply & <br /> Get Your{" "}
        <span className="text-[#6A38C2]">Dream Jobs</span>
      </h1>
      <p>
        Come here and apply jobs , get your dream fullfilled and make your life
        an brighter one....
      </p>

      <div className="flex w-[40%] shadow-lg border border-gray-300 pl-3 rounded-full items-center mx-auto my-4 gap-4">
        <input
          type="text"
          placeholder="Find your dream jobs"
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none border-none text-[#6A38C2] bg-gray-500 bg-opacity-0 w-full px-4 py-2"
        />

        <Button
          onClick={searchJobHandler}
          className="rounded-r-full bg-[#6A38C2]"
        >
          <Search className="h-6 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
