import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/navbar";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Home from "./components/home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetUp from "./components/admin/CompanySetUp";
import AdminJobs from "./components/admin/AdminJobs";
import PostJobs from "./components/admin/postJobs";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Define your routes and the components for them
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> {/* Navbar should be rendered within the route */}
        <Home />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        {/* <Navbar /> */}
        <Login />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        {/* <Navbar /> */}
        <Signup />
      </>
    ),
  },
  {
    path: "/jobs",
    element: (
      <>
        {/* <Navbar /> */}
        <Jobs />
      </>
    ),
  },
  {
    path: "/browse",
    element: (
      <>
        {/* <Navbar /> */}
        <Browse />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        {/* <Navbar /> */}
        <Profile />
      </>
    ),
  },
  {
    path: "/description/:id",
    element: (
      <>
        {/* <Navbar /> */}
        <JobDescription />
      </>
    ),
  },
  ////for adminssss
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetUp />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    // Ensure Navbar is rendered inside RouterProvider, within the routes
    <RouterProvider router={appRouter} />
  );
}

export default App;
