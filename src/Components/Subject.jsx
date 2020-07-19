import React from 'react';

class Subject extends React.Component{
    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete(){
        this.props.delete(this.props.clave);
    }

    render(){
        return (
            <div key={this.props.clave} className="card">
                <div className="card-content" style={{padding: '4px 10px'}}>
                    <div className="row" style={{marginBottom: '0'}}>
                        <div className="col s10">
                            <p>{this.props.clave} - {this.props.nombre}</p>
                        </div>
                        <div className="col s2">
                            <div onClick={this.delete}
                                 className="btn-floating red"
                                 style={{width: '30px', height: '30px'}}>
                                <i className="material-icons"><b>-</b></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Subject;