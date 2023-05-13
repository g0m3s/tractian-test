import type {
  ComponentStyleConfig,
  SystemStyleFunction,
} from '@chakra-ui/react';
import type { SystemStyleObject } from '@chakra-ui/styled-system';

const baseStyle: SystemStyleObject = {
  dialog: {
    borderRadius: 'xl',
    margin: 5,
  },
  header: {
    paddingX: { base: 5, md: 8 },
    paddingY: { base: 6, md: 10 },
    fontSize: { base: '2xl', md: '3xl' },
    lineHeight: 'shorter',
    fontWeight: 'semibold',
    fontFamily: 'heading',
    letterSpacing: 'tight',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 6,
    insetEnd: 6,
    width: 10,
    height: 10,
    borderWidth: 2,
    borderColor: '#1677FF',
    borderRadius: 'full',
  },
  body: {
    paddingX: { base: 5, md: 8 },
    paddingY: 0,
  },
  footer: {
    paddingX: { base: 5, md: 8 },
    paddingY: { base: 8, md: 10 },
  },
};

const variantRightAlign: SystemStyleFunction = (props) => {
  const { theme } = props;

  return {
    header: {
      paddingTop: { base: 5, md: 6 },
      paddingBottom: { base: 5, md: 6 },
      textAlign: 'left',
      fontSize: { base: '2xl', md: '3xl' },
    },
    dialogContainer: {
      justifyContent: 'flex-end',
    },
    dialog: {
      height: `calc(100% - ${theme['space']['10']})`,
    },
    closeButton: {
      top: { base: 5, md: 6 },
      insetEnd: { base: 5, md: 6 },
      width: 9,
      height: 9,
      _hover: { backgroundColor: 'transparent' },
    },
    body: {
      paddingBottom: 6,
      overflow: 'auto',
    },
    footer: {
      paddingX: 0,
      paddingY: 0,
      height: { base: '3.125rem', md: '3.75rem' },
      background: '#1677FF',
      justifyContent: 'center',
      borderBottomRightRadius: 'xl',
      borderBottomLeftRadius: 'xl',
      position: 'relative',
      _before: {
        content: '""',
        position: 'absolute',
        top: -8,
        left: 0,
        w: 8,
        h: 8,
        borderBottomLeftRadius: '50%',
        boxShadow: `0 ${theme['space']['4']} 0 0 #1677FF`,
      },
      _after: {
        content: '""',
        position: 'absolute',
        top: -8,
        right: 0,
        w: 8,
        h: 8,
        borderBottomRightRadius: '50%',
        boxShadow: `0 ${theme['space']['4']} 0 0 #1677FF`,
      },
    },
  };
};

export const ModalStyle: ComponentStyleConfig = {
  baseStyle,
  variants: {
    'right-align': variantRightAlign,
  },
  defaultProps: {
    isCentered: true,
    size: 'lg',
  },
};
