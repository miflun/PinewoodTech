using Microsoft.EntityFrameworkCore;

namespace PinewoodTech.WebApi.Models
{
	public class PTContext : DbContext
	{
		public PTContext(DbContextOptions<PTContext> options) : base(options) { }

		public DbSet<Customer> Customers { get; set; } = null!;
	}
}
