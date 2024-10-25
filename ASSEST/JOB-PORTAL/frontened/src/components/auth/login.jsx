import React, { useEffect, useState } from "react";
import Navbar from "../shared/navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [welcomeBack, setWelcomeBack] = useState(false);

  const navigate = useNavigate();
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const previousLogin = localStorage.getItem("isLoggedIn");
    if (previousLogin) {
      setWelcomeBack(true); // User has logged in before
    }
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        localStorage.setItem("isLoggedIn", true);
        toast.success(res.data.message);
        if (welcomeBack) {
          toast.success("Welcome back!");
        } else {
          toast.success("Login successful!");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed! Please check your credentials.");
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
          <h1 className="font bold text-xl mb-5">Login</h1>

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
                  className="cursor-pointer"
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
                  className="cursor-pointer"
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
                />
                <Label htmlFor="r2">RECRUITER</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              WAIT....
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}

          <span className="text-small">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
