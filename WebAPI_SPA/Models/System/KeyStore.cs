using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models.System
{
    public class Keystore
    {
        public int id { set; get; }
        public string costomerId { set; get; }
        public string customerType { set; get; }
        public string authType { set; get; }
        public string clientId { set; get; }
        public string clientSecret { set; get; }
        public int status { set; get; }
        public string lastSyncStatus { set; get; }
        public DateTime? lastSyncDatetime { set; get; }
        //[Column("create_user"), Required]
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        //[Column("create_user"), Required]
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }

    public class KeystoreSyncStatus
    {
        public int id { set; get; }
        public string keystoreId { set; get; }
        public string syncItem { set; get; }
        public string syncStatus { set; get; }
        public string syncMsg { set; get; }
        public string clientSecret { set; get; }
        public DateTime? syncStartTime { set; get; }
        public DateTime? syncEndTime { set; get; }
        public DateTime? nextSchedaledTate { set; get; }
    }

    public class KeystoreSyncJob
    {
        public int id { set; get; }
        public string customerType { set; get; }
        public string name { set; get; }
        public string syncFrequency { set; get; }
    }
}