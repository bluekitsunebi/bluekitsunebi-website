import { createGlobalStyle } from 'styled-components';
import { globalStyles } from 'twin.macro';

const blue = '#0d244b';
const beige = '#ffedda';

const scrollbarTrack = '#0b1e3f';
const scrollbarThumb = '#446397';


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
    /* color theme */
    background-color: ${props => props.pathname === '/programming' ? blue : beige};
  }

  /* Custom scrollbar styles */

  scrollbar-gutter: stable;
  
  &::-webkit-scrollbar {
    width: 20px; /* Width of the scrollbar */
    padding: 0 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${scrollbarTrack}; /* background for the track */
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${scrollbarThumb}; /* Color of the scrollbar thumb */
    border-radius: 20px; /* Rounded corners */
    border: 8px solid transparent; /* Space around the thumb */
    background-clip: content-box; /* Clipping the thumb inside the border */
  }
`;

export default GlobalStyles;
