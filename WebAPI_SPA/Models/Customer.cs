using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models
{
    public class Customer
    {
        public int id { set; get; }
        public string parentId { set; get; }
        public string commerceTenantId { set; get; }
        public string companyType { set; get; }
        public string domanName { set; get; }
        public string companyName { set; get; }
        public string customerType { set; get; }
        public string taxId { set; get; }
        public string city { set; get; }
        public int state { set; get; }
        public string zipcode { set; get; }
        public string country { set; get; }
        public string region { set; get; }
        public string address { set; get; }
        public string contactWindow { set; get; }
        public string contactPhoneNumber { set; get; }
        public string contactMobile { set; get; }
        public string contactEmail { set; get; }
        public int status { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }
}