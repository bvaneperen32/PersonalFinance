using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PersonalFinance.Models;

namespace PersonalFinance.Data
{
    public class PersonalFinanceDbContext : IdentityDbContext<ApplicationUser>
    {
        public PersonalFinanceDbContext(DbContextOptions<PersonalFinanceDbContext> options) : base(options)
        {
        }


    }
}