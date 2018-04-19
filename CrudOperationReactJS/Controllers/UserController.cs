using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Web.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc.Filters;
using MvcUtils17Core;
using System.Linq.Dynamic;
using CrudOperationReactJS;
using CrudOperationReactJS.Models;

namespace CrudOperationReactJS.Controllers
{
   
    [Route("api/[controller]")]
    public class UserController : Controller
    {
		 
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _db.Users.ToList();
        }

	 
		[HttpGet("[action]")]
        public PagedList<User> Index(int page = 0, string sort = "")
        {
            if (!string.IsNullOrEmpty(sort))
                return _db.Users 
                        .OrderBy(sort)
                        .ToPagedList(page, _pageSize);
            else
                return _db.Users.ToPagedList(page, _pageSize);
        }

	 
        [HttpGet("[action]")]
        public PagedListInfo IndexInfo()
        {
            var cnt = _db.Users.Count();
			return new PagedListInfo(cnt, _pageSize);
        }

		 
        [HttpGet]
        
        [Route("[action]/{id}")]
        public User Get(int id)
        {
             
			return _db.Users.Find(new object[] { id });
        }
		
	 
		[HttpPost]
        [Route("[action]")]
        public JsonResponse Post([FromBody]User item)
        {
            if (item==null )
                return new JsonResponse().ErrorResponse("No data was posted");
            
			/* validation*/
            if (!ModelState.IsValid) {
                return new JsonResponse().GetValidationErrors(ModelState);
             }

			_db.Users.Add(item);
            int i = _db.SaveChanges();
            return (i > 0 ? new JsonResponse().SuccessResponse()
                : new JsonResponse().ErrorResponse("Record could not be added."));
        }

		//
		[HttpPut]
        [Route("[action]")]
        public JsonResponse Put([FromBody]User item)
        {
            if (item == null)
                return new JsonResponse().ErrorResponse("Invalid data");
            
            /* validation*/
            if (!ModelState.IsValid)
            {
                return new JsonResponse().GetValidationErrors(ModelState);
            }

			_db.Users.Update(item);
            int i = _db.SaveChanges();
            return (i > 0 ? new JsonResponse().SuccessResponse()
                : new JsonResponse().ErrorResponse("Record could not be updated."));
        }
		
		//
        [HttpDelete]
        // [Route("[action]/{id}")]
        // public JsonResponse Delete(int id)
        [Route("[action]/{id}")]
        public JsonResponse Delete(int id)
        {
            //var rec = _db.Users.Find(new object[] { id });
			var rec = _db.Users.Find(new object[] { id});
            if (rec == null)
                //return new JsonResponse().ErrorResponse("Invalid Id");
				return new JsonResponse().ErrorResponse("Invalid Key");
            _db.Users.Remove(rec);
            int i = _db.SaveChanges();
            return (i > 0 ? new JsonResponse().SuccessResponse()
                : new JsonResponse().ErrorResponse("Record could not be deleted."));
        }
		
        private readonly AppDbContext _db;
        private readonly IConfiguration _config;
		private readonly int _pageSize = 8;
		
        public UserController(AppDbContext context, IConfiguration config)
        {
            _db = context;
            _config = config;
            if (_config["PageSize"] != null)
                _pageSize = int.Parse(_config["PageSize"]);
        }
		
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            var s = Request;
        }
    }
}
