import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {Picker} from "@react-native-picker/picker";
import {COLORS} from "../../constants";

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const { width } = Dimensions.get("screen");

const Statistic = () => {
    const [selectedYear, setSelectedYear] = useState('Tất cả');
    const [data, setData] = useState([
        {
            year: '2022',
            values: [
                {value: 250, label: 'Jan'},
                {value: 500, label: 'Feb'},
                {value: 745, label: 'Mar'},
                {value: 320, label: 'Apr'},
                {value: 600, label: 'May'},
                {value: 256, label: 'Jun'},
                {value: 300, label: 'Jul'},
                {value: 320, label: 'Aug'},
                {value: 600, label: 'Sep'},
                {value: 256, label: 'Oct'},
                {value: 300, label: 'Nov'},
                {value: 300, label: 'Dec'},
            ],
        },
        {
            year: '2023',
            values: [
                {value: 350, label: 'Jan'},
                {value: 600, label: 'Feb'},
                {value: 845, label: 'Mar'},
                {value: 420, label: 'Apr'},
                {value: 700, label: 'May'},
                {value: 256, label: 'Jun'},
                {value: 200, label: 'Jul'},
                {value: 420, label: 'Aug'},
                {value: 500, label: 'Sep'},
                {value: 156, label: 'Oct'},
                {value: 200, label: 'Nov'},
                {value: 600, label: 'Dec'},
            ],
        },
    ]);

    const filteredData = selectedYear === 'Tất cả'
        ? data.flatMap(item => item.values)
        : data.find(item => item.year === selectedYear)?.values || [];

    const [totalData, setTotalData] = useState([]);

    useEffect(() => {
        const calculateTotalData = () => {
            if (selectedYear === 'Tất cả') {
                const totals = Array.from({ length: 12 }, () => 0);

                data.forEach((yearData) => {
                    yearData.values.forEach((month, index) => {
                        totals[index] += month.value;
                    });
                });

                const newTotalData = totals.map((value, index) => ({ value, label: monthLabels[index] }));
                setTotalData(newTotalData);
            } else {
                setTotalData([]);
            }
        };

        calculateTotalData();
    }, [selectedYear, data]);

    const calculateAverage = (data) => {
        const total = data.reduce((acc, month) => acc + month.value, 0);
        return total / data.length;
    };

    const customData = filteredData.map((item) => item.value < calculateAverage(filteredData) ? item.frontColor = COLORS.secondaryGreen : item.frontColor = COLORS.green);
    const customTotalData = totalData.map((item) => item.value < calculateAverage(totalData) ? item.frontColor = COLORS.secondaryGreen : item.frontColor = COLORS.green);

    return (
        <View style={{ backgroundColor: "white", marginBottom: 5, paddingVertical: 20, paddingHorizontal: 20, paddingBottom: 40 }}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Text style={{fontWeight: "500", fontSize: 16}}>Số lượng người tham gia</Text>

                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => setSelectedYear(itemValue)}
                    style={{ height: 50, width: 130 }}
                >
                    <Picker.Item label="Tất cả" value="Tất cả" />
                    {data.map(item => (
                        <Picker.Item key={item.year} label={item.year} value={item.year} />
                    ))}
                </Picker>
            </View>
            <View >
                <BarChart
                    barWidth={12}
                    noOfSections={3}
                    barBorderRadius={6}
                    spacing={40}
                    data={selectedYear === 'Tất cả' ? totalData : filteredData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                    showXAxisLabels={true}
                />
            </View>
        </View>
    );
};

export default Statistic;
