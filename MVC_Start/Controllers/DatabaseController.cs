using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MVC_Start.DataAccess;
using MVC_Start.Models;

namespace MVC_Start.Controllers
{
    public class DatabaseController : Controller
    {
        public ApplicationDbContext dbContext;

        public DatabaseController(ApplicationDbContext context)
        {
            dbContext = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<ViewResult> DatabaseOperations()
        {
            return View();
        }

        public ViewResult LINQOperations()
        {
            return View();
        }

    }
}