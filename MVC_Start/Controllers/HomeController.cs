using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MVC_Start.Models;

namespace MVC_Start.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Complaints()
        {
            return View();
        }

        [HttpGet]
        [Route("Home/ComplaintDetails")]
        public IActionResult ComplaintDetails(string id)
        {
            ViewBag.ComplaintId = id;
            return View();
        }

        public IActionResult ComplaintSubmit()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }
    }
}