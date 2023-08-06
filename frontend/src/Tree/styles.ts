import styled from 'styled-components';
import { NODE_CONFIG } from '../constants';

export const NodeWrapper = styled.div.attrs(() => ({
  className: 'd-flex',
}))`
  border: 1px solid black;
  border-radius: 4px;
  min-height: ${NODE_CONFIG.height}px;
  max-height: ${NODE_CONFIG.height}px;
  max-width: ${NODE_CONFIG.width}px;
  overflow: hidden;
`;

export const Image = styled.img`
  max-height: 100%;
  max-width: 40%;
  object-fit: cover;
`;

export const DescriptionArea = styled.div`
  padding: 8px;
`;

export const Name = styled.p`
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  color: #2c3556;
  margin-bottom: 4px;
`;

export const OtherText = styled.p`
  font-size: 12px;
  line-height: 14px;
  color: #4c5578;
  margin-top: 4px;
`;
