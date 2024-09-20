import {memo}from 'react'
const Button =memo((props)=>{
    return(
        <div>
            <button className="saveBtn" onClick={()=>props.onClick()}>Save</button>
        </div>
    )
})
export default Button;