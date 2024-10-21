using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PinewoodTech.WebApp.Helpers;
using PinewoodTech.WebApp.Models;
using System.Text.Json;

namespace PinewoodTech.WebApp.Pages.Customer
{
    public class DeleteModel : PageModel
    {
        // IHttpClientFactory set using dependency injection 
        private readonly IHttpClientFactory _httpClientFactory;

        public DeleteModel(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        // Add the data model and bind the form data to the page model properties
        [BindProperty]
        public CustomerModel CustomerModel { get; set; }


        // Retrieve the data to populate the form for deletion
        public async Task OnGet(int id)
        {

            // Create the HTTP client using the PinewoodTechAPI.Customer named factory
            var httpClient = _httpClientFactory.CreateClient("PinewoodTechAPI.Customer");

            // Retrieve record information
            using HttpResponseMessage response = await httpClient.GetAsync(id.ToString());

            if (response.IsSuccessStatusCode)
            {
                // Deserialize the response to populate the form
                using var contentStream = await response.Content.ReadAsStreamAsync();
                CustomerModel = await response.ReadContentAsync<CustomerModel>();
            }
        }


        // DELETE operation code
        public async Task<IActionResult> OnPost()
        {
            // Create the HTTP client using the PinewoodTechAPI.Customer named factory
            var httpClient = _httpClientFactory.CreateClient("PinewoodTechAPI.Customer");

            // Appends the data Id for deletion to the base address and performs the operation
            using HttpResponseMessage response = await httpClient.DeleteAsync(CustomerModel.Id.ToString());

            // Return to the home (Index) page and add a temporary success/failure 
            // message to the page.
            if (response.IsSuccessStatusCode)
            {
                TempData["success"] = "Data was deleted successfully.";
                return RedirectToPage("Index");
            }
            else
            {
                TempData["failure"] = "Operation was not successful";
                return RedirectToPage("Index");
            }

        }
    }
}
