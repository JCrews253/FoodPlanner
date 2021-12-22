import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { GraphqlRequestClient } from "../clients/GraphqlRequestClient";
import { useSaveRecipeMutation } from "../gql";
import SaveIcon from "@mui/icons-material/BookmarkBorder";
import SavedIcon from "@mui/icons-material/Bookmark";

gql`
  mutation SaveRecipe($recipeId: String!) {
    saveRecipe(recipeId: $recipeId)
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
  const { mutate } = useSaveRecipeMutation<Error>(GraphqlRequestClient(), {
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
      }}
    >
      <CardActionArea component={Link} to={`/recipe/${id}`}>
        <CardHeader title={name} />
        <CardMedia component="img" alt="" image={photo ?? ""} height={194} />
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => mutate({ recipeId: id })}
        >
          {saved ? <SavedIcon color="primary" /> : <SaveIcon color="primary" />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
