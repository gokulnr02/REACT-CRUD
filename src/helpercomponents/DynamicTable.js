import { useState } from "react";
import { HiArrowCircleRight,HiArrowCircleLeft } from "react-icons/hi";


export default function DynamicTable(props) {

    const igoreColoums = ['ID', 'id', 'Total', 'total', 'Date', '_id', '__v']
    const grid = props.tableData.length >0 ? Object.keys(props.tableData[0]).filter((val) => !igoreColoums.some(ignore => val.includes(ignore))):[]
    
    const[pageDropDown,setpageDropValue]=useState(10)
    const [pageIndex,setPageIndex]=useState(1);
    async function pagination(operator) {
        switch (operator) {
            case '+':
                setPageIndex(pageIndex+1);
                break;
            case '-':
                setPageIndex(pageIndex-1);
                break;
            default:
                break;
        }
        props.tableSearch({pageIndex,pageDropDown})
    }
    return (
        <div className="w-100">
            <table>
                <thead className="tableHeader">
                    <tr>
                        {grid.length > 0 && grid.map((val) => {
                            return (
                                <th>{val}</th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    {props.tableData.length > 0 && props.tableData.map((body, i) => {
                        return (<tr className="trTag">
                            {grid.map((x) => {
                                return (
                                    <td>{body[x]}</td>
                                )
                            })}
                        </tr>)
                    })
                    }
                </tbody>
            </table>
            <div className="dropdownFooter">
                <p className="TotalCount"></p>
                <p className="rightTableFooter">
                <span className="countsPerPage">{pageIndex+'/'+pageDropDown}</span>
                <select name='count' className="dropdownSelect" defaultValue={10} onClick={(e)=>{setpageDropValue(e.target.value)}}
                    >
                    <option value={10} >10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <div className="PaginationCount">
                <HiArrowCircleLeft   onClick={()=> pageIndex > 1 && pagination('-')}/>
                <HiArrowCircleRight  onClick={()=> pagination('+')}/>
                </div>
                </p>
            </div>
        </div>
    )
}