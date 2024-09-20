import { memo } from "react"


const TextField = memo((props)=>{
    
    return (
        <div>
            <div className="InputDiv">
               <div className="textContainer">
               <input className="inputfield"
                    onChange={(e)=>{props.onChange(e.target.value)}}
                    value={props.value} 
                    name={props.name}
                     />
                {props.value  && <p className="cancelMark" onClick={props.cancel}>X</p>}
               </div>
                <span className="labelName">{props.labelName}</span>
            </div>
        </div>
    )
}) 
export default TextField ;