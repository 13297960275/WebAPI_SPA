using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models
{
    public class Discount
    {
        public string id { set; get; }
        public string customerId { set; get; }
        public string subscriptionId { set; get; }
        public string resourceId { set; get; }
        public string discountLevel { set; get; }
        public string discountAmount { set; get; }
        public string status { set; get; }
        public DateTime? effectiveDate { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }
}