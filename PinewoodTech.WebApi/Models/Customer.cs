using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace PinewoodTech.WebApi.Models
{
	public class Customer
	{
		[Key]
		public int Id { get; set; }
		[Required]
		[MaxLength(128)]
		public string FirstName { get;set; }
		public int Age { get; set; }

		//Keep it simple for now
		//[JsonIgnore]
		//[XmlIgnore]
		public DateTime CreatedOn { get; set; }
	}
}
