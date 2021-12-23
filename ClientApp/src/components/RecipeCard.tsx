import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { GraphqlClient } from "../clients/GraphqlClient";
import { useSaveRecipeMutation } from "../gql";
import SaveIcon from "@mui/icons-material/BookmarkBorder";
import SavedIcon from "@mui/icons-material/Bookmark";

gql`
  mutation SaveRecipe($recipeId: String!, $saved: Boolean!) {
    saveRecipe(recipeId: $recipeId, saved: $saved)
  }
`;

interface RecipeCardProps {
  id: string;
  name: string;
  photo: string;
  saved: boolean;
  onSave?: () => void;
}

const RecipeCard = ({ id, name, photo, saved, onSave }: RecipeCardProps) => {
  const { mutate } = useSaveRecipeMutation<Error>(GraphqlClient(), {
    onSuccess: () => {
      onSave && onSave();
    },
    onError: (error) => {
      console.log({ error });
    },
  });
  return (
    <Card
      sx={{
        width: 350,
        margin: 2,
        height: "fit-content",
        borderRadius: "12px",
      }}
    >
      <CardActionArea component={Link} to={`/recipe/${id}`}>
        <CardHeader title={name} />
        <CardMedia component="img" alt="" image={photo ?? ""} height={194} />
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => mutate({ recipeId: id, saved: !saved })}
        >
          {saved ? <SavedIcon color="primary" /> : <SaveIcon color="primary" />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
