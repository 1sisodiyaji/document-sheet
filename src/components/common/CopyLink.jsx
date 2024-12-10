import { toast } from "react-hot-toast";

const CopyLink = ({ slug }) => {
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/resources/${slug}`;
      navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <i
      className="fi fi-sr-copy-alt text-xl mx-3 cursor-pointer"
      onClick={handleCopyLink}
    ></i>
  );
};

export default CopyLink;
