import axios from "axios";
import React, { useEffect } from "react";
import { Job_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setAllJobs, setSingleJob } from "../redux/jobSlice";

const useGetSingleJob = (jobId) => {
  const dispatch = useDispatch();
};

export default useGetSingleJob;
