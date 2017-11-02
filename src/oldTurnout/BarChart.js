import React, { Component } from 'react';
var Highcharts = require('highcharts');
import HighchartInit from '../HighchartInit' ;
import counterpart from 'counterpart' ;
import Translate    from 'react-translate-component';

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state={options:{}}
    }

    componentWillMount() {

        this.setState({
            options:{
                credits: false,
                title: {
                    text: 'Pick a shape'
                }
            }
        });
    }  
        componentWillReceiveProps(nextProps) {
            console.log(nextProps);
            let property=nextProps.hoveredProperties, name = property.NAME_EN,
            registeredVoters= property.registeredVoters,
            signingVoters= property.signingVoters,
            pntr=0,cnt=2,
            turnoutPer= ((signingVoters*100)/registeredVoters).toFixed(2),
            chosenNiveau=nextProps.chosenNiveau
            ;
            chosenNiveau=="parl"?chosenNiveau='Parliamentary 14':chosenNiveau='Presidential 14'
        this.setState({
            options:{
                chart: {
                    type: 'bar'
                },
                title: {
                text: 'turnout in '+ name+' ('+chosenNiveau+')'
                },
                labels: {
                     overflow: 'justify'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                            color: 'black',
                            fontSize:"14px",
                            formatter:function() 
                            {
                                pntr++;
                                console.log(pntr);
                                if(pntr !== cnt)
                                {
                                    return   ' turnout Percentage is '+turnoutPer+'%';
                                }else{
                                    console.log('ggggg',pntr);
                                    return registeredVoters+' total registered voter ' ;
                                }
                            }
                        }
                    }
                },
                tooltip: {
                    enabled: false,
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    x: -40,
                    y: 80,
                    floating: true,
                    borderWidth: 1,
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                    shadow: false
                },
                xAxis: {
                    categories: ['turnout','total'],
                    text: null
                },
                yAxis: {
                    title: {
                        text: 'votes',
                        data: [signingVoters]
                    }
                },
                series: [
                {
                    name: "turnout",
                    data: [signingVoters]
                }, {
                    name: 'Total registered',
                    data: [registeredVoters],
                    color:'#e8a766'
                }],
                credits: false
            }
        });
    }  

        render() {
            return (
                <div style={{position:"absolute!important"}} >
                {console.log("key",this.props.hoveredProperties.cancelled)}
                <HighchartInit  options={this.state.options} key={this.props.hoveredProperties.cancelled} styles={{height:"75vh"}}/>
                </div>
            );
        }
}

export default BarChart;