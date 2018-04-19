using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
 
namespace CrudOperationReactJS.Models 
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }
        //
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
			

        }
		
		public DbSet<User> Users {get; set;}

    }
}
