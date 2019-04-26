import React from 'react';
import {Table} from 'reactstrap';

function Top10(props) {

    return (
        <Table dark>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                {props.rows}
            </tbody>
        </Table>
    )
}

export default Top10;