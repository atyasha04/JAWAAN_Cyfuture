import React from "react";
import { FaHeartbeat, FaRunning, FaLungs } from "react-icons/fa";
import { GiSleepy, GiRank3 } from "react-icons/gi";
import { MdBloodtype, MdOutlineMonitorHeart } from "react-icons/md";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SoldierCard = ({ soldier }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/view-details", { state: { soldier } }); // Pass soldier as state
  };
  const {
    name,
    armyId,
    armyRank,
    armyBattalion,
    healthStatus,
    heart_rate,
    blood_pressure,
    oxygen_saturation,
    stress_level,
    steps,
    sleep_hours,
    activity_level,
  } = soldier;

  const isAlert = healthStatus === "alert";

  return (
    <div className="bg-gray-800 m-4 text-white rounded-lg shadow-lg overflow-hidden">
      {/* Health Status Header */}
      <div className="relative p-4 bg-gray-900">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-sm text-gray-400">Army ID: {armyId}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <GiRank3 className="text-blue-500" />
            <span className="bg-blue-600 text-xs px-2 py-1 rounded">
              {armyRank || "Rank"}
            </span>
          </div>
          <div
            className={`flex items-center space-x-2 ${
              isAlert ? "text-red-500" : "text-green-500"
            }`}
          >
            {isAlert ? (
              <>
                <FaExclamationTriangle className="mr-1" />
                <span>Health Alert</span>
              </>
            ) : (
              <>
                <FaCheckCircle className="mr-1" />
                <span>Normal</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Attributes Section */}
      <div className="p-2 m-4">
        <p className="text-sm text-gray-400 mb-4">
          Battalion: {armyBattalion || "N/A"}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <FaHeartbeat className="text-red-500 mr-4 m-1" />
            <span>Heart Rate: {heart_rate || "N/A"} bpm</span>
          </div>
          <div className="flex items-center">
            <MdBloodtype className="text-blue-400 mr-2" />
            <span>BP: {blood_pressure || "N/A"} mmHg</span>
          </div>
          <div className="flex items-center">
            <FaLungs className="text-green-400 mr-2" />
            <span>Oxygen: {oxygen_saturation || "N/A"}%</span>
          </div>
          <div className="flex items-center">
            <FaRunning className="text-yellow-400 mr-2" />
            <span>Steps: {steps || "N/A"}</span>
          </div>
          <div className="flex items-center">
            <GiSleepy className="text-purple-400 mr-2" />
            <span>Sleep: {sleep_hours || "N/A"} hrs</span>
          </div>
          <div className="flex items-center">
            <MdOutlineMonitorHeart className="text-pink-400 mr-2" />
            <span>Stress: {stress_level || "N/A"}%</span>
          </div>
          <div className="flex items-center">
            <FaRunning className="text-orange-400 mr-2" />
            <span>Activity: {activity_level || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button onClick={handleViewDetails} className="mt-4 bg-blue-600 hover:bg-blue-500 text-sm text-white py-2 px-4 rounded w-full">
        View Details
      </button>
    </div>
  );
};

export default SoldierCard;
