import './App.css';
import {useEffect } from 'react';
import moment from 'moment/moment';

import { useTranslation } from 'react-i18next';
import FormWeather from './features/formWeather';
import ShowWeather from './features/showWeather';


// importation des componants MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';





 const theme = createTheme({
    typography: {
      fontFamily: ["IBM"],
      fontWeight: 600,
    },
  });



function App() {
 
  const { t, i18n } = useTranslation();

  
  useEffect(() => {
    i18n.changeLanguage();
    moment.locale();
  }, [ i18n]);
  
 

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="md" style={{background:"#f0f0f0", padding:"20px", borderRadius:"10px", marginTop:"20px"}}>
          <h1>{t("Welcome to the weather app")}</h1>
          
          {/* inputs pour la recherche de ville */}
           <FormWeather  />
          {/* ==== inputs pour la recherche de ville ==== */}
          {/* où va apparaitre les infos météo */}
          <ShowWeather/> 
          {/* == où va apparaitre les infos météo == */}
          
        
      </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
