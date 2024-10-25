import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import CompanyLogo from "./companylogo";

import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // const jobId = "112345";
  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const gap = currentTime - createdAt;
    return Math.floor(gap / (1000 * 24 * 60 * 60));
  };
  return (
    <div className="p-5 rounded-md shadow-3xl bg-white border border-gray-400">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Avatar>
          <AvatarImage src={job?.company?.logo} />
        </Avatar>

        <div>
          <h2 className="font-bold">{job?.company?.name}</h2>
          <p className="text-md text-gray-600">India</p>
        </div>
      </div>

      <div>
        <div>
          <h2 className="font-bold text-lg my-2">{job?.title}</h2>
          <p className="text-sm text-gray-600">{job?.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex item-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
