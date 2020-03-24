import React, { Fragment } from 'react'
import MUIDataTable from "mui-datatables";
import { withAuthSync } from '../utils/auth'
import axios from 'axios';
import BoardForm from '../components/Board/BoardForm'

class Board extends React.Component {
    state = {
        rowsSelected: []
      };
    

    static async getInitialProps({ req }) {

        const response = await axios.get('http://127.0.0.1:8111/v1/get_board');

        return {
            data: response.data
        }


    }

    handleCreate = (data) => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8111/v1/create_board',
            data: {
                title: data.title,
                context: data.context
            }
        })
            .then(function (response) {
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {

        const { data } = this.props;
        const columns = ["id", "title", "context", "regist_date"];
        const options = {
            filter: true,
      selectableRows: 'multiple',
      selectableRowsOnClick: true,
      filterType: 'dropdown',
      responsive: 'stacked',
      rowsPerPage: 10,
      rowsSelected: this.state.rowsSelected,
      onRowsSelect: (rowsSelected, allRows) => {
        console.log(rowsSelected, allRows);
        this.setState({ rowsSelected: allRows.map(row => row.dataIndex) });
      },
      onRowsDelete: (rowsDeleted) => {
        if (rowsDeleted.data[0].dataIndex === 0) {
          window.alert('Can\'t delete this!');
          return false;
        };
        let test_list = [];
        for(let i=0; i<rowsDeleted.data.length; i++){
            test_list.push(rowsDeleted.data[i]['dataIndex']);
            console.log(test_list);
        }
        console.log("-----",rowsDeleted.data, "were deleted!");
      },
      onChangePage: (numberRows) => {
        console.log(numberRows);
      },
      onSearchChange: (searchText) => {
        console.log(searchText);
      },
      onColumnSortChange: (column, direction) => {
        console.log(column, direction);
      },
      onColumnViewChange: (column, action) => {
        console.log(column, action);
      },
      onFilterChange: (column, filters) => {
        console.log(column, filters);
      },
      onCellClick: (cellData, cellMeta) => {
        console.log(cellData, cellMeta);
      },
      onRowClick: (rowData, rowState) => {
        console.log(rowData, rowState);
      },
      isRowSelectable: (dataIndex, selectedRows) => {
        //prevents selection of any additional row after the third
        if (selectedRows.data.length > 999 && selectedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        //prevents selection of row with title "Attorney"
        return data[dataIndex][1] != "Attorney";
      },
      selectableRowsHeader: false
    };


        return (
            <Fragment>
                <div>
                    <BoardForm
                        onCreate={this.handleCreate}
                        onDelete={this.handleDelete}
                    />
                </div>
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

// const columns = ["Name", "Company", "City", "State"];
// const data = [
//     ["Joe James", "Test Corp", "Yonkers", "NY"],
//     ["John Walsh", "Test Corp", "Hartford", "CT"],
//     ["Bob Herm", "Test Corp", "Tampa", "FL"],
//     ["James Houston", "Test Corp", "Dallas", "TX"],
// ];

// const options = {
//     filterType: 'checkbox',
// };
// const Board = () => (
//     <Fragment>
//         <MUIDataTable
//             title={"Employee List"}
//             data={data}
//             columns={columns}
//             options={options}
//         />
//     </Fragment>
// )

// export default Board;