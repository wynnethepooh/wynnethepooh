import {createGlobalStyle} from 'styled-components';

/*
Colors:
#FAF6EB - beige
#EBE7DD - dark beige
#ABA79F - darker beige (for text)
#FFFCF5 - light beige
#52504B - dark text
#E1B94E - mustard
#E8C1B7 - pink
#D1A297 - dark pink

#CC8E20 - honey
*/

const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Oswald&display=swap');

  html {

  }

  body {
    font-family: 'Jost', 'Oswald', sans-serif;
  }

  h1 {
    font-size: calc(10px + 2vmin);
    font-family: 'Jost', 'Oswald', sans-serif;
    text-transform: lowercase;
    letter-spacing: 3px;
    margin: 0;
    padding: 0 0 10px 0;
    text-align: left;
    color: #CC8E20;
    font-weight: 500;

    @media (max-width: 1020px) {
      font-size: 27px;
    }
  }
`;

export default GlobalStyles;
