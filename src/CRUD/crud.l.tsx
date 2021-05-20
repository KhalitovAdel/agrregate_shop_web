import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, WithStyles,
    withStyles,
} from '@material-ui/core';
import React from 'react';

import { CrudClient } from './crud.client';

const styles = () => ({
    table: {
        minWidth: 650,
    },
});

interface DefaultProps {
    method: CrudClient['list'],
    options: { [key: string]: any },
    data: { [key: string]: any }[],
}
interface DefaultState {
    limit: number;
    availableRowsPerPage: number[];
    skip: number;
    total: number;
}
const data = {
    first1: Math.random(),
    first2: Math.random(),
    first3: Math.random(),
    first4: Math.random(),
    first5: Math.random(),
    first6: Math.random(),
    first7: Math.random(),
};

interface Props extends DefaultProps, WithStyles<typeof styles> {}

class CrudL extends React.Component<Props, DefaultState> {
    static defaultProps = {
        options: {
            first1: {},
            first2: {},
            first3: {},
            first4: {},
            first5: {},
            first6: {},
            first7: {},
        },
        data: new Array(7).fill(data),
    };

    constructor(props: Props) {
        super(props);
        const availableRowsPerPage = [10, 25, 50, 100, 200];
        this.state = {
            limit: availableRowsPerPage[0],
            availableRowsPerPage,
            skip: 0,
            total: 0,
        };
    }

    get optionsKeys() {
        return Object.keys(this.props.options) || [];
    }

    async changeRowPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        await new Promise((res) => setTimeout(res, 3000));
        const value = parseInt(event.target.value, 10);
        this.setState({ limit: value });
        this.setPage(0);
    }

    setPage(value: number) {
        this.setState((state) => ({ skip: value * state.limit }));
    }

    handleChangePage(_: unknown, newPage: number) {
        this.setPage(newPage);
    }

    render() {
        return (
          <Paper>
            <TableContainer>
              <Table className={this.props.classes.table}>

                <TableHead>
                  <TableRow>
                    {this.optionsKeys.map((key, index) => (
                      <TableCell key={key} align={index ? 'right' : 'left'}>
                        {key}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {this.props.data.map((data, rowIndex) => {
                              const rowKey = data.id ?? `unknown-${rowIndex}`;

                              return (
                                <TableRow key={rowKey}>
                                  {Object.keys(this.props.options).map((key, cellIndex) => (
                                    <TableCell key={rowKey + key} align={cellIndex ? 'right' : 'left'}>
                                      {data[key] || 'НЕТ'}
                                    </TableCell>
                                          ))}
                                </TableRow>
                              );
                  })}

                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={this.state.availableRowsPerPage}
              component="div"
              count={this.state.total}
              rowsPerPage={this.state.limit}
              page={this.state.skip / this.state.limit}
              onChangePage={this.handleChangePage.bind(this)}
              onChangeRowsPerPage={this.changeRowPerPage.bind(this)}
            />
          </Paper>
        );
    }
}

export const CrudList = withStyles(styles)(CrudL);
