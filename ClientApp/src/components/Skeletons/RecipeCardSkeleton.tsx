import { Card, Skeleton, Stack } from "@mui/material";

const RecipeCardSkeleton = () => {
  return (
    <Card
      sx={{
        width: 350,
        margin: 2,
        height: "fit-content",
      }}
    >
      <Stack spacing={1} paddingTop={1}>
        <Skeleton
          variant="text"
          sx={{ margin: "0px 12px !important" }}
          width="80%"
        />
        <Skeleton variant="rectangular" height={194} />
        <Skeleton
          variant="circular"
          width={24}
          height={24}
          sx={{ margin: "12px !important" }}
        />
      </Stack>
    </Card>
  );
};

export default RecipeCardSkeleton;
