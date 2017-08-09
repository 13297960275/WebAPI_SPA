using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models.System
{
    public class Role
    {
        public int roleId { set; get; }
        public int status { set; get; }
        public string code { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }

    public class RoleI18N
    {
        public int id { set; get; }
        public int roleId { set; get; }
        public string language { set; get; }
        public string displayName { set; get; }
        public string description { set; get; }
        public int status { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }

    public class RoleRefPermission
    {
        public int id { set; get; }
        public int roleId { set; get; }
        public int status { set; get; }
        public string allowAction { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }
}