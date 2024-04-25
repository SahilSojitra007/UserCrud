using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using UserCrud.Models;

namespace UserCrud.Models
{
    public class UserDAL
    {
        public SqlConnection Con = new SqlConnection(ConfigurationManager.ConnectionStrings["MyCon"].ConnectionString);

        public List<UserModel> GetUserData()
        {
            List<UserModel> Lst = new List<UserModel>();
            SqlCommand Cmd = new SqlCommand("Sp_Select_User", Con);
            Cmd.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter Sda = new SqlDataAdapter(Cmd);
            DataTable Dt = new DataTable();
            Sda.Fill(Dt);

            foreach (DataRow Dr in Dt.Rows)
            {
                Lst.Add(new UserModel
                {
                    Id = Convert.ToInt32(Dr[0]),
                    Name = Convert.ToString(Dr[1]),
                    Email = Convert.ToString(Dr[2]),
                    PhoneNo = Convert.ToString(Dr[3]),
                    Address = Convert.ToString(Dr[4]),
                    State = Convert.ToString(Dr[5]),
                    City = Convert.ToString(Dr[6]),
                    Agree = Convert.ToBoolean(Dr[7]),
                });
            }

            return Lst;
        }

        public bool InsertUserData(UserModel User)
        {
            int i;
            SqlCommand Cmd = new SqlCommand("Sp_Insert_User", Con);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Name", User.Name);
            Cmd.Parameters.AddWithValue("@Email", User.Email);
            Cmd.Parameters.AddWithValue("@PhoneNo", User.PhoneNo);
            Cmd.Parameters.AddWithValue("@Address", User.Address);
            Cmd.Parameters.AddWithValue("@State", User.State);
            Cmd.Parameters.AddWithValue("@City", User.City);
            Cmd.Parameters.AddWithValue("@Agree", User.Agree);

            Con.Open();
            i = Cmd.ExecuteNonQuery();
            Con.Close();

            if (i >= 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool UpdateUserData(UserModel User)
        {
            int i;
            SqlCommand Cmd = new SqlCommand("Sp_Update_User", Con);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Id", User.Id);
            Cmd.Parameters.AddWithValue("@Name", User.Name);
            Cmd.Parameters.AddWithValue("@Email", User.Email);
            Cmd.Parameters.AddWithValue("@PhoneNo", User.PhoneNo);
            Cmd.Parameters.AddWithValue("@Address", User.Address);
            Cmd.Parameters.AddWithValue("@State", User.State);
            Cmd.Parameters.AddWithValue("@City", User.City);
            Cmd.Parameters.AddWithValue("@Agree", User.Agree);

            Con.Open();
            i = Cmd.ExecuteNonQuery();
            Con.Close();

            if (i >= 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool DeleteUserData(int id)
        {
            int i;
            SqlCommand Cmd = new SqlCommand("Sp_Delete_User", Con);
            Cmd.CommandType = CommandType.StoredProcedure;
            Cmd.Parameters.AddWithValue("@Id", id);

            Con.Open();
            i = Cmd.ExecuteNonQuery();
            Con.Close();

            if (i >= 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public DataSet Get_State()
        {
            SqlCommand Cmd = new SqlCommand("select * from Tbl_State", Con);
            SqlDataAdapter Sda = new SqlDataAdapter(Cmd);
            DataSet Ds = new DataSet();
            Sda.Fill(Ds);
            return Ds;
        }

        public DataSet Get_City(string State_Id)
        {
            SqlCommand Cmd = new SqlCommand("select * from Tbl_City where State_Id = @State_Id", Con);
            Cmd.Parameters.AddWithValue("State_Id", State_Id);
            SqlDataAdapter Sda = new SqlDataAdapter(Cmd);
            DataSet Ds = new DataSet();
            Sda.Fill(Ds);
            return Ds;
        }
    }
}