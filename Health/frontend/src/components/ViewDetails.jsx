import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,BarElement } from "chart.js";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,BarElement);
import { FaUser, FaIdCard, FaShieldAlt, FaBuilding, FaHeartbeat, FaTint, FaBed, FaRunning, FaHeart, FaBatteryFull, FaMedkit } from "react-icons/fa"; // Import React Icons

const ViewDetails = () => {
    const { state } = useLocation();
    const { soldier } = state;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Static averages for comparison
    const avgMetrics = {
        heartRate: 72, // Average resting heart rate (bpm)
        bloodPressure: 120, // Systolic blood pressure
        oxygenSaturation: 98, // Oxygen saturation (%)
        steps: 8000, // Average daily steps
        sleepHours: 7, // Recommended sleep hours
        activityLevel: 3, // Average activity level on a scale of 1-5
    };

    // Function to determine if a metric is within 5% of average
    const isWithinFivePercent = (soldierValue, avgValue) => {
        const fivePercent = avgValue * 0.05;
        return soldierValue >= (avgValue - fivePercent) && soldierValue <= (avgValue + fivePercent);
    };

    // Features for individual cards
    const features = [
        { name: "Heart Rate (bpm)", soldierValue: soldier.heart_rate, avgValue: avgMetrics.heartRate },
        { name: "Blood Pressure (Systolic)", soldierValue: soldier.blood_pressure, avgValue: avgMetrics.bloodPressure },
        { name: "Oxygen Saturation (%)", soldierValue: soldier.oxygen_saturation, avgValue: avgMetrics.oxygenSaturation },
        { name: "Steps", soldierValue: soldier.steps, avgValue: avgMetrics.steps },
        { name: "Sleep Hours", soldierValue: soldier.sleep_hours, avgValue: avgMetrics.sleepHours },
        { name: "Activity Level", soldierValue: soldier.activity_level, avgValue: avgMetrics.activityLevel },
    ];

    // Line Chart Data for Overall Comparison
    const comparisonData = {
        labels: features.map((feature) => feature.name),
        datasets: [
            {
                label: "Soldier's Metrics",
                data: features.map((feature) => feature.soldierValue),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.4)",
                tension: 0.3,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointBorderColor: "rgba(75, 192, 192, 1)",
                fill: true,
            },
            {
                label: "Average Metrics",
                data: features.map((feature) => feature.avgValue),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.4)",
                tension: 0.3,
                pointBackgroundColor: "rgba(255, 99, 132, 1)",
                pointBorderColor: "rgba(255, 99, 132, 1)",
                fill: true,
            },
        ],
    };

    return (
        <div className="bg-gray-900 p-4 sm:p-6 text-white min-h-screen">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-6 text-center">
                {soldier.name}'s Fitness Details
            </h1>

            {/* Overall Comparison Chart */}
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Overall Comparison with Averages</h2>
                <div className="h-[250px] sm:h-[300px] lg:h-[350px]">
                    <Line
                        data={comparisonData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: "top",
                                    labels: {
                                        color: "#FFFFFF",
                                        font: {
                                            size: 12,
                                        },
                                    },
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            const label = context.dataset.label || "";
                                            const value = context.raw;
                                            return `${label}: ${value}`;
                                        },
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: "#FFFFFF",
                                        font: {
                                            size: 10,
                                        },
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        color: "#FFFFFF",
                                        font: {
                                            size: 10,
                                        },
                                    },
                                    title: {
                                        display: true,
                                        text: "Metrics",
                                        color: "#FFFFFF",
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div className={`${soldier.healthStatus === 'normal' ? 'bg-gray-900' : 'bg-red-500'} p-4 sm:p-6 rounded-lg shadow-lg mb-6`}>
                <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Personal Details</h2>
                <div className="grid grid-cols-1 gap-4">
                    {/* Soldier Name */}
                    <div className="flex items-center">
                        <FaUser className="text-blue-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.name}</p>
                    </div>
                    {/* Soldier Army ID */}
                    <div className="flex items-center">
                        <FaIdCard className="text-orange-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.armyId}</p>
                    </div>
                    {/* Soldier Rank */}
                    <div className="flex items-center">
                        <FaShieldAlt className="text-green-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.armyRank}</p>
                    </div>
                    {/* Soldier Battalion */}
                    <div className="flex items-center">
                        <FaBuilding className="text-yellow-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.armyBattalion}</p>
                    </div>
                    {/* Health Status */}
                    <div className="flex items-center">
                        <FaMedkit className="text-red-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.healthStatus}</p>
                    </div>
                    {/* Soldier Heart Rate */}
                    <div className="flex items-center">
                        <FaHeartbeat className="text-pink-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.heart_rate} bpm</p>
                    </div>
                    {/* Soldier Blood Pressure */}
                    <div className="flex items-center">
                        <FaTint className="text-blue-500 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.blood_pressure} mmHg</p>
                    </div>
                    {/* Soldier Oxygen Saturation */}
                    <div className="flex items-center">
                        <FaHeart className="text-teal-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.oxygen_saturation} %</p>
                    </div>
                    {/* Soldier Stress Level */}
                    <div className="flex items-center">
                        <FaBatteryFull className="text-green-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.stress_level} / 10</p>
                    </div>
                    {/* Soldier Steps */}
                    <div className="flex items-center">
                        <FaRunning className="text-orange-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.steps} steps</p>
                    </div>
                    {/* Soldier Sleep Hours */}
                    <div className="flex items-center">
                        <FaBed className="text-purple-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.sleep_hours} hours</p>
                    </div>
                    {/* Soldier Activity Level */}
                    <div className="flex items-center">
                        <FaRunning className="text-red-400 text-xl mr-3" />
                        <p className="text-sm sm:text-base">{soldier.activity_level} / 5</p>
                    </div>
                </div>
            </div>

            {/* Individual Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                    // Determine if soldier's metric is within 5% of average
                    const withinRange = isWithinFivePercent(feature.soldierValue, feature.avgValue);
                    
                    const data = {
                        labels: [feature.name],
                        datasets: [
                            {
                                label: "Soldier's Metric",
                                data: [feature.soldierValue],
                                backgroundColor: withinRange ? "rgba(75, 192, 75, 1)" : "rgba(255, 99, 132, 1)", // Green if within 5%, Red if not
                                borderColor: withinRange ? "rgba(75, 192, 75, 1)" : "rgba(255, 99, 132, 1)",
                                borderWidth: 2,
                            },
                            {
                                label: "Average Metric",
                                data: [feature.avgValue],
                                backgroundColor: "rgba(120, 200, 100, 1)", // Bar color for average
                                borderColor: "rgba(120, 200, 100, 1)",
                                borderWidth: 2,
                            },
                        ],
                    };

                    // Status text to display
                    const statusText = withinRange 
                        ? "Within normal range" 
                        : feature.soldierValue > feature.avgValue 
                            ? "Above normal range" 
                            : "Below normal range";
                            
                    const statusColor = withinRange ? "text-green-400" : "text-red-400";

                    return (
                        <div key={index} className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">{feature.name}</h3>
                            <div className="h-[150px] sm:h-[200px]">
                                <Bar
                                    data={data}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: "top",
                                                labels: {
                                                    color: "#FFFFFF",
                                                    font: {
                                                        size: 10,
                                                    },
                                                },
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function (context) {
                                                        const label = context.dataset.label || "";
                                                        const value = context.raw;
                                                        return `${label}: ${value}`;
                                                    },
                                                },
                                            },
                                        },
                                        scales: {
                                            x: {
                                                ticks: {
                                                    color: "#FFFFFF",
                                                    font: {
                                                        size: 10,
                                                    },
                                                },
                                            },
                                            y: {
                                                beginAtZero: true,
                                                ticks: {
                                                    color: "#FFFFFF",
                                                    font: {
                                                        size: 10,
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                />
                            </div>
                            <p className={`text-center mt-2 font-semibold ${statusColor}`}>
                                {statusText}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ViewDetails;