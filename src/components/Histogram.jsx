import style from "./Histogram.module.css";
import Chart from "react-apexcharts";
import Loading from "./Loading";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";

const Histogram = ({ freqWords }) => {
  const [chart, setChart] = useState(0);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  //   const [arrOcc, setArrOcc] = useState([]);
  //   const [arrWords, setArrWords] = useState([]);
  let arrOcc, arrWords;

  useEffect(() => {
    arrWords = freqWords.map(([ele1]) => ele1);
    arrOcc = freqWords.map(([, ele2]) => ele2);

    // setArrOcc(chart.map(([ele1]) => ele1));
    // setArrWords(chart.map(([, ele2]) => ele2));
    setChart({
      options: {
        chart: {
          id: "basic-bar",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: 1,
          colors: ["#FFA500"],
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "0.9em",
              colors: "white",
            },
          },
          categories: [...arrWords],
        },
        yaxis: {
          labels: {
            style: {
              colors: "white",
              fontSize: "0.8rem",
            },
          },
        },
        theme: {
          palette: "palette2 ",
          mode: "dark",
        },
        plotOptions: {
          bar: {
            columnWidth: "100%",
          },
        },
      },

      series: [
        {
          name: "Words",
          data: [...arrOcc],
        },
      ],
    });
  }, [freqWords]);

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    worksheet.addRow(["Words", "Frequency"]);
    freqWords.forEach((ele) => {
      worksheet.addRow([ele[0], ele[1]]);
    });

    const buffer = await workbook.csv.writeBuffer();
    const blob = new Blob([buffer], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "top20MostOccWords.csv");
  };

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  //To make Histogram Responsive
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  return (
    <div>
      <h1>Inside</h1>
      {chart != 0 ? (
        <>
          <Chart
            options={chart.options}
            series={chart.series}
            type="bar"
            width={Math.min(800, screenSize.width - 150)}
          />
          <button className={style.btnStyle} onClick={handleExport}>
            Download CSV
          </button>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Histogram;
