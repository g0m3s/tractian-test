import { useRef } from "react";
import * as Highcharts from "highcharts";
import { useTranslation } from "next-i18next";
import { Stack, Text } from "@chakra-ui/react";
import HighchartsReact from "highcharts-react-official";

export const WorkOrdersChart: React.FC = () => {
  const { t } = useTranslation("common");
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "",
    },
    plotOptions: {
      pie: {
        innerSize: "60%",
        borderWidth: 0,
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: "pie",
        gapSize: 50,
        borderRadius: 0,
        name: "Tarefas",
        data: [
          {
            y: 2,
            color: "rgba(50,205,50, .8)",
            name: "Concluídas",
          },
          {
            y: 1,
            name: "Em Andamento",
            color: "rgba(255,255,0,.8)",
          },
          {
            y: 0,
            color: "#242424",
            name: "Não Iniciadas",
          },
        ],
      },
    ],
    credits: {
      enabled: false,
    },
  };

  return (
    <Stack w="100%" borderRadius={20}>
      <Text
        color="#242424"
        fontSize={"xl"}
        textAlign={"center"}
        fontWeight={"bold"}
      >
        {t("todo_tasks_state")}
      </Text>
      <HighchartsReact
        options={options}
        highcharts={Highcharts}
        ref={chartComponentRef}
      />
    </Stack>
  );
};
