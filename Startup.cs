using FoodPlanner.API;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Driver;
using HotChocolate;
using FoodPlanner.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Bson.Serialization;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddControllersWithViews();
      services.AddHttpContextAccessor();
      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/build";
      });
      services.AddSingleton<IMongoClient, MongoClient>(s =>
      {
        var uri = s.GetRequiredService<IConfiguration>()["MongoUri"];
        BsonClassMap.RegisterClassMap<Recipe>(recipe =>
        {
          recipe.AutoMap();
          recipe.SetIgnoreExtraElements(true);
        });
        BsonClassMap.RegisterClassMap<User>(user =>
        {
          user.AutoMap();
          user.SetIgnoreExtraElements(true);
        });
        return new MongoClient(uri);
      });
      services.AddSingleton<IRecipeService, RecipeService>(s => new RecipeService(s));
      services.AddSingleton<IUserService, UserService>(s => new UserService(s));
      services.AddSingleton<IAzureBlobService, AzureBlobService>(s => new AzureBlobService(s));

      // Auth0
      services.AddAuthentication(options =>
      {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
      }).AddJwtBearer(options =>
      {
        options.Authority = Configuration["Auth0:Authority"];
        options.Audience = Configuration["Auth0:Audience"];
      });

      services
        .AddGraphQLServer()
        .AddAuthorization()
        .AddQueryType<API.Query>()
        .AddMutationType<API.Mutation>()
        .AddFiltering()
        .AddSorting();
    } 

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();
      app.UseSpaStaticFiles();
      app.UseRouting();
      app.UseAuthentication();
      app.UseAuthorization();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapGraphQL();
      });

      app.UseGraphQLPlayground("/api");

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "ClientApp";

        if (env.IsDevelopment())
        {
          spa.UseReactDevelopmentServer(npmScript: "start");
        }
      });
    }
  }
}
