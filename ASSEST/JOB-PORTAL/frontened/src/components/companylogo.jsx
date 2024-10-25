import React from "react";
// import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
// Avatar Image component
const AvatarImage = ({ src }) => {
  return (
    <img
      src={src}
      alt="Avatar"
      style={{
        width: "60px",
        height: "60px",
        borderRadius: "50%", // Circular shape
        objectFit: "contain", // Keep the image within bounds
        border: "0.1px solid rgba(0,0,0,0.2)", // Optional: Border around the image
        backgroundColor: "#fff", // White background
      }}
    />
  );
};

// Avatar component
const Avatar = ({ children }) => {
  return (
    <div
    // style={{
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "center",
    // }}
    >
      {children}
    </div>
  );
};

// Main App component
const CompanyLogo = () => {
  return (
    <Avatar>
      <AvatarImage src="https://www.shutterstock.com/shutterstock/photos/2174926871/display_1500/stock-vector-circle-line-simple-design-logo-blue-format-jpg-png-eps-2174926871.jpg" />
    </Avatar>
  );
};

export default CompanyLogo;
