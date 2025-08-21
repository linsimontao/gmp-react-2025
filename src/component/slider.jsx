import React, { useState } from 'react';

const TimeSlider = ({ setTimestr }) => {
    const [currentTime, setCurrentTime] = useState(0); // Represents 00:00am initially

    // Calculate the position of the thumb based on the current time (0-4 hours)
    const calculateThumbPosition = () => {
        // Assuming the slider represents 4 hours in total (00:00am to 04:00am)
        // The image shows the thumb is initially at 00:00am, which is 0% of the slider.
        // At 04:00am, it would be 100%.
        return (currentTime / 4) * 100;
    };

    const handleSliderChange = (event) => {
        // Assuming the slider maps directly to hours from 0 to 4
        const value = parseFloat(event.target.value)
        setCurrentTime(value);
        const str = `${Math.floor(value).toString().padStart(2, '0')}_${((value - Math.floor(value)) * 60).toString().padStart(2, '0')}`;
        setTimestr(str);
    };

    const formatTime = (timeInHours) => {
        const hour = Math.floor(timeInHours);
        const minute = Math.round((timeInHours - hour) * 60);
        const ampm = hour < 12 ? 'am' : 'pm';
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        return `${displayHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}${ampm}`;
    };

    return (
        <div style={styles.container}>
            <div style={styles.timeLabels}>
                <span>00:00am</span>
                <span>01:00am</span>
                <span>02:00am</span>
                <span>03:00am</span>
                <span>04:00am</span>
            </div>
            <div style={styles.sliderWrapper}>
                <input
                    type="range"
                    min="0"
                    max="4"
                    step="0.5" // Allows for smooth movement between hours
                    value={currentTime}
                    onChange={handleSliderChange}
                    style={styles.slider}
                />
                {/* Custom thumb to match the image */}
                <div
                    style={{
                        ...styles.thumb,
                        left: `calc(${calculateThumbPosition()}% - 10px)` /* Adjust for thumb width */
                    }}
                ></div>
            </div>
            <div style={styles.currentTimeDisplay}>
                Current Time: {formatTime(currentTime)}
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        fontFamily: 'Arial, sans-serif',
        width: '100%',
        maxWidth: '800px',
        margin: 'auto',
        left: '0px',
        right: '0px',
        padding: '20px',
        // backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        bottom: '20px'
        // zIndex: 1000, // Ensure it appears above other elements

    },
    timeLabels: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
        fontWeight: 'bold',
        color: '#fff',
    },
    sliderWrapper: {
        position: 'relative',
        height: '20px', // Height of the track
        marginBottom: '20px',
    },
    slider: {
        width: '100%',
        height: '10px', // Visual height of the track
        appearance: 'none',
        background: '#b0b0d0', // Color of the track as seen in the image
        borderRadius: '5px',
        outline: 'none',
        opacity: '0.9',
        transition: 'opacity .2s',
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1, // Ensure the slider input is above the background
    },
    thumb: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '30px',
        height: '30px',
        // backgroundColor: '#4a4a8c', // Dark blue color for the thumb
        borderRadius: '50%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        zIndex: 2, // Ensure the custom thumb is above the slider input
        pointerEvents: 'none', // Allow clicks to pass through to the underlying input
    },
    currentTimeDisplay: {
        marginTop: '15px',
        fontSize: '1.1em',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    }
};

export default TimeSlider;