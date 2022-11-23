import React from 'react'

function RowData(props) {
  return (
    <tr>
    <td>{props.sl}</td>
    <td>{props.Name}</td>
    <td>{props.Usn}</td>
    <td>{props.Division}</td>
    <td>{props.Attendance}</td>
    <td>{props.Cie}</td>
  </tr>
  )
}

export default RowData;