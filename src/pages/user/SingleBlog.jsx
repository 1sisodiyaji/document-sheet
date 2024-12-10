import React from "react";
import { useParams } from "react-router-dom"; // Import useParams hook
import Blogs from "../../data/Blogs"; 
import { Link } from "react-router-dom";
import CopyLink from "../../components/common/CopyLink";
import WhatsAppShare from "../../components/common/WhatsAppShare";

const SingleBlog = () => {
  const { slug } = useParams();  
  const blog = Blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-24 flex md:flex-row flex-col">
      <div className="p-4 md:w-2/3">
        <div className="flex gap-2">
          <h1 className="md:text-3xl text-lg font-semibold mb-4 overflow-y-hidden">{blog.title}</h1>

          <div className="flex flex-col justify-center items-center md:w-24">
            <CopyLink slug={blog.slug} />
            <WhatsAppShare slug={blog.slug} />
          </div>
        </div>

        <img
          src={blog.image}
          alt={blog.title}
          width={800}
          height={400}
          className="rounded-lg mb-4"
        />
        <p className="text-gray-600 md:text-lg text-sm leading-relaxed">
          {blog.description}
        </p>
      </div>

      <div className="md:w-1/3 w-full md:p-0 p-4">
        <h2 className="text-xl font-bold mb-4">Related Articles</h2>
        {Blogs.filter((b) => b.slug !== slug)
          .slice(0, 5)
          .map((relatedBlog, index) => (
            <div
              key={index}
              className="mb-4 border p-4 border-gray-200 rounded-lg"
            >
              <Link to={`/resources/${relatedBlog.slug}`}>
                <h3 className="text-sm font-semibold text-gray-800">
                  {relatedBlog.title}
                </h3>{" "}
              </Link>
              <p className="text-gray-600 text-sm">
                {relatedBlog.description.split(" ").slice(0, 20).join(" ")}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SingleBlog;
