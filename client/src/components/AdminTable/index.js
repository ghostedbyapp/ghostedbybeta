import React, {Component} from 'react'
import {Table} from 'reactstrap';
// import Admin from '../../pages/Admin';

class AdminTable extends Component {
    render() {
        return (
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zipcode</th>
                        <th>Times Reported</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.rows}
                </tbody>
            </Table>
        )
    }
}

export default AdminTable;