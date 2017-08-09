using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models
{
    public class Billing
    {
        public string id { set; get; }
        public string partnerId { set; get; }
        public string customerId { set; get; }
        public string billingDescription { set; get; }
        public string billingType { set; get; }
        public string currency { set; get; }
        public DateTime? billingDate { set; get; }
        public float billingPeriod { set; get; }
        public DateTime? accountDate { set; get; }
        public string language { set; get; }
        public string address { set; get; }
        public string city { set; get; }
        public int state { set; get; }
        public string zipcode { set; get; }
        public string country { set; get; }
        public string region { set; get; }
        public string contactName { set; get; }
        public string contactPhoneNumber { set; get; }
        public string contactEmail { set; get; }
        public int status { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }

    public class BillingDetail
    {
        public int id { set; get; }
    }

    public class BillingSummary
    {
        public int id { set; get; }
    }
}