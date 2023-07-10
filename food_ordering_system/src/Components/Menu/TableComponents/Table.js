import { useTable } from "react-table";

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
        columns,
        data,
    });

    // Render the UI for your table and the styles
    return (
        <div className="mt-2 flex flex-col">
            <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                <div  className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow border-b border-gray-300" style={{border:"1px solid #dad3d3", borderRadius: "5px"}}>
                        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-10">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()}
                                            className="px-3 py-3 text-left text-20 font-medium text-gray-800 uppercase rounded-sm tracking-wider"
                                            >
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}
                                className="bg-white divide-y divide-gray-200">
                                {rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()} className="px-3 py-3 whitespace-nowrap">{cell.render("Cell")}</td>
                                    })}
                                    </tr>
                                );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Table;