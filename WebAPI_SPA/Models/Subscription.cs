using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models
{
    public class Subscription
    {
        public int id { set; get; }
        public string customerId { set; get; }
        public string customerType { set; get; }
        public string customerTenantId { set; get; }
        public string SubscriptionId { set; get; }
        public string SubscriptionName { set; get; }
        public string offerId { set; get; }
        public string offerName { set; get; }
        public float quantity { set; get; }
        public string unitType { set; get; }
        public string parentSubscriptionId { set; get; }
        public DateTime? creationDate { set; get; }
        public DateTime? effectiveStartDate { set; get; }
        public DateTime? commitmentEndDate { set; get; }
        public string subscriptionStatus { set; get; }
        public string autoRenewEnabled { set; get; }
        public string billingType { set; get; }
        public string billingCycle { set; get; }
        public string contractType { set; get; }
        public string orderId { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }
}