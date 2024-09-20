import TextField from "../helpercomponents/TextField";
import Button from "../helpercomponents/Button";
import DynamicTable from "../helpercomponents/DynamicTable";
export default function Location() {
    return (
        <div className="Main-container1">
            <div className="formTop">
                <p className="formName">Location</p>
                {/* <div className="pr-10"><Button /></div> */}
            </div>
            <div className="textArea">
                <div className="grid">
                    <TextField labelName="Location Code"/>
                    <TextField labelName="Location Name"/>
                    <TextField labelName="Location Number"/>
                    <TextField labelName="Currency Code"/>
                </div>
            </div>

            <div className="formTop">
                <p className="formName">Table</p>
            </div>
            <div className="tableArea">
            <DynamicTable/>
            </div>
        </div>
    )
}