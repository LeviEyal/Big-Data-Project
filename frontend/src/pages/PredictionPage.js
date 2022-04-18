import { useState } from 'react';
import { Button } from '@mui/material';

import config from '../config';
import NewCall from '../sections/@dashboard/answerCalls/NewCall';

export default function PredictionPage() {
    const [building, setBuilding] = useState(false);

    const handleBuildModel = () => {
        setBuilding(true);
        fetch(`${config.BatchLayerURL}/api/buildModel`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setBuilding(false);
                console.log('model built');
            });
    };

    return (
        <div>
            <h1>PredictionPage</h1>
            {
                building ?
                    <Button disabled>Building Model...</Button>
                    :
                    <Button onClick={handleBuildModel}>Build Model</Button>
            }
            <NewCall />
        </div>
    );
}
