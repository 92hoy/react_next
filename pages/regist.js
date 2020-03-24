import React, { Fragment } from 'react'
import MUIDataTable from "mui-datatables";
import { withAuthSync } from '../utils/auth'
import axios from 'axios';

class Board extends React.Component {
    static async getInitialProps ({req}) {
        const response = await axios.get('http://127.0.0.1:8111/v1/get_board');
        return {
            data: response.data
        }
    }

    render() {
        
        const { data } = this.props;
        const columns = ["id", "title", "context", "regist_date"];
        const options = {
            filterType: 'checkbox',
        };
        
        return (
            <Fragment>
            <MUIDataTable
                title={"Test_Board"}
                data={data}
                columns={columns}
                options={options}
            />
        </Fragment>
        );
    }
}

export default withAuthSync(Board);