using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models.System
{
    //[Table("USER")]
    public class User
    {
        //[Key]
        //[Column("id", TypeName = "number"), Required]
        public int id { set; get; }
        public string language { set; get; }
        public string name { set; get; }
        //[Column("Email", TypeName = "varchar(max)")]
        public string email { set; get; }
        public int status { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }

    public class UserRefRole
    {
        public int id { set; get; }
        public int customerId { set; get; }
        public int userId { set; get; }
        public int roleId { set; get; }
        public int status { set; get; }
        public string createUser { set; get; }
        public DateTime? createDatetime { set; get; }
        public string updateUser { set; get; }
        public DateTime? updateDatetime { set; get; }
    }
}