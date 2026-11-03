using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyWebsiteAPI.Data;
using MyWebsiteAPI.Models;

namespace MyWebsiteAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/users
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users.ToListAsync();

        return Ok(users);
    }

    // GET: api/users/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    // POST: api/users
    [HttpPost]
    public async Task<IActionResult> CreateUser(User user)
    {
        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return Ok(user);
    }

    // PUT: api/users/1
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, User user)
    {
        var existingUser = await _context.Users.FindAsync(id);

        if (existingUser == null)
        {
            return NotFound();
        }

        existingUser.FullName = user.FullName;
        existingUser.Email = user.Email;
        existingUser.Age = user.Age;

        await _context.SaveChangesAsync();

        return Ok(existingUser);
    }

    // DELETE: api/users/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // POST: api/users/register
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new
            {
                message = "Email và password không được để trống"
            });
        }

        var email = request.Email.Trim().ToLower();

        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);

        if (existingUser != null)
        {
            return BadRequest(new
            {
                message = "Email đã tồn tại"
            });
        }

        var user = new User
        {
            FullName = request.FullName,
            Email = email,
            Age = request.Age,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Đăng ký thành công",
            user = new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.Age
            }
        });
    }

    // POST: api/users/login
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Email) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new
            {
                message = "Email và password không được để trống"
            });
        }

        var email = request.Email.Trim().ToLower();

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
        {
            return Unauthorized(new
            {
                message = "Email hoặc password không đúng"
            });
        }

        bool passwordCorrect = false;
        try
        {
            if (!string.IsNullOrEmpty(user.PasswordHash))
            {
                passwordCorrect = BCrypt.Net.BCrypt.Verify(
                    request.Password,
                    user.PasswordHash
                );
            }
        }
        catch
        {
            passwordCorrect = false;
        }

        if (!passwordCorrect)
        {
            return Unauthorized(new
            {
                message = "Email hoặc password không đúng"
            });
        }

        return Ok(new
        {
            message = "Đăng nhập thành công",

            user = new
            {
                user.Id,
                user.FullName,
                user.Email,
                user.Age
            }
        });
    }
}
