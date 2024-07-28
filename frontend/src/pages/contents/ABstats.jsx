import React, {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import {message, Spin, Typography} from "antd"
import { Divider } from 'antd';
import {Timeline} from 'antd';
import {Space, Table, Tag} from 'antd';
import {Alert} from 'antd';
import style from 'antd/es/affix/style';
const {Column, ColumnGroup} = Table;

const {Title, Paragraph} = Typography;

const ONstats = () => {
    const [percent, setPercent] = useState(0)
    
    const [AIText, setAIText] = useState("")
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState("")
    const [times, setTimes] = useState([])
    const [temperatures, setTemperatures] = useState([])
    const [humidities, setHumidities] = useState([])
    const [precipitations, setPrecipitations] = useState([])
    const [cloudCovers, setCloudCovers] = useState([])
    const [windDirections, setWindDirections] = useState([])
    const [windSpeeds, setWindSpeeds] = useState([])
    const [soilTemperatures, setSoilTemperatures] = useState([])
    const [soilMoistures, setSoilMoistures] = useState([])
    
    async function getONAPIRequest() {
    const response = await axios.get("http://localhost:5050/ab")
    setCity("Jasper, Alberta")
    let times = []
    let temperatures = []
    let precipitations = []
    let cloudCovers = []
    let windDirections = []
    let windSpeeds = []
    let soilTemperatures = []
    let soilMoistures = []
    let AIText = response.data[response.data.length - 1].AIText
        
    for (let i = 0; i < 11; i++){
    
      times.push(response.data[i].time)
      temperatures.push(response.data[i].temperature120m).toPrecision(2)    
      precipitations.push(response.data[i].precipitation)
      cloudCovers.push(response.data[i].cloudCover)
      windDirections.push(response.data[i].windDirection)
      windSpeeds.push(response.data[i].windSpeed)
      soilTemperatures.push(response.data[i].soilTemperature)
      soilMoistures.push(response.data[i].soilMoisture)
    }
    console.log(humidities)
    setTimes(times)
    setTemperatures(temperatures)
    setHumidities(humidities)
    setPrecipitations(precipitations)
    setCloudCovers(cloudCovers)
    setWindDirections(windDirections)
    setWindSpeeds(windSpeeds)
    setSoilTemperatures(soilTemperatures)
    setSoilMoistures(soilMoistures)
    setAIText(AIText)
    setPercentFromAIText()
    setLoading(false)
  }

  async function setPercentFromAIText() {
    let match = AIText.match(/(\d+)%/);
    let percent = match && match[1] || 0;
    setPercent(Number(percent))
    }



  const data = [
  {
    key: '1',
    time: times[0] && times[0][0] || null,
    windDirection: windDirections[0] && windDirections[0][0] || null,
    windSpeed: windSpeeds[0] && windSpeeds[0][0] || null,
    soilMoisture: soilMoistures[0] && soilMoistures[0][0] || null,
    soilTemp: soilTemperatures[0] && soilTemperatures[0][0] || null
  },

  {
      time: times[1] && times[1][1] || null,
    
        windDirection: windDirections[1] && windDirections[1][1] || null,
        windSpeed: windSpeeds[1] && windSpeeds[1][1] || null,
        soilMoisture: soilMoistures[1] && soilMoistures[1][1] || null,
        soilTemp: soilTemperatures[1] && soilTemperatures[1][1] || null
    },
    {
        key: '3',
        time: times[2] && times[2][2] || null,
    
        windDirection: windDirections[2] && windDirections[2][2] || null,
        windSpeed: windSpeeds[2] && windSpeeds[2][2] || null,
        soilMoisture: soilMoistures[2] && soilMoistures[2][2] || null,
        soilTemp: soilTemperatures[2] && soilTemperatures[2][2] || null
    },
    {
        key: '4',
        time: times[3] && times[3][3] || null,
    
        windDirection: windDirections[3] && windDirections[3][3] || null,
        windSpeed: windSpeeds[3] && windSpeeds[3][3] || null,
        soilMoisture: soilMoistures[3] && soilMoistures[3][3] || null,
        soilTemp: soilTemperatures[3] && soilTemperatures[3][3] || null
    },
    {
        key: '4',
        time: times[3] && times[3][3] || null,
    
        windDirection: windDirections[3] && windDirections[3][3] || null,
        windSpeed: windSpeeds[3] && windSpeeds[3][3] || null,
        soilMoisture: soilMoistures[3] && soilMoistures[3][3] || null,
        soilTemp: soilTemperatures[3] && soilTemperatures[3][3] || null
    },
    {
        key: '5',
        time: times[4] && times[4][4] || null,
    
        windDirection: windDirections[4] && windDirections[4][4] || null,
        windSpeed: windSpeeds[4] && windSpeeds[4][4] || null,
        soilMoisture: soilMoistures[4] && soilMoistures[4][4] || null,
        soilTemp: soilTemperatures[4] && soilTemperatures[4][4] || null
    },
    {
        key: '6',
        time: times[5] && times[5][5] || null,
    
        windDirection: windDirections[5] && windDirections[5][5] || null,
        windSpeed: windSpeeds[5] && windSpeeds[5][5] || null,
        soilMoisture: soilMoistures[5] && soilMoistures[5][5] || null,
        soilTemp: soilTemperatures[5] && soilTemperatures[5][5] || null
    },
{

        key: '7',
        time: times[6] && times[6][6] || null,
    
        windDirection: windDirections[6] && windDirections[6][6] || null,
        windSpeed: windSpeeds[6] && windSpeeds[6][6] || null,
        soilMoisture: soilMoistures[6] && soilMoistures[6][6] || null,
        soilTemp: soilTemperatures[6] && soilTemperatures[6][6] || null
    },
    {
        key: '8',
        time: times[7] && times[7][7] || null,
    
        windDirection: windDirections[7] && windDirections[7][7] || null,
        windSpeed: windSpeeds[7] && windSpeeds[7][7] || null,
        soilMoisture: soilMoistures[7] && soilMoistures[7][7] || null,
        soilTemp: soilTemperatures[7] && soilTemperatures[7][7] || null
    
}
 
];

useEffect(() => {
    getONAPIRequest();

    const interval = setInterval(() => {
        getONAPIRequest();
    }
    , 30000)
}, [])

if (loading) {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Spin size="large" />
        </div>
    )
}
    return (
        <div>
             <Title level={2} style={{textAlign: 'center'}}>Jasper, Alberta</Title>
             <Title level={5} italic style={{textAlign: 'center', color:'green'}}>{AIText}</Title>
            <Divider orientation="middle">Warnings</Divider>
                 {percent > 40 && (
            <div>
                <Title level={4} style={{textAlign: 'center', color: 'red'}}>Warning: Percent is above 40!</Title>
            </div>
        )}
        {percent >= 10 && (
            <div>
                <Title level={4} style={{textAlign: 'center', color: 'orange'}}>Alert: Percent is above 20!</Title>
            </div>
        )}
        {percent < 10 && (
            <div>
                <Title level={4} style={{textAlign: 'center', color: 'green'}}>No Alert</Title>
            </div>
        )}
    


            <Divider orientation="middle">Weather Data</Divider>
                <Timeline
    mode="alternate"
    
    items={times.map((time, index) => ({
   children: `
                    Time: ${time[index]}
                    Temperature: ${temperatures[index][index]} °C
                    Precipitation: ${precipitations[index][index]} mm

                `,
  color: 'blue',
}))}
  />
   <Divider orientation="middle"></Divider>
        <Table dataSource={data}>
    <ColumnGroup title="Additional Weather Infos">
    <Column title="Time" dataIndex="time" key="time" />
   
    </ColumnGroup>
    <Column title="Wind Direction" dataIndex="windDirection" key="windDirection" />
    <Column title="Wind Speed" dataIndex="windSpeed" key="windSpeed" />
    <Column title="Soil Moisture" dataIndex="soilMoisture" key="soilMoisture" />
    <Column title="Soil Temperatures" dataIndex="soilTemp" key="soilTemp" />

  </Table>
  <Paragraph>
    Percentage of the forest that is dry: {percent}%
  </Paragraph>
        </div>
    );
    }
export default ONstats;