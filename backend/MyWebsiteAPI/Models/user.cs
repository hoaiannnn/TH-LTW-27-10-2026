using System.Text.Json.Serialization;

namespace MyWebsiteAPI.Models;

public class User
{
    public int Id { get; set; }

    public string FullName { get; set; } = "";

    public string Email { get; set; } = "";

    public int Age { get; set; }

    [JsonIgnore]
    public string PasswordHash { get; set; } = "";
}