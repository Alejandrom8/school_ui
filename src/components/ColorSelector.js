import React, {useState} from 'react';
import { BlockPicker } from 'react-color';

import './styles/ColorSelector.css';


function ColorSelector(props) {
    const [color, setColor] = useState(props.color);
    const [showPicker, setShowPicker] = useState(false);
    
    const handleClick = () => setShowPicker(!showPicker);
    const handleChange = color => {
        setColor(color.hex);
        props.onChange(color.hex);
    }
    
    return (
        <div>
            <div className="ColorSelector" 
                 onClick={handleClick}
                 style={{backgroundColor: color}} />
            { showPicker && (
                <div className="floatingWindow">
                    <BlockPicker 
                    color={color}
                    onChange={handleChange}
                    />
                </div>
            )}
        </div>
    );
}

export default ColorSelector;