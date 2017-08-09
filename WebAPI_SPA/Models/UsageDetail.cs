using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models
{
    public class UsageDetail
    {
        public string id { get; set; }
        public string subscriptionId { get; set; }
        public DateTime? usageStartTime { get; set; }
        public DateTime? usageEndTime { get; set; }
        //public Resource resource { get; set; }
        public string resourceId { get; set; }
        public string resourceName { get; set; }
        public string resourceCategory { get; set; }
        public string resourceSubCategory { get; set; }

        public float consumedQuantity { get; set; }
        public string unit { get; set; }
        //public Infofields infoFields { get; set; }
        public string meteredRegion { get; set; }
        public string meteredService { get; set; }
        public string meteredServiceType { get; set; }
        public string project { get; set; }

        //public Instancedata instanceData { get; set; }
        public string resourceUri { get; set; }
        public string location { get; set; }
        public string partNumber { get; set; }
        public string orderNumber { get; set; }
        public string tags { get; set; }

        public string resourceGroups { set; get; }
        //public Attributes attributes { get; set; }
    }

    public class UsageSummary
    {

        public string id { get; set; }
        public string subscriptionId { get; set; }
        public string usagePeriod { get; set; }

        public string resourceId { get; set; }
        public string resourceName { get; set; }
        public string resourceCategory { get; set; }
        public string resourceSubCategory { get; set; }

        public float consumedQuantity { get; set; }
        public string unit { get; set; }

        public string meteredRegion { get; set; }
        public string meteredService { get; set; }
        public string meteredServiceType { get; set; }
        public string project { get; set; }

        public string resourceUri { get; set; }
        public string currency { get; set; }
        public string discountId { get; set; }
        public double amount { get; set; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }

    //public class Resource
    //{
    //    public string resourceId { get; set; }
    //    public string resourceName { get; set; }
    //    public string resourceCategory { get; set; }
    //    public string resourceSubCategory { get; set; }
    //    //public string region { get; set; }
    //}

    //public class Infofields
    //{
    //    public string meteredRegion { get; set; }
    //    public string meteredService { get; set; }
    //    public string meteredServiceType { get; set; }
    //    public string project { get; set; }
    //}

    //public class Instancedata
    //{
    //    public string resourceUri { get; set; }
    //    public string location { get; set; }
    //    public string partNumber { get; set; }
    //    public string orderNumber { get; set; }
    //    public string tags { get; set; }
    //}

    //public class Attributes
    //{
    //    public string objectType { get; set; }
    //}
}