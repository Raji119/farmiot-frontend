import React from 'react';

import GaugeChart from 'react-gauge-chart';
import Thermometer from 'react-thermometer-component'

import './SensorValuePage.css'


const Sensor = ({ type, value, sensorId, minvalue, maxvalue, deviceKey, siunit, deviceId }) => {
    function calculatePercent(value, minValue, maxValue) {
        if (value < minValue) {
            return 0.0;
        } if (value > maxValue) {
            return 1.0;
        }
        return (value - minValue) / (maxValue - minValue);
    }

    console.log(type)

    if (type === 1 || type === 2) {
        return (
            <div className='chart' key={sensorId}>
                <div>
                    <GaugeChart
                        id="sensor-gauge"
                        nrOfLevels={10}
                        colors={["#FF5F6D", "#FFC371"]}
                        textColor="#000000"
                        arcWidth={0.34}
                        percent={calculatePercent(value, minvalue, maxvalue)}
                        key={sensorId}
                        animate
                    />
                </div>
                <center key={sensorId} className='text-below-widget'>
                    {deviceKey} : {value !== null ? value : 'Loading...'} {siunit}
                    <div>
                        Minimum value: {minvalue}
                    </div>
                    <div>
                        Maximum value: {maxvalue}
                    </div>
                    <div>
                        Type: {type}
                    </div>
                    <p>Value: {value}</p>
                </center>
            </div>

        )
    }

    if (type === 3) {
        return (
            <div className='chart' key={sensorId}>
                <div className='thermo-radial'>
                    <Thermometer
                        theme="light"
                        value={value}
                        max={maxvalue}
                        steps="3"
                        format="°C"
                        size="large"
                        height="300"
                    />
                </div>
                <center key={sensorId} className='text-below-widget'>
                    {deviceKey} : {value !== null ? value : 'Loading...'} {siunit}
                    <div>
                        Minimum value: {minvalue}
                    </div>
                    <div>
                        Maximum value: {maxvalue}
                    </div>
                    <div>
                        Type: {type}
                    </div>
                    <p>Value: {value}</p>
                </center>
            </div>

        )
    }
    if (type === 4) {
        return (
            <div className='chart' key={sensorId}>

                <div className='thermo-radial'>
                    <GaugeChart
                        id="sensor-gauge"
                        nrOfLevels={10}
                        colors={["#FF5F6D", "#FFC371"]}
                        textColor="#000000"
                        arcWidth={0.34}
                        percent={calculatePercent(value, minvalue, maxvalue)}
                        key={sensorId}
                        animate
                    />
                </div>
                <center key={sensorId}>
                    {deviceKey} : {value !== null ? value : 'Loading...'} {siunit}
                    <div>
                        Minimum value: {minvalue}
                    </div>
                    <div>
                        Maximum value: {maxvalue}
                    </div>
                    <div>
                        Type: {type}
                    </div>
                    <p>Value: {value}</p>
                </center>
            </div>
        )
    }
    return (<></>)
}

export default Sensor;