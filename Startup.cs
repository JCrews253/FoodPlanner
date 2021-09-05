using FoodPlanner.API;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FoodPlanner.API.Models;
using FoodPlanner.Database;
using MongoDB.Driver;
using HotChocolate;
using HotChocolate.AspNetCore;
using GraphQL.Server.Ui.Voyager;

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

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/build";
      });
      services.AddSingleton<IMongoClient, MongoClient>(s =>
      {
        var uri = s.GetRequiredService<IConfiguration>()["MongoUri"];
        return new MongoClient(uri);
      });
      services.AddSingleton<DbContext>();

      services
        .AddGraphQLServer()
        .AddQueryType<Query>()
        .AddMutationType<Mutation>()
        .AddType<RecipeType>()
        .AddType<RecipeIngredientType>()
        .AddType<RecipeAddedPayloadType>();
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

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapGraphQL();
      });

      app.UseGraphQLVoyager(new GraphQLVoyagerOptions()
      {
        GraphQLEndPoint = "/graphql",
        Path = "/graphql-voyager"
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
