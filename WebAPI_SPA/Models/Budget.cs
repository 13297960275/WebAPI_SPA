using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models
{
    public class Budget
    {
        public int id { set; get; }
        public string budgetOwner { set; get; }
        public string budgetLevel { set; get; }
        public string customerId { set; get; }
        public string subscriptionId { set; get; }
        public string resourceId { set; get; }
        public float amount { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }

    public class BudgetNotificationSetting
    {
        public int id { set; get; }
        public string budgetId { set; get; }
        public string mailList { set; get; }
    }
}