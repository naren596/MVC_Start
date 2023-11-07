using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MVC_Start.Models
{
  public class Product
  {
    public string Id {get; set;}
    public string Name { get; set; }
    public string Description { get; set; }
    public ICollection<SubProduct> SubProducts { get; set; }
  }

  public class SubProduct
  {
    public string Id { get; set; }
    public string Name { get; set; }

    [ForeignKey("Product")]
    public string ProductId { get; set; }

    public Product Product { get; set; }
    public ICollection<Complaint> Complaints { get; set; }
  }

  public class Company
  {
      public string Id { get; set; }
      public string Name { get; set; }
      public ICollection<Complaint> Complaints { get; set; }
  }

  public class Complaint
  {
      public string ComplaintId { get; set; }
      public string ComplaintWhatHappened { get; set; }
      public DateTime DateSentToCompany { get; set; }
      public string IssueName { get; set; }
      public DateTime DateReceived { get; set; }
      public string Timely { get; set; }
      public string ConsumerConsentProvided { get; set; }
      public string CompanyResponse { get; set; }
      public string SubmittedVia { get; set; }
      public string ConsumerDisputed { get; set; }
      public string SubIssue { get; set; }
      public string State { get; set; }
      public string ZipCode { get; set; }

      [ForeignKey("Company")]
      public string CompanyId { get; set; }
      [ForeignKey("SubProduct")]
      public string SubProductId { get; set; }
      public Company Company { get; set; }
      public SubProduct SubProduct { get; set; }
  }
}