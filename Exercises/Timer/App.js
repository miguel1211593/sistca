import React, { useState, useEffect, useRef } from 'react';
import { Animated, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Picker } from '@react-native-picker/picker';

const Timer = () => {
    const [isActive, setIsActive] = useState(false);
    const [duration, setDuration] = useState(100);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const playSound = (soundName) => {
        console.log(`Playing sound: ${soundName}`);
    };

    

    const toggleTimer = () => {
        setIsActive(!isActive);
        playSound(isActive ? 'pause' : 'start');
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    const resetTimer = () => {
        setIsActive(false);
        playSound('reset');
    };

    const handleTimeChange = (newTime) => {
        setDuration(newTime);
    };


    const containerStyle = isDarkMode ? styles.darkContainer : styles.container;
    const buttonStyle = isDarkMode ? styles.darkButton : styles.button;


    return (
        <View style={containerStyle}>
            <Picker
                selectedValue={duration}
                onValueChange={(itemValue) => handleTimeChange(itemValue)}
            >
                <Picker.Item label="10 seconds" value={10} />
                <Picker.Item label="30 seconds" value={30} />
                <Picker.Item label="1 minute" value={60} />
                <Picker.Item label="5 minutes" value={300} />
            </Picker>

            <CountdownCircleTimer
                isPlaying={isActive}
                duration={duration}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
                onComplete={() => {
                    Alert.alert('Time is up!');
                    playSound('complete');
                }}
            >
                {({ remainingTime }) => <Text>{formatTime(remainingTime)}</Text>}
            </CountdownCircleTimer>
            <TouchableOpacity style={buttonStyle} onPress={() => setIsDarkMode(!isDarkMode)}>
                <Text style={styles.buttonText}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonStyle} onPress={toggleTimer}>
                <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={buttonStyle} onPress={resetTimer}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    darkContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',

    },
    button: {
        margin: 10,
        padding: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
    },
    darkButton: {
        margin: 10,
        padding: 10,
        backgroundColor: '#0056b3',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
    },
});

export default Timer;;
