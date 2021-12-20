import { Box, Divider, Typography } from "@mui/material";
import { RecipeTime } from "../gql";

interface TimeDisplayProps {
  times: RecipeTime[];
}

const TimeDisplay = ({ times }: TimeDisplayProps) => {
  return (
    <Box
      sx={{
        border: "solid 5px #EEEEEE",
        borderRadius: "48px",
        display: "flex",
        padding: "0px 12px",
        height: "60px",
        width: "100%",
        maxWidth: times.length * 215 + 10,
      }}
    >
      {times.map((time, idx) => (
        <>
          {idx !== 0 && (
            <Divider orientation="vertical" sx={{ height: "50px" }} />
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "0px 10px",
              maxWidth: "215px",
              minWidth: "100px",
              flexGrow: 1,
            }}
          >
            <Typography variant="body1">{time.name}</Typography>
            <Typography variant="body1">{time.time}</Typography>
          </Box>
        </>
      ))}
    </Box>
  );
};

export default TimeDisplay;
