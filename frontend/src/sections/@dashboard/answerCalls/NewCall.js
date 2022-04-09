import { useState } from 'react';
import { Button, TableRow, TableCell, TextField, Typography, MenuItem } from '@mui/material';

import { getCurrentHour } from '../../../utils/formatTime';

const langs = [
    {
        value: 'עברית',
        label: 'עברית'
    },
    {
        value: 'אנגלית',
        label: 'אנגלית'
    },
    {
        value: 'רוסית',
        label: 'רוסית'
    },
    {
        value: 'אמהרית',
        label: 'אמהרית'
    }
];

export default function NewCall({ handleEndCall, data }) {
    const [callData, setCallData] = useState(data);

    const handleSubmit = () => {
        console.log(data.id);
        handleEndCall(data.id);
        console.log(callData);
    };

    return (
        <TableRow hover key={data.id} tabIndex={-1} role="contentinfo" dir="rtl">
            {/* כפתור סיום שיחה */}
            <TableCell align="right" >
                <Button onClick={handleSubmit}>סיום שיחה</Button>
            </TableCell>

            {/* זמן תחילת שיחה */}
            <TableCell align="right" >
                <Typography>{data.start_time}</Typography>
            </TableCell>

            {/* טלפון */}
            <TableCell align="right" sx={{ width: '130px' }}>
                <Typography variant="button">{data.phone}</Typography>
            </TableCell>

            {/* שם */}
            <TableCell align="right">
                <TextField
                    autoFocus
                    label="שם מלא"
                    type="text"
                    size="small"
                    onChange={(e) => {
                        setCallData({ ...callData, name: e.target.value });
                    }}
                />
            </TableCell>

            {/* עיר */}
            <TableCell align="right">
                <TextField
                    label="עיר"
                    type="text"
                    size="small"
                    onChange={(e) => {
                        setCallData({ ...callData, city: e.target.value });
                    }}
                />
            </TableCell>

            {/* גיל */}
            <TableCell align="right" sx={{ width: '100px' }}>
                <TextField
                    label="גיל"
                    type="number"
                    size="small"
                    onChange={(e) => {
                        setCallData({ ...callData, age: e.target.value });
                    }}
                />
            </TableCell>

            {/* מין */}
            <TableCell align="right">
                <TextField
                    value={callData.gender}
                    label="מין"
                    size="small"
                    select
                    onChange={(e) => {
                        setCallData({ ...callData, gender: e.target.value });
                    }}
                >
                    <MenuItem key="זכר" value="זכר">
                        זכר
                    </MenuItem>
                    <MenuItem key="נקבה" value="נקבה">
                        נקבה
                    </MenuItem>
                </TextField>
            </TableCell>

            {/* מוצרים */}
            <TableCell align="right">
                <TextField
                    value={callData.product}
                    label="מוצרים"
                    size="small"
                    select
                    onChange={(e) => {
                        setCallData({ ...callData, product: e.target.value });
                    }}
                >
                    <MenuItem key="אינטרנט" value="אינטרנט">
                        אינטרנט
                    </MenuItem>
                    <MenuItem key="טלפון" value="טלפון">
                        טלפון
                    </MenuItem>
                    <MenuItem key="סלולרי" value="סלולרי">
                        סלולרי
                    </MenuItem>
                    <MenuItem key="כבלים" value="כבלים">
                        כבלים
                    </MenuItem>
                </TextField>
            </TableCell>

            {/* שפה */}
            <TableCell align="right">
                <TextField
                    value={callData.lang}
                    id="outlined-select-currency"
                    size="small"
                    label="שפה"
                    select
                    onChange={(e) => {
                        setCallData({ ...callData, lang: e.target.value });
                    }}
                >
                    {langs.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </TableCell>
        </TableRow>
    );
}
