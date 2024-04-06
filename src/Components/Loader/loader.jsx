import React from 'react';
import { css, keyframes } from '@emotion/react';
import { styled } from '@mui/system';
import { themeColor3 } from '../../config';

const spinnerAnimation = keyframes`
    0% {
        transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
    }
    50% {
        transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
    }
    100% {
        transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
    }
`;

const spinnerItemStyles = css`
    background-color: rgba(8, 66, 160, 0.2);
    height: 100%;
    position: absolute;
    width: 100%;
    border: 2px solid ${themeColor3};
`;

const spinner1Styles = css`
    transform: translateZ(-22px) rotateY(180deg);
`;

const spinner2Styles = css`
    transform: rotateY(-270deg) translateX(50%);
    transform-origin: top right;
`;

const spinner3Styles = css`
    transform: rotateY(270deg) translateX(-50%);
    transform-origin: center left;
`;

const spinner4Styles = css`
    transform: rotateX(90deg) translateY(-50%);
    transform-origin: top center;
`;

const spinner5Styles = css`
    transform: rotateX(-90deg) translateY(50%);
    transform-origin: bottom center;
`;

const spinner6Styles = css`
    transform: translateZ(22px);
`;

const Spinner = styled('div')`
    width: 44px;
    height: 44px;
    animation: ${spinnerAnimation} 2s infinite ease;
    transform-style: preserve-3d;
`;

const SpinnerItem = styled('div')`
    ${spinnerItemStyles}
`;

const Spinner1 = styled(SpinnerItem)`
    ${spinner1Styles}
`;

const Spinner2 = styled(SpinnerItem)`
    ${spinner2Styles}
`;

const Spinner3 = styled(SpinnerItem)`
    ${spinner3Styles}
`;

const Spinner4 = styled(SpinnerItem)`
    ${spinner4Styles}
`;

const Spinner5 = styled(SpinnerItem)`
    ${spinner5Styles}
`;

const Spinner6 = styled(SpinnerItem)`
    ${spinner6Styles}
`;

const CustomSpinner = () => {
    return (
        <Spinner>
        <Spinner1 />
        <Spinner2 />
        <Spinner3 />
        <Spinner4 />
        <Spinner5 />
        <Spinner6 />
        </Spinner>
    );
};

export default CustomSpinner;
