 
import React, { useState } from "react"; 
import { Link } from "react-router-dom";
import Blogs from "../../../../data/Blogs";
import CopyLink from "../../../common/CopyLink";
import WhatsAppShare from "../../../common/WhatsAppShare";

const Blog = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);


  const handleShareDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };
  return (
    <>
    <div className="grid md:grid-cols-3 grid-cols-1 gap-10 max-w-7xl mx-auto md:my-24 my-12 md:p-8 p-2">
        {Blogs.map((blog, index) => (
          <div
            key={blog.id}
            className={`relative rounded-lg border border-gray-200 hover:border-orange-300 hover:scale-105 hover:cursor-pointer${
              index === 3 || index === 4 || index === 8 || index === 9
                ? "md:col-span-2"
                : ""
            }`}
          >
            <div>
              <div className="relative">
                <img
                  src={blog.image}
                  width={1000}
                  height={1000}
                  alt={blog.title}
                  className="w-full md:h-48 h-36  transition-all group-hover:scale-95"
                />
              </div>

              {/* Blog Content */}
              <div className="p-4">
                <div className="flex justify-between">
                  <div className="text-sm text-gray-600">{blog.readTime}</div>

                  <div className="z-10">
                    <button
                      onClick={() => handleShareDropdown(blog.id)}
                      className="cursor-pointer"
                    >
                      <i className="fi fi-sr-share-alt-square text-xl"></i>
                    </button>
                    {activeDropdown === blog.id && (
                      <div className="absolute right-4 mt-2 p-2 bg-green-50 shadow-lg rounded-lg"> 
                          <CopyLink slug={blog.slug} />   
                           <WhatsAppShare slug={blog.slug} />  
                      </div>
                    )}
                  </div>
                </div>
                <Link to={`/resources/${blog.slug}`}>
                  <h5 className="mt-2 md:text-lg text-md font-semibold text-gray-900 hover:text-green-600 transition-colors">
                    {blog.title}
                  </h5>
                </Link>
                <p className="text-gray-600 font-light mt-2 md:text-sm text-xs">
                  {blog.description.split(" ").slice(0, 20).join(" ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Blog