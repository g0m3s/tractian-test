import { useMemo } from "react";
import Highcharts from "highcharts";
import { useTranslation } from "next-i18next";
import { HealthHistoryData } from "~/types/api";
import HighchartsReact from "highcharts-react-official";

interface HealthHistoryChartProps {
  healthHistory?: Array<HealthHistoryData>;
}
export const HealthHistoryChart: React.FC<HealthHistoryChartProps> = ({
  healthHistory,
}) => {
  const { t } = useTranslation("modules/dashboard");

  const healthHistoryChartData = useMemo(
    () =>
      healthHistory?.map((item) => ({
        x: new Date(item.timestamp).getTime(),
        y: item.status === "inOperation" ? 1 : 0,
      })),
    [healthHistory]
  );

  const options: Highcharts.Options = {
    title: {
      text: t("details.health_history") as string,
    },
    xAxis: {
      tickLength: 0,
      type: "datetime",
      gridLineWidth: 0,
    },
    yAxis: {
      title: {
        text: "",
      },
      tickLength: 0,
      gridLineWidth: 0,
      categories: ["Down", "Up"],
    },
    chart: {
      backgroundColor: "transparent",
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: "spline",
        name: "Status",
        data: healthHistoryChartData,
        lineWidth: 2,
        marker: {
          lineWidth: 0.5,
          enabled: true,
          fillColor: "#FFF",
          lineColor: "#000",
        },
        color: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, "green"],
            [0.5, "yellow"],
            [1, "red"],
          ],
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
