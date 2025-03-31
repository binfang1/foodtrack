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
import 'chart.js/auto'


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

    const [month_list, setMonthList] = useState([]);
    const [day_list, setDayList] = useState([]);
    const [week_list, setWeekList] = useState([]);
    const [hour_list, setHourList] = useState([]);

    const [month_cash_total, setMonthCashTotal] = useState(0);
    const [month_amex_total, setMonthAmexTotal] = useState(0);
    const [month_mastercard_total, setMonthMastercardTotal] = useState(0);
    const [month_visa_total, setMonthVisaTotal] = useState(0);
    const [month_subtotal, setMonthSubtotal] = useState(0);
    const [month_tax, setMonthTax] = useState(0);

    const [day_cash_total, setDayCashTotal] = useState(0);
    const [day_amex_total, setDayAmexTotal] = useState(0);
    const [day_mastercard_total, setDayMastercardTotal] = useState(0);
    const [day_visa_total, setDayVisaTotal] = useState(0);
    const [day_subtotal, setDaySubtotal] = useState(0);
    const [day_tax, setDayTax] = useState(0);

    const [week_cash_total, setWeekCashTotal] = useState(0);
    const [week_amex_total, setWeekAmexTotal] = useState(0);
    const [week_mastercard_total, setWeekMastercardTotal] = useState(0);
    const [week_visa_total, setWeekVisaTotal] = useState(0);
    const [week_subtotal, setWeekSubtotal] = useState(0);
    const [week_tax, setWeekTax] = useState(0);

    const [hour_cash_total, setHourCashTotal] = useState(0);
    const [hour_amex_total, setHourAmexTotal] = useState(0);
    const [hour_mastercard_total, setHourMastercardTotal] = useState(0);
    const [hour_visa_total, setHourVisaTotal] = useState(0);
    const [hour_subtotal, setHourSubtotal] = useState(0);
    const [hour_tax, setHourTax] = useState(0);

    const [month_revenue, setMonthRevenue] = useState([]);
    const [week_revenue, setWeekRevenue] = useState([]);
    const [day_revenue, setDayRevenue] = useState([]);
    const [hour_revenue, setHourRevenue] = useState([]);

    const [month_top, setMonthTop] = useState([]);
    const [month_top_quantity, setMonthTopQuantity] = useState([]);

    const [week_top, setWeekTop] = useState([]);
    const [week_top_quantity, setWeekTopQuantity] = useState([]);
    
    const [day_top, setDayTop] = useState([]);
    const [day_top_quantity, setDayTopQuantity] = useState([]);
    
    const [hour_top, setHourTop] = useState([]);
    const [hour_top_quantity, setHourTopQuantity] = useState([]);



    const [year_title, setYearTitle] = useState("");
    const [month_title, setMonthTitle] = useState("");
    const [week_title, setWeekTitle] = useState("");
    const [day_title, setDayTitle] = useState("");

    const [page, setPage] = useState("today");

    var temp_orders;

    var now = new Date(Date.now());

    useEffect(() => {

        getOrders().then((result) => {
            var temp_month_list = new Array(12).fill(0);
            var temp_day_list = new Array(31).fill(0);
            var temp_week_list = new Array(7).fill(0);
            var temp_hour_list = new Array(12).fill(0);

            console.log(`Temp Hour List: ${temp_hour_list}`);

            var temp_month_cash_total = 0;
            var temp_month_amex_total = 0;
            var temp_month_mastercard_total = 0;
            var temp_month_visa_total = 0;
            var temp_month_subtotal = 0;
            var temp_month_tax = 0; 

            var temp_day_cash_total = 0;
            var temp_day_amex_total = 0;
            var temp_day_mastercard_total = 0;
            var temp_day_visa_total = 0;
            var temp_day_subtotal = 0;
            var temp_day_tax = 0;

            var temp_week_cash_total = 0;
            var temp_week_amex_total = 0;
            var temp_week_mastercard_total = 0;
            var temp_week_visa_total = 0;
            var temp_week_subtotal = 0;
            var temp_week_tax = 0;

            var temp_hour_cash_total = 0;
            var temp_hour_amex_total = 0;
            var temp_hour_mastercard_total = 0;
            var temp_hour_visa_total = 0;
            var temp_hour_subtotal = 0;
            var temp_hour_tax = 0;

            var temp_month_revenue = new Array(12).fill(0);
            var temp_day_revenue = new Array(31).fill(0);
            var temp_week_revenue = new Array(7).fill(0);
            var temp_hour_revenue = new Array(12).fill(0);

            var temp_month_top = []
            var temp_month_top_quantity = []

            var temp_day_top = []
            var temp_day_top_quantity = []

            var temp_week_top = []
            var temp_week_top_quantity = []

            var temp_hour_top = []
            var temp_hour_top_quantity = []

            var items;

    
            temp_orders = result;
            console.log(`Incoming Array: ${temp_orders}`);
    
            for(let i = 0; i < temp_orders.length; i++) {
                let offset = now.getTimezoneOffset()
                let creation_datetime = new Date(temp_orders[i].creation_datetime);
                console.log(`Sorting ${creation_datetime} at index ${i}`);
                items = JSON.parse(temp_orders[i].items);
                let payment_status = temp_orders[i].payment_status;
                let tax = temp_orders[i].tax;
                let subtotal = temp_orders[i].subtotal;

                // Today, Last 7 Days, Month, Year
                // Count, Revenue, Cash/Credit, Top Sellers

                // Year
                if(creation_datetime.getFullYear() == now.getFullYear()) {
                  console.log("Entering current year")
                  // Revenue - Year
                  if(payment_status == "paid") {
                    console.log(`Current Month: ${creation_datetime.getMonth()}, Current Total: ${temp_month_revenue[creation_datetime.getMonth()]}, Adding: ${temp_orders[i].total}`)
                    temp_month_revenue[creation_datetime.getMonth()] = temp_month_revenue[creation_datetime.getMonth()] + temp_orders[i].total;
                  }
                    // Count - Year
                  temp_month_list[creation_datetime.getMonth()] = temp_month_list[creation_datetime.getMonth()] + 1;
                  // Cash/Credit - Year
                  if(temp_orders[i].payment_method == null) {

                  } else if (temp_orders[i].payment_method.localeCompare("Cash") === 0) {
                    temp_month_cash_total = temp_month_cash_total + temp_orders[i].total;
                  } else if (temp_orders[i].payment_method.localeCompare("amex") === 0) {
                      temp_month_amex_total = temp_month_amex_total + temp_orders[i].total;
                  } else if (temp_orders[i].payment_method.localeCompare("mastercard") === 0) {
                      temp_month_mastercard_total = temp_month_mastercard_total + temp_orders[i].total;
                  } else if (temp_orders[i].payment_method.localeCompare("visa") === 0) {
                      temp_month_visa_total = temp_month_visa_total + temp_orders[i].total;
                  }
                  // Top Sellers - Year
                  for(let j = 0; j < items.length; j++) {

                    if(temp_month_top.indexOf(items[j].name) == -1) {
                      // Not found
                      temp_month_top.push(items[j].name);
                      temp_month_top_quantity.push(items[j].quantity);
                    } else {
                      // Found
                      let index = temp_month_top.indexOf(items[j].name);
                      temp_month_top_quantity[index] = temp_month_top_quantity[index] + items[j].quantity;
                    }
                  }
                  // Subtotal and Tax - Year
                  if(temp_orders[i].payment_method != null) {
                    temp_month_subtotal = temp_month_subtotal + subtotal;
                    temp_month_tax = temp_month_tax + tax;
                  }

                  // Month
                  if(creation_datetime.getMonth() == now.getMonth()) {
                    console.log("Entering current month")
                    // Revenue - Month
                    if(payment_status == "paid") {
                      temp_day_revenue[creation_datetime.getDate() - 1] = temp_day_revenue[creation_datetime.getDate() - 1] + temp_orders[i].total;
                    }
                    // Count - Month
                    temp_day_list[creation_datetime.getDate() - 1] = temp_day_list[creation_datetime.getDate() - 1] + 1;
                    // Cash/Credit - Month
                    if(temp_orders[i].payment_method == null) {

                    } else if (temp_orders[i].payment_method.localeCompare("Cash") === 0) {
                      temp_day_cash_total = temp_day_cash_total + temp_orders[i].total;
                    } else if (temp_orders[i].payment_method.localeCompare("amex") === 0) {
                        temp_day_amex_total = temp_day_amex_total + temp_orders[i].total;
                    } else if (temp_orders[i].payment_method.localeCompare("mastercard") === 0) {
                        temp_day_mastercard_total = temp_day_mastercard_total + temp_orders[i].total;
                    } else if (temp_orders[i].payment_method.localeCompare("visa") === 0) {
                        temp_day_visa_total = temp_day_visa_total + temp_orders[i].total;
                    }
                    // Top Sellers - Month

                    for(let j = 0; j < items.length; j++) {

                      if(temp_day_top.indexOf(items[j].name) == -1) {
                        // Not found
                        temp_day_top.push(items[j].name);
                        temp_day_top_quantity.push(items[j].quantity);
                      } else {
                        // Found
                        let index = temp_day_top.indexOf(items[j].name);
                        temp_day_top_quantity[index] = temp_day_top_quantity[index] + items[j].quantity;
                      }
                    }

                    // Subtotal and Tax - Month
                    if(temp_orders[i].payment_method != null) {
                      temp_day_subtotal = temp_day_subtotal + subtotal;
                      temp_day_tax = temp_day_tax + tax;
                    }

                    // Week (Last 7 Days)
                    if(creation_datetime <= now && creation_datetime > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
                      console.log("Entering current week")
                      // Revenue - Week
                      if(payment_status == "paid") {
                        temp_week_revenue[creation_datetime.getDay()] = temp_week_revenue[creation_datetime.getDay()] + temp_orders[i].total;
                      }
                        // Count - Week
                      temp_week_list[creation_datetime.getDay()] = temp_week_list[creation_datetime.getDay()] + 1;
                      // Cash/Credit - Week
                      if(temp_orders[i].payment_method == null) {

                      } else if (temp_orders[i].payment_method.localeCompare("Cash") === 0) {
                        temp_week_cash_total = temp_week_cash_total + temp_orders[i].total;
                      } else if (temp_orders[i].payment_method.localeCompare("amex") === 0) {
                          temp_week_amex_total = temp_week_amex_total + temp_orders[i].total;
                      } else if (temp_orders[i].payment_method.localeCompare("mastercard") === 0) {
                          temp_week_mastercard_total = temp_week_mastercard_total + temp_orders[i].total;
                      } else if (temp_orders[i].payment_method.localeCompare("visa") === 0) {
                          temp_week_visa_total = temp_week_visa_total + temp_orders[i].total;
                      }
                      // Top Sellers - Week

                      for(let j = 0; j < items.length; j++) {

                        if(temp_week_top.indexOf(items[j].name) == -1) {
                          // Not found
                          temp_week_top.push(items[j].name);
                          temp_week_top_quantity.push(items[j].quantity);
                        } else {
                          // Found
                          let index = temp_week_top.indexOf(items[j].name);
                          temp_week_top_quantity[index] = temp_week_top_quantity[index] + items[j].quantity;
                        }
                      }

                      // Subtotal and Tax - Week
                      if(temp_orders[i].payment_method != null) {
                        temp_week_subtotal = temp_week_subtotal + subtotal;
                        temp_week_tax = temp_week_tax + tax;
                      }
                    
                      console.log(creation_datetime);
                      console.log(now);
                      // Hour
                      if(creation_datetime.getHours() >= 11 && creation_datetime.getHours() <= 22 && creation_datetime.getDate() == now.getDate()) {
                        console.log("Entering current day")
                        // Revenue - Hour
                        if(payment_status == "paid") {
                          temp_hour_revenue[creation_datetime.getHours() - 11] = temp_hour_revenue[creation_datetime.getHours() - 11] + temp_orders[i].total;
                          console.log(`Hour: ${creation_datetime.getHours()}`);
                          console.log(`Inserting into index: ${creation_datetime.getHours() - 11}`);
                        }
                        // Count - Hour
                        temp_hour_list[creation_datetime.getHours() - 11] = temp_hour_list[creation_datetime.getHours() - 11] + 1;
                        console.log(`Temp Hour List: ${temp_hour_list}`);
                        // Cash/Credit - Day
                        if(temp_orders[i].payment_method == null) {

                        } else if (temp_orders[i].payment_method.localeCompare("Cash") === 0) {
                          temp_hour_cash_total = temp_hour_cash_total + temp_orders[i].total;
                        } else if (temp_orders[i].payment_method.localeCompare("amex") === 0) {
                            temp_hour_amex_total = temp_hour_amex_total + temp_orders[i].total;
                        } else if (temp_orders[i].payment_method.localeCompare("mastercard") === 0) {
                            temp_hour_mastercard_total = temp_hour_mastercard_total + temp_orders[i].total;
                        } else if (temp_orders[i].payment_method.localeCompare("visa") === 0) {
                            temp_hour_visa_total = temp_hour_visa_total + temp_orders[i].total;
                        }

                        for(let j = 0; j < items.length; j++) {

                          if(temp_hour_top.indexOf(items[j].name) == -1) {
                            // Not found
                            temp_hour_top.push(items[j].name);
                            temp_hour_top_quantity.push(items[j].quantity);
                          } else {
                            // Found
                            let index = temp_hour_top.indexOf(items[j].name);
                            temp_hour_top_quantity[index] = temp_hour_top_quantity[index] + items[j].quantity;
                          }
                        }

                        // Subtotal and Tax - Year
                        if(temp_orders[i].payment_method != null) {
                          temp_hour_subtotal = temp_hour_subtotal + subtotal;
                          temp_hour_tax = temp_hour_tax + tax;
                        }

                      }
                    }
                  }
                }

                /*
                //Revenue
                if(creation_datetime.getFullYear() == now.getFullYear()) {
                    console.log(`Current Month: ${creation_datetime.getMonth()}, Current Total: ${temp_month_revenue[creation_datetime.getMonth()]}, Adding: ${temp_orders[i].total}`)
                    temp_month_revenue[creation_datetime.getMonth()] = temp_month_revenue[creation_datetime.getMonth()] + temp_orders[i].total;
                    if(creation_datetime.getMonth() == now.getMonth()) {
                        temp_day_revenue[creation_datetime.getDate() - 1] = temp_day_revenue[creation_datetime.getDate() - 1] + temp_orders[i].total;
                    }

                }
                
                //Count
                temp_month_list[creation_datetime.getMonth()] = temp_month_list[creation_datetime.getMonth()] + 1;
                temp_day_list[creation_datetime.getDate() - 1] = temp_day_list[creation_datetime.getDate() - 1] + 1;
                temp_week_list[creation_datetime.getDay()] = temp_week_list[creation_datetime.getDay()] + 1;
                if(creation_datetime.getHours() >= 11 && creation_datetime.getHours() <= 22) {
                    console.log(`Hour: ${creation_datetime.getHours()}`);
                    console.log(`Inserting into index: ${creation_datetime.getHours() - 11}`);
                    temp_hour_list[creation_datetime.getHours() - 11] = temp_hour_list[creation_datetime.getHours() - 11] + 1;
                    console.log(`Temp Hour List: ${temp_hour_list}`);
                }
                
                //Payment Method
                if(temp_orders[i].payment_method == null) {

                } else if(temp_orders[i].payment_method.localeCompare("Cash")) {
                    temp_cash_total = temp_cash_total + temp_orders[i].total;
                } else if (temp_orders[i].payment_method.localeCompare("Credit")) {
                    temp_credit_total = temp_credit_total + temp_orders[i].total;
                }

                */

                console.log("End of loop");
            }

            setMonthList(temp_month_list);
            setDayList(temp_day_list);
            setWeekList(temp_week_list);
            setHourList(temp_hour_list);

            setMonthCashTotal(temp_month_cash_total);
            setMonthAmexTotal(temp_month_amex_total);
            setMonthMastercardTotal(temp_month_mastercard_total);
            setMonthVisaTotal(temp_month_visa_total);
            setDayCashTotal(temp_day_cash_total);
            setDayAmexTotal(temp_day_amex_total);
            setDayMastercardTotal(temp_day_mastercard_total);
            setDayVisaTotal(temp_day_visa_total);
            setWeekCashTotal(temp_week_cash_total);
            setWeekAmexTotal(temp_week_amex_total);
            setWeekMastercardTotal(temp_week_mastercard_total);
            setWeekVisaTotal(temp_week_visa_total);
            setHourCashTotal(temp_hour_cash_total);
            setHourAmexTotal(temp_hour_amex_total);
            setHourMastercardTotal(temp_hour_mastercard_total);
            setHourVisaTotal(temp_hour_visa_total);

            setMonthRevenue(temp_month_revenue);
            setDayRevenue(temp_day_revenue);
            setWeekRevenue(temp_week_revenue);
            setHourRevenue(temp_hour_revenue);

            setMonthTop(temp_month_top);
            setMonthTopQuantity(temp_month_top_quantity);

            setDayTop(temp_day_top);
            setDayTopQuantity(temp_day_top_quantity);

            setWeekTop(temp_week_top);
            setWeekTopQuantity(temp_week_top_quantity);

            setHourTop(temp_hour_top);
            setHourTopQuantity(temp_hour_top_quantity);

            setMonthSubtotal(temp_month_subtotal);
            setMonthTax(temp_month_tax);

            setDaySubtotal(temp_day_subtotal);
            setDayTax(temp_day_tax);

            setWeekSubtotal(temp_week_subtotal);
            setWeekTax(temp_week_tax);

            setHourSubtotal(temp_hour_subtotal);
            setHourTax(temp_hour_tax);
        });


    }, [page]);


    const month_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day_labels = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31th'];
    const hour_labels = ['11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6 PM', '7PM', '8PM', '9PM', '10PM'];
    const week_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const payment_labels = ['Cash', 'Amex', 'Mastercard', "Visa"];

    const month_count_data = {
        labels: month_labels,
        datasets: [
          {
            label: 'Orders',
            data: month_list //[50, 43, 37, 20, 24, 28, 44, 55, 66, 99, 45, 35],
          }
        ],
        options: {
          plugins: {
              title: {
                  display: true,
                  text: 'Custom Chart Title'
              }
          }
        },
      };
    
    const month_top_labels = month_top
    const month_top_data = {
      labels: month_top_labels,
      datasets: [
        {
          axis: 'y',
          label: 'Top Sellers',
          data: month_top_quantity
        }
      ],
      options: {
        indexAxis: 'y',
      }
    }

    const hour_top_data = {
      labels: hour_top,
      datasets: [
        {
          axis: 'y',
          label: 'Top Sellers',
          data: hour_top_quantity
        }
      ],
      options: {
        indexAxis: 'y',
      }
    }

    const week_top_data = {
      labels: week_top,
      datasets: [
        {
          axis: 'y',
          label: 'Top Sellers',
          data: week_top_quantity
        }
      ],
      options: {
        indexAxis: 'y',
      }
    }

    const day_top_data = {
      labels: week_top,
      datasets: [
        {
          axis: 'y',
          label: 'Top Sellers',
          data: day_top_quantity
        }
      ],
      options: {
        indexAxis: 'y',
      }
    }

    const month_revenue_data = {
        labels: month_labels,
        datasets: [
        {
            label: 'Sales ($)',
            data: month_revenue //[50, 43, 37, 20, 24, 28, 44, 55, 66, 99, 45, 35],
        }
        ],
    };


    const day_count_data = {
        labels: day_labels,
        datasets: [
        {
            label: 'Orders',
            data: day_list,
        }
        ],
    };


    const hour_count_data = {
        labels: hour_labels,
        datasets: [
        {
            label: 'Orders',
            data: hour_list,
        }
        ],
    };

    const day_revenue_data = {
        labels: day_labels,
        datasets: [
        {
            label: 'Sales ($)',
            data: day_revenue,
        }
        ],
    };

    const hour_revenue_data = {
      labels: hour_labels,
      datasets: [
      {
          label: 'Sales ($)',
          data: hour_revenue,
      }
      ],
  };


    const week_count_data = {
        labels: week_labels,
        datasets: [
        {
            label: 'Orders',
            data: week_list,
        }
        ],
    };

    const week_revenue_data = {
      labels: week_labels,
      datasets: [
      {
          label: 'Sales ($)',
          data: week_revenue,
      }
      ],
  };

    const hour_payment_data = {
        labels: payment_labels,
        datasets: [
        {
            data: [hour_cash_total, hour_amex_total, hour_mastercard_total, hour_visa_total]
        }
        ],
    };

    const week_payment_data = {
      labels: payment_labels,
      datasets: [
      {
          data: [week_cash_total, week_amex_total, week_mastercard_total, week_visa_total]
      }
      ],
  };

  const day_payment_data = {
    labels: payment_labels,
    datasets: [
    {
        data: [day_cash_total, day_amex_total, day_mastercard_total, day_visa_total]
    }
    ],
};

