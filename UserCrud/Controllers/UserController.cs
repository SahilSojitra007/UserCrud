using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using UserCrud.Models;
using System.Data;
using System.Data.SqlClient;


namespace UserCrud.Controllers
{
    public class UserController : Controller
    {
        UserDAL UD = new UserDAL();
        public ActionResult Index()
        {
            ModelState.Clear();
            StateBind();
            return View(UD.GetUserData());
        }

        public void StateBind()
        {
            DataSet ds = UD.Get_State();
            List<SelectListItem> Statelist = new List<SelectListItem>();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                Statelist.Add(new SelectListItem { Text = dr["State_Name"].ToString(), Value = dr["State_id"].ToString() });
            }
            ViewBag.State = Statelist;
        }

        public ActionResult CityBind(string State_Id)
        {
            DataSet ds = UD.Get_City(State_Id);
            List<SelectListItem> Citylist = new List<SelectListItem>();
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                Citylist.Add(new SelectListItem { Text = dr["City_Name"].ToString(), Value = dr["City_id"].ToString() });
            }
            return Json(Citylist, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Create(UserModel User)
        {
            try
            {
                if (UD.InsertUserData(User))
                {
                    return Json(new { success = true, message = "Saved Successfully ..." });
                }

                return Json(new { success = false, message = "Save operation failed" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An error occurred while saving the data: " + ex.Message });
            }
        }

        public JsonResult Edit(int id)
        {
            var user = UD.GetUserData().Find(x => x.Id == id);
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult Edit(UserModel User)
        {
            try
            {
                if (UD.UpdateUserData(User))
                {
                    return Json(new { success = true, message = "Updated Successfully ..." });
                }

                return Json(new { success = false, message = "update operation failed" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An error occurred while updating the data: " + ex.Message });
            }
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            try
            {
                if (UD.DeleteUserData(id))
                {
                    return Json(new { success = true, message = "Deleted Successfully ..." });
                }

                return Json(new { success = false, message = "delete operation failed" });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An error occurred while deleting the data: " + ex.Message });
            }
        }

    }
}