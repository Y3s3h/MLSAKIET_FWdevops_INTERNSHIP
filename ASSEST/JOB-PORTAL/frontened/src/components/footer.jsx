import React from "react";
import { Instagram, Linkedin, Twitter, Github } from "lucide-react"; // assuming Lucide React is being used for icons

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-6">
      <div className="container mx-auto px-4">
        {/* Social Media Section */}
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://www.instagram.com/itz_yash_here730?igsh=YXkyNnJycmQxb3Jy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <Instagram />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-yadav-094b0027b"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <Linkedin />
          </a>
          {/* <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <Twitter />
          </a> */}
          <a
            href="https://github.com/Y3s3h"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <Github />
          </a>
        </div>

        {/* Footer Links Section */}
        {/* <div className="flex justify-center space-x-6 mb-4">
          <a href="/about" className="hover:text-gray-400">
            About Us
          </a>
          <a href="/contact" className="hover:text-gray-400">
            Contact
          </a>
          <a href="/privacy" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-gray-400">
            Terms of Service
          </a>
        </div> */}

        {/* Copyright Section */}
        <div className="text-center text-sm">
          © {new Date().getFullYear()} Job Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
