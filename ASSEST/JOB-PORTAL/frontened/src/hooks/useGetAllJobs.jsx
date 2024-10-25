import axios from "axios";
import React, { useEffect } from "react";
import { Job_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${Job_API_END_POINT}/get?keyword=${searchedQuery}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;

// import axios from "axios";
// import React, { useEffect } from "react";
// import { Job_API_END_POINT } from "@/utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllJobs } from "../redux/jobSlice";

// const useGetAllJobs = () => {
//   const dispatch = useDispatch();
//   const { searchedQuery } = useSelector((store) => store.job);

//   useEffect(() => {
//     const fetchAllJobs = async () => {
//       const token = localStorage.getItem("token"); // Change this to where you store the token

//       try {
//         const res = await axios.get(
//           `${Job_API_END_POINT}/get?keyword=${searchedQuery}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include token in the headers
//             },
//             withCredentials: true,
//           }
//         );

//         if (res.data.success) {
//           dispatch(setAllJobs(res.data.jobs));
//         }
//       } catch (error) {
//         console.error("Error fetching jobs:", error.response.data); // Log error response
//       }
//     };

//     // Only fetch jobs if searchedQuery is not empty
//     if (searchedQuery) {
//       fetchAllJobs();
//     }
//   }, [searchedQuery, dispatch]);
// };

// export default useGetAllJobs;
