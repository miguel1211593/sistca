import React, { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MainScreen = () => {
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('EUR');
    const [toCurrency, setToCurrency] = useState('USD');

    const currencies = [
        { code: 'EUR', name: 'Euro' },
        { code: 'USD', name: 'Dólar Americano' },
        { code: 'GBP', name: 'Libra Esterlina' },
        { code: 'JPY', name: 'Iene Japonês' },
        { code: 'CHF', name: 'Franco Suíço' },
    ];

        const convertCurrency = () => {
            const amountValue = parseFloat(amount);
            let convertedValue = 0;

            switch (fromCurrency) {
                case 'EUR':
                    convertedValue = amountValue;
                    break;
                case 'USD':
                    convertedValue = amountValue * 1.2; // Euro to Dollar conversion rate
                    break;
            case 'GBP':
                convertedValue = amountValue * 1.1; // Euro to Pound conversion rate
                break;
            case 'JPY':
                convertedValue = amountValue * 130; // Euro to Yen conversion rate
                break;
            case 'CHF':
                convertedValue = amountValue * 1.08; // Euro to Swiss Franc conversion rate
                break;
            default:
                convertedValue = amountValue;
        }

        switch (toCurrency) {
            case 'EUR':
                setConvertedAmount(convertedValue.toFixed(2));
                break;
            case 'USD':
                setConvertedAmount((convertedValue / 1.2).toFixed(2));
                break;
            case 'GBP':
                setConvertedAmount((convertedValue / 1.1).toFixed(2));
                break;
            case 'JPY':
                setConvertedAmount((convertedValue / 130).toFixed(2));
                break;
            case 'CHF':
                setConvertedAmount((convertedValue / 1.08).toFixed(2));
                break;
            default:
                setConvertedAmount(convertedValue.toFixed(2));
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                placeholder="Valor a converter"
                keyboardType="numeric"
                value={amount}
                onChangeText={text => setAmount(text)}
            />
            <Picker
                selectedValue={fromCurrency}
                style={{ height: 50, width: 200, marginBottom: 10 }}
                onValueChange={(itemValue, itemIndex) => setFromCurrency(itemValue)}
            >
                {currencies.map(currency => (
                    <Picker.Item key={currency.code} label={currency.name} value={currency.code} />
                ))}
            </Picker>
            <Picker
                selectedValue={toCurrency}
                style={{ height: 50, width: 200, marginBottom: 20 }}
                onValueChange={(itemValue, itemIndex) => setToCurrency(itemValue)}
            >
                {currencies.map(currency => (
                    <Picker.Item key={currency.code} label={currency.name} value={currency.code} />
                ))}
            </Picker>
            <Button
                title="Converter"
                onPress={convertCurrency}
            />
            {convertedAmount !== '' && (
                <Text style={{ marginTop: 20 }}>Valor convertido: {convertedAmount} {toCurrency}</Text>
            )}
        </View>
    );
};

export default MainScreen;
