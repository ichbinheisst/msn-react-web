import React from "react";
function Image({ blob, fileName }) {
  const [imageSrc, setImageSrc] = React.useState("");
  React.useEffect(() => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      setImageSrc(reader.result);
    };
  }, [blob]);
  return (
    <img
      style={{ maxHeight: "350px", maxWidth: "280px" }}
      src={imageSrc}
      alt={fileName}
    />
  );
}

export default Image;
