import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({left,Total}) => {

    const data = {
        labels: ["Used" ,"Total Assigned"],
        datasets: [
          {
            label: "Tasks",
            data: [left , Total],
            backgroundColor: ["#A8E6CF", "#FFDDC1"], 
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
                `${context.label}: ${context.raw} Sheets`, // Customize tooltip labels
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