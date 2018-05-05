import React, { Component } from 'react';
import {  Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import { getPastMeasurements } from '../../ducks/userReducer'

class ProgressData extends Component {
    constructor() {
        super()
        this.state = {
          chartData: {
            labels: [],
            datasets: [
                {
                    label: 'Bodyfat',
                    data: [],
                    backgroundColor: "green",
                    fill: false
                },
                {
                    label: 'Weight',
                    data: [],
                    backgroundColor: 'pink',
                    fill: false,
                    hidden: true
                },
                {
                    label: 'Neck',
                    data: [],
                    backgroundColor: "green",
                    fill: false,
                    hidden: true
                },
                {
                    label: 'Chest',
                    data: [],
                    backgroundColor: "green",
                    fill: false,
                    hidden: true
                },
                {
                    label: 'Waist',
                    data: [],
                    backgroundColor: "green",
                    fill: false,
                    hidden: true
                }
            ],
        },
        chartOptions: {
            title: {
                display: true,
                text: 'Measurements History',
                fontSize: 25,
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: 'blue',
                },
            },
            //   layout: {
                //     padding: {
                    //       top: 100,
                    //       right: 100,
                    //       bottom: 100,
                    //       left: 100,
        //     },
        //   },
        animation: {
            duration: 2500,
        }
  
        }
      }
    }
    componentDidMount() {
        const { user_id } = this.props.userData
        if(user_id && this.props.mezHistory.dates.length < 1){
            this.props.getPastMeasurements()
        }
    }
    componentDidUpdate(){
        console.log("state: ",this.state, "this.props", this.props)
        const { dates } = this.props.mezHistory
        const { user_id, curr_mes_id } = this.props.userData
        if(curr_mes_id > 0 && dates.length < 1){
            this.props.getPastMeasurements()
        }
        if(this.state.chartData.labels.length !== dates.length){
            this.setState({
                chartData: {
                            ...this.state.chartData,
                            labels: this.props.mezHistory.dates.map(v => {
                                let date = new Date(v/1), str
                                str = date.getDate()
                                str += ("-" + (date.getMonth()+1))
                                str += ("-" + date.getFullYear())
                                return str
                              }),
                            datasets: [
                                {
                                    label: 'Weight',
                                    data: this.props.mezHistory.weights,
                                    backgroundColor: "red",
                                    fill: false
                                },
                                {
                                    label: 'Bodyfat',
                                    data: this.props.mezHistory.bfs,
                                    backgroundColor: "blue",
                                    fill: false
                                },
                                {
                                    label: 'Neck',
                                    data: this.props.mezHistory.necks,
                                    backgroundColor: "yellow",
                                    fill: false
                                },
                                {
                                    label: 'Chest',
                                    data: this.props.mezHistory.chests,
                                    backgroundColor: "brown",
                                    fill: false
                                },
                                {
                                    label: 'Waist',
                                    data: this.props.mezHistory.waists,
                                    backgroundColor: "purple",
                                    fill: false
                                },
                            ]
                         }

            })
        }
    }
    render() {
      return (
        <div>
          <Line data={this.state.chartData} options={this.state.chartOptions} />
        </div>
      )
    }
  }

  function mapStateToProps(state) {
      return {
          mezHistory: state.users.mezHistory,
          userData: state.users.userData
      }
  }
  
  export default connect(mapStateToProps, { getPastMeasurements })(ProgressData)