import classes from "./file.module.css";

const File = props => {
    return (
        props.excelData[props.ind] && props.excelData[props.ind].length
            ? <div className={classes.tableResponsive}>
                <h1 className={classes.view}>View Data</h1>
                <table className={classes.table}>
                    {/* <thead>
                        <tr>
                            {
                                Object.keys(props.excelData[props.ind][0]).map((key) => (
                                    key !== "id" && key !== "file_url"
                                        ? <th key={key}>{key} </th>
                                        : null
                                ))
                            }
                        </tr>
                    </thead> */}
                    <tbody>
                        {props.excelData[props.ind].map((individualExcelData, index) => (
                            <tr key={index}>
                                {
                                    Object.keys(individualExcelData).map((key) => (
                                        key === "id" || key === "plan_name" || key === "plan_url" || key === "Email"
                                            ? null
                                            : key === "Name"
                                                ? <td key={key}>
                                                    <div>{individualExcelData["Name"]}</div>
                                                    <div>{individualExcelData["Email"]}</div>
                                                </td>
                                                : <td key={key}>{individualExcelData[key]}</td>
                                    ))
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            : <div className={classes.tableResponsive}>
                <h1 className={classes.nodata}>No Data Found!</h1>
            </div>
    )
};

export default File;