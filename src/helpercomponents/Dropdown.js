import { useRef, useState, useEffect , memo  } from 'react';

const Dropdown = memo((props)=>{

    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const inputRef = useRef(true);
    const dropdownRef = useRef(null);

    const handleInputClick = () => {
        props.onChange(true)
        setDropdownVisible(true);
    };

    const handleClickOutside = (event) => {
        if (
            inputRef.current &&
            !inputRef.current.contains(event.target) &&
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <div className="DropDownDiv">
                <div className="textContainer" >
                    <input className="inputfield"
                        value= {props.value}
                        name={props.name}
                        ref={inputRef}
                        onClick={handleInputClick}
                    />
                    {!props.value && <p className="cancelMark">X</p>}
                </div>
                <span className="labelName">{props.labelName}</span>
            </div>
            {isDropdownVisible && <div ref={dropdownRef} className={`dropdownList dropdownOrder${props.order}`}>
                <div className="dropdownTable">
                    <table>
                        <thead>
                          <tr>
                          { props.grid && props.grid.map((val)=>{
                            return(
                                <th className="dropdownheader">{val}</th>
                            )
                          })
                            
                          }
                            </tr>
                        </thead>
                        <tbody>
                           {props.data && props.data.length>0 && props.data.map((val)=>{
                            return(<tr className="dropdownRow" onClick={()=>{props.onClick(val);setDropdownVisible(false)}}>
                                <td className="dropdownValues">{val[props.grid[0]]}</td>
                                <td className="dropdownValues">{val[props.grid[1]]}</td>
                            </tr>)})}
                        </tbody>
                    </table>
                </div>
                <div className="dropdownFooter">
                    <p>Total records</p>
                    <p>pagination</p>
                </div>
            </div>}
        </div>
    )
})
export default Dropdown