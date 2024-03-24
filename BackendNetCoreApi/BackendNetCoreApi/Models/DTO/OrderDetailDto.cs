namespace BackendNetCoreApi.Models.DTO
{
    public class OrderDetailDto
    {

        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public double Discount { get; set; }
        public double Amount { get; set; }
        public double Price { get; set; }
        public int Qty { get; set; }
    }
}
