import styled from 'styled-components';

interface ContainerProps {
  type: 'error' | 'info' | 'success';
}

export const Container = styled.section<ContainerProps>`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2rem;
    color: #f0f2f5;
  }

  svg {
    font-size: 5rem;
    margin-bottom: 1rem;
    color: ${({ type }) =>
      type === 'error' ? '#E81C1D' : type === 'info' ? '#C21FFF' : '#A2DE07'};
  }
`;
