import React, { useState } from "react";

import TableData from "../TableData";
import styles from "./Table.module.css";
import TableFooter from "./tableFooter/TableFooter";
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom' 

const Table = ({ data, rowsPerPage, type }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = TableData(data, page, rowsPerPage);

  if(type == "offices")
    return (
      <>
      <Link to="/AddNewOffice" className="btn btn-secondary">Add New Office</Link>
        <table className={styles.table}>
          <thead className={styles.tableRowHeader}>
            <tr>
              <th className={styles.tableHeader}>Office</th>
              <th className={styles.tableHeader}>Office Code</th>
              <th className={styles.tableHeader}>Office Type</th>
              <th className={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((el) => (
              <tr className={styles.tableRowItems} key={el.officeId}>
                <td className={styles.tableCell}>{el.shortName}</td>
                <td className={styles.tableCell}>{el.officeCode}</td>
                <td className={styles.tableCell}>{el.officeType}</td>
                <td className={styles.tableCell}><Link to={"/EditOffice/"+el.userUuid} className="btn btn-primary">Edit</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
      </>
    );
    else
      return (
        <>
        <Link to="/AddNewOffice" className="btn btn-secondary">Add New Bureau</Link>
          <table className={styles.table}>
            <thead className={styles.tableRowHeader}>
              <tr>
                <th className={styles.tableHeader}>Bureau</th>
                <th className={styles.tableHeader}>Description</th>
                <th className={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {slice.map((el) => (
                <tr className={styles.tableRowItems} key={el.bureauId}>
                  <td className={styles.tableCell}>{el.bureauName}</td>
                  <td className={styles.tableCell}>{el.description}</td>
                  <td className={styles.tableCell}><Link to={"/EditOffice/"+el.userUuid} className="btn btn-primary">Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
          <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
        </>
      );

};

export default Table;