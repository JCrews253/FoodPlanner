import { Box, Button, styled } from "@mui/material";

interface AddImageProps {
  images: string[];
  setImages: (image: string[]) => void;
}

const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const AddImage = ({ images, setImages }: AddImageProps) => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    (async () => {
      var files = event.currentTarget.files;
      const fileUploadPromises = [];
      if (files) {
        for (let i = 0; i < files.length; i++) {
          fileUploadPromises.push(toBase64(files[i]));
        }
      }
      const fileUploads = await Promise.all(fileUploadPromises);
      setImages(fileUploads);
    })();
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      {images.length > 0 ? (
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
            onClick={() => setImages([])}
          >
            X
          </Box>
          <img src={images[0]} alt="" style={{ maxHeight: "250px" }} />
        </Box>
      ) : (
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={handleUpload}
            multiple
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
