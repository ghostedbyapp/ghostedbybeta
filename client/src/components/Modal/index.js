import React from 'react';

import './Modal.css';

const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>Modal Header</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    <button className="btn-continue">CONTINUE</button>
                </div>
            </div>
        </div>
    )
}

export default modal;

// import React, { Component } from "react";

// class Modal extends Component {

//     state = {
//         result: {}
//     }

//     componentWillReceiveProps(props) {
//         this.setState({
//             results: props.results
//         })

//         console.log("vvvv", this.state.results)
//     }

//     render() {
//         return (
//             <div>
//                 <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
//                     <div className="modal-dialog" role="document">
//                         <div className="modal-content">
//                             <div className="modal-header">
//                                 <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
//                                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                                     <span aria-hidden="true">&times;</span>
//                                 </button>
//                             </div>
//                             <div className="modal-body">
//                                 {this.state.componentForm}
//                         </div>
//                             <div className="modal-footer">
//                                 <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                                 <button type="button" className="btn btn-primary">Save changes</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div >

//         )
//     }

// }

// export default Modal;
