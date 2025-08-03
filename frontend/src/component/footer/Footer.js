import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SiAppstore, SiGoogleplay } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-20 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        <div>
          <h3 className="font-bold mb-4">COLLECTIONS</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Titan Automatics</li>
            <li>Police Batman</li>
            <li>Stellar</li>
            <li>Raga Power Pearls</li>
            <li>Nebula Jewels</li>
            <li>Grandmaster</li>
            <li>Maritime</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Payment Options</li>
            <li>Track Order</li>
            <li>Encircle Program</li>
            <li>Find Titan World Stores</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">CONTACT US</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>1800-266-0123</li>
            <li>customercare@titan.co.in</li>
            <li>Help & Contact</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">ABOUT TITAN</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Brand Protection</li>
            <li>Corporate</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Download Titan World App</h3>
          <div className="flex gap-2 mb-6">
            <button className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2 text-xs">
              <SiAppstore className="text-xl" /> App Store
            </button>
            <button className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2 text-xs">
              <SiGoogleplay className="text-xl" /> Google Play
            </button>
          </div>

          <h3 className="font-bold mb-2">Follow Us With</h3>
          <div className="flex gap-4 text-xl text-gray-400 mb-6">
            <FaFacebookF className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>

          <div className="mb-4">
            <span className="font-semibold">Want Help?</span>{" "}
            <a href="/no" className="text-blue-400 underline">Click Here</a> To Chat With Us On
            <span className="ml-2 w-6 h-6 rounded-full bg-slate-700 text-black items-center justify-center">💬</span>
          </div>

          <div className="text-sm">
            <p className="mb-1">Operating Hours: 10:00AM To 10:00PM</p>
            <p>Monday To Sunday</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © 2025 Titan Company Limited. All Rights Reserved. |
        <span className="mx-2">Terms & Conditions</span> |
        <span className="mx-2">Privacy Policy</span> |
        <span className="mx-2">Wearable Privacy Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
