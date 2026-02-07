//import material UI
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";

// import HOOKS
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "./weatherSlice";
import { useTranslation } from 'react-i18next';
import {language, unit, city} from "./weatherSlice";

export default function FormWeather() {
    console.log("render de formWeather")
    const dispatch = useDispatch();
    const [locale, setLocale] = useState('ar');
    const [unite, setUnit] = useState('metric');
    const [ville, setCity] = useState('Casablanca');
    
    
    const lang = [
        { value: "en", label: "English" },
        { value: "fr", label: "French" },
        { value: "ar", label: "Arabic" },
    ];

    const units = [
        { value: "metric", label: "Celsius" },
        { value: "imperial", label: "Fahrenheit" },
    ];
    // handle submit form
    const handleSubmit = () => {
        console.log("submit form with ", ville, locale, unite);
        // dispatch the fetchWeather action with the city, locale, and unit
        dispatch(fetchWeather({ ville, locale, unite }));
        dispatch(language(locale));
        dispatch(unit(unite));
        dispatch(city(ville));
    }

    return (
        <Box sx={{ flexGrow: 1, mb: 4 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid size= {{xs:12, sm:4}}>
                    <TextField
                        label="City"
                        value={ville}
                        onChange={(e) => setCity(e.target.value)}
                        fullWidth
                        placeholder="Enter city name"
                    />
                </Grid>

                <Grid  size= {{xs:12, sm:4}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Language</FormLabel>
                        <RadioGroup
                            row
                            aria-label="language"
                            name="language"
                            value={locale}
                            onChange={(e) => setLocale(e.target.value)}
                        >
                            {lang.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid  size= {{xs:12, sm:4}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Units</FormLabel>
                        <RadioGroup
                            row
                            aria-label="units"
                            name="units"
                            value={unite}
                            onChange={(e) => setUnit(e.target.value)}
                        >
                            {units.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid  size= {{xs:12}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Valider
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}