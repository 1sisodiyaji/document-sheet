const WhatsAppShare = ({ slug }) => {
  const handleWhatsAppShare = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/resources/${slug}`;
      const encodedMessage = encodeURIComponent(url);
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <i
      className="fi fi-brands-whatsapp text-xl cursor-pointer"
      onClick={handleWhatsAppShare}
    ></i>
  );
};

export default WhatsAppShare;
