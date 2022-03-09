import { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import io from 'socket.io-client';
// components
import Page from '../components/Page';
import {
  CallsCounter,
  LastCalls,
  CallsPerTopic,
  AppCurrentSubject,
  CallsPerCity,
  WaitingTimes,
  CallsPerHour
} from '../sections/@dashboard/app';

import defaultData from './default_data';

// ----------------------------------------------------------------------

const socket = io('http://localhost:3002', {
  transports: ['websocket', 'polling']
});

export default function DashboardApp() {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    socket.on('calls', (data) => {
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
              data={data.calls_per_topic.join}
              title="מספר שיחות הצטרפות"
              icon="carbon:user-follow"
              color='#0f7e00'
            />
          </Grid>

          {/* number of leaving calls */}
          <Grid item xs={12} sm={4} md={2}>
            <CallsCounter
              data={data.calls_per_topic.leave}
              title="מספר שיחות ניתוק"
              icon="la:user-alt-slash"
              color='#a50000'
            />
          </Grid>

          {/* number of complaint calls */}
          <Grid item xs={12} sm={4} md={2}>
            <CallsCounter
              data={data.calls_per_topic.complaint}
              title="מספר שיחות תלונה"
              icon="carbon:user-simulation"
              color='#9900ff'
            />
          </Grid>

          {/* number of service calls */}
          <Grid item xs={12} sm={4} md={2}>
            <CallsCounter
              data={data.calls_per_topic.complaint}
              title="מספר שיחות שירות"
              icon="ri:customer-service-2-fill"
              color='#2196f3'
            />
          </Grid>

          {/* Total number of calls */}
          <Grid item xs={12} sm={4} md={4}>
            <CallsCounter
              data={
                data.calls_per_topic.join +
                data.calls_per_topic.leave +
                data.calls_per_topic.complaint
              }
              title="מספר שיחות כולל"
              icon="carbon:user-activity"
              color='#fffc40'
            />
          </Grid>

          {/* זמני המתנה מתחילת היום */}
          <Grid item xs={12} md={6} lg={8}>
            <WaitingTimes data={data.number_of_waiting_calls} />
          </Grid>

          {/* פילוח שיחות לפי נושאים */}
          <Grid item xs={12} md={6} lg={4}>
            <CallsPerTopic data={Object.values(data.calls_per_topic)} />
          </Grid>

          {/* מספר השיחות לפי כל שעה ביום */}
          <Grid item xs={12} md={6} lg={12}>
            <CallsPerHour data={data.calls_per_hour} />
          </Grid>

          {/* מספר השיחות הממתינות לאורך היום */}
          <Grid item xs={12} md={6} lg={8}>
            <CallsPerTopic data={data} />
          </Grid>

          {/* שיחות אחרונות */}
          <Grid item xs={12} md={6} lg={4}>
            <LastCalls data={data.last_calls}/>
          </Grid>

          {/* פילוח לפי ערים */}
          <Grid item xs={12} md={6} lg={8}>
            <CallsPerCity data={data.calls_per_city}/>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
