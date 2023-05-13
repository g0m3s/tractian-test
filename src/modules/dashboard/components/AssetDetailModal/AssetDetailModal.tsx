import {
  Text,
  Radio,
  Stack,
  VStack,
  Select,
  RadioGroup,
  InputGroup,
  Image,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useMutation } from "@apollo/client";
import { useTranslation } from "next-i18next";

import { RightSideModal } from "~/components";

interface AssetsDetailModalProps {
  asset?: Asset;
  isOpen: boolean;
  onClose: () => void;
}

export const AssetDetailModal: React.FC<AssetsDetailModalProps> = ({
  asset,
  isOpen,
  onClose,
}) => {
  const { t } = useTranslation(["modules/reports", "common"]);

  return (
    <>
      <RightSideModal
        isOpen={isOpen}
        onClose={onClose}
        title={`${t("asset_detail")}`}
        _footer={{
          hide: true,
          text: t("request_report"),
          onClick: () => alert(""),
        }}
      >
        <Image alt={asset?.name} src={asset?.image} borderRadius={10} />
        <Text mt={5} textAlign={'center'} fontWeight={'bold'} fontSize={'3xl'}>{asset?.name}</Text>

        
        <Text mt={5} textAlign={'center'} fontWeight={'bold'} fontSize={'3xl'}>{asset?.name}</Text>

      </RightSideModal>
    </>
  );
};
