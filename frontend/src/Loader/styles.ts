import styled from 'styled-components';

export const SvgWrapper = styled.svg`
  display: block;
  width: 258px;
  height: 258px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const Mask = styled.path`
  transform-origin: 50% 90%;
  animation: scale 5s infinite ease-out;

  @keyframes scale {
    0%,
    100% {
      transform: scale(0);
    }
    7%,
    90% {
      transform: scale(0.4);
    }
    50% {
      transform: scale(1);
    }
  }
`;
