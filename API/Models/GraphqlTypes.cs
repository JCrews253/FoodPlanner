//[BsonRepresentation(BsonType.ObjectId)]
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GraphQLCodeGen {
  public class GraqhqlTypes {
    
    #region Mutation
    public record Mutation(Token Login, bool NewRecipe, string Register, bool? SaveRecipe) {
      #region members
      public Token Login { get; init; } = Login;
    
      public bool NewRecipe { get; init; } = NewRecipe;
    
      public string Register { get; init; } = Register;
    
      public bool? SaveRecipe { get; init; } = SaveRecipe;
      #endregion
    }
    #endregion
    
    #region Pantry
    public record Pantry(string Id, List<PantryItem> Items) {
      #region members
      [BsonRepresentation(BsonType.ObjectId)]
      public string Id { get; init; } = Id;
    
      public List<PantryItem> Items { get; init; } = Items;
      #endregion
    }
    #endregion
    
    #region PantryItem
    public record PantryItem(double Amount, DateTime? ExpirationDate, string Ingredient, string Unit) {
      #region members
      public double Amount { get; init; } = Amount;
    
      public DateTime? ExpirationDate { get; init; } = ExpirationDate;
    
      public string Ingredient { get; init; } = Ingredient;
    
      public string Unit { get; init; } = Unit;
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
    [BsonIgnoreExtraElements]
    public record Recipe(string Description, string Id, List<RecipeIngredient> Ingredients, string Name, string Photo, List<string> Steps, List<string> Tags, List<RecipeTime> Times) {
      #region members
      public string Description { get; init; } = Description;
      [BsonRepresentation(BsonType.ObjectId)]
      public string Id { get; init; } = Id;
    
      public List<RecipeIngredient> Ingredients { get; init; } = Ingredients;
    
      public string Name { get; init; } = Name;
    
      public string Photo { get; init; } = Photo;
    
      public List<string> Steps { get; init; } = Steps;
    
      public List<string> Tags { get; init; } = Tags;
    
      public List<RecipeTime> Times { get; init; } = Times;
      #endregion
    }
    #endregion
    
    #region RecipeIngredient
    public record RecipeIngredient(double Amount, string Ingredient, string Unit) {
      #region members
      public double Amount { get; init; } = Amount;
    
      public string Ingredient { get; init; } = Ingredient;
    
      public string Unit { get; init; } = Unit;
      #endregion
    }
    #endregion
    
    #region RecipeIngredientInput
    public class RecipeIngredientInput {
      #region members
      [Required]
      public double Amount { get; set; }
    
      [Required]
      public string Ingredient { get; set; }
    
      public string Unit { get; set; }
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
    
    #region RecipeInput
    public class RecipeInput {
      #region members
      [Required]
      public string description { get; set; }
    
      [Required]
      public List<RecipeIngredientInput> ingredients { get; set; }
    
      [Required]
      public string name { get; set; }
    
      [Required]
      public string photo { get; set; }
    
      [Required]
      public List<string> steps { get; set; }
    
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
    
    #region Token
    public record Token(string Access, string Refresh) {
      #region members
      public string Access { get; init; } = Access;
    
      public string Refresh { get; init; } = Refresh;
      #endregion
    }
    #endregion
    
    #region User
    public record User(List<string> Claims, string Email, string FirstName, string Id, string LastName, string Password, List<string> SavedRecipeIds) {
      #region members
      public List<string> Claims { get; init; } = Claims;
    
      public string Email { get; init; } = Email;
    
      public string FirstName { get; init; } = FirstName;
      [BsonRepresentation(BsonType.ObjectId)]
      public string Id { get; init; } = Id;
    
      public string LastName { get; init; } = LastName;
    
      public string Password { get; init; } = Password;
    
      public List<string> SavedRecipeIds { get; init; } = SavedRecipeIds;
      #endregion
    }
    #endregion
    
    #region UserInput
    public class UserInput {
      #region members
      [Required]
      public string email { get; set; }
    
      public string firstName { get; set; }
    
      public string lastName { get; set; }
    
      [Required]
      public string password { get; set; }
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
  }
  
}
