using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models
{
    public class AzureRateCard
    {
        public int id { set; get; }
        public string subscriptionId { set; get; }
        public string ratecardType { set; get; }
        public string currency { set; get; }
        public bool isTaxIncluded { set; get; }
        public string locale { set; get; }
        public string resourceId { set; get; }
        public string resourceName { set; get; }
        public float meterRates { set; get; }
        public float tags { set; get; }
        public string resourceCategory { set; get; }
        public string resourceSubCategory { set; get; }
        public string resourceRegion { set; get; }
        public string unit { set; get; }
        public string includedQuantity { set; get; }
        public DateTime? effectiveDate { set; get; }
        public DateTime? createDatetime { set; get; }
    }
}