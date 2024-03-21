using System.ComponentModel.DataAnnotations;

namespace BackendNetCoreApi.Models
{
    public class Category
    {

        [Key]
        public int ProductId

        {
            get;
            set;
        }
        public string ProductName
        {   
            get;
            set;
        }
        public string ProductPrice

        {
            get;
            set;
        }
        public decimal ProductQuantity
        {
            get;
            set;
        }

    }
}
