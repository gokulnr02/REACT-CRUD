import TextField from "../helpercomponents/TextField";
import Button from "../helpercomponents/Button";
import DynamicTable from "../helpercomponents/DynamicTable";
import { useCallback, useState, useReducer, useEffect } from "react";
import CommonSelectAPI from "../helpercomponents/CommonSelect";
export default function Country() {
    const [TableData, setTableData] = useState([]);
    const iniitalState = {
        CountryCode: '',
        CountryName: '',
        countryID: 0,
        currentDate: '',
        updatedDate: '',
    }
   
    const clear = () => {
        dispatch({ name: 'CountryCode', payload: '' })
        dispatch({ name: 'CountryName', payload: '' })
    }
    const reducer = (state, action) => {
        switch (action.name) {
            case 'CountryCode':
                return { ...state, CountryCode: action.payload }
            case 'CountryName':
                return { ...state, CountryName: action.payload }
            case 'countryID':
                return { ...state, countryID: action.payload }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, iniitalState);

    const storeDispatch = useCallback((e) => {
        if (e.name == 'CountryCode') {
            dispatch({ name: 'CountryCode', payload: e.value })
        } else if (e.name == 'CountryName') {
            dispatch({ name: 'CountryName', payload: e.value })
        } else if (e.name == 'countryID') {
            dispatch({ name: 'countryID', payload: e.value })
        }
    })

    const humanClear = useCallback((e) => {
        if (e.name == 'CountryCode') {
            dispatch({ name: 'CountryCode', payload: '' })
        } else if (e.name == 'CountryName') {
            dispatch({ name: 'CountryName', payload: '' })
        } else if (e.name == 'countryID') {
            dispatch({ name: 'countryID', payload: '' })
        }})
    
    const SaveFunction = useCallback(async () => {
        const url = 'http://127.0.0.1:5001/CountrySave';
        const payLoad = {
            CountryCode: state.CountryCode ? state.CountryCode : null,
            CountryName: state.CountryName ? state.CountryName : null,
        }
        const response = await CommonSelectAPI({url, payLoad});
        
        const res = await response.Output
        if (res.status.code == 200) {
            await clear();
            await TableSelect();
        }
    })

    const TableSelect = async (val) => {
        const url = 'http://127.0.0.1:5001/CountrySelect';
        const payLoad = {
            "index": val.pageIndex,
            "count":val.pageDropDown
        }
        const response = await CommonSelectAPI({url, payLoad})
        if (response.Output.status.code == 200) {
            setTableData(response.Output.data)
        }
    }

    useEffect(()=>{
        TableSelect({pageIndex:1,pageDropDown:10})
    },[])
    return (
        <div className="Main-container1">
            <div className="formTop">
                <p className="formName">Country</p>
                <div className="pr-10">
                    <Button onClick={() => SaveFunction()} /></div>
            </div>
            <div className="textArea">
                <div className="grid">
                    <TextField labelName="Country Code"
                        onChange={(val) => storeDispatch({ name: 'CountryCode', value: val })}
                        cancel={() => humanClear({ name: 'CountryCode' })} value={state.CountryCode}
                    />
                    <TextField labelName="Country Name"
                        onChange={(val) => storeDispatch({ name: 'CountryName', value: val })}
                        value={state.CountryName}
                        cancel={() => humanClear({ name: 'CountryName' })} />
                </div>
            </div>

            <div className="formTop">
                <p className="formName">Table</p>
            </div>
            <div className="tableArea">
                <DynamicTable
                    tableData={TableData}
                    tableSearch={(val)=>TableSelect(val)} />
            </div>
        </div>
    )
}