namespace F1SpecialEventAPI.Models;
using F1SpecialEventAPI.Interface;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;


public class Driver : IDriver 
{
    [Key]
        public int Id {get; set;}
        public string ? Name {get; set;}
        public int Age {get; set;}
        public string ? Nationality { get; set; }
        public string ? Image { get; set; }

}
