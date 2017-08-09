using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models.System
{
    public class Function
    {
        public int functionId { set; get; }
        public int parentId { set; get; }
        public string code { set; get; }
        public string url { set; get; }
        public string openNew { set; get; }
        public int status { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }

    public class FunctionI18N
    {
        public int id { set; get; }
        public int functionId { set; get; }
        public string language { set; get; }
        public string displayName { set; get; }
        public string description { set; get; }
        public int status { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }
}