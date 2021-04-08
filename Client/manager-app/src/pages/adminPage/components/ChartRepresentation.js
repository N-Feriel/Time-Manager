import React, { useState, useCallback } from "react";

import { Bar, Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import { useTransition, animated } from "react-spring";

function ChartRepresentation() {
  const {
    status,
    stats,
    StatMothers,
    statOneToOne,
    StatGDaughters,
  } = useSelector((state) => state.stat);

  const labelsStat = [];
  const dataStat = [];

  let borderColors = [];
  let backgroundColor = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(255, 205, 86, 0.6)",
    "rgba(53, 102, 255, 0.7)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 159, 64, .7)",
    "rgba(153, 102, 255, 0.7)",
  ];

  let dataGM = [],
    dataGD = [];

  const labelsOneToOne = [];
  const dataOneToOne = [];

  if (status === "idle") {
    stats.map((stat) => {
      labelsStat.push(stat._id);
      dataStat.push(stat.total);
      borderColors.push("rgba(255, 206, 86, 0.2)");
    });
    StatMothers.map((user) => {
      if (user._id) {
        dataGM[0] = user.count;
      } else {
        dataGM[1] = user.count;
      }
    });

    StatGDaughters.map((user) => {
      if (user._id) {
        dataGD[0] = user.count;
      } else {
        dataGD[1] = user.count;
      }
    });

    statOneToOne.map((type) => {
      labelsOneToOne.push(type._id);
      dataOneToOne.push(type.total);
    });
  }

  const dataBar = {
    labels: ["Actives", "Archives"],
    datasets: [
      {
        label: "GMothers",
        data: dataGM,
        backgroundColor: ["rgba(53, 102, 255, 0.7)", "rgba(53, 102, 255, 0.7)"],
        borderColors: ["rgba(53, 102, 255, 0.7)", "rgba(53, 102, 255, 0.7)"],
      },

      {
        label: "GDaughters",
        data: dataGD,
        backgroundColor: [
          "rgba(153, 102, 255, 0.7)",
          "rgba(153, 102, 255, 0.7)",
        ],
        borderColors: ["rgba(153, 102, 255, 0.7)", "rgba(153, 102, 255, 0.7)"],
      },
    ],
  };

  const dataDoughnut = {
    labels: labelsStat,
    datasets: [
      {
        label: "Total Time for 2021",
        borderColor: borderColors,
        backgroundColor: backgroundColor,
        data: dataStat,
      },
    ],
  };

  const options2 = {
    title: {
      display: true,
      fontSize: 18,
      text: "Total Time for 2021",
      position: "bottom",
    },
    legend: {
      display: true,
      position: "left",
    },
    maintainAspectRatio: false,
  };

  const options3 = {
    title: {
      display: true,
      fontSize: 18,
      text: "Total Time OneToOne for 2021",
      position: "bottom",
    },
    legend: {
      display: true,
      position: "right",
    },
    maintainAspectRatio: false,
  };

  const dataDoughnut2 = {
    labels: labelsOneToOne,
    datasets: [
      {
        label: "Total OneToOne for 2020",
        borderColor: borderColors,
        backgroundColor: backgroundColor,
        data: dataOneToOne,
      },
    ],
  };

  const options1 = {
    title: {
      display: true,
      text: "Total Members",
      fontSize: 18,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            stepSize: 5,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };

  return (
    <Wrapper>
      <div className="bChart">
        <Bar data={dataBar} options={options1} />
      </div>

      <div className="bChart">
        <Doughnut data={dataDoughnut} options={options2} />
      </div>
      <div className="bChart">
        <Doughnut data={dataDoughnut2} options={options3} />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 2rem 10rem;
  display: flex;
  width: 80%;
  height: 70vh;
  scroll-behavior: smooth;
  overflow-x: scroll;

  & .bChart {
    position: relative;
    margin: auto 6rem;
    height: 60vh;
    width: 100vw;
  }
`;

export default ChartRepresentation;
