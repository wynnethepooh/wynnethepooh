import {createGlobalStyle} from 'styled-components';
import BackgroundImg from '../images/home-background.jpeg';

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
#CD7F5D - terracotta

#CC8E20 - honey
*/

const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;700&family=Oswald&display=swap');

  html {

  }

  body {
    background-color: #FAF6EB;
    color: #52504B;
    font-family: 'Jost', san-serif;
    margin: 0;
    text-transform: lowercase;
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

  footer {
    color: #CC8E21;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 5vh;
  }

  .facebook {
    width: 30px;
    height: 30px;
    margin: 0 10px;
  }

  .instagram {
    width: 30px;
    height: 30px;
    margin: 0 10px
  }

  .linkedin {
    width: 30px;
    height: 30px;
    margin: 0 10px
  }

  .no-wrap {
    overflow: hidden;
    white-space: nowrap;
  }

  h2 {
    color: #CC8E20;
  }

  p {
    font-size: 16px;
    text-align: left;
  }

  a {
    color: #CC8E21;
    font-weight: 500;
    text-decoration: none;
  }

  a:hover {
    color: #E1B94E;
  }

  .page {
    padding: 2.5vh 5vh;
    background-color: #FAF6EB; /* #E1B94E (mustard)*/
    min-height: 66vh;
    display: flex;
    flex-direction: column;
    font-size: calc(10px + 2vmin);
  }

  .home {
    height: 100vh;
    background:
      linear-gradient(
        rgba(115, 75, 1, 0.6),
        rgba(115, 75, 1, 0.6)
      ),
      url(${BackgroundImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    margin-top: -6rem;
  }


`;

export default GlobalStyles;
