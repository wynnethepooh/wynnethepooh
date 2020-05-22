import { createGlobalStyle } from 'styled-components';

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
    font-family: 'Oswald', sans-serif;
  }
`;

export default GlobalStyles;