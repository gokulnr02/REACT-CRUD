import TextField from "../helpercomponents/TextField";
import Button from "../helpercomponents/Button";
import DynamicTable from "../helpercomponents/DynamicTable";
import Dropdown from "../helpercomponents/Dropdown";
import { useCallback, useState, useReducer, useEffect } from "react";
import CommonSelectAPI from "../helpercomponents/CommonSelect";
export default function City() {
    const [countryList, setCountrList] = useState([]);
    const [TableData, setTableData] = useState([]);
    const iniitalState = {
        CityID: 0,
        CityCode: '',
        CityName: '',
        CountryCode: '',
        CountryName: '',
        countryID: 0,
        CountryMID:''

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
            case 'CityID':
                return { ...state, CityID: action.payload }
            case 'CityCode':
                return { ...state, CityCode: action.payload }
            case 'CityName':
                return { ...state, CityName: action.payload }
                case 'CountryMID':
                    return { ...state, CountryMID: action.payload }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, iniitalState);
    console.log(state, 'state')
    const storeDispatch = useCallback((e) => {
console.log(e,'e')
        if (e.type == 'CountrySelect') {
            dispatch({ name: 'CountryCode', payload: e['CountryCode'] })
            dispatch({ name: 'CountryName', payload: e['CountryName'] })
            dispatch({ name: 'countryID', payload: e['CountryID'] })
            dispatch({ name: 'CountryMID', payload: e['_id'] })
        } else if (e.name == 'CityID') {
            dispatch({ name: 'CityID', payload: e.value })
        } else if (e.name == 'CityCode') {
            dispatch({ name: 'CityCode', payload: e.value })
        } else if (e.name == 'CityName') {
            dispatch({ name: 'CityName', payload: e.value })
        }
    })

    const humanClear = useCallback((e) => {
        if (e.name == 'CountryCode') {
            dispatch({ name: 'CountryCode', payload: '' })
        } else if (e.name == 'CountryName') {
            dispatch({ name: 'CountryName', payload: '' })
        } else if (e.name == 'countryID') {
            dispatch({ name: 'countryID', payload: '' })
        } else if (e.name == 'CityID') {
            dispatch({ name: 'CityID', payload: '' })
        } else if (e.name == 'CityCode') {
            dispatch({ name: 'CityCode', payload: '' })
        } else if (e.name == 'CityName') {
            dispatch({ name: 'CityName', payload: '' })

        }
    })
    const SaveFunction = useCallback(async () => {
        const url = 'http://127.0.0.1:5001/CitySave';
        const payLoad = {
            CityID: 0,
            CityCode:  state.CityCode,
            CityName:  state.CityName,
            CountryID: state.countryID,
            CountryMID: state.CountryMID,
        }
        const response = await CommonSelectAPI({ url, payLoad });

        const res = await response.Output
        if (res.status.code == 200) {
            await clear();
            // await TableSelect();
        }
    })

    const TableSelect = async (val) => {
        const url = 'http://127.0.0.1:5001/CountrySelect';
        const payLoad = {
            "index": val.pageIndex,
            "count": val.pageDropDown,
            "Select_Type": val.type ? val.type : null
        }
        const response = await CommonSelectAPI({ url, payLoad })
        if (response.Output.status.code == 200) {
            if (val.type == 'CountrySelect') {
                setCountrList(response.Output.data)
            }
        }
    }


    useEffect(() => {
        TableSelect({ pageIndex: 1, pageDropDown: 10 })
    }, [])
    return (
        <div className="Main-container1">
            <div className="formTop">
                <p className="formName">City</p>
                <div className="pr-10">
                    <Button onClick={() => SaveFunction()} /></div>
            </div>
            <div className="textArea">
                <div className="grid">
                    <TextField
                        labelName="City Code"
                        onChange={(val) => storeDispatch({ name: 'CityCode', value: val })}
                        cancel={() => humanClear({ name: 'CityCode' })}
                        value={state.CityCode}
                    />
                    <TextField labelName="City Name"
                        onChange={(val) => storeDispatch({ name: 'CityName', value: val })}
                        cancel={(val) => humanClear({ name: 'CityName', value: val })}
                        value={state.CityName} />

                    <Dropdown
                        labelName="Country Name"
                        order={3}
                        onChange={(val) => val ? TableSelect({ type: 'CountrySelect' }) : ''}
                        data={countryList}
                        grid={['CountryCode', 'CountryName']}
                        value={state.CountryName}
                        name={'CountryName'}
                        onClick={(val) => { storeDispatch({ ...val, type: 'CountrySelect' }) }}
                    />

                </div>
            </div>

            <div className="formTop">
                <p className="formName">Table</p>
            </div>
            <div className="tableArea">
                <DynamicTable
                    tableData={TableData}
                    tableSearch={(val) => TableSelect(val)} />
            </div>
        </div>
    )
}