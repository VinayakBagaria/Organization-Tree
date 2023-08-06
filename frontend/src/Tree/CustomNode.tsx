import React from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { IOrganizationUser } from '../types';
import * as Styles from './styles';

interface ICustomNodeProps extends NodeProps<IOrganizationUser> {}

const CustomNode = ({ data }: ICustomNodeProps) => {
  return (
    <>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <Styles.NodeWrapper>
        <Styles.Image src={data.image} alt={data.first_name} />
        <Styles.DescriptionArea>
          <Styles.Name>
            {data.first_name} {data.last_name}
          </Styles.Name>
          <Styles.OtherText>{data.designation}</Styles.OtherText>
          {data.phone_number && (
            <Styles.OtherText>
              Tel: {data.country_code} {data.phone_number}
            </Styles.OtherText>
          )}
          {data.email && (
            <Styles.OtherText>
              <a href={`mailto:${data.email}`}>{data.email}</a>
            </Styles.OtherText>
          )}
        </Styles.DescriptionArea>
      </Styles.NodeWrapper>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
};

export default CustomNode;
