import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
  return (
    <div className="w-full text-left">
      {" "}
      {/* Ensures the table aligns to the left */}
      <Table>
        <TableCaption>A list of Applied jobs.</TableCaption>{" "}
        {/* Only used for table description */}
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAppliedJobs || allAppliedJobs.length <= 0 ? (
            <span> You Didn't Apply any job till yet !!!</span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob?.id}>
                <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job.title}</TableCell>
                <TableCell>{appliedJob.job.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400 "
                        : appliedJob.status === "pending"
                        ? "bg-gray-500"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
