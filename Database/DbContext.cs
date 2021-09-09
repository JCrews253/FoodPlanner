using GraphQLCodeGen;
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
    IMongoDatabase _db;
    
    public DbContext(IMongoClient client)
    {
      _db = client.GetDatabase("FoodPlanner");
      RecipePartialCtor();
      PantryPartialCtor();
      UsersPartialCtor();
    }
  }
}
