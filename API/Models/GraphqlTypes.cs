//[BsonRepresentation(BsonType.ObjectId)]
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GraphQLCodeGen {
  public class GraqhqlTypes {
    
    #region Mutation
    public record Mutation(bool NewRecipe, bool? SaveRecipe) {
      #region members
      public bool NewRecipe { get; init; } = NewRecipe;
    
      public bool? SaveRecipe { get; init; } = SaveRecipe;
      #endregion
    }
    #endregion
    
    #region Query
    public record Query(List<Recipe> MyRecipes, Recipe Recipe, List<Recipe> Recipes) {
      #region members
      public List<Recipe> MyRecipes { get; init; } = MyRecipes;
    
      public Recipe Recipe { get; init; } = Recipe;
    
      public List<Recipe> Recipes { get; init; } = Recipes;
      #endregion
    }
    #endregion
    
    #region Recipe
    public record Recipe(string Description, string Id, List<string> Ingredients, string Name, string Photo, List<string> Steps, List<string> Tags, List<RecipeTime> Times) {
      #region members
      public string Description { get; init; } = Description;
    
      [BsonRepresentation(BsonType.ObjectId)]
      public string Id { get; init; } = Id;
    
      public List<string> Ingredients { get; init; } = Ingredients;
    
      public string Name { get; init; } = Name;
    
      public string Photo { get; init; } = Photo;
    
      public List<string> Steps { get; init; } = Steps;
    
      public List<string> Tags { get; init; } = Tags;
    
      public List<RecipeTime> Times { get; init; } = Times;
      #endregion
    }
    #endregion
    
    #region RecipeInput
    public class RecipeInput {
      #region members
      [Required]
      public string description { get; set; }
    
      [Required]
      public List<string> ingredients { get; set; }
    
      [Required]
      public string name { get; set; }
    
      public string photo { get; set; }
    
      [Required]
      public List<string> steps { get; set; }
    
      [Required]
      public List<string> tags { get; set; }
    
      [Required]
      public List<RecipeTimeInput> times { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(RequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region RecipeTime
    public record RecipeTime(string Name, string Time) {
      #region members
      public string Name { get; init; } = Name;
    
      public string Time { get; init; } = Time;
      #endregion
    }
    #endregion
    
    #region RecipeTimeInput
    public class RecipeTimeInput {
      #region members
      [Required]
      public string name { get; set; }
    
      [Required]
      public string time { get; set; }
      #endregion
    
      #region methods
      public dynamic GetInputObject()
      {
        IDictionary<string, object> d = new System.Dynamic.ExpandoObject();
    
        var properties = GetType().GetProperties(System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
        foreach (var propertyInfo in properties)
        {
          var value = propertyInfo.GetValue(this);
          var defaultValue = propertyInfo.PropertyType.IsValueType ? Activator.CreateInstance(propertyInfo.PropertyType) : null;
    
          var requiredProp = propertyInfo.GetCustomAttributes(typeof(RequiredAttribute), false).Length > 0;
    
          if (requiredProp || value != defaultValue)
          {
            d[propertyInfo.Name] = value;
          }
        }
        return d;
      }
      #endregion
    }
    #endregion
    
    #region User
    public record User(string Id, List<string> SavedRecipeIds, string UserId) {
      #region members
      [BsonRepresentation(BsonType.ObjectId)]
      public string Id { get; init; } = Id;
    
      public List<string> SavedRecipeIds { get; init; } = SavedRecipeIds;
    
      public string UserId { get; init; } = UserId;
      #endregion
    }
    #endregion
  }
  
}
