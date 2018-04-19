 
using System;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel;

namespace CrudOperationReactJS.Models
{
 
	[Table("User")]
	public class User
	{
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Key, Column(Order = 0)] 
		[Required]
		[DisplayName("id")]
		public int id {get; set;}

		[Required]
		[MaxLength(50)]
		[DisplayName("Name")]
		public string Name {get; set;}

		[Required]
		[MaxLength(20)]
		[DisplayName("Email")]
		public string Email {get; set;}

		[Required]
		[MaxLength(50)]
		[DisplayName("Address")]
		public string Address {get; set;}

		[Required]
		[MaxLength(20)]
		[DisplayName("PhoneNumber")]
		public string PhoneNumber {get; set;}

	} 
} 
