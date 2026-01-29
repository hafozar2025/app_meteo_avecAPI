import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment/moment';
import 'moment/locale/ar-ma';
import 'moment/locale/fr';
import { useTranslation } from 'react-i18next';

// importation des componants MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CloudIcon from '@mui/icons-material/Cloud';

 const theme = createTheme({
    typography: {
      fontFamily: ["IBM"],
      fontWeight: 600,
    },
  });



function App() {
  const { t, i18n } = useTranslation();

  // état pour stocker les données de l'API
  const [data, setData] = useState(null);
  const [locale, setLocale] = useState('ar');

  // moment.locale('ar-ma');

  // URL de l'API météo

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=34.79955&lon=-4.59114&lang=${locale}&appid=aade230efd632809ec71052dcc8534bb&units=metric`;

  useEffect(() => {
    i18n.changeLanguage(locale);
    moment.locale(locale === 'en' ? 'fr' : 'ar-ma');
  }, [locale, i18n]);
  
  useEffect(() => {
    // Exemple de requête API avec axios
    axios.get(url)
      .then(response => {
        console.log(response.data.name);
        setData(response.data);
      })
      .catch(error => {
        console.error('il ya un erreur', error);
      });
  }, []);

  // fonction pour changer la langue
  const handleLanguageClick = () => {
    locale === 'en' ? setLocale('ar') : setLocale('en');
    i18n.changeLanguage(locale);
    moment.locale(locale === 'en' ? 'fr' : 'ar-ma');
  };
 
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{background:"#f0f0f0", padding:"20px", borderRadius:"10px", marginTop:"20px"}}>
          <h1>{t("Welcome to the weather app")}</h1>
          {/* CARD */}
          <div  style={{background:"rgb(28 52 91 / 36%)", padding:"20px", color:"white", borderRadius:"10px", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
            {/* CARD CONTENT */}
            <div dir={locale === 'en' ? 'ltr' : 'rtl'}>
              {/* ville et temps */}
              <div  style={{textAlign:"right", display:"flex", alignItems:"flex-end", justifyContent:"start", gap:"20px"}}>
                <Typography variant="h2" style={{fontWeight:"600"}}>
                  {data ? data.name : '...'}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {moment().format('LLLL')}
                </Typography>
              </div>
              {/* === ville et temps === */}
              <hr />
              {/* prévisions */}
              <div  style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"20px"}}>
                {/* température */}
                <div dir={locale === 'en' ? 'ltr' : 'rtl'}>
                  <div dir={locale === 'en' ? 'ltr' : 'rtl'} style={{display:"flex"}}>
                    <Typography variant="h1" style={{textAlign:"right"}}>
                    {data ? Math.round(data.main.temp) : '...'}°C
                    </Typography>
                    {/* icone de météo */}
                    <div>{data && <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather Icon" style={{width: "100px", height: "100px"}} />}</div>
                  </div>
                  <div  style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"10px"}}>
                    {/* météo description */}
                    <Typography variant="h6" style={{textAlign:"right"}}>
                      {data ? data.weather[0].description : '...'}
                    </Typography>
                    {/* Min & Max */}
                    <Typography variant="h6" style={{textAlign:"right"}}>
                      {t("Min")}: {data ? `${Math.round(data.main.temp_min)}°C` : '...'} | {t("Max")}: {data ? `${Math.round(data.main.temp_max)}°C` : '...'}
                    </Typography>
                    {/* === Min & Max === */}
                  </div>

                </div>
                {/* ====température==== */}
                <div>
                  {/*  météo image */}
                  <CloudIcon style={{fontSize:"200px", opacity:"0.7"}} />
                  {/* ===  météo image === */}
                </div>
              </div>
              {/* === prévisions === */}
            </div>
            {/* ====CARD CONTENT=== */}
          </div>
          {/* == CARD == */}
          <div dir={locale === 'en' ? 'ltr' : 'rtl'} style={{marginTop:"20px", display:"flex", justifyContent:"end"}}>
            <Button variant="contained" onClick={handleLanguageClick}>
              {locale === 'en' ? 'العربية' :'English' }
            </Button>
          </div>
      </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
