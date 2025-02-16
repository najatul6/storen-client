import TotalRevenue from "./TotalRevenue";
import PendingRevenue from "./PendingRevenue";
import ProcessingRevenue from "./ProcessingRevenue";
import CompletedRevenue from "./CompletedRevenue";
import TotalProducts from "./TotalProducts";
import TotalOrders from "./TotalOrders";
import NewOrders from "./NewOrders";
import TotalCustomer from "./TotalCustomer";
import TotalSales from "./TotalSales";
import PieChart from "./PieChart";
import ColumnChart from "./ColumnChart";

const AdminOverview = () => {
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-5">
        {/* Total Revenue */}
        <TotalRevenue />

        {/* Pending Revenue */}
        <PendingRevenue />

        {/* Processing Revenue */}
        <ProcessingRevenue />

        {/* Completed Revenue */}
        <CompletedRevenue />

        {/* Pending Orders */}
        <NewOrders />

        {/* Processing Orders */}
        <TotalSales />

        {/* Complete Orders */}
        <TotalOrders />

        {/* Total Customers */}
        <TotalCustomer />

        {/* Total Products */}
        <TotalProducts />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="flex items-center justify-center w-full">
          <PieChart />
        </div>
        <div className="items-center justify-center w-full">
          <ColumnChart />
        </div>
      </section>
    </div>
  );
};

export default AdminOverview;
