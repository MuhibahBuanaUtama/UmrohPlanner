import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
  Title,
  ChartDataLabels,
);

const predefinedColors = [
  { borderColor: "rgb(30 27 75)", backgroundColor: "rgb(30, 27, 75, 0.2)" },
  {
    borderColor: "rgb(147 197 253)",
    backgroundColor: "rgb(147, 197, 253, 0.2)",
  },
  {
    borderColor: "rgb(253 186 116)",
    backgroundColor: "rgb(253, 186, 116, 0.2)",
  },
  {
    borderColor: "rgb(238 242 255)",
    backgroundColor: "rgb(238, 242, 255, 0.2)",
  },
  {
    borderColor: "rgb(229 231 235)",
    backgroundColor: "rgb(229, 231, 235, 0.2)",
  },
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * predefinedColors.length);

  return predefinedColors[randomIndex];
};

const ChartComponent = ({ type, title, columns, initialData, chartLabel }) => {
  const storedDark = localStorage.getItem("dark") === "true";
  const label = initialData.map((item) => item[columns[0].key]);
  const data = initialData.map((item) => item[columns[1].key]);

  const generateColors = (dataLength) => {
    return Array.from({ length: dataLength }, () => getRandomColor());
  };

  const colors = generateColors(data.length);

  const lineData = {
    labels: label,
    datasets: [
      {
        label: chartLabel,
        data: data,
        borderJoinStyle: "miter",
        pointRadius: 4,
        backgroundColor: "rgb(30, 27, 75, 0.2)",
        borderColor: storedDark ? "rgb(253 186 116)" : "rgb(30 27 75)",
        pointBackgroundColor: storedDark ? "rgb(30 27 75)" : "rgb(253 186 116)",
        pointBorderColor: "#ffffff",
        fill: type === "area" && true,
      },
    ],
  };

  const barData = {
    labels: label,
    datasets: [
      {
        label: chartLabel,
        data: data,
        borderColor: colors.map((color) => color.borderColor),
        backgroundColor: colors.map((color) => color.backgroundColor),
        borderWidth: 1,
      },
    ],
  };

  const doughnutData = {
    labels: label,
    datasets: [
      {
        label: chartLabel,
        data: data,
        hoverOffset: 4,
        borderJoinStyle: "miter",
        hoverBorderDash: [2],
        backgroundColor: colors.map((color) => color.borderColor),
        borderColor: "rgb(243 244 246)",
      },
    ],
  };

  const options = {
    plugins: {
      title: title
        ? {
            display: true,
            text: title,
            font: {
              size: 12,
            },
            color: storedDark ? "rgb(156 163 175)" : "rgb(75 85 99)",
          }
        : undefined,
      ...((type === "doughnut") & (type === "pie") && {
        datalabels: {
          color: "#ffffff",
          formatter: (value, context) => {
            return context.chart.data.labels[context.dataIndex];
          },
          font: {
            weight: "bold",
            size: 12,
          },
        },
      }),
    },
    scales: {
      x: {
        ticks: {
          color: storedDark ? "rgb(156 163 175)" : "rgb(75 85 99)",
        },
      },
      y: {
        beginAtZero: type === "bar" && true,
        ticks: {
          color: storedDark ? "rgb(156 163 175)" : "rgb(75 85 99)",
        },
      },
    },
  };

  return (
    <>
      {type === "bar" ? (
        <Bar data={barData} options={options} />
      ) : type === "doughnut" ? (
        <Doughnut data={doughnutData} />
      ) : type === "pie" ? (
        <Pie data={doughnutData} />
      ) : (
        <Line data={lineData} options={options} />
      )}
    </>
  );
};

export default ChartComponent;
