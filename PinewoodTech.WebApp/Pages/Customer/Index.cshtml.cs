using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PinewoodTech.WebApp.Helpers;
using PinewoodTech.WebApp.Models;
using System.Text.Json;

namespace PinewoodTech.WebApp.Pages.Customer
{
    public class IndexModel : PageModel
    {
		// IHttpClientFactory set using DI 
		private readonly IHttpClientFactory _httpClientFactory;

		public IndexModel(IHttpClientFactory httpClientFactory)
		{
			_httpClientFactory = httpClientFactory;
		}

		[BindProperty]
		public IEnumerable<CustomerModel> CustomerModels { get; set; }

		public async Task OnGet()
        {
			// Create the HTTP client using the PinewoodTechAPI.Customer named factory
			var httpClient = _httpClientFactory.CreateClient("PinewoodTechAPI.Customer");

			// Perform the GET request and store the response. The empty parameter
			// in GetAsync doesn't modify the base address set in the client factory 
			using HttpResponseMessage response = await httpClient.GetAsync("");

			// If the request is successful deserialize the results into the data model
			if (response.IsSuccessStatusCode)
			{
				CustomerModels = await response.ReadContentAsync<List<CustomerModel>>();
            }
		}
	}
}
