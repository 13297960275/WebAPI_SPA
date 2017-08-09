using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI_SPA.Models.System
{
    public class Template
    {
        public int id { set; get; }
        public string position { set; get; }
        public string option { set; get; }
        public int isCustomized { set; get; }
    }

    public class TemplateI18N
    {
        public int id { set; get; }
        public string language { set; get; }
        public string displayName { set; get; }
        public string description { set; get; }
        public string position { set; get; }
        public string option { set; get; }
        public int isCustomized { set; get; }
    }
}