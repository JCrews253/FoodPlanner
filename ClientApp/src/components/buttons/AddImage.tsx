import { Box, Button, styled } from "@mui/material";
import React from "react";

interface AddImageProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

const AddImage = ({ image, setImage }: AddImageProps) => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    var files = event.currentTarget.files;
    if (files && files.length > 0) {
      var file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.onerror = () => console.error("photo upload error");
    }
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {image ? (
        <Box sx={{ position: "relative", width: "fit-content" }}>
          <Box
            sx={{
              position: "absolute",
              top: -12,
              right: -12,
              width: "25px",
              height: "25px",
              backgroundColor: "red",
              borderRadius: "100%",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => setImage(null)}
          >
            X
          </Box>
          <img src={image} alt="" style={{ maxHeight: "250px" }} />
        </Box>
      ) : (
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleUpload}
          />
          <Button variant="contained" component="span" fullWidth>
            Add Image
          </Button>
        </label>
      )}
    </Box>
  );
};

export default AddImage;
