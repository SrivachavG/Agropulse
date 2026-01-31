/**
 * Service to handle weather-related data and simulations.
 */
export const weatherService = {
    async getWeather(lat, lng) {
        // Simulation delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const temp = Math.floor(20 + (Math.sin(lat) * 15));
        const rainfall = Math.floor(500 + (Math.cos(lng) * 1500));
        const season = temp > 25 ? 'Kharif' : 'Rabi';

        return { temp, rainfall, season, lat, lng };
    }
};

/**
 * Service to handle soil-related data and simulations.
 */
export const soilService = {
    async getSoilData(lat, lng) {
        // Simulation delay
        await new Promise(resolve => setTimeout(resolve, 1800));

        const n = Math.floor(40 + (Math.abs(Math.sin(lat * 10)) * 60));
        const p = Math.floor(20 + (Math.abs(Math.cos(lng * 10)) * 50));
        const k = Math.floor(30 + (Math.abs(Math.sin((lat + lng) * 5)) * 40));
        const ph = (5.5 + (Math.abs(Math.cos(lat)) * 2.5)).toFixed(1);

        const type = ph < 6.5 ? 'Laterite' : ph > 7.5 ? 'Black' : 'Alluvial';

        return { n, p, k, ph, type };
    }
};

/**
 * Service to handle satellite-related data and simulations.
 */
export const satelliteService = {
    async getNDVI() {
        return (Math.random() * (0.85 - 0.4) + 0.4).toFixed(2);
    }
};
