import { useEffect, useState } from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import io from "socket.io-client";
// components
import Page from '../components/Page';
import {
  AppTasks,
  TotalLeaveCalls,
  AppBugReports,
  TotalComplaintCalls,
  AppNewsUpdate,
  TotalJoinCalls,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

const socket = io('http://localhost:3002', {
  transports: ['websocket', 'polling']
});

export default function DashboardApp() {
  const [data, setData] = useState({
    current_waiting_calls: 0,
    waiting_times: [],
    number_of_waiting_calls: [],
    calls_per_topic: {
      "join": 0,
      "leave": 0,
      "complaint": 0,
    }
  });

  useEffect(() => {
    socket.on('calls', (data) => {
      setData(data);
      console.log(data);
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
            <TotalJoinCalls data={data.calls_per_topic.join} />
          </Grid>

          {/* number of leaving calls */}
          <Grid item xs={12} sm={4} md={2}>
            <TotalLeaveCalls data={data.calls_per_topic.leave} />
          </Grid>

          {/* number of complaint calls */}
          <Grid item xs={12} sm={4} md={2}>
            <TotalComplaintCalls data={data.calls_per_topic.complaint} />
          </Grid>

          {/* number of service calls */}
          <Grid item xs={12} sm={4} md={2}>
            <TotalComplaintCalls data={data.calls_per_topic.complaint} />
          </Grid>

          {/* Total number of calls */}
          <Grid item xs={12} sm={4} md={4}>
            <AppBugReports
              data={data.calls_per_topic.join + data.calls_per_topic.leave + data.calls_per_topic.complaint}
            />
          </Grid>

          {/* זמני המתנה מתחילת היום */}
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits data={data} />
          </Grid>

          {/* פילוח שיחות לפי נושאים */}
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits data={Object.values(data.calls_per_topic)} />
          </Grid>

          {/* מספר השיחות הממתינות לאורך היום */}
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits data={data} />
          </Grid>

          {/* שיחות אחרונות */}
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          {/* פילוח לפי ערים */}
          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
