import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
//
import sidebarConfig from './SidebarConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
          <AccountStyle>
            <Avatar src='/static/mock-images/avatars/avatar_default.jpg' alt="photoURL" />
            <Box sx={{ mr: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "#ffd" }}>
                אייל לוי
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                מנהל האתר
              </Typography>
            </Box>
          </AccountStyle>
      </Box>

      <NavSection navConfig={sidebarConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10,  }}>
        {/* <Stack
          alignItems="center"
          spacing={2}
          justifyContent="space-evenly"
          direction='row'
          sx={{ pt: 5, borderRadius: 2, backgroundColor: 'background.paper' }}
        > */}
          {/* <Box
            component="img"
            src="/static/illustrations/illustration_avatar.png"
            sx={{ width: 70, position: 'absolute', top: -50 }}
          /> */}
          <Avatar src="/static/illustrations/illustration_avatar.png" alt="avatar_1" />
          <Avatar src="/static/illustrations/illustration_avatar.png" alt="avatar_1" />
          <Avatar src="/static/illustrations/illustration_avatar.png" alt="avatar_1" />
        {/* </Stack> */}
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: '#000',
              borderRightStyle: 'dashed'
            }
          }}
          anchor="right"
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
