import { AssetStatus } from "~/types/api";
import { generateStatusTagColor } from "~/modules/dashboard/components";

export const getCookie = (cookieName: string) => {
  if (document) {
    const cookie = {} as any;
    document.cookie.split(';').forEach(function (el) {
      const [k, v] = el.split('=');
      cookie[k.trim()] = v;
    });
    return cookie[cookieName];
  }
};

interface generateOptionsProps {
  value: number;
  title: string;
  color?: string;
  isMobile?: boolean;
  status?: AssetStatus;
}

export const generateOptions = ({
  color,
  title,
  value,
  status,
  isMobile,
}: generateOptionsProps): Highcharts.Options => {
  const valueColor = generateStatusTagColor(status);

  return {
    title: {
      text: `${title}: ${value}%`,
      style: {
        fontSize: "12px",
        color: color || 'initial'
      },
    },
    credits: {
      enabled: false,
    },
    chart: {
      backgroundColor: "transparent",
      height: isMobile ? "100%" : "120px",
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
