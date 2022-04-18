import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import io from 'socket.io-client';
import { faker } from '@faker-js/faker';

import {
    Card,
    Table,
    Stack,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';

// components
import NewCall from '../sections/@dashboard/answerCalls/NewCall';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import { UserListHead } from '../sections/@dashboard/user';

import { getCurrentHour, formatTime } from '../utils/formatTime';
import config from '../config';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'שם', alignRight: true },
    { id: 'start_time', label: 'זמן התחלה', alignRight: true },
    { id: 'end_time', label: 'זמן סיום', alignRight: true },
    { id: 'phone', label: 'טלפון', alignRight: true },
    { id: 'age', label: 'גיל', alignRight: true },
    { id: 'gender', label: 'מין', alignRight: true },
    { id: 'city', label: 'עיר', alignRight: true },
    { id: 'topic', label: 'נושא', alignRight: true },
    { id: 'product', label: 'מוצר', alignRight: true },
    { id: 'lang', label: 'שפה', alignRight: true }
];

// ----------------------------------------------------------------------

const socket = io(config.StreamLayerURL, {
    transports: ['websocket', 'polling'],
    reconnectionAttempts: 2
});

export default function AnswerCallsPage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [activeCalls, setActiveCalls] = useState([]);
    const [lastCalls, setLastCalls] = useState([]);
    const [isAuto, setIsAuto] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleNewCall = () => {
        setActiveCalls((prev) => [
            ...prev,
            {
                id: Math.random(),
                name: '',
                start_time: getCurrentHour(),
                end_time: '',
                phone: faker.phone.phoneNumber("05#-#######"),
                age: '',
                gender: 'זכר',
                city: '',
                product: 'אינטרנט',
                lang: 'עברית'
            }
        ]);
        console.log('activeCalls', activeCalls);
        localStorage.setItem('activeCalls', JSON.stringify(activeCalls));
    };

    const handleToggleAuto = async () => {
        setIsAuto((prev) => !prev);
        await fetch(`${config.messageBrokerURL}/api/toggleAutoMode`, { method: 'post' });
    };

    const handleEndCall = (id) => {
        console.log('deleting at: ', id);
        setActiveCalls((prev) => prev.filter((call) => call.id !== id));
    };

    useEffect(() => {
        socket.on('all_calls', (data) => {
            setLastCalls(data);
        });
        const activeCalls = JSON.parse(localStorage.getItem('activeCalls'));
        if (activeCalls) {
            setActiveCalls(activeCalls);
        }
    }, []);

    return (
        <Page title="לוח הזנת שיחות | CallCenter">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        לוח הזנת שיחות
                    </Typography>
                    <Button variant="contained" onClick={handleToggleAuto}>
                        הפעל מצב אוטומטי
                    </Button>
                </Stack>
                {!isAuto && (
                    <>
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="#"
                            endIcon={<Iconify icon="eva:plus-fill" />}
                            onClick={handleNewCall}
                            style={{ marginBottom: 20 }}
                        >
                            מענה לשיחה
                        </Button>

                        <Card>
                            <Scrollbar>
                                <TableContainer sx={{ minWidth: 800 }}>
                                    <Table>
                                        <TableBody>
                                            {activeCalls.map((data, index) => (
                                                <NewCall
                                                    key={index}
                                                    data={data}
                                                    handleEndCall={handleEndCall}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Scrollbar>
                        </Card>
                    </>
                )}
                <Typography variant="h5" style={{ marginTop: 50 }}>
                    שיחות אחרונות
                </Typography>
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead headLabel={TABLE_HEAD} rowCount={lastCalls.length} />
                                <TableBody>
                                    {lastCalls
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => (
                                            <TableRow
                                                hover
                                                key={row.id}
                                                tabIndex={-1}
                                                role="contentinfo"
                                                dir="rtl"
                                            >
                                                <TableCell align="right">{row.name}</TableCell>
                                                <TableCell align="right">{formatTime(row.start_time)}</TableCell>
                                                <TableCell align="right">{formatTime(row.end_time)}</TableCell>
                                                <TableCell align="right">{row.phone}</TableCell>
                                                <TableCell align="right">{row.age}</TableCell>
                                                <TableCell align="right">{row.gender}</TableCell>
                                                <TableCell align="right">{row.city}</TableCell>
                                                <TableCell align="right">{row.topic}</TableCell>
                                                <TableCell align="right">{row.product}</TableCell>
                                                <TableCell align="right">{row.lang}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={lastCalls.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    );
}
