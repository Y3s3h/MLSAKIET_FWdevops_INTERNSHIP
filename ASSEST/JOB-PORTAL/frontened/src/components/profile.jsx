import React, { useState } from "react";
import Navbar from "./shared/navbar";
// import { Avatar, AvatarImage } from "./ui/avatar";
import CompanyLogo from "./companylogo";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialogue from "./UpdateProfileDialogue";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJob";

// const skills = ["React", "Node.js", "MongoDb", "Express"];
const isResume = true;
const Profile = () => {
  useGetAppliedJobs();
  // const isResume = true;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-400 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-6">
            <CompanyLogo className=" h-24 w-14" />
            <div className="">
              {" "}
              <h2 className="font-medium text-xl">{user?.fullName}</h2>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            {" "}
            <Pen />
          </Button>
        </div>

        <div className=" mt-4">
          <div className="flex items-center gap-3 my-3">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div>
          <h2 className="font-md text-xl">Skills</h2>

          <div className="flex items-center gap-1 my-1">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>Not Applicable</span>
            )}
          </div>
        </div>

        <div className="grid w-full mx-w-sm items-center gap-1 my-4">
          <label className="text-md font-bold ">Resume</label>

          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>Not Applicable</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h2 className="font-bold text-xl my-5">Applied Jobs</h2>

        <div className="w-full mx-0 text-left">
          <AppliedJobTable />
        </div>
      </div>

      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
