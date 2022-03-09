import { faker } from '@faker-js/faker';
import PropTypes from 'prop-types';
// material
import { Card, Typography, CardHeader, CardContent } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@mui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';
// ----------------------------------------------------------------------

OrderItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool
};

function OrderItem({ item, isLast }) {
  const { type, title, time, phone } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'שירות' && 'primary.main') ||
              (type === 'הצטרפות' && 'success.main') ||
              (type === 'תלונה' && 'info.main') ||
              (type === 'ניתוק' && 'warning.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineSeparator>
      <Typography variant="subtitle1" sx={{ padding: 1 }}>{type}</Typography>
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title} - {phone}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function LastCalls({data}) {
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="שיחות אחרונות שהתקבלו במערכת" />
      <CardContent>
        <Timeline>
          {data.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === data.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
