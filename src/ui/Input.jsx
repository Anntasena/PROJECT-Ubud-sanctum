import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-text);

  ${(props) =>
    props.type === "date" &&
    `
    &::-webkit-calendar-picker-indicator {
      filter: invert(0.5);
      cursor: pointer;
    }
  `}
`;

export default Input;
