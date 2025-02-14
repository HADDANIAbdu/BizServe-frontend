import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer: React.FC = () => {
  return (
    <footer className="content-footer footer bg-footer-theme ">
      <div className="container-xxl d-flex justify-content-between">
        <div className="mb-0 flex-grow-1 d-flex align-content-center justify-content-around ">
          <h5 className="mb-3">Follow Us</h5>
          <div className="d-flex flex-grow-1 px-5 justify-content-around">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
        <p className="mb-5 flex-grow-1  align-self-center text-center">
          © {new Date().getFullYear()} BizServ. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
