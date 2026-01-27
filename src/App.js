
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

// importation des componants MUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';

 const theme = createTheme({
    typography: {
      fontFamily: ["IBM"],
      fontWeight: 600,
    },
  });
function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    
    // Exemple de requête API avec axios
    axios.get('https://api.openweathermap.org/data/2.5/weather?lat=35.399539827405754&lon=-5.089178182019226&lang=ar&appid=aade230efd632809ec71052dcc8534bb&units=metric')
      .then(response => {
        console.log(response.data.name);
        setData(response.data);
      })
      .catch(error => {
        console.error('il ya un erreur', error);
      });
  }, []);
 
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{background:"#f0f0f0", padding:"20px", borderRadius:"10px", marginTop:"20px"}}>
          <h1>مرحبا بكم في تطبيق الطقس</h1>
          {/* CARD */}
          <div style={{background:"rgb(28 52 91 / 36%)", padding:"20px", color:"white", borderRadius:"10px", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
            {/* CARD CONTENT */}
            <div>
              {/* ville et temps */}
              <div style={{textAlign:"right", direction:"rtl", display:"flex", alignItems:"flex-end", justifyContent:"start", gap:"20px"}}>
                <Typography variant="h2" style={{fontWeight:"600"}}>
                  {data ? data.name : '...'}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  الاثنين 26/06/2024
                </Typography>
              </div>
              {/* === ville et temps === */}
              <hr />
              {/* prévisions */}
              <div dir="rtl" style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"20px"}}>
                {/* température */}
                <div>
                  <Typography variant="h1" style={{textAlign:"right"}}>
                    {data ? Math.round(data.main.temp) : '...'}°C
                  </Typography>
                  {/* todo: temperature Image */}
                  <div>{data ? data.weather[0].icon : '...'}</div>
                  {/* météo description */}
                  <Typography variant="h6" style={{textAlign:"right"}}>
                    {data ? data.weather[0].description : '...'}
                  </Typography>
                  {/* Min & Max */}
                  <Typography variant="h6" style={{textAlign:"right"}}>
                    {data ? `Min: ${Math.round(data.main.temp_min)}°C` : '...'} | Max: {data ? `${Math.round(data.main.temp_max)}°C` : '...'}
                  </Typography>
                  {/* === Min & Max === */}

                </div>
                {/* ====température==== */}
                <div>
                  {/*  météo image */}
                  <CloudIcon style={{fontSize:"200px"}} />
                  {/* ===  météo image === */}
                </div>
              </div>
              {/* === prévisions === */}
            </div>
            {/* ====CARD CONTENT=== */}
          </div>
          {/* == CARD == */}
          <div dir='rtl' style={{marginTop:"20px", display:"flex", justifyContent:"end"}}>
            <Button variant="contained">
              أنجليزي
            </Button>
          </div>
      </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
