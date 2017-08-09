using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using WebAPI_SPA.BLL;
using WebAPI_SPA.DAL;
using WebAPI_SPA.Models;

namespace WebAPI_SPA.Controllers
{
    public class HomeController : Controller
    {
        private CSPDBContect db = new CSPDBContect();
        private Authentications auth = new Authentications();

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        /// <summary>
        /// Gets the offers using API.
        /// </summary>
        public void GetOffersWithAppCredentials()
        {
            JObject tokenObject = Authentications.GetPartnerCenterAppCredentialsToken();

            // get offers list
            var request = WebRequest.Create(string.Format("{0}/v1/offers?country={1}", Authentications.PartnerServiceApiRoot, "US"));

            request.Headers.Add(HttpRequestHeader.Authorization, "Bearer " + tokenObject["access_token"].ToString());
            request.Method = "GET";
            try
            {
                var response = request.GetResponse();
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    var responseContent = reader.ReadToEnd();
                    var adResponse = JsonConvert.DeserializeObject<JObject>(responseContent);
                    Console.WriteLine(adResponse.ToString());
                }

            }
            catch (WebException webException)
            {
                if (webException.Response != null)
                {
                    using (var reader = new StreamReader(webException.Response.GetResponseStream()))
                    {
                        var responseContent = reader.ReadToEnd();
                    }
                }
            }
        }

        /// <summary>
        /// Gets all customers using API.
        /// </summary>
        public void GetAllCustomersWithAppCredentials()
        {
            JObject tokenObject = Authentications.GetAppCredentialsToken();

            // get all customers
            var request = WebRequest.Create(string.Format("{0}/v1.0/{1}", Authentications.PartnerServiceApiRoot, "customers"));

            request.Headers.Add(HttpRequestHeader.Authorization, "Bearer " + tokenObject["access_token"].ToString());
            request.Method = "GET";
            try
            {
                var response = request.GetResponse();
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    var responseContent = reader.ReadToEnd();
                    var adResponse = JsonConvert.DeserializeObject<JObject>(responseContent);
                    JArray itemsArr = JArray.Parse(adResponse["items"].ToString());
                    for (var i = 0; i < itemsArr.Count; i++)
                    {
                        JObject itemsJO = JObject.Parse(itemsArr[i].ToString());
                        Customer c = new Customer();
                        c.commerceTenantId = itemsJO["companyProfile"]["tenantId"].ToString();
                        c.domanName = itemsJO["companyProfile"]["domain"].ToString();
                        c.companyName = itemsJO["companyProfile"]["companyName"].ToString();
                        db.Customers.Add(c);
                        db.SaveChanges();
                    }
                    Response.Write(adResponse["items"].ToString());
                }

            }
            catch (WebException webException)
            {
                if (webException.Response != null)
                {
                    using (var reader = new StreamReader(webException.Response.GetResponseStream()))
                    {
                        var responseContent = reader.ReadToEnd();
                    }
                }
            }
        }

        /// <summary>
        /// json convert
        /// </summary>
        public void JsonToObject()
        {
            string jsonText = "{'name':'test','phone':'18888888888','image':[{'name':'img1','data':'data1'},{'name':'img2','data':'data2'},{'name':'img3','data':'data3'}]}";

            JObject jo = (JObject)JsonConvert.DeserializeObject(jsonText);

            string zone = jo["name"].ToString();
            string zone_en = jo["phone"].ToString();

            JArray jar = JArray.Parse(jo["image"].ToString());
            Response.Write(zone);
            Response.Write(zone_en);

            for (var i = 0; i < jar.Count; i++)
            {
                JObject j = JObject.Parse(jar[i].ToString());
                Response.Write(j["name"].ToString());
                Response.Write(j["data"].ToString());
            }
        }

    }
}
