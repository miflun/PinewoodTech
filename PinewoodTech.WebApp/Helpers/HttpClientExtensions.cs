using System.Text.Json;

namespace PinewoodTech.WebApp.Helpers
{
	public static class HttpClientExtensions
	{
		public static async Task<T> ReadContentAsync<T>(this HttpResponseMessage response)
		{
			if (response.IsSuccessStatusCode == false)
				throw new ApplicationException($"Error with API: {response.ReasonPhrase}");

			var resultString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

			var result = JsonSerializer.Deserialize<T>(
				resultString, new JsonSerializerOptions
				{
					PropertyNameCaseInsensitive = true
				});

			return result;
		}
    }
}
