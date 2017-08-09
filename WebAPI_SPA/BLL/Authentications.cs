using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace WebAPI_SPA.BLL
{
    public class Authentications
    {
        public static string PartnerServiceApiRoot = "https://api.partnercenter.microsoft.com";
        public static string Authority = "https://login.windows.net";
        public static string ApplicationId = "80c63a44-4c0e-4ebd-b898-4f5f0b8a2e8a";
        public static string ApplicationSecret = "8a+GJfBSTDTqJtTv6kNQpZZ90jOcFFXciysDEl6pzVY=";
        public static string ApplicationDomain = "54cd376d-04e8-4f23-8727-54091bf65bb9";
        public static string ResourceUrl = "https://graph.windows.net";

        public static string AuthorityUrl = "https://login.microsoftonline.com";
        public static string CustomerDomain = "wiadvance.com";
        public static string grant_type = "client_credentials";
        public static string client_id = "71bf155d-e9cc-4bf3-af8f-1dc79053967e";
        public static string client_secret = "0ZMnm2JrPmXfsZm9eVUdJbw+gyrM+KTxFi75Rg/YJdI=";

        /// <summary>
        /// This method helps to retrieve the AD token
        /// </summary>
        /// <param name="resellerDomain">domain of the reseller including .onmicrosoft.com</param>
        /// <param name="clientId">AppId from the azure portal registered for this app</param>
        /// <param name="clientSecret">Secret from the azure portal registered for this app</param>
        /// <returns>
        /// this is the authentication token object that contains access_token, expiration time, can be used to get the authorization token from a resource
        /// </returns>
        public static JObject GetADToken(string resellerDomain, string clientId, string clientSecret)
        {
            var request = WebRequest.Create(string.Format("{0}/{1}/oauth2/token", Authentications.Authority, resellerDomain));

            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            string content = string.Format(
                "grant_type=client_credentials&client_id={0}&client_secret={1}&resource={2}",
                clientId,
                HttpUtility.UrlEncode(clientSecret),
                HttpUtility.UrlEncode(Authentications.ResourceUrl));

            using (var writer = new StreamWriter(request.GetRequestStream()))
            {
                writer.Write(content);
            }

            try
            {
                var response = request.GetResponse();
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    var responseContent = reader.ReadToEnd();
                    var adResponse = JsonConvert.DeserializeObject<JObject>(responseContent);
                    return adResponse;
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

            return null;
        }

        /// <summary>
        /// Gets the partner center app credential token.
        /// </summary>
        /// <returns>Token response from server</returns>
        public static JObject GetPartnerCenterAppCredentialsToken()
        {
            // get Azure AD token for user
            var aadToken = GetADToken(Authentications.ApplicationDomain, Authentications.ApplicationId, Authentications.ApplicationSecret);

            var request = WebRequest.Create(string.Format("{0}/generatetoken", Authentications.PartnerServiceApiRoot));

            request.Headers.Add(HttpRequestHeader.Authorization, "Bearer " + aadToken["access_token"].ToString());
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            string content = string.Format("grant_type=jwt_token");

            using (var writer = new StreamWriter(request.GetRequestStream()))
            {
                writer.Write(content);
            }

            try
            {
                var response = request.GetResponse();
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    var responseContent = reader.ReadToEnd();
                    var adResponse = JsonConvert.DeserializeObject<JObject>(responseContent);
                    return adResponse;
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

            return null;
        }

        /// <summary>
        /// Get AAD Secret Token
        /// </summary>
        /// <returns></returns>
        public static JObject GetAADSecretToken()
        {
            var request = WebRequest.Create(string.Format("{0}/{1}/oauth2/token/", AuthorityUrl, CustomerDomain));

            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            string content = string.Format(
                "grant_type=client_credentials&client_id={0}&client_secret={1}&resource={2}",
                client_id,
                HttpUtility.UrlEncode(client_secret),
                HttpUtility.UrlEncode(Authentications.ResourceUrl));

            using (var writer = new StreamWriter(request.GetRequestStream()))
            {
                writer.Write(content);
            }

            try
            {
                var response = request.GetResponse();
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    var responseContent = reader.ReadToEnd();
                    var adResponse = JsonConvert.DeserializeObject<JObject>(responseContent);
                    return adResponse;
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

            return null;
        }

        /// <summary>
        /// Get access token
        /// </summary>
        /// <returns></returns>
        public static JObject GetAppCredentialsToken()
        {
            var aadToken = GetAADSecretToken();

            var request = WebRequest.Create(string.Format("{0}/generatetoken", Authentications.PartnerServiceApiRoot));

            request.Headers.Add(HttpRequestHeader.Authorization, "Bearer " + aadToken["access_token"].ToString());
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            string content = string.Format("grant_type=jwt_token");

            using (var writer = new StreamWriter(request.GetRequestStream()))
            {
                writer.Write(content);
            }

            try
            {
                var response = request.GetResponse();
                using (var reader = new StreamReader(response.GetResponseStream()))
                {
                    var responseContent = reader.ReadToEnd();
                    var adResponse = JsonConvert.DeserializeObject<JObject>(responseContent);
                    return adResponse;
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

            return null;
        }

    }
}