using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PersonalFinance.Models;

namespace PersonalFinance.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
           _userManager = userManager;
            _signInManager = signInManager; 
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    return Ok(new { message = "User registered successfully" });
                }
                else
                {
                    if (result.Errors.Any(e => e.Code == "DuplicateUserName"))
                    {
                        return BadRequest(new { message = "User already exists" });
                    }

                    return BadRequest(result.Errors);
                }
            }

            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    return Ok(new { message = "User logged in successfully" });
                }
                else if (result.IsLockedOut)
                {
                    return BadRequest(new { message = "User account locked out." });
                }
                else if (result.IsNotAllowed)
                {
                    return Ok(new { message = "Locked out login" });
                }
                else
                {
                    return BadRequest(new { message = "Invalid login attempt." }); 
                }
            }

            return BadRequest(ModelState);
        }

    }
}
