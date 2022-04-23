import { useState } from "react";
import {
    Button,
    Stack,
    Typography,
    Container,
    Card,
    Stepper,
    Step,
    Box,
    StepLabel
} from "@mui/material";
import axios from "axios";

import config from "../config";
import CallEntry from "../components/prediction/CallEntry";
import Page from "../components/general/Page";
import { CallsPerTopic } from "../components/charts";

const PREDICTION_URL = `${config.BatchLayerURL}/api/predictCall`;
const BUILD_MODEL_URL = `${config.BatchLayerURL}/api/buildModel`;

export default function PredictionPage() {
    const [building, setBuilding] = useState(false);
    const [isPredicting, setPredicting] = useState(false);
    const [modelName, setModelName] = useState("");
    const [activeStep, setActiveStep] = useState(0);
    const [prediction, setPrediction] = useState(null);
    const [callData, setCallData] = useState({
        name: "",
        age: "",
        gender: "זכר",
        city: "",
        product: "אינטרנט",
        lang: "עברית"
    });

    const handleBuildModel = () => {
        setBuilding(true);
        setTimeout(() => {
            setActiveStep(1);
        }, 4000);
        fetch(BUILD_MODEL_URL)
            .then((res) => res.json())
            .then((res) => {
                setBuilding(false);
                setModelName(res.modelInfo.resource);
                console.log(res);
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setBuilding(false);
                setActiveStep(3);
            });
    };

    const handlePredictCall = () => {
        setPredicting(true);
        axios
            .post(PREDICTION_URL, callData)
            .then((res) => {
                try {
                    const probs = res.data.predictionInfo.object.probabilities.map((p) => p[1]);
                    console.log(probs);
                    setPrediction(probs);
                } catch (error) {
                    setPrediction(null);
                }
            })
            .finally(() => {
                setPredicting(false);
            });
    };

    const steps = ["משיג את כל נתוני השיחות", "יוצר קשר עם שרתי BigML", "מודל חיזוי נוצר בהצלחה"];

    return (
        <Page title="לוח חיזוי שיחות | CallCenter">
            <Container maxWidth="lg">
                <h1>לוח חיזוי שיחות</h1>
                <Container sx={{ marginTop: "30px" }}>
                    <Card sx={{ marginBottom: "30px", padding: "20px" }}>
                        <Stack alignItems="center" justifyContent="center" mb={5}>
                            {building ? (
                                <Button disabled>בונה מודל חיזוי...</Button>
                            ) : (
                                <Button variant="contained" onClick={handleBuildModel}>
                                    בניית מודל חיזוי
                                </Button>
                            )}
                            {(modelName || building) && (
                                <Box sx={{ width: "100%", margin: "20px" }}>
                                    <Stepper activeStep={activeStep} >
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                            )}
                            {modelName ? (
                                <>
                                    <Typography>שם המודל: {modelName}</Typography>
                                    <Typography>פרטי המודל:</Typography>
                                </>
                            ) : (
                                <Typography>
                                    נדרש לבנות מודל חיזוי חדש לפני חיזוי אופי שיחה
                                </Typography>
                            )}
                        </Stack>
                    </Card>
                    {/* כפתור סיום שיחה */}
                    <Container align="center" sx={{ margin: "30px" }}>
                        <CallEntry callData={callData} setCallData={setCallData} />
                        {isPredicting ? (
                            <Button disabled>מבצע חיזוי...</Button>
                        ) : (
                            <Button variant="contained" onClick={handlePredictCall}>
                                חזה נושא שיחה
                            </Button>
                        )}
                    </Container>
                    <Card>
                        {prediction ? (
                            <CallsPerTopic data={prediction} />
                        ) : (
                            <Typography>No prediction</Typography>
                        )}
                    </Card>
                </Container>
            </Container>
        </Page>
    );
}
