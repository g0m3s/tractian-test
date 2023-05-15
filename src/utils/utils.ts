import { AssetStatus } from "~/types/api";
import { generateStatusColor } from "~/modules/dashboard/components";

export const generateOptions = (
  value: number,
  title: string,
  status?: AssetStatus
): Highcharts.Options => {
  const valueColor = generateStatusColor(status);

  return {
    title: {
      text: `${title}: ${value}%`,
      style: {
        fontSize: "12px",
      },
    },
    credits: {
      enabled: false,
    },
    chart: {
      height: "120px",
      backgroundColor: "transparent",
    },
    series: [
      {
        dataLabels: {
          enabled: false,
          alignTo: "center",
        },
        size: 80,
        gapSize: 30,
        type: "pie",
        thickness: 10,
        borderRadius: 10,
        showInLegend: false,
        data: [100 - value, value],
        borderColor: "transparent",
        colors: ["transparent", valueColor],
      },
    ],
  };
};
