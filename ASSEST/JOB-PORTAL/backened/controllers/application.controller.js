import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;

    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "job id is required",
        success: false,
      });
    }

    //check if user has already appplied for the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "you have already applied for this job",
        success: false,
      });
    }
    //check if the job exists

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    //create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//getting all the applied jobs
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "no applications",
        success: false,
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//admin dekega kitne user ne appply kiya hai
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// updation whether he is selected or not selected......

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "status is required",
        success: false,
      });
    }
    //find apploication by applicantionid
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "application not found",
        success: false,
      });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "status updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// import { Application } from "../models/application.model.js";
// import { Job } from "../models/job.model.js";
// import mongoose from "mongoose";

// export const applyJob = async (req, res) => {
//   try {
//     const userId = req.id;
//     const jobId = req.params.id;

//     if (!jobId) {
//       return res.status(400).json({
//         message: "job id is required",
//         success: false,
//       });
//     }

//     // Check if user has already applied for the job
//     const existingApplication = await Application.findOne({
//       job: jobId,
//       applicant: userId,
//     });
//     if (existingApplication) {
//       return res.status(400).json({
//         message: "you have already applied for this job",
//         success: false,
//       });
//     }

//     // Check if the job exists
//     const job = await Job.findById(jobId);
//     console.log("Fetched job:", job); // Log the fetched job
//     if (!job) {
//       return res.status(404).json({
//         message: "job not found",
//         success: false,
//       });
//     }

//     // Create new application
//     const newApplication = await Application.create({
//       job: jobId,
//       applicant: userId,
//     });

//     job.applications.push(newApplication._id);
//     await job.save();

//     return res.status(201).json({
//       message: "job applied successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error applying for job:", error);
//     return res.status(500).json({
//       message: "Server error",
//       success: false,
//     });
//   }
// };

// export const getAppliedJobs = async (req, res) => {
//   try {
//     const userId = req.id;
//     const application = await Application.find({ applicant: userId })
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "job",
//         populate: { path: "company",options:{sort:{createdAt:-1}} },
//       });

//     if (!application || applications.length === 0) {
//       return res.status(404).json({
//         message: "no applications",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       application,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error getting applied jobs:", error);
//     return res.status(500).json({
//       message: "Server error",
//       success: false,
//     });
//   }
// };

// export const getApplicants = async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const job = await Job.findById(jobId).populate({
//       path: "applications",
//       populate: { path: "applicant" },
//     });

//     if (!job) {
//       return res.status(404).json({
//         message: "job not found",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       job,
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error getting applicants:", error);
//     return res.status(500).json({
//       message: "Server error",
//       success: false,
//     });
//   }
// };

// export const updateStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const applicationId = req.params.id;

//     if (!status) {
//       return res.status(400).json({
//         message: "status is required",
//         success: false,
//       });
//     }

//     const application = await Application.findById(applicationId);
//     if (!application) {
//       return res.status(404).json({
//         message: "application not found",
//         success: false,
//       });
//     }

//     // Update the status
//     application.status = status.toLowerCase();
//     await application.save();

//     return res.status(200).json({
//       message: "status updated",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Error updating status:", error);
//     return res.status(500).json({
//       message: "Server error",
//       success: false,
//     });
//   }
// };
