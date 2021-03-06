import React, {Component} from 'react'

import axios from 'axios';
import {FormSelect} from "react-bootstrap";
import ReactApexChart from "react-apexcharts";

import "../../styles/gestioneStatistiche/statisticheSettimanaliCSS.css"


export default class StatisticheSettimanali extends React.Component {

    // Grafici con i dati presi in input dalla componente per renderizzarli
    // @series array che conterrĂ  il numero di ordinazioni per ogni pasto
    // @labels array che conterrĂ  il nome del pasto

   // Grafico a torta
    pieChart = {
        series: [],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: [],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    }

    // Grafico a barre orizzontali
    barChart = {

        series: [{
            name:"pasto",
            data: []
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: true
            },
            xaxis: {
                categories: [],
            }
        }
    }

    // Grafico a barre verticali
    columnChart = {
        series: [{
            name: 'Pasto',
            data: []
        }],
        options: {
            chart: {
                height: 350,
                width:1600,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: [],
                position: 'top',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + "%";
                    }
                }

            },
            title: {
                text: '',
                floating: true,
                offsetY: 330,
                align: 'center',
                style: {
                    color: '#444'
                }
            },
            responsive: [{
                breakpoint: 1366,
                options: {
                    chart: {
                        type: 'bar',
                        height: 350,
                        width:800
                    },
                },
            }]
        },
    }


    constructor(props) {
        super(props);


        this.state = {
            statistiche: [],
            newChart : false,
            error : null
        };


        this.handleChangeWeek = this.handleChangeWeek.bind(this)
    }

    // funzione che cambia i dati dei grafici in base alla settimana selezionata dalla select
    // @param e oggetto contente i pasti e le ordinazioni effettuate
    handleChangeWeek(e)
    {
        var parseS = JSON.parse(e.target.value)
        var pasti = parseS.pastiEOrdinazioni

        var pastiLabels = []
        var pastiSeries = []

        console.log(pasti)
        for(var i = 0; i<pasti.length;i++)
        {
            pastiSeries[i] = pasti[i].ordinazioni
            pastiLabels[i] = pasti[i].nome
        }


        this.pieChart.series = pastiSeries
        this.pieChart.options.labels = pastiLabels

        this.barChart.series[0].data = pastiSeries
        this.barChart.options.xaxis.categories=pastiLabels

        this.columnChart.series[0].data = pastiSeries
        this.columnChart.options.xaxis.categories=pastiLabels

        this.setState({newChart:true})
    }

    // GET delle statistiche di tutte le settimane salvate nel DB
    componentDidMount() {

        // Controlli sessione
        // error 400 : login non effettuato
        // error 401 : accesso non autorizzato per questo ruolo
        if(!localStorage.getItem("email"))
            this.setState({error:400})
        else if(localStorage.getItem("ruolo")!="operatore mensa")
            this.setState({error:401})
        else {
            axios.post('http://localhost:8080/api/statistica/findAll', {ruolo: localStorage.getItem("ruolo")})
                .then(response => {
                    //Controllo errore lato be di accesso
                    if(response.data.hasOwnProperty("error"))
                        this.setState({error:response.data.error})
                    else
                        this.setState({statistiche: response.data})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }


    render() {
        // Unauthorized access
        if(this.state.error===400)
            return <h1 className="erroreGenericoDiAccesso">Effettua il login per accedere a questa pagina</h1>
        else if(this.state.error===401)
            return <h1 className="erroreGenericoDiAccesso">Accesso negato</h1>
        else if(this.state.newChart=== true)
            return (
                <div className="ss-mainContainer">
                    <div className="ss-selectWeekContainer">
                        <h5>Statistiche settimanali dei pasti acquistati</h5>
                        <FormSelect className="ss-selectInput" onChange={this.handleChangeWeek}>
                            {this.state.statistiche.map((statistica,i) => (
                                <option key={i} value={JSON.stringify(statistica)}>{statistica.dataInizio}</option>
                            ))}
                        </FormSelect>
                    </div>
                        <div className="ss-topContainer">
                            <ReactApexChart classname="child1" options={this.pieChart.options} series={this.pieChart.series} type="pie" height={350} width={600}/>
                            <ReactApexChart classname="child2" key={Math.random()} options={this.barChart.options} series={this.barChart.series} type="bar" height={350} width={800}/>
                         </div>
                        <div className="ss-bottomContainer">
                          <ReactApexChart key={Math.random()} options={this.columnChart.options} series={this.columnChart.series} type="bar" width={1600} height={350} />
                        </div>
                </div>
                    )
        return (
            <div className="ss-selectWeekContainerStarting">
                <h4>Statistiche settimanali dei pasti acquistati </h4>
                <FormSelect className="mt-4 ss-selectInput" onChange={this.handleChangeWeek} defaultValue="">
                    <option value="" disabled>
                        Seleziona una settimana
                    </option>
                    {this.state.statistiche.map((statistica,i) => (
                        <option key={i} value={JSON.stringify(statistica)}>{statistica.dataInizio}</option>
                    ))}
                </FormSelect>

            </div>
        )

    }

}