const month_payment_data = {
  labels: payment_labels,
  datasets: [
  {
      data: [month_cash_total, month_amex_total, month_mastercard_total, month_visa_total]
  }
  ],
};

    function switch_page(page) {
      let width = "";

      switch(page) {
        case "today":
          return (
            <div className='flex flex-col h-full w-full'>
              <div className='flex flex-row h-1/2 w-full'>
                <div className='flex w-128 h-128 flex-grow self-center justify-center mt-6'>
                    <Bar labels={hour_labels} data={hour_revenue_data}></Bar>
                </div>
                <div className='flex w-128 h- flex-grow self-center justify-center mt-6'>
                  <Doughnut labels={payment_labels} data={hour_payment_data}></Doughnut>
                </div>
              </div>
              <div className='flex flex-row h-1/2 w-full '>
                <div className='flex w-128 flex-grow mb-6 justify-center self-center'>
                    <Bar labels={hour_labels} data={hour_count_data} className=''></Bar>
                </div>
                <div className='flex w-128 flex-grow justify-center self-center mb-6'>
                    <Bar labels={hour_top} data={hour_top_data}></Bar>
                </div>
              </div>
            </div>
          );
        case "week":
          return (
            <div className='flex flex-col h-full w-full'>
              <div className='flex flex-row h-1/2 w-full'>
                <div className='flex w-1/2 h-128 flex-grow self-center justify-center mt-6'>
                    <Bar labels={week_labels} data={week_revenue_data}></Bar>
                </div>
                <div className='flex w-1/2 h-128 flex-grow self-center justify-center mt-6'>
                  <Doughnut labels={payment_labels} data={week_payment_data}></Doughnut>
                </div>
              </div>
              <div className='flex flex-row h-1/2 w-full '>
                <div className='flex w-128 flex-grow mb-6 justify-center self-center '>
                    <Bar labels={week_labels} data={week_count_data} className=''></Bar>
                </div>
                <div className='flex w-128 flex-grow justify-center self-center mb-6 '>
                    <Bar labels={week_top} data={week_top_data}></Bar>
                </div>
              </div>
            </div>
          );
        case "month":
          return (
            <div className='flex flex-col h-full w-full'>
            <div className='flex flex-row h-1/2 w-full'>
              <div className='flex w-1/2 h-128 flex-grow self-center justify-center mt-6'>
                  <Bar labels={day_labels} data={day_revenue_data}></Bar>
              </div>
              <div className='flex w-1/2 h-128 flex-grow self-center justify-center mt-6'>
                <Doughnut labels={payment_labels} data={day_payment_data}></Doughnut>
              </div>
            </div>
            <div className='flex flex-row h-1/2 w-full '>
              <div className='flex w-128 flex-grow mb-6 justify-center self-center'>
                  <Bar labels={day_labels} data={day_count_data} className=''></Bar>
              </div>
              <div className='flex w-128 flex-grow justify-center self-center mb-6'>
                  <Bar labels={day_top} data={day_top_data}></Bar>
              </div>
            </div>
          </div>
          );
        case "year":
          return (
            <div className='flex flex-col h-full w-full'>
            <div className='flex flex-row h-1/2 w-full'>
              <div className='flex w-1/2 h-128 flex-grow self-center justify-center mt-6'>
                  <Bar labels={month_labels} data={month_revenue_data}></Bar>
              </div>
              <div className='flex w-1/2 h-128 flex-grow self-center justify-center mt-6'>
                <Doughnut labels={payment_labels} data={month_payment_data}></Doughnut>
              </div>
            </div>
            <div className='flex flex-row h-1/2 w-full'>
              <div className='flex w-128 flex-grow mb-6 justify-center self-center'>
                  <Bar labels={month_labels} data={month_count_data} className=''></Bar>
              </div>
              <div className='flex w-128 flex-grow justify-center self-center mb-6'>
                  <Bar labels={month_top} data={month_top_data}></Bar>
              </div>
            </div>
          </div>
        );
      }
    }

    function switch_text(page) {
      switch(page) {
        case "today":
          return generate_data_text(hour_list, hour_cash_total, hour_subtotal, hour_tax, hour_amex_total, hour_mastercard_total, hour_visa_total);
        case "week":
          return generate_data_text(week_list, week_cash_total, week_subtotal, week_tax, week_amex_total, week_mastercard_total, week_visa_total);
        case "month":
          return generate_data_text(day_list, day_cash_total, day_subtotal, day_tax, day_amex_total, day_mastercard_total, day_visa_total);
        case "year":
          return generate_data_text(month_list, month_cash_total, month_subtotal, month_tax, month_amex_total, month_mastercard_total, month_visa_total);
        }
    }

    function generate_data_text(count_list, cash_total, subtotal, tax, amex, mastercard, visa) {
        let orders_count = count_list.reduce((a, b) => a + b, 0);
        let total = cash_total + amex + mastercard + visa;

        return (
          <div className='grid grid-cols-2 text-right m-auto mt-[2vw]'>
            <p className='text-[1.3vw] mr-[4vw]'>Subtotal:</p><p className='text-[1.3vw]'>${subtotal.toFixed(2)}</p>
            <p className='text-[1.3vw] mr-[4vw]'>Tax:</p><p className='text-[1.3vw]'>${tax.toFixed(2)}</p>
            <p className='text-[1.3vw] mr-[4vw]'>Total:</p><p className='text-[1.3vw]'>${total.toFixed(2)}</p>
            <hr className='mb-[1.5vw]'/>
            <hr className='mb-[1.5vw]'/>
            <p className='text-[1.3vw] mr-[4vw]'>Cash:</p><p className='text-[1.3vw]'>${cash_total.toFixed(2)}</p>
            <p className='text-[1.3vw] mr-[4vw]'>Credit:</p><p className='text-[1.3vw]'>${(amex + mastercard + visa).toFixed(2)}</p>
            <hr className='mb-[1.5vw]'/>
            <hr className='mb-[1.5vw]'/>
            <p className='text-[1.3vw] mr-[4vw]'>Amex:</p><p className='text-[1.3vw]'>${amex.toFixed(2)}</p>
            <p className='text-[1.3vw] mr-[4vw]'>Mastercard:</p><p className='text-[1.3vw]'>${mastercard.toFixed(2)}</p>
            <p className='text-[1.3vw] mr-[4vw]'>Visa:</p><p className='text-[1.3vw]'>${visa.toFixed(2)}</p>
            <hr className='mb-[1.5vw]'/>
            <hr className='mb-[1.5vw]'/>
            <p className='text-[1.3vw] mr-[4vw]'>Orders:</p><p className='text-[1.3vw]'>{orders_count}</p>
            <p className='text-[1.3vw] mr-[4vw]'>Avg / Order:</p><p className='text-[1.3vw]'>${(total / orders_count).toFixed(2)}</p>
            <hr className='mb-[1.5vw]'/>
            <hr className='mb-[1.5vw]'/>
            </div>
        );
    }
    
    function switch_title(page) {
      switch(page) {
        case "today":
          return (<p className='text-center text-[1.5vw]'>{`${month_labels[now.getMonth()]} ${now.getDate()}`}</p>);
        case "week":
          let last = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          return (<p className='text-center text-[1.5vw]'>Last 7 Days</p>);
          //return (<p className='text-center'>{`${month_labels[now.getMonth()]} ${now.getDate()} - ${month_labels[last.getMonth()]} ${last.getDate()}`}</p>);
        case "month":
          return (<p className='text-center text-[1.5vw]'>{month_labels[now.getMonth()]}</p>);
        case "year":
          return (<p className='text-center text-[1.5vw]'>{now.getFullYear()}</p>);
      }
    }

    return (
      <div className="p-[1.5vw] flex h-[100vh] w-[85vw] bg-white drop-shadow-md rounded-xl border-solid border-3 border-[#D9D9D9]">
            <div className='flex h-full flex-col w-full'>
              <select value={page} onChange={e => setPage(e.target.value)} default="today" className='m-[2vw] text-center text-[1.5vw] outline-1 rounded-l'>
                <option value="today">Today</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
              <div className='mt-[2.4vw]'></div>
              {switch_title(page)}
              {switch_text(page)}
            </div>
            <div className='flex h-full w-full m-[1vw]'>
              {switch_page(page)}
            </div>

        </div>
    );
}

function filter_month(datetime, month_list) {

}


