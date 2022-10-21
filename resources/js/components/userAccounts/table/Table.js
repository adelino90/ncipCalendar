import React, { useState } from "react";

import TableData from "../TableData";
import styles from "./Table.module.css";
import TableFooter from "./tableFooter/TableFooter";
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom' 

const Table = ({ data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = TableData(data, page, rowsPerPage);
  return (
    <>
    <Link to="/AddNewUserAccount" className="btn btn-secondary">Add New User</Link>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Full Name</th>
            <th className={styles.tableHeader}>Email</th>
            <th className={styles.tableHeader}>Role</th>
            <th className={styles.tableHeader}>Action</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr className={styles.tableRowItems} key={el.userUuid}>
              <td className={styles.tableCell}>{el.firstname + ' '+ el.lastname}</td>
              <td className={styles.tableCell}>{el.email}</td>
              <td className={styles.tableCell}>{el.role.roleName}</td>
              <td className={styles.tableCell}><Link to={"/EditUserAccount/"+el.userUuid} className="btn btn-primary">Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;