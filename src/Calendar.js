import React, { useEffect, useState } from 'react'
import { Box } from './Box'
let day = 1;

const Calendar = () => {
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(2020);
    const [events, setEvents] = useState({});
    const [country, setCountry] = useState('us');
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const contries = [
        {code: 'ca', name: 'Canada'},
        {code: 'us', name: 'United States'},
        {code: 'uk', name: 'United Kingdom'},
        {code: 'in', name: 'India'},
    ];

    const getMaxDay = (monthNumber) => {

        if (monthNumber < 0 || monthNumber > 11)
            throw Error('Invalid month number, Pls check.');
        let maxDay = 0;
        switch (monthNumber) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                maxDay = 31;
                break;
            case 1:
                maxDay = checkLeapYear(year) ?  29 : 28;
                break;
            default:
                maxDay = 30;
        }

        return maxDay;
    }

    const checkLeapYear = (year) => {
        return (((0 === year % 4) && (0 !== year % 100) ) || (0 === year % 400))      
    }

    const getDayName = () => {
        const weekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const row = [];

        for (let i = 0; i < weekNames.length; i++) {
            row.push(<Box className={'heading'} key={weekNames[i]} num={weekNames[i]} />)
        }

        return row;
    };

    function getRows() {
        const rows = [];
        const maxDay = getMaxDay(month);
        const startOfMonth = new Date(`${year}-${month + 1}-01`);
        const currentDay = startOfMonth.getDay();

        if (day === 1 && currentDay !== 0) {
            for (let i = 0; i < currentDay; i++) {
                rows.push(<Box key={i + 'mati'} />)
            }
        }
        const startI = (day === 1 && currentDay !== 0) ? currentDay: 0 ;
        for (let i = startI; i < 7; i++) {
            if (day > maxDay)
                break;
            rows.push(<Box key={day} num={day} events={events[day]}/>);
            day++;
        }
        // console.log(rows)
        return rows;
    }

    const getYear = () => {
        const year = [];
        for (let i = 2020; i <= 2030; i++) {
            year.push(i)
        }
        return year;
    }
    
    const updateMonthAndYearAndCountry = (month, year, country) => {
        setMonth(month);
        setYear(year);
        setCountry(country);
        day = 1;
    }

    const getHolidays = async () => {
        const resp = await fetch( `https://holidays.abstractapi.com/v1/?api_key=bf4c6a736f0f4f7dae929adcefbc322f&country=${country.toUpperCase()}&year=${year}&month=${month + 1}` )
        const o = {}
        const holidays = await resp.json();
        console.log(holidays);
        for (let i=0; i<holidays.length; i++) {
            
            if(o[Number(holidays[i].date_day)]) {
                o[Number(holidays[i].date_day)].push(holidays[i].name)
            }
            else {
                o[Number(holidays[i].date_day)] = [holidays[i].name];
            }   
        }
        console.log(o);
        day = 1;
        setEvents(o);
    }

    useEffect( ()=>{
        getHolidays();
    }, [month, year, country]);

    return (
        <div>
            <div className='dropdowns'>
                <select onChange={(e) => updateMonthAndYearAndCountry(Number(e.target.value), year, country)}>
                    {
                        months.map((item, index) => {
                            return <option key={index} value={index}>{item}</option>
                        })
                    }
                </select>

                <select disabled onChange={(e) => updateMonthAndYearAndCountry(month, Number(e.target.value), country)}>
                    {
                        getYear().map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })
                    }
                </select>

                <select className='country-dropdown' onChange={(e) => updateMonthAndYearAndCountry(month, year, e.target.value)}>
                    {
                        contries.map(item => (<option key={ item.code } selected={country === item.code} value={item.code}>{ item.name }</option>))
                    }
                </select>
            </div>


            <div className='container'>

                <div className='row'>
                    {getDayName()}
                </div>

                <div className='row'>
                    {getRows()}
                </div>

                <div className='row'>
                    {getRows()}
                </div>

                <div className='row'>
                    {getRows()}
                </div>

                <div className='row'>
                    {getRows()}
                </div>

                <div className='row'>
                    {getRows()}
                </div>
                
                <div className='row'>
                    {getRows()}
                </div>

            </div>
        </div>
    )
}

export default Calendar;