import { useEffect, useState } from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import io from "socket.io-client";
// components
import Page from "../components/general/Page";
import {
    CallsCounter,
    LastCalls,
    CallsPerTopic,
    CallsPerCity,
    WaitingTimes,
    CallsPerHour,
    CallsPerAges,
    CallsPerGender,
    WaitingCallsCounter
} from "../components/charts";

import defaultData from "./default_data";
import config from "../config";

// ----------------------------------------------------------------------

export default function DashboardApp() {
    const [data, setData] = useState(defaultData);
    const [isloaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const socket = io(config.StreamLayerURL, {
            transports: ["websocket", "polling"],
            attempts: 2
        });
        socket.on("calls", (data) => {
            console.log("New Call Recieved", new Date().getTime());
            setData(data);
            setIsLoaded(true);
        });
    }, []);

    return (
        <Page title="לוח מדדים יומי | CallCenter">
            <Container maxWidth="xl">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">לוח מדדים יומיים</Typography>
                </Box>
                <Grid container spacing={3}>
                    {/* number of joining calls */}
                    <Grid item xs={12} sm={4} md={2}>
                        <CallsCounter
                            data={data.calls_per_topic["הצטרפות"]}
                            title="מספר שיחות הצטרפות"
                            icon="carbon:user-follow"
                            color="#0f7e00"
                            isloaded={isloaded}
                        />
                    </Grid>

                    {/* number of leaving calls */}
                    <Grid item xs={12} sm={4} md={2}>
                        <CallsCounter
                            data={data.calls_per_topic["ניתוק"]}
                            title="מספר שיחות ניתוק"
                            icon="la:user-alt-slash"
                            color="#a50000"
                            isloaded={isloaded}
                        />
                    </Grid>

                    {/* number of complaint calls */}
                    <Grid item xs={12} sm={4} md={2}>
                        <CallsCounter
                            data={data.calls_per_topic["תלונה"]}
                            title="מספר שיחות תלונה"
                            icon="carbon:user-simulation"
                            color="#9900ff"
                            isloaded={isloaded}
                        />
                    </Grid>

                    {/* number of service calls */}
                    <Grid item xs={12} sm={4} md={2}>
                        <CallsCounter
                            data={data.calls_per_topic["שירות"]}
                            title="מספר שיחות שירות"
                            icon="ri:customer-service-2-fill"
                            color="#2196f3"
                            isloaded={isloaded}
                        />
                    </Grid>

                    {/* Total number of calls */}
                    <Grid item xs={12} sm={4} md={4}>
                        <CallsCounter
                            data={
                                data.calls_per_topic["הצטרפות"] +
                                data.calls_per_topic["ניתוק"] +
                                data.calls_per_topic["תלונה"] +
                                data.calls_per_topic["שירות"]
                            }
                            title="מספר שיחות כולל"
                            icon="carbon:user-activity"
                            color="#fffc40"
                            isloaded={isloaded}
                        />
                    </Grid>

                    {/* זמני המתנה מתחילת היום */}
                    <Grid item xs={12} md={6} lg={8}>
                        <WaitingTimes data={data.average_waiting_time_per_hour} />
                    </Grid>

                    {/* פילוח שיחות לפי נושאים */}
                    <Grid item xs={12} md={6} lg={4}>
                        <CallsPerTopic data={Object.values(data.calls_per_topic)} />
                    </Grid>

                    {/* זמני המתנה מתחילת היום */}
                    <Grid item xs={12} md={6} lg={8}>
                        <WaitingCallsCounter data={data.waiting_calls_array || []} />
                    </Grid>

                    {/* פילוח שיחות לפי נושאים */}
                    <Grid item xs={12} md={6} lg={4}>
                        <CallsPerGender data={Object.values(data.calls_per_gender || [])} />
                    </Grid>

                    {/* מספר השיחות לפי כל שעה ביום */}
                    <Grid item xs={12} md={6} lg={8}>
                        <CallsPerHour data={data.calls_per_hour} />
                    </Grid>

                    {/* פילוח שיחות לפי גילאים */}
                    <Grid item xs={12} md={6} lg={4}>
                        <CallsPerAges data={Object.values(data.calls_per_age)} />
                    </Grid>

                    {/* שיחות אחרונות */}
                    <Grid item xs={12} md={6} lg={5}>
                        <LastCalls data={data.last_calls} />
                    </Grid>

                    {/* פילוח לפי ערים */}
                    <Grid item xs={12} md={6} lg={7}>
                        <CallsPerCity data={data.calls_per_city} />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
