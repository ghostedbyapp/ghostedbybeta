import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';


class Top10 extends Component {
    render() {
        return (
            <div className="col-md-6">
                <h2>{this.props.title}</h2>
                <Table dark striped hover>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.rows}
                    </tbody>
                </Table>
                <Button style={{
                    marginRight: 5
                }} onClick={this.props.lifetime}>Lifetime</Button>
                <Button style={{
                    marginRight: 5
                }} onClick={this.props.thirtyDays}>30 Days</Button>
                <Button style={{
                    marginRight: 5
                }} onClick={this.props.sevenDays}>7 Days</Button>
            </div>
        )
    }
    
}

export default Top10;