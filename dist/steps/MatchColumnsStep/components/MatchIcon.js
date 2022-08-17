import { jsx } from 'react/jsx-runtime';
import { Flex, useStyleConfig, chakra } from '@chakra-ui/react';
import { dataAttr } from '@chakra-ui/utils';
import { motion } from 'framer-motion';
import { CgCheck } from 'react-icons/cg';

const MotionFlex = motion(Flex);
const animationConfig = {
    transition: {
        duration: 0.1,
    },
    exit: { scale: 0.5, opacity: 0 },
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
};
const MatchIcon = (props) => {
    const style = useStyleConfig("MatchIcon", props);
    return (jsx(chakra.div, { __css: style, minW: 6, minH: 6, w: 6, h: 6, ml: "0.875rem", mr: 3, "data-highlighted": dataAttr(props.isChecked), "data-testid": "column-checkmark", children: props.isChecked && (jsx(MotionFlex, { ...animationConfig, children: jsx(CgCheck, { size: "1.5rem" }) })) }));
};

export { MatchIcon };
