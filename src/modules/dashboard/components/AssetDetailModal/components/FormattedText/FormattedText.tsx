import { Text } from "@chakra-ui/react";

interface FormattedTextProps {
  hide?: boolean;
  description: string;
  content?: string | number | null;
}

export const FormattedText: React.FC<FormattedTextProps> = (props) => {
  const { hide, content, description } = props;

  if (!content || hide) return null;
  return (
    <Text>
      <b>{description}: </b>
      {content}
    </Text>
  );
};
