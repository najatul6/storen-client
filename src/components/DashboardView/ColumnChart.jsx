import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import useTotalRevenue from "@/hooks/useTotalRevenue";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ColumnChart = () => {
  const { totalRevenue, pendingRevenue, processingRevenue, completedRevenue } = useTotalRevenue();

  // Ensure values are numbers and default to 0 if undefined
  const revenueData = [
    totalRevenue || 0,
    pendingRevenue || 0,
    processingRevenue || 0,
    completedRevenue || 0,
  ];

  // Define chart data
  const data = {
    labels: ["Total Revenue", "Pending Revenue", "Processing Revenue", "Completed Revenue"],
    datasets: [
      {
        label: "Revenue (USD)",
        data: revenueData, // Use fetched revenue data dynamically
        backgroundColor: ["#FF6384", "#36A2EB", "#d4ff00", "#008000"],
        borderColor: ["#D8435D", "#1E75D8", "#D6A20A", "#008000"],
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start the y-axis from 0
        ticks: {
          callback: function (value) {
            return `$${value.toLocaleString()}`; // Format y-axis labels as currency
          },
        },
      },
    },
  };

  return (
    <div className="column-chart-container">
      <h3 className="text-lg font-semibold mb-2">Revenue Breakdown</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ColumnChart;
