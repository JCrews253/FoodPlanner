using FoodPlanner.Database;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Authentication;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static GraphQLCodeGen.GraqhqlTypes;

namespace FoodPlanner.Services
{
  public interface IIdentityService
  {
    Task<Token> Authenticate(User user);
    Task<string> Register(User user);
  }

  public class IdentityService : IIdentityService
  {
    DbContext _db;
    PasswordHasher<User> _hasher = new PasswordHasher<User>();
    IServiceProvider _provider;

    public IdentityService(DbContext db, IServiceProvider provider)
    {
      _db = db;
      _provider = provider;
    }

    public async Task<Token> Authenticate(User user)
    {
      var dbUser = await _db.GetUser(user.Email);
      if(dbUser == null)
      {
        return null;
      } 

      var results = _hasher.VerifyHashedPassword(user, dbUser.Password, user.Password);
      if(results == PasswordVerificationResult.Success)
      {
        var accessToken = GenerateAccessToken(user.Email, dbUser.Id);
        var refreshToken = GenerateRefreshToken();
        return new Token(accessToken, refreshToken);
      }

      return null;
    }

    public async Task<string> Register(User user)
    {
      // atleast one lower case letter
      // atleast one upper case letter
      // atleast one special character
      // atleast one number
      // atleast 8 character length
      string passwordRules = @"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
      string emailRules = @"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";

      if (string.IsNullOrEmpty(user.Email))
      {
        return "Email can't be empty.";
      }
      else if(!Regex.IsMatch(user.Email, emailRules))
      {
        return "Invalid email.";
      }
      else if (string.IsNullOrEmpty(user.Password))
      {
        return "Password can't be empty.";
      }
      else if(!Regex.IsMatch(user.Password, passwordRules))
      {
        return "Invalid password.";
      }

      var isAvailable = await _db.IsEmailAvailable(user.Email);
      if (isAvailable)
      {
        var newUser = new User(null, user.Email, user.FirstName, null, user.LastName, _hasher.HashPassword(user, user.Password), null);
        await _db.InsertUser(newUser);
        return string.Empty;
      }
      else
      {
        return $"{user.Email} is already in use.";
      }
    }

    private string GenerateAccessToken(string email, string userId)
    {
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_provider.GetRequiredService<IConfiguration>()["SymmetricSecurityKey"]));

      var claims = new List<Claim>
      {
        new Claim(ClaimTypes.NameIdentifier, userId),
        new Claim(ClaimTypes.Name, email)
      };

      var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      var token = new JwtSecurityToken(
        "issuer",
        "audience",
        claims,
        expires: DateTime.Now.AddHours(2),
        signingCredentials: signingCredentials);

      return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private string GenerateRefreshToken()
    {
      var randomNumber = new byte[32];
      using (var generator = RandomNumberGenerator.Create())
      {
        generator.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
      }
    }
  }
}
