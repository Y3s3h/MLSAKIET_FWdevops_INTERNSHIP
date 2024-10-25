import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import axios from "axios";
import { setLoading } from "../../redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          // User already exists
          toast.error(
            "User already exists. Please login or use a different email."
          );
        } else {
          // Other error responses
          toast.error(
            data.message || "Something went wrong. Please try again."
          );
        }
      } else if (error.request) {
        toast.error("No response from the server. Please check your network.");
      } else {
        toast.error("An error occurred: " + error.message);
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-400 rounded-md p-4 my-10"
        >
          <h1 className="font bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label>FULL NAME</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={changeEventHandler}
              placeholder="YASH YADAV"
            />
          </div>
          <div className="my-2">
            <Label>EMAIL</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="yy69...@gmail.com"
            />
          </div>
          <div className="my-2">
            <Label>PHONE NUMBER</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="98333XXXXX"
            />
          </div>

          <div className="my-2">
            <Label>PASSWORD</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="XXXXXXXX"
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  style={{
                    appearance: "none",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: input.role === "student" ? "#000" : "#fff",
                    border: "1px solid #000",
                    transition: "background-color 0.1s ease",
                    cursor: "pointer",
                  }}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">STUDENT</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  style={{
                    appearance: "none",
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor:
                      input.role === "recruiter" ? "#000" : "#fff",
                    border: "1px solid #000",
                    transition: "background-color 0.1s ease",
                    cursor: "pointer",
                  }}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">RECRUITER</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              HEY DUDE WAIT....
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Sign Up
            </Button>
          )}
          <span className="text-small">
            Already have an account ?{" "}
            <Link to="/login" className="text-blue-600">
              LOGIN
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
