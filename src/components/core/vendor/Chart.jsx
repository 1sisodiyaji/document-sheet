import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {

    const data = {
        labels: ["This Month", "Remaining"],
        datasets: [
          {
            label: "Tasks",
            data: [35, 65], // Example: 35 tasks completed, 65 remaining
            backgroundColor: ["#A8E6CF", "#FFDDC1"], // Colors for the chart
            hoverBackgroundColor: ["#81D4A3", "#FFC5A1"],
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.label}: ${context.raw} tasks`, // Customize tooltip labels
            },
          },
        },
        cutout: "70%", // To create a donut-like chart
      };

      
  return (
    <Doughnut data={data} options={options} />
  )
}

export default Chart