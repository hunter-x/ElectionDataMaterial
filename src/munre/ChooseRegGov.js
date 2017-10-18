import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl,Marker,CircleMarker } from 'react-leaflet';
import { Redirect,withRouter,Link,NavLink,Route } from 'react-router-dom';
import config from '../config' ;
import axios from 'axios' ;
import Layout from '../Layout' ;
import HeaderHelmet from '../HeaderHelmet' ;
import MapKey from './MapKey' ;
import Control from 'react-leaflet-control';

class ChooseRegGov extends Component {
    constructor(props){
      super(props);
      this.state={redirect: false,stateFilter:"All"}
    }
    componentWillMount() {
        
        let qString2=config.apiUrl+"/api/reg/MunShapeOld";
        axios({
            method: 'get',
            url: qString2,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            //console.log(response.data.data)
            console.log('we got shape data frm db');
            console.log(response);
            this.setState({munShape:JSON.parse(response.data.data),keyMun:"mun",shapeIsLoaded:true});
            }
        )
        .catch(function (error) {
            console.log(error);
        });

        let qString=config.apiUrl+'/api/reg/all';
        axios({
            method: 'get',
            url: qString,
            headers: {
                'name': 'Isie',
                'password': 'Isie@ndDi'
            }
        })
        .then(response=>{
            this.setState({shape:JSON.parse(response.data.data),key:'gov',shapeIsLoaded:true
            });
        }
        )
        .catch(function (error) {
            console.log(error);
        });

       
        
    }
    style(feature) {
        //check for what we have checked as filter subject : Population || state ||
            const etat = this.state.stateFilter;
            if(etat=="All") {
                if(feature.properties.state=="extended"){
                    var ETAT = 1;
                }else if(feature.properties.state=="new"){
                    var ETAT = 2;
                }else{
                    var ETAT = 3;
                }
            }
            if ((feature.properties.state=="extended")&&(etat=="Extended")){
                var ETAT = 1;
            }else if ((feature.properties.state=="new")&&(etat=="New")){
                var ETAT = 2;
            }else if ((feature.properties.state=="old")&&(etat=="Old")){
                var ETAT = 3;
            }
           
            
            return {
                fillColor: this.getColor(ETAT,["#0096d6","#005288","#BBDEFB"]),
                color: 'black',
                weight: 1,
                fillOpacity: 0.5
            };

    }
    getColor(d,c1) {
        if      (d >2)      {return (c1[2]); }
        else if (d >1)      {return (c1[1]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	}
    clickedShape(e){
        //for the histogram age BarChart
        let property=e.target.feature.properties;
        let url = '/munreg/'+property.gouv_name+"/";
        //window.location =url;
        this.setState({ redirect: true,url:url })
    }
    render() {
        const position = [34.8,9.5 ];
        let url = this.state.url;
        return (
            this.state.redirect ? <Redirect push to={url}/>:
            <div>
            <HeaderHelmet/>
            
            <Layout home="" mun17="active" parl14="" pres14="" contact="" layoutShape="nav-border-bottom" typoColor=""/>
            <section className="page-title ptb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Municipal Election registration data </h2>
                            <ol className="breadcrumb">
                                <li><Link to="/">Home</Link></li>
                                <li ><Link to="/munre">Municipal Registration 2017</Link></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="latest-news-card " style={{padding:'10px 0'}}>
            <div className="container-fluid">
                <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 blog-grid-item mb-30">
                            <article className="card">
                                <Map center={position} zoom={7} style={{height: '95vh',position:'relative',backgroundColor:'white'}}>
                                <GeoJSON
                                key={"a"+this.state.keyMun}
                                data= {this.state.munShape}
                                style={this.style.bind(this)} 
                                onEachFeature={
                                    (feature, layer) => {
                                        layer.bindTooltip(feature.properties.NAME_EN,{ permanent: false,className:'tooltipnamear',direction:'right' })
                                        layer.on({click: this.clickedShape.bind(this)});
                                    }    
                                }
                                />
                                <GeoJSON
                                    key={this.state.key}
                                    data= {this.state.shape}
                                />
                                <Control position="bottomright">
                                <MapKey colorSet={["#0096d6","#005288","#BBDEFB"]} grades={["New","Extended","Old"]}  keyTitle="Municipality color Representation" />                                
                                </Control>
                                </Map>   
                            </article>{/* /.card */}
                        </div>{/* /.col-md-12 */}
                </div>{/* /.row */}
            </div>{/* /.container */}
        </section>
        </div>

        );
    }
}

export default ChooseRegGov;