using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MVC_Start.Models;
using Microsoft.EntityFrameworkCore;
using MVC_Start.DataAccess;

namespace MVC_Start.Controllers
{

    public class HomeController : Controller
    {
        public ApplicationDbContext dbContext;

        public HomeController(ApplicationDbContext context)
        {
            dbContext = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetSubProducts()
        {
            var subProducts = await dbContext.SubProducts.ToListAsync();
            return Json(subProducts);
        }

        public async Task<IActionResult> GetComplaintsForSubProduct(string subProductId)
        {
            var complaints = await dbContext.Complaints
                                        .Where(c => c.SubProduct.Id == subProductId)
                                        .Select(c => new 
                                        {
                                            c.ComplaintId,
                                            c.CompanyResponse,
                                            c.State,
                                            c.DateReceived,
                                            CompanyName = c.Company.Name,
                                        })
                                        .ToListAsync();
            Console.WriteLine(Json(complaints));
            return Json(complaints);
        }

        public async Task<IActionResult> Complaints()
        {
            var subProducts = await dbContext.SubProducts.ToListAsync();
            return View(subProducts);
        }

        public async Task<IActionResult> EditComplaint(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var complaint = await dbContext.Complaints
                .Include(c => c.Company)
                .Include(c => c.SubProduct)
                .FirstOrDefaultAsync(m => m.ComplaintId == id);
            if (complaint == null)
            {
                return NotFound();
            }
            return View(complaint);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("ComplaintId, IssueName, ComplaintWhatHappened, State, ZipCode, CompanyResponse")] Complaint complaint)
        {
            if (id != complaint.ComplaintId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                var complaintToUpdate = await dbContext.Complaints.FindAsync(id);
                if (complaintToUpdate == null)
                {
                    return NotFound();
                }
                complaintToUpdate.IssueName = complaint.IssueName;
                complaintToUpdate.ComplaintWhatHappened = complaint.ComplaintWhatHappened;
                complaintToUpdate.State = complaint.State;
                complaintToUpdate.ZipCode = complaint.ZipCode;
                complaintToUpdate.CompanyResponse = complaint.CompanyResponse;
                try
                {
                    dbContext.Update(complaintToUpdate);
                    await dbContext.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                }
                return RedirectToAction("ComplaintDetails", new { id = complaint.ComplaintId });
            }
            return View(complaint);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteComplaint(string id)
        {
            var complaint = await dbContext.Complaints.FindAsync(id);
            if (complaint == null)
            {
                return Json(new { success = false });
            }

            dbContext.Complaints.Remove(complaint);
            await dbContext.SaveChangesAsync();
            return Json(new { success = true });
        }


        [HttpGet]
        [Route("Home/ComplaintDetails")]
        public async Task<IActionResult> ComplaintDetails(string id)
        {
            if (id == null)
            {
                return View();
            }

            var complaint = await dbContext.Complaints
                .Include(c => c.Company)
                .Include(c => c.SubProduct)
                .FirstOrDefaultAsync(m => m.ComplaintId == id);

            if (complaint == null)
            {
                return NotFound();
            }

            return View(complaint);
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