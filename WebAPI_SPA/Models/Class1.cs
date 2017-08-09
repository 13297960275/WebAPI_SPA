using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models
{
    public class Rootobject
    {
        public string id { get; set; }
        public string commerceId { get; set; }
        public Companyprofile companyProfile { get; set; }
        public Billingprofile billingProfile { get; set; }
        public string relationshipToPartner { get; set; }
        public Links2 links { get; set; }
        public Attributes2 attributes { get; set; }
    }

    public class Companyprofile
    {
        public string tenantId { get; set; }
        public string domain { get; set; }
        public string companyName { get; set; }
        public Links links { get; set; }
        public Attributes attributes { get; set; }
    }

    public class Links
    {
        public Self self { get; set; }
    }

    public class Self
    {
        public string uri { get; set; }
        public string method { get; set; }
        public object[] headers { get; set; }
    }

    public class Attributes
    {
        public string objectType { get; set; }
    }

    public class Billingprofile
    {
        public string id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string culture { get; set; }
        public string language { get; set; }
        public string companyName { get; set; }
        public Defaultaddress defaultAddress { get; set; }
        public Links1 links { get; set; }
        public Attributes1 attributes { get; set; }
    }

    public class Defaultaddress
    {
        public string country { get; set; }
        public string city { get; set; }
        public string addressLine1 { get; set; }
        public string postalCode { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string phoneNumber { get; set; }
    }

    public class Links1
    {
        public Self1 self { get; set; }
    }

    public class Self1
    {
        public string uri { get; set; }
        public string method { get; set; }
        public object[] headers { get; set; }
    }

    public class Attributes1
    {
        public string etag { get; set; }
        public string objectType { get; set; }
    }

    public class Links2
    {
        public Self2 self { get; set; }
    }

    public class Self2
    {
        public string uri { get; set; }
        public string method { get; set; }
        public object[] headers { get; set; }
    }

    public class Attributes2
    {
        public string objectType { get; set; }
    }

}