import React, { Component } from 'react';
import {Link,NavLink,Route } from 'react-router-dom';
class Layout extends Component {
    render() {
        let headerClass= 'tt-nav sticky '+this.props.layoutShape;
        let headerColor= 'menuzord-menu pull-left '+this.props.typoColor;
        return (
            <header id='header' className={headerClass} style={{zIndex:1500}} >
                <div className='header-sticky light-header'>    
                    <div className='container'>

                        <div id='materialize-menu' className='menuzord'>

                            {/*logo start*/}
                            <a href='index.html' className='logo-brand'>
                                <img className='logo-dark' src='./img/loego.png' alt=''/>
                                <img className='logo-light' src='./img/logo-whiete.png' alt=''/>
                            </a>
                            {/*logo end*/}

                            {/*mega menu start*/}
                            <ul className={headerColor}>
                                <li className={this.props.home}><Link to='/'>Home</Link>
                                </li>

                                <li className={this.props.mun17}><a href='javascript:void(0)'>Municipal </a>                                   <ul className="dropdown">
                                        <li><Link to='/munre'>Insights</Link></li>
                                        <li ><Link to='/detailed-reg'>Registration</Link></li>
                                        <li ><Link to='/reg-performance'>Registration perfomance</Link></li>
                                    </ul>
                                </li>
                                <li className={this.props.parl14}><a href='javascript:void(0)'>election data</a>                                   <ul className="dropdown">
                                        <li><Link to='/invalid'>Invalid</Link></li>
                                        <li ><Link to='/turnout'>Turnout</Link></li>
                                        <li ><a href='http://tunisiaelectiondata.com' target="_blank">more visualizations</a></li>
                                        </ul>
                                </li>

                                <li ><Link to='/'>election result</Link>
                                </li>

                                <li ><Link to='/'>Web Radar</Link>
                                </li>

                                

                                {/* <li className={this.props.contact}><Link to='javascript:void(0)'>Contact</Link>
                                </li> */}
                            </ul>
                            {/*mega menu end*/}

                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Layout;