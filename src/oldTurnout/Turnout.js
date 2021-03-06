import React, { Component } from 'react';
import Layout from '../Layout' ;
import TurnoutMap from './TurnoutMap' ;
import BarChart from './BarChart' ;
import Radio_state from './Radiobutton_state' ;
import './s.css' ;

class Turnout extends Component {

    constructor(props){
      super(props);
      this.state={
          chosenNiveau:'parl',
          hoveredProperty:{name:"aa"}
        }
    }
    
    chosenNiveau(event){
        this.setState({chosenNiveau:event.currentTarget.value});
    }
    getProperty(hoveredProperty){
        this.setState({hoveredProperty:hoveredProperty});
    }
    render() {
        return (
            <div>
                       
                <Layout home="" mun17="" parl14="active" pres14="" contact="" layoutShape="nav-border-bottom" typoColor=""/>
                <Radio_state handleMunState={this.chosenNiveau.bind(this)} />
                
                <section className="latest-news-card " style={{paddingTop:'10vh'}}>
                    <div className="container-fluid">
                        <div className="row">
                                <div className="col-xs-12 col-sm-7 col-md-7 blog-grid-item mb-30">
                                    <article className="card">
                                            <div style={{textAlign:"center"}}>
                                            <h3 className='mapTitle' >Turnout Percentage</h3>
                                            </div>
                                            <div className=" waves-effect waves-block waves-light">
                                                <TurnoutMap 
                                                    chosenNiveau={this.state.chosenNiveau}
                                                    sendDataBack={this.getProperty.bind(this)}
                                                />
                                            </div>

                                    </article>{/* /.card */}
                                </div>{/* /.col-md-6 */}

                                <div className="col-xs-12 col-sm-5 col-md-5 blog-grid-item mb-30" style={{paddingTop:'3vh'}}>
                                    <article className="card" style={{paddingTop:'3vh'}}>

                                    <div className="card-image waves-effect waves-block waves-light">
                                    <BarChart
                                    hoveredProperties={this.state.hoveredProperty}
                                    chosenNiveau={this.state.chosenNiveau}
                                    
                                    />  
                                    
                                    </div>
                                    </article>{/* /.card */}
                                </div>{/* /.col-md-6 */}
                            </div>{/* /.row */}
                        </div>{/* /.container */}
                    </section>


            </div>
        );
    }
}

export default Turnout;