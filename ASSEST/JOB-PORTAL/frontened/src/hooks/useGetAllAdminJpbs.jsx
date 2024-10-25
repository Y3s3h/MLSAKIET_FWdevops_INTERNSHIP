import axios from "axios";
import React, { useEffect } from "react";
import { Job_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "../redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${Job_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data); // Log the entire response
        if (!res.data.jobs || res.data.jobs.length === 0) {
          console.log("Jobs Not Found");
          return; // You can also handle state or display a message if desired
        }
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
