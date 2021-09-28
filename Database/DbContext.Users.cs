using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner.Database
{
  public partial class DbContext
  {
    IMongoCollection<User> _usersCollection;

    private void UsersPartialCtor()
    {
      _usersCollection = _db.GetCollection<User>("Users");
    }

    public async Task<User> GetUser(string email)
    {
      return await _usersCollection.Find(u => u.Email == email).FirstOrDefaultAsync();
    }

    public async Task<bool> IsEmailAvailable(string email)
    {
      return await GetUser(email) == null;
    }

    public async Task InsertUser(User user)
    {
      await _usersCollection.InsertOneAsync(user with { Id = ObjectId.GenerateNewId().ToString() });
    }

    public async Task ModifySavedRecipes(string userId, string recipeId)
    {
      var user = await _usersCollection.Find(u => u.Id == userId).FirstOrDefaultAsync();
      var recipeIds = user.SavedRecipeIds;
      if (recipeIds.Contains(recipeId)) {
        recipeIds.Remove(recipeId);
      }
      else {
        recipeIds.Add(recipeId);
      }
      var update = Builders<User>.Update.Set(u => u.SavedRecipeIds, recipeIds);
      await _usersCollection.UpdateOneAsync(u => u.Id == userId, update);
    }
  }
}
