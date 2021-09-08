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
    IMongoCollection<Pantry> _pantryCollection;

    private void PantryPartialCtor()
    {
      _pantryCollection = _db.GetCollection<Pantry>("Pantries");
    }

    public async Task<Pantry> GetPantryAsync()
    {
      return await _pantryCollection.Find(_ => true).FirstAsync();
    }

    public async Task CreatePantry()
    {
      await _pantryCollection.InsertOneAsync(new Pantry(ObjectId.GenerateNewId().ToString(), new List<PantryItem>()));
    }

    public async Task AddPantryItem(string pantryId, PantryItem item)
    {
      var filter = Builders<Pantry>.Filter.Eq(p => p.Id, pantryId);
      var update = Builders<Pantry>.Update.AddToSet(p => p.Items, item);
      await _pantryCollection.UpdateOneAsync(filter, update);
    }
  }
}
