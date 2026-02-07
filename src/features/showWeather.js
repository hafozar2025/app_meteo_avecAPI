import Typography from "@mui/material/Typography";
import CloudIcon from '@mui/icons-material/Cloud';
import 'moment/locale/ar-ma';
import 'moment/locale/fr';
import moment from 'moment/moment';
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { language, fetchWeather } from "./weatherSlice";
import CircularProgress from "@mui/material/CircularProgress";


export default function ShowWeather(){
    const dispatch = useDispatch();
    useEffect(
        () => { dispatch(fetchWeather({ ville: "Casablanca", locale: "ar", unite: "metric" }));},
        [dispatch]
    )
  


    const data = useSelector((state) => {
       console.log("state from useSelector", state.weather.data);
        return state.weather.data;
    });
  
    const locale = useSelector((state) => state.weather.locale);
    
    const { t, i18n } = useTranslation();
    
    
    useEffect(() => {
        i18n.changeLanguage(locale);
        moment.locale(locale === "ar"? "ar-ma" : locale);
    }, []);
    

    return (
        <>
            
            <div  style={{background:"rgb(28 52 91 / 36%)", padding:"20px", color:"white", borderRadius:"10px", boxShadow:"0 4px 8px rgba(0, 0, 0, 0.1)"}}>
            {/* CARD CONTENT */}
              <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                {/* ville et horaire */}
                <div  style={{textAlign:"right", display:"flex", alignItems:"flex-end", justifyContent:"start", gap:"20px"}}>
                  <Typography variant="h2" style={{fontWeight:"600"}}>
                    {data?.name ?? <CircularProgress/>} 
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    {moment().format('LLLL')}
                  </Typography>
                </div>
                {/* === ville et horaire === */}
                <hr />
                {/* prévisions */}
                <div  style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"20px"}}>
                  {/* température */}
                  <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} style={{display:"flex"}}>
                      <Typography variant="h1" style={{textAlign:"right"}}>
                      {Math.round(data?.main?.temp)??  <CircularProgress/>}°C
                      </Typography>
                      {/* icone de météo */}
                      <div>{data && <img src={`http://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`} alt="Weather Icon" style={{width: "100px", height: "100px"}} />}</div>
                    </div>
                    <div  style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"10px"}}>
                      {/* météo description */}
                      <Typography variant="h6" style={{textAlign:"right"}}>
                        {data?.weather?.[0]?.description ?? <CircularProgress/>}
                      </Typography>
                      {/* Min & Max */}
                      <Typography variant="h6" style={{textAlign:"right"}}>
                        {t("Min")}: {data? `${Math.round(data?.main?.temp_min)}${t("C°")}`: <CircularProgress/>} | {t("Max")}: {`${Math.round(data?.main?.temp_max)}${t("C°")}`?? <CircularProgress/>}
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
        </>
    )
}