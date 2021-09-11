//[BsonRepresentation(BsonType.ObjectId)]
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GraphQLCodeGen {
  public class GraqhqlTypes {
    
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
    public record PantryItem(string Ingredient, double Amount, string Unit, DateTime? ExpirationDate) {
      #region members
      public string Ingredient { get; init; } = Ingredient;
    
      public double Amount { get; init; } = Amount;
    
      public string Unit { get; init; } = Unit;
    
      public DateTime? ExpirationDate { get; init; } = ExpirationDate;
      #endregion
    }
    #endregion
    
    #region Query
    public record Query(List<Recipe> GetRecipes) {
      #region members
      public List<Recipe> GetRecipes { get; init; } = GetRecipes;
      #endregion
    }
    #endregion
    
    #region Recipe
    public record Recipe(string Id, string Name, List<string> Photos, string Description, List<RecipeIngredient> Ingredients, List<string> Steps, List<string> Tags) {
      #region members
      [BsonRepresentation(BsonType.ObjectId)]
      public string Id { get; init; } = Id;
    
      public string Name { get; init; } = Name;
    
      public List<string> Photos { get; init; } = Photos;
    
      public string Description { get; init; } = Description;
    
      public List<RecipeIngredient> Ingredients { get; init; } = Ingredients;
    
      public List<string> Steps { get; init; } = Steps;
    
      public List<string> Tags { get; init; } = Tags;
      #endregion
    }
    #endregion
    
    #region RecipeIngredient
    public record RecipeIngredient(string Ingredient, double Amount, string Unit) {
      #region members
      public string Ingredient { get; init; } = Ingredient;
    
      public double Amount { get; init; } = Amount;
    
      public string Unit { get; init; } = Unit;
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
    public record User(string Id, string Email, string Password, List<string> Claims) {
      #region members
      [BsonRepresentation(BsonType.ObjectId)]
      public string Id { get; init; } = Id;
    
      public string Email { get; init; } = Email;
    
      public string Password { get; init; } = Password;
    
      public List<string> Claims { get; init; } = Claims;
      #endregion
    }
    #endregion
  }
  
}
