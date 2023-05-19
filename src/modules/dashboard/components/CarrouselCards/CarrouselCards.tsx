// import "react-multi-carousel/lib/styles.css";

// import { Fragment } from "react";
// import Carousel from "react-multi-carousel";
// import { AlertOctagon, Droplet } from "react-feather";
// import {
//   HStack,
//   Icon,
//   IconButton,
//   Stack,
//   Text,
//   VStack,
// } from "@chakra-ui/react";
// import { useTranslation } from "next-i18next";

// const responsive = {
//   desktop: {
//     items: 1,
//     paritialVisibilityGutter: 60,
//     breakpoint: { max: 3000, min: 1024 },
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//     paritialVisibilityGutter: 50,
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     paritialVisibilityGutter: 30,
//   },
// };

// const items = [
//   {
//     icon: AlertOctagon,
//     iconColor: "red",
//     title: "Falhas de engrenagem",
//     description: "Desgaste de dentes e excentricidade do eixo",
//   },
//   {
//     icon: Droplet,
//     title: "Cavitação",
//     iconColor: "orange",
//     description: "Alto risco de deterioração das pás",
//   },
//   {
//     icon: AlertOctagon,
//     iconColor: "red",
//     title: "Falhas de engrenagem",
//     description: "Desgaste de dentes e excentricidade do eixo",
//   },
// ];

// const Card: React.FC<{ deviceType: any }> = ({ deviceType }) => {
//   return (
//     <Carousel
//       ssr

//       autoPlay
//       infinite
//       pauseOnHover
//       arrows={false}
//       partialVisbile
//       autoPlaySpeed={5000}
//       deviceType={"desktop"}
//       responsive={responsive}
//     >
//       {items.map((item) => {
//         return (
//           <HStack
//             // p={5}
//             w={"100%"}
//             h={"100px"}
//             borderRadius={10}
//             backdropBlur={"2xl"}
//             bgColor={"rgba(255, 255, 255, 1)"}
//           >
//             <Icon
//               pl={2}
//               w={"50px"}
//               h={"50px"}
//               as={item.icon}
//               color={item.iconColor}
//             />
//             <VStack pl={2} alignItems={"flex-start"}>
//               <Text fontWeight={"bold"}>{item.title}</Text>
//               <Text fontSize={"sm"}>{item.description}</Text>
//             </VStack>
//           </HStack>
//         );
//       })}
//     </Carousel>
//   );
// };

// export const CarrouselCards: React.FC = () => {
//   const { t } = useTranslation("common");
//   return (
//     <Stack
//       borderRadius={20}
//       p={5}
//       h="100%"
//       w="100%"

//     >
//       <Text fontWeight={"bold"} fontSize={"2xl"} color="#FFF">
//         {t("last_insights")}
//       </Text>
//       <Fragment>
//         <section
//           style={{
//             margin: "20px 0 20px 0",
//           }}
//         >
//           <Card deviceType={"desktop"} />
//         </section>
//       </Fragment>
//     </Stack>
//   );
// };

import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { AlertOctagon, Droplet } from "react-feather";

const items = [
  {
    icon: AlertOctagon,
    iconColor: "red",
    title: "Falhas de engrenagem",
    description: "Desgaste de dentes e excentricidade do eixo",
  },
  {
    icon: Droplet,
    title: "Cavitação",
    iconColor: "orange",
    description: "Alto risco de deterioração das pás",
  },
  {
    icon: AlertOctagon,
    iconColor: "red",
    title: "Falhas de engrenagem",
    description: "Desgaste de dentes e excentricidade do eixo",
  },
];

const Card: React.FC<{ item: any }> = ({ item }) => {
  return (
    <VStack
      p={3}
      my={3}
      w={"100%"}
      h={"250px"}
      borderRadius={10}
      backdropBlur={"2xl"}
      alignItems={'flex-start'}
      justifyContent={'center'}
      boxShadow={'0px 0px 5px rgba(0,0,0,.08)'}
    >
      <HStack>
        <Icon
          pl={2}
          w={"50px"}
          h={"50px"}
          as={item.icon}
          color={item.iconColor}
        />
        <Text fontWeight={"bold"}>{item.title}</Text>
      </HStack>
      <VStack pl={2} alignItems={"flex-start"}>
        <Text fontSize={"sm"}>{item.description}</Text>
      </VStack>
    </VStack>
  );
};

export const CarrouselCards: React.FC = () => {
  const settings: Settings = {
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
  };

  return (
    <Stack p={5} w="100%">
      <Slider {...settings}>
        <Card item={items[0]} />
        <Card item={items[1]} />
        <Card item={items[2]} />
      </Slider>
    </Stack>
  );
};
