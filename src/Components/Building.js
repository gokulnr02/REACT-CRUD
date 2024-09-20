import TextField from "../helpercomponents/TextField";
import Button from "../helpercomponents/Button";
import DynamicTable from "../helpercomponents/DynamicTable";
export default function Building() {
    return (
        <div className="Main-container1">
            <div className="formTop">
                <p className="formName">Building</p>
                {/* <div className="pr-10"><Button /></div> */}
            </div>
            <div className="textArea">
                <div className="grid">
                    <TextField labelName="Building Code"/>
                    <TextField labelName="Building Name"/>
                    <TextField labelName="Building Number"/>
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