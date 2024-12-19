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
        labels: ["Current Done" ,"Total Assigned"],
        datasets: [
          {
            label: "Tasks",
            data: [left , Total],
            backgroundColor: ["#FFDDC1", "#A8E6CF"], 
            hoverBackgroundColor: ["#FFC5A1", "#81D4A3"],
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
    <>
    <div className='hidden md:block'> <Doughnut data={data} options={options} /> </div>

    <div className='md:hidden block h-52'> <Doughnut data={data} options={options} /> </div>
    </>
  )
}

export default Chart