﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserCrud.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNo { get; set; }
        public string Address { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public bool Agree { get; set; }
    }
}