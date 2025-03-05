import { useState } from "react";

export default function ColorPicker(){

    const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
    const [focusedIndex, setFocusedIndex] = useState(null);

    const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
    ];

    const handleClick = (color) => {
        setSelectedColor({hex: color.hex, name: color.name});
        setFocusedIndex(colors.indexOf(color));
    };

    const handleMouseEnter = (hex) => {
        const color = colors.find((c) => c.hex === hex);
        if (color) {
            setSelectedColor({ hex: color.hex, name: hex });
        }
    };

    const handleMouseLeave = () => {
        setFocusedIndex(null);
        setSelectedColor({hex: null, name: null});
    };

    const handleFocus = (index) => {
        setFocusedIndex(index);
        setSelectedColor({ hex: colors[index].hex, name: colors[index].name });
    };
    
    const handleBlur = () => {
        setFocusedIndex(null);
        setSelectedColor({ hex: null, name: null });
    };
    
    const handleKeyDown = (e, index) => {
        let newIndex = index;
        if (e.key === "Enter"){
            setSelectedColor({ hex: colors[index].hex, name: colors[index].name });
            return;
        }else if(e.key === "ArrowLeft" && index>0 ){
            newIndex = newIndex-1;
        }else if(e.key === "ArrowRight" && index < colors.length-1 ){
            newIndex = newIndex+1
        }
        setFocusedIndex(newIndex);
    };


    return (

    <div className="color-picker">
        <h1>Color Picker</h1>
        <div className="color-list">
            {colors.map((color, index) => (
            <div
                key={index}
                className={`color-item ${focusedIndex === index ? 'focused' : ''}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => handleClick(color)}
                onMouseEnter={() => handleMouseEnter(color.hex)}
                onMouseLeave={handleMouseLeave}
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0}
            >
                {selectedColor.hex === color.hex && (
                <span className="color-code">{selectedColor.name || color.hex}</span>
                )}
            </div>
            ))}
        </div>

    <style jsx>{`
        .color-picker {
        text-align: center;
        font-family: Arial, sans-serif;
        }

        .color-list {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
        }

        .color-item {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: black;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
        }

        .color-item:hover,
        .color-item.focused {
        transform: scale(1.1);
        border: 2px solid black;
        }

        .color-code {
        color: white;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 5px 10px;
        border-radius: 5px;
        }
    `}</style>
    
    </div>);

}