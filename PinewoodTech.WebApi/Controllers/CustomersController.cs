using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PinewoodTech.WebApi.Models;

namespace PinewoodTech.WebApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CustomersController : ControllerBase
	{
		#region Contr
		private readonly PTContext _dbContext;

		public CustomersController(PTContext dbContext)
		{
			_dbContext = dbContext;
		}
		#endregion

		#region Public
		//GET: api/customers
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
		{
			if(_dbContext.Customers == null)
			{
				return NotFound();
			}
			var result = await _dbContext.Customers.ToListAsync();
			return Ok(result);
		}

		//GET: api/customer/{id}
		[HttpGet("{id}")]
		public async Task<ActionResult<Customer>> GetCustomer(int id)
		{
			if (_dbContext.Customers == null)
			{
				return NotFound();
			}

			var customer = await _dbContext.Customers.FindAsync(id);
			if (customer == null)
			{
				return NotFound();
			}
			return Ok(customer);
		}

		//POST: api/customers
		[HttpPost]
		public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
		{
			customer.CreatedOn = DateTime.Now;
			_dbContext.Customers.Add(customer);
			await _dbContext.SaveChangesAsync();

			return CreatedAtAction(nameof(Customer), new {id = customer.Id}, customer);
		}

		//PUT: api/customers/{id}
		[HttpPut("{id}")]
		public async Task<IActionResult> PutCustomer(int id, Customer customer)
		{
			if(id != customer.Id)
			{
				return BadRequest();
			}

			_dbContext.Entry(customer).State = EntityState.Modified;

			try
			{
				await _dbContext.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				throw ex;
			}
			return NoContent();
		}

		//DELETE: api/customers/{id}
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteCustomer(int id)
		{
			if(_dbContext.Customers == null)
			{
				return NotFound();
			}

			var customer = await _dbContext.Customers.FindAsync(id);
			if (customer == null)
			{
				return NotFound();
			}

			_dbContext.Customers.Remove(customer);
			await _dbContext.SaveChangesAsync();

			return NoContent();
		}

		#endregion
	}
}
