import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container } from './styles';

interface Props {
  type: 'error' | 'info' | 'success';
  message: string;
}

const SplashScreen: React.FC<Props> = ({ type, message }: Props) => {
  const IconType = {
    error: <FiXCircle />,
    info: <FiAlertCircle />,
    success: <FiCheckCircle />,
  };

  return (
    <Container type={type}>
      {IconType[type]}
      <p>{message}</p>
    </Container>
  );
};

export default SplashScreen;
