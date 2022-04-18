import { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import io from 'socket.io-client';
// components
import Page from '../components/Page';
import {
  CallsCounter,
  LastCalls,
  CallsPerTopic,
  CallsPerCity,
  WaitingTimes,
  CallsPerHour,
  CallsPerAges
} from '../sections/@dashboard/app';

import defaultData from './default_data';
import config from '../config';

// ----------------------------------------------------------------------


export default function DashboardApp() {
  const [data, setData] = useState(defaultData);
  
  useEffect(() => {
    console.log(config.StreamLayerURL);
    const socket = io(config.StreamLayerURL, {
      transports: ['websocket', 'polling'],
      attempts: 2
    });
    socket.on('calls', (data) => {
      console.log(data);
      setData(data);
    });
  }, []);

  return (
    <Page title="Dashboard | Minimal-UI">
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
              color='#0f7e00'
            />
          </Grid>

          {/* number of leaving calls */}
          <Grid item xs={12} sm={4} md={2}>
            <CallsCounter
              data={data.calls_per_topic["ניתוק"]}
              title="מספר שיחות ניתוק"
              icon="la:user-alt-slash"
              color='#a50000'
            />
          </Grid>

          {/* number of complaint calls */}
          <Grid item xs={12} sm={4} md={2}>
            <CallsCounter
              data={data.calls_per_topic["תלונה"]}
              title="מספר שיחות תלונה"
              icon="carbon:user-simulation"
              color='#9900ff'
            />
          </Grid>

          {/* number of service calls */}
          <Grid item xs={12} sm={4} md={2}>
            <CallsCounter
              data={data.calls_per_topic["שירות"]}
              title="מספר שיחות שירות"
              icon="ri:customer-service-2-fill"
              color='#2196f3'
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
              color='#fffc40'
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

          {/* מספר השיחות לפי כל שעה ביום */}
          <Grid item xs={12} md={6} lg={8}>
            <CallsPerHour data={data.calls_per_hour} />
          </Grid>

          {/* פילוח שיחות לפי גילאים */}
          <Grid item xs={12} md={6} lg={4}>
            <CallsPerAges data={Object.values(data.calls_per_age)} />
          </Grid>


          {/* שיחות אחרונות */}
          <Grid item xs={12} md={6} lg={4}>
            <LastCalls data={data.last_calls}/>
          </Grid>

          {/* פילוח לפי ערים */}
          <Grid item xs={12} md={6} lg={8}>
            <CallsPerCity data={data.calls_per_city}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
