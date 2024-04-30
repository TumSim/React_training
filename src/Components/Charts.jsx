import { useState, useEffect } from 'react';
import { fetchTrainings } from '../trainingsapi';
import {  BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label} from 'recharts';
import _ from 'lodash';



function Stats() {

    const [trainings, setTrainings] = useState();


    useEffect(() => {
        fetchTrainings()
            .then(data => {
                const mappedData = _.chain(data)
                    .groupBy("activity")
                    .map((trainings, activity) => ({ name: activity, uv: _.sumBy(trainings, "duration") }))
                    .value();

                setTrainings(mappedData)
            })
            .catch(err => console.error(err))

    }, [])

    console.log(trainings);

    return (
        <div>
        <BarChart
            width={900}
            height={400}
            data={trainings}
            margin={{
                top: 40
            }}
            style={{
                padding: "70px"
            }}
        >
                    <text x={900 / 2} y={10} fill="black" textAnchor="middle" dominantBaseline="central">
            <tspan fontSize="25">Minutes per Trainings</tspan>
        </text>
            <XAxis dataKey="name"/>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}/>
            <Bar dataKey="uv" fill="#3d5afe"  label={{ position: "top", fill: "black" }} />
        </BarChart>
        </div>
    );
}

export default Stats;