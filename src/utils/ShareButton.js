import React from 'react';
import toast from 'react-hot-toast';

export const handleCopyText = (url) => {
  navigator.clipboard
    .writeText(url)
    .then(() => toast.success("Link Copied Successfully"))
    .catch((err) => console.error("Failed to copy: ", err));
};

export const handleShareWhatsApp = (url) => {
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
  window.open(whatsappUrl, "_blank");
};

export const handleShareFacebook = (url) => {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  window.open(facebookUrl, "_blank");
};

const ShareButton = ({ url }) => {
  return (
    <div className="relative">
      <div tabIndex={0} role="button" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
        <i className="fi fi-sr-share text-gray-600"></i>
      </div>

      <ul
        tabIndex={0}
        className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg text-sm w-36"
      >
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800"
          onClick={() => handleCopyText(url)}
        >
          Copy
        </li>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800"
          onClick={() => handleShareWhatsApp(url)}
        >
          WhatsApp
        </li>
        <li
          className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800"
          onClick={() => handleShareFacebook(url)} 
        >
          Facebook
        </li>
      </ul>
    </div>
  );
};

export default ShareButton;
