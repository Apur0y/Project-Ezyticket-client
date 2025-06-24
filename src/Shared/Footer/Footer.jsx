import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import useAuth from "../../Hooks/useAuth";

const Footer = () => {
  const { darkMode } = useAuth();

  return (
    <footer className={`w-full bg-[#1b1b1b] text-white pt-10`}>
      {/* Subscription Section */}
      <div className="w-full flex justify-center px-4">
        <div className="w-full max-w-5xl bg-white rounded-lg p-6 shadow-lg flex flex-col md:flex-row items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Subscribe to our news</h2>
          <div className="flex flex-1 w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 text-gray-700 px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
            />
            <button className="ezy-button-primary-sm">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="w-full flex justify-center px-4 mt-12">
        <div className="w-full max-w-6xl flex flex-wrap justify-between gap-10 text-sm">
          {/* Brand & Social */}
          <div className="flex flex-col gap-4 min-w-[220px]">
            <h4 className="text-xl font-bold">EZY Ticket</h4>
            <p className="t0">
              Book smarter, travel easier, and explore unforgettable experiences.
            </p>
            <div className="flex gap-4 text-xl">
              <Link className="text-main hover:scale-110 transition-transform"><FaFacebookF /></Link>
              <Link className="text-main hover:scale-110 transition-transform"><FaTwitter /></Link>
              <Link className="text-main hover:scale-110 transition-transform"><FaInstagram /></Link>
              <Link className="text-main hover:scale-110 transition-transform"><FaLinkedinIn /></Link>
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-2 min-w-[150px]">
            <h4 className="font-semibold text-white mb-2">RESOURCES</h4>
            <Link to="/application">Application</Link>
            <Link to="/documentation">Documentation</Link>
            <Link to="/systems">Systems</Link>
            <Link to="/faq">FAQ</Link>
          </div>

          {/* Pricing */}
          

          {/* Company */}
          <div className="flex flex-col gap-2 min-w-[150px]">
            <h4 className="font-semibold text-white mb-2">COMPANY</h4>
            <Link to="/about">About Us</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/partnerships">Partnerships</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/press">Press</Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3 min-w-[200px]">
            <h4 className="font-semibold text-white mb-2">CONTACT</h4>
            <div className="flex items-center gap-2"><FaLocationDot className="text-main" /> Dhaka, Bangladesh</div>
            <div className="flex items-center gap-2"><IoMdMail className="text-main" /> support@ezyticket.com</div>
            <div className="flex items-center gap-2"><FaPhone className="text-main" /> +880 19856 458656</div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="w-full text-center text-sm text-gray-400 mt-12 py-6 border-t border-gray-700">
        &copy; {new Date().getFullYear()} EZY Ticket. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
