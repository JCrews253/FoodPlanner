using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner.Services
{
  public interface IUserService 
  {
    Task ModifySavedRecipesAsync(string userId, string recipeId, bool saved);
    Task InsertUserAsync(User user);
    Task<List<string>> GetSavedRecipeIdsAsync(string userId);
  }

  public class UserService : IUserService 
  {
    private readonly IServiceProvider _provider;
    private readonly IMongoCollection<User> _users;

    public UserService(IServiceProvider provider)
    {
      _provider = provider;
      var mongoClient = _provider.GetRequiredService<IMongoClient>();
      var database = mongoClient.GetDatabase("FoodPlanner");
      _users = database.GetCollection<User>("Users");
    }

    public async Task InsertUserAsync(User user)
    {
      await _users.InsertOneAsync(user);
    }

    public async Task ModifySavedRecipesAsync(string userId, string recipeId, bool saved)
    {
      var user = await _users.Find(u => u.UserId == userId).FirstOrDefaultAsync();
      var recipeIds = user.SavedRecipeIds;
      if (recipeIds.Contains(recipeId) && !saved)
      {
        recipeIds.Remove(recipeId);
      }
      else
      {
        recipeIds.Add(recipeId);
      }
      var update = Builders<User>.Update.Set(u => u.SavedRecipeIds, recipeIds);
      await _users.UpdateOneAsync(u => u.UserId == userId, update);
    }

    public async Task<List<string>> GetSavedRecipeIdsAsync(string userId)
    {
      var user = await _users.Find(u => u.UserId == userId).FirstOrDefaultAsync();
      if(user == null)
      {
        await _users.InsertOneAsync(new User(new List<string>(), userId));
        return new List<string>();
      }
      return user.SavedRecipeIds;
    }
  }
}
