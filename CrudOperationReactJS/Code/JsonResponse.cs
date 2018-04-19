
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text;

namespace MvcUtils17Core
{
    public class JsonResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Object { get; set; }
        public List<KeyValuePair<string, string>> ValidationErrors { get; set; }

        public JsonResponse ErrorResponse(string error)
        {
            return new JsonResponse() { Success = false, Message = error };
        }

        public JsonResponse SuccessResponse()
        {
            return new JsonResponse() { Success = true };
        }

        public JsonResponse SuccessResponse(object referenceObject)
        {
            return new JsonResponse() { Success = true, Object = referenceObject };
        }

        public void AddModelError(string key, string message)
        {
            if (this.ValidationErrors == null)
                this.ValidationErrors = new List<KeyValuePair<string, string>>();
            this.ValidationErrors.Add(new KeyValuePair<string, string>(key, message));
        }

         
        public JsonResponse GetValidationErrors(ModelStateDictionary modelState, string message = "Field validation failed.", char separator = ';')
        {
            foreach (var key in modelState.Keys)
            {
                this.Success = true;
                if (modelState[key].Errors != null)
                {
                    this.Success = false;
                    this.Message = message;
                    var sbErrs = new StringBuilder();
                    foreach (var ve in modelState[key].Errors)
                    {
                        sbErrs.Append(ve.ErrorMessage + separator);
                    }
                    this.AddModelError(key, sbErrs.ToString().TrimEnd(separator));
                }
            }
            return this;
        }
    }
}
