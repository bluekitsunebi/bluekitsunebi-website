import { createGlobalStyle } from 'styled-components';
import { globalStyles } from 'twin.macro';

const blue = '#211C6A';
const beige = '#ffedda';

const GlobalStyles = createGlobalStyle`
  ${globalStyles}

  /* Below animations are for modal created using React-Modal */
  .ReactModal__Overlay {
    transition: transform 300ms ease-in-out;
    transition-delay: 100ms;
    transform: scale(0);
  }
  .ReactModal__Overlay--after-open {
    transform: scale(1);
  }
  .ReactModal__Overlay--before-close {
    transform: scale(0);
  }

  body {
    /* Aceasta este sintaxa corectă pentru accesarea props în styled-components */
    background-color: ${props => props.pathname === '/programming' ? blue : beige};
  }
`;

export default GlobalStyles;
