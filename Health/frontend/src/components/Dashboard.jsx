import React, { useEffect, useState } from "react";
import axios from "axios";
import SoldierCard from "./SoldierCard";
import { 
  FaHeartbeat, FaRunning, FaLungs, FaExclamationTriangle, FaCheckCircle 
} from "react-icons/fa";
import { GiSleepy, GiRank3 } from "react-icons/gi";
import { MdBloodtype, MdOutlineMonitorHeart } from "react-icons/md";

const Dashboard = () => {
  const [soldiers, setSoldiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    armyId: "",
    armyRank: "",
    armyBattalion: "",
    healthStatus: "",
    heart_rate_min: "",
    heart_rate_max: "",
    blood_pressure_min: "",
    blood_pressure_max: "",
    oxygen_saturation_min: "",
    oxygen_saturation_max: "",
    stress_level_min: "",
    stress_level_max: "",
    steps_min: "",
    steps_max: "",
    sleep_hours_min: "",
    sleep_hours_max: "",
    activity_level_min: "",
    activity_level_max: "",
  });

  // Fetch all soldiers
  const fetchSoldiers = async (query = "") => {
    setLoading(true);
    try {
      const endpoint = query
        ? `https://health-analysis-quex.onrender.com/api/v1/search${query}`
        : "https://health-analysis-quex.onrender.com/api/v1/get-all-Soldiers";
      const response = await axios.get(endpoint);
      setSoldiers(response.data.data || response.data);
    } catch (error) {
      console.error("Error fetching soldiers:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSoldiers(); // Fetch all soldiers initially
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Build the query string
    const query = Object.keys(filters)
      .filter((key) => filters[key]) // Only include non-empty filters
      .map((key) => `${key}=${filters[key]}`)
      .join("&");

    fetchSoldiers(query ? `?${query}` : "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className=" bg-gray-900  text-white min-h-screen min-w-screen ">
      <h1 className="text-3xl sm:text-4xl  font-extrabold text-blue-400  text-center tracking-wide p-12">
       JAWAAN Defense Health Dashboard
      </h1>

      {/* Search Filters */}
      <form
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 bg-gray-800 p-4 rounded-lg shadow-lg mx-4"
        onSubmit={handleSearch}
      >
        {/* Name Filter */}
        <div className="flex items-center gap-2">
          <GiRank3 className="text-blue-400 text-xl" />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={filters.name}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Army ID Filter */}
        <div className="flex items-center gap-2">
          <FaCheckCircle className="text-green-400 text-xl" />
          <input
            type="text"
            name="armyId"
            placeholder="Army ID"
            value={filters.armyId}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Army Rank Filter */}
        <div className="flex items-center gap-2">
          <GiRank3 className="text-yellow-400 text-xl" />
          <input
            type="text"
            name="armyRank"
            placeholder="Army Rank"
            value={filters.armyRank}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Army Battalion Filter */}
        <div className="flex items-center gap-2">
          <FaExclamationTriangle className="text-red-500 text-xl" />
          <input
            type="text"
            name="armyBattalion"
            placeholder="Army Battalion"
            value={filters.armyBattalion}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Health Status Filter */}
        <div className="flex items-center gap-2">
          <MdOutlineMonitorHeart className="text-pink-400 text-xl" />
          <select
            name="healthStatus"
            value={filters.healthStatus}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">Health Status</option>
            <option value="normal">Normal</option>
            <option value="alert">Alert</option>
          </select>
        </div>

        {/* Heart Rate Min Filter */}
        <div className="flex items-center gap-2">
          <FaHeartbeat className="text-red-500 text-xl" />
          <input
            type="number"
            name="heart_rate_min"
            placeholder="Heart Rate Min"
            value={filters.heart_rate_min}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Heart Rate Max Filter */}
        <div className="flex items-center gap-2">
          <FaHeartbeat className="text-red-500 text-xl" />
          <input
            type="number"
            name="heart_rate_max"
            placeholder="Heart Rate Max"
            value={filters.heart_rate_max}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Oxygen Saturation Filter */}
        <div className="flex items-center gap-2">
          <FaLungs className="text-blue-300 text-xl" />
          <input
            type="number"
            name="oxygen_saturation_min"
            placeholder="Oxygen Saturation Min"
            value={filters.oxygen_saturation_min}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Steps Filter */}
        <div className="flex items-center gap-2">
          <FaRunning className="text-green-400 text-xl" />
          <input
            type="number"
            name="steps_min"
            placeholder="Steps Min"
            value={filters.steps_min}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Sleep Hours Filter */}
        <div className="flex items-center gap-2">
          <GiSleepy className="text-purple-500 text-xl" />
          <input
            type="number"
            name="sleep_hours_min"
            placeholder="Sleep Hours Min"
            value={filters.sleep_hours_min}
            onChange={handleInputChange}
            className="p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="col-span-full md:col-span-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Search
        </button>
      </form>

      {/* Soldiers List */}
      {loading ? (
        <div className="text-center text-gray-300">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {soldiers.map((soldier) => (
            <SoldierCard key={soldier._id} soldier={soldier} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
