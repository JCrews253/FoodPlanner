import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface ImageStackProps {
  images: string[];
}

const ImageStack = ({ images }: ImageStackProps) => {
  const [multiplier, setMultiplier] = useState(5);
  const [showDialog, setShowDialog] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleClose = () => {
    setShowDialog(false);
    setImageIndex(0);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "320px",
          height: "220px",
          cursor: "pointer",
        }}
        id="image-stack"
        onMouseEnter={() => setMultiplier(8)}
        onMouseLeave={() => setMultiplier(5)}
        onClick={() => setShowDialog(true)}
      >
        {images.map((image, idx) => {
          if (idx < 3) {
            return (
              <Box
                component="img"
                src={image}
                alt=""
                sx={{
                  position: "absolute",
                  transform: `rotate(${multiplier * idx}deg)`,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "16px",
                  zIndex: 10 - idx,
                  transitionDuration: "300ms",
                }}
              />
            );
          } else {
            return null;
          }
        })}
      </Box>
      <Dialog open={showDialog} onClose={handleClose} maxWidth="lg">
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              onClick={() => {
                if (imageIndex === 0) {
                  setImageIndex(images.length - 1);
                } else {
                  setImageIndex(imageIndex - 1);
                }
              }}
            >
              <ArrowForwardIosIcon sx={{ transform: "rotate(-180deg)" }} />
            </IconButton>
            <Box
              component="img"
              src={images[imageIndex]}
              sx={{ objectFit: "contain" }}
            ></Box>
            <IconButton
              onClick={() => {
                if (imageIndex === images.length - 1) {
                  setImageIndex(0);
                } else {
                  setImageIndex(imageIndex + 1);
                }
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageStack;
