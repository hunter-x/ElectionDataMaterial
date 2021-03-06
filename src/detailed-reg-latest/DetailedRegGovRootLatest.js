import React, { Component } from 'react';
import Layout from '../Layout' ;
import RegVsElig from './RegVsElig/RegVsElig' ;
import ActiveRegistered from './Active/ActiveRegistered' ;
import VoterProfile from './Profile/VoterProfile' ;
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
import axios from 'axios' ;
import config from '../config'


import { connect } from "react-redux";
import { getPopValue } from "../actions/index";
import { bindActionCreators } from "redux";

class DetailedRegGovRootLatest extends Component {
    
    constructor(props) {
        super(props);
        this.state={shape:config.initShape,munShape:{},shapeIsLoaded:false, key:1,countProfile:0,countRegVs:0,countActive:0}
    }
    componentWillUnmount() {
        console.log('unmounte');
           this.setState( {shape:config.initShape,munShape:{},shapeIsLoaded:false, key:1,countProfile:0,countRegVs:0,countActive:0})
    } 
    componentWillMount() {
        let qString=config.apiUrl+"/api/dailyins/detailed_gov_b_07-02-18";
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            //console.log(response.data.data);
            this.setState({shape:JSON.parse(response.data.data),key:2,shapeIsLoaded:true
            });
        }
        )
        .catch(function (error) {
            console.log(error);
        });

        let qString2=config.apiUrl+"/api/dailyins/detailed_mun_07-02-18";
        axios({
            method: 'get',
            url: qString2,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            //console.log(response.data.data);
              this.setState({munShape:JSON.parse(response.data.data)});
        }
        )
        .catch(function (error) {
            console.log(error);
        });
    }

    //count the number of how much radiobutton has been chosen to show the description only one time
    componentWillReceiveProps(nextProps) {
        /* let compteur=this.state.countProfile
                if (nextProps.radioFilterPicker==="pop") {
           this.setState({countRegVs:this.state.countRegVs+1}); 
        }else if (nextProps.radioFilterPicker==="active") {
           this.setState({countActive:this.state.countActive+1}); 
        }else{
        this.setState({countProfile:this.state.countProfile+1});
        } */
    }

    render() {
        return (
            <div>
                
                <Layout home="" mun17="active" parl14="" pres14="" contact="" layoutShape="nav-border-bottom" typoColor=""/>
                {   this.props.radioFilterPicker==="pop" ?
                    <RegVsElig count={this.state.countRegVs} shape={this.state.shape} shapeIsLoaded={this.state.shapeIsLoaded} key={this.state.key} />
                    :
                    (this.props.radioFilterPicker==="active"?
                        <ActiveRegistered count={this.state.countActive} shape={this.state.shape} shapeIsLoaded={this.state.shapeIsLoaded} key={this.state.key+2}/>
                        :
                        <div>
                            <VoterProfile count={this.state.countProfile} shape={this.state.shape} munShape={this.state.munShape} shapeIsLoaded={this.state.shapeIsLoaded} key={this.state.key+1}/>                        
                        </div>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    radioFilterPicker:state.radioFilterPicker,
  };
}

export default connect(mapStateToProps)(DetailedRegGovRootLatest);