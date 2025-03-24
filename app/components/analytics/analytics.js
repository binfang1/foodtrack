"use client";

import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

async function getOrders() {
    const url = "http://localhost:3000/api/orders";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

export default function Analytics() {
    const [orders, setOrders] = useState([]);

    const [year_list, setYearList] = useState([]);
    const [month_list, setMonthList] = useState([]);
    const [day_list, setDayList] = useState([]);
    const [week_list, setWeekList] = useState([]);
    const [hour_list, setHourList] = useState([]);

    const [cash_total, setCashTotal] = useState(0);
    const [credit_total, setCreditTotal] = useState(0);
    const [order_total, setOrderTotal] = useState(0);

    const [year_revenue, setYearRevenue] = useState([]);
    const [month_revenue, setMonthRevenue] = useState([]);
    const [week_revenue, setWeekRevenue] = useState([]);
    const [day_revenue, setDayRevenue] = useState([]);
    const [hour_revenue, setHourRevenue] = useState([]);

    var temp_month_list = new Array(12).fill(0);
    var temp_day_list = new Array(31).fill(0);
    var temp_week_list = new Array(7).fill(0);
    var temp_hour_list = new Array(11).fill(0);

    var temp_cash_total = 0;
    var temp_credit_total = 0;
    var temp_order_total = 0;


    var temp_week_revenue = new Array(7).fill(0);
    var temp_hour_revenue = new Array(11).fill(0);

    var temp_orders;

    var now = new Date(Date.now());

    useEffect(() => {

        getOrders().then((result) => {
    
            temp_orders = result;
    
            for(let i = 0; i < temp_orders.length; i++) {
                let creation_datetime = new Date(temp_orders[i].creation_datetime);

                if(creation_datetime.getFullYear() == now.getFullYear()) {
                    console.log(`Current Month: ${creation_datetime.getMonth()}, Current Total: ${temp_month_revenue[creation_datetime.getMonth()]}, Adding: ${temp_orders[i].total}`)
                    temp_month_revenue[creation_datetime.getMonth()] = temp_month_list[creation_datetime.getMonth()] + temp_orders[i].total;
                    if(creation_datetime.getMonth() == now.getMonth()) {
                        temp_day_revenue[creation_datetime.getDate() - 1] = temp_day_revenue[creation_datetime.getDate()] + temp_orders[i].total;

                    }
                }
    
                temp_month_list[creation_datetime.getMonth()] = temp_month_list[creation_datetime.getMonth()] + 1;
                temp_day_list[creation_datetime.getDate() - 1] = temp_day_list[creation_datetime.getDate() - 1] + 1;
                temp_week_list[creation_datetime.getDay()] = temp_week_list[creation_datetime.getDay()] + 1;
                if(creation_datetime.getHours() - 11 >= 0 && creation_datetime.getHours() - 11 <= 10) {
                    temp_hour_list[creation_datetime.getHours() - 11] = temp_hour_list[creation_datetime.getHours() - 11] + 1;
                }

                if(temp_orders[i].payment_method.localeCompare("Cash")) {
                    temp_cash_total = temp_cash_total + temp_orders[i].total;
                } else {
                    temp_credit_total = temp_credit_total + temp_orders[i].total;
                }


            }

            setMonthList(temp_month_list);
            setDayList(temp_day_list);
            setWeekList(temp_week_list);
            setHourList(temp_hour_list);

            setCashTotal(temp_cash_total);
            setCreditTotal(temp_credit_total);

            setMonthRevenue(temp_month_revenue);
            setDayRevenue(temp_day_revenue);
            
        });


    }, []);


    const month_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month_data = {
        labels: month_labels,
        datasets: [
          {
            data: month_list //[50, 43, 37, 20, 24, 28, 44, 55, 66, 99, 45, 35],
          }
        ],
      };

    const month_revenue_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month_revenue_data = {
        labels: month_revenue_labels,
        datasets: [
        {
            data: month_revenue //[50, 43, 37, 20, 24, 28, 44, 55, 66, 99, 45, 35],
        }
        ],
    };

    const day_labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const day_data = {
        title: "Hello",
        labels: day_labels,
        datasets: [
        {
            data: day_list,
        }
        ],
    };

    const day_revenue_labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
    const day_revenue_data = {
        title: "Hello",
        labels: day_revenue_labels,
        datasets: [
        {
            data: day_revenue,
        }
        ],
    };

    const week_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const week_data = {
        labels: week_labels,
        datasets: [
        {
            data: week_list,
        }
        ],
    };

    const payment_labels = ['Cash', 'Credit'];
    const payment_data = {
        labels: payment_labels,
        datasets: [
        {
            data: [cash_total, credit_total]
        }
        ],
    };

    return (
        <div className="flex flex-col h-screen bg-sky-50">
            <div className='flex flex-row'>

                <div className='flex w-106'>
                    <Bar labels={month_labels} data={month_data}></Bar>
                </div>
                <div className='flex w-106'>
                    <Bar labels={day_labels} data={day_data}></Bar>
                </div>
                <div className='flex w-106'>
                    <Bar labels={week_labels} data={week_data}></Bar>
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='flex w-106'>
                    <Doughnut labels={payment_labels} data={payment_data}></Doughnut>
                </div>
            
            </div>
            <div className='flex flex-row'>
                <div className='flex w-106'>
                    <Bar labels={month_revenue} data={month_revenue_data}></Bar>
                </div>
                <div className='flex w-106'>
                    <Bar labels={day_revenue} data={day_revenue_data}></Bar>
                </div>
            </div>
        </div>
    );
}

function filter_month(datetime, month_list) {

}


