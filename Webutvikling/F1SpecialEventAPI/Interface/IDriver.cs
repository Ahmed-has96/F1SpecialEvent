namespace F1SpecialEventAPI.Interface;

public interface IDriver
{
  int Id { get; set; }
  string? Name { get; set; }
  int Age { get; set; }
  string? Nationality { get; set; }
  string? Image { get; set; }
}


