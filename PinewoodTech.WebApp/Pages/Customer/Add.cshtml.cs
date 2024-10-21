using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using PinewoodTech.WebApp.Models;
using System.Text.Json;
using System.Text;

namespace PinewoodTech.WebApp.Pages.Customer
{
    public class AddModel : PageModel
    {
        // IHttpClientFactory set using dependency injection 
        private readonly IHttpClientFactory _httpClientFactory;

        public AddModel(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        // Add the data model and bind the form data to the page model properties
        [BindProperty]
        public CustomerModel CustomerModel { get; set; }

        public async Task<IActionResult> OnPost()
        {
            // Serialize the information to be added to the database
            var jsonContent = new StringContent(JsonSerializer.Serialize(CustomerModel),
                Encoding.UTF8,
                "application/json");

            // Create the HTTP client using the PinewoodTechAPI.Customer named factory
            var httpClient = _httpClientFactory.CreateClient("PinewoodTechAPI.Customer");

            // Execute the POST request and store the response. The parameters in PostAsync 
            // direct the POST to use the base address and passes the serialized data to the API
            using HttpResponseMessage response = await httpClient.PostAsync("", jsonContent);

            // Return to the home (Index) page and add a temporary success/failure 
            // message to the page.
            if (response.IsSuccessStatusCode)
            {
                TempData["success"] = "Data was added successfully.";
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
