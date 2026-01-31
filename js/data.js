export const crops = [
    {
        id: 'rice',
        name: 'Rice',
        scientificName: 'Oryza sativa',
        description: 'A staple grain that requires high water levels and warm temperatures. Thrives in flooded conditions.',
        seasons: ['Kharif'],
        soilTypes: ['Alluvial', 'Clayey'],
        rainfallRange: [1000, 2500],
        tempRange: [20, 35],
        nutrients: { N: 'High', P: 'Medium', K: 'Medium' },
        yieldPerAcre: 1.8, // Tons
        waterFactor: 1500, // liters per sq meter
        fertilizers: [
            { name: 'Urea', dosage: '100kg/acre', stage: 'Basal & Top dressing' },
            { name: 'DAP', dosage: '50kg/acre', stage: 'Sowing' },
            { name: 'MOP', dosage: '40kg/acre', stage: 'Vegetative' }
        ],
        calendar: [
            { month: 'June', task: 'Nursery preparation & Sowing' },
            { month: 'July', task: 'Transplanting to main field' },
            { month: 'August', task: 'Weeding & Fertilization' },
            { month: 'September', task: 'Irrigation management' },
            { month: 'October', task: 'Harvesting & Threshing' }
        ],
        duration: '120-150 days',
        image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=800'
    },
    {
        id: 'wheat',
        name: 'Wheat',
        scientificName: 'Triticum aestivum',
        description: 'Cool climate crop grown during winter, requires moderate moisture and well-drained soil.',
        seasons: ['Rabi'],
        soilTypes: ['Alluvial', 'Loamy'],
        rainfallRange: [500, 1000],
        tempRange: [10, 25],
        nutrients: { N: 'Medium', P: 'High', K: 'Medium' },
        yieldPerAcre: 1.5,
        waterFactor: 600,
        fertilizers: [
            { name: 'NPK 12:32:16', dosage: '75kg/acre', stage: 'Sowing' },
            { name: 'Urea', dosage: '80kg/acre', stage: 'Tillering' }
        ],
        calendar: [
            { month: 'November', task: 'Land preparation & Sowing' },
            { month: 'December', task: 'First Irrigation (CRI stage)' },
            { month: 'January', task: 'Top dressing with Urea' },
            { month: 'February', task: 'Weather monitoring' },
            { month: 'March', task: 'Harvesting' }
        ],
        duration: '110-130 days',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=800'
    },
    {
        id: 'maize',
        name: 'Maize (Corn)',
        scientificName: 'Zea mays',
        description: 'Versatile crop used for food, fodder, and industry. Prefers sunny days and moderate rain.',
        seasons: ['Kharif', 'Zaid'],
        soilTypes: ['Alluvial', 'Red', 'Loamy'],
        rainfallRange: [600, 1200],
        tempRange: [18, 27],
        nutrients: { N: 'High', P: 'Medium', K: 'Low' },
        yieldPerAcre: 2.2,
        waterFactor: 800,
        fertilizers: [
            { name: 'Ammonium Sulfate', dosage: '60kg/acre', stage: 'Knee-high' },
            { name: 'Super Phosphate', dosage: '40kg/acre', stage: 'Basal' }
        ],
        calendar: [
            { month: 'June', task: 'Sowing' },
            { month: 'July', task: 'Thinning & Weeding' },
            { month: 'August', task: 'Fertilization (Knee-high)' },
            { month: 'September', task: 'Harvesting' }
        ],
        duration: '90-110 days',
        image: 'https://images.unsplash.com/photo-1551739440-5dd934d3a94a?q=80&w=800'
    },
    {
        id: 'cotton',
        name: 'Cotton',
        scientificName: 'Gossypium',
        description: 'White gold of agriculture. Requires long frost-free periods and moderate rainfall.',
        seasons: ['Kharif'],
        soilTypes: ['Black', 'Alluvial'],
        rainfallRange: [500, 1000],
        tempRange: [21, 30],
        nutrients: { N: 'Medium', P: 'Medium', K: 'High' },
        yieldPerAcre: 0.8,
        waterFactor: 900,
        fertilizers: [
            { name: 'CAN', dosage: '50kg/acre', stage: 'Square formation' },
            { name: 'SSP', dosage: '100kg/acre', stage: 'Basal' }
        ],
        calendar: [
            { month: 'May', task: 'Sowing' },
            { month: 'July', task: 'Square formation management' },
            { month: 'September', task: 'Boll development' },
            { month: 'November', task: 'Picking starts' }
        ],
        duration: '160-180 days',
        image: 'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=800'
    },
    {
        id: 'sugarcane',
        name: 'Sugarcane',
        scientificName: 'Saccharum officinarum',
        description: 'A long-duration cash crop that needs abundant water and hot, humid conditions.',
        seasons: ['Kharif', 'Rabi'],
        soilTypes: ['Alluvial', 'Black', 'Red'],
        rainfallRange: [1500, 2500],
        tempRange: [20, 32],
        nutrients: { N: 'High', P: 'High', K: 'High' },
        yieldPerAcre: 35.0,
        waterFactor: 2500,
        fertilizers: [
            { name: 'Bio-compost', dosage: '5 tons/acre', stage: 'Land prep' },
            { name: 'MOP', dosage: '60kg/acre', stage: '3 months' }
        ],
        calendar: [
            { month: 'January', task: 'Planting sets' },
            { month: 'April', task: 'Earthing up' },
            { month: 'August', task: 'Propping' },
            { month: 'December', task: 'Harvesting' }
        ],
        duration: '300-360 days',
        image: 'https://images.unsplash.com/photo-1590240974526-77893f49ebcb?q=80&w=800'
    },
    {
        id: 'millet',
        name: 'Millet',
        scientificName: 'Pennisetum glaucum',
        description: 'Incredibly hardy crop that survives in poor soil and extreme heat with very little water.',
        seasons: ['Kharif', 'Zaid'],
        soilTypes: ['Red', 'Laterite', 'Loamy'],
        rainfallRange: [300, 600],
        tempRange: [25, 40],
        nutrients: { N: 'Low', P: 'Low', K: 'Medium' },
        yieldPerAcre: 0.6,
        waterFactor: 400,
        fertilizers: [
            { name: 'Organic Manure', dosage: '2 tons/acre', stage: 'Basal' },
            { name: 'Azospirillum', dosage: '2kg/acre', stage: 'Seed treatment' }
        ],
        calendar: [
            { month: 'July', task: 'Sowing' },
            { month: 'August', task: 'Inter-cultivation' },
            { month: 'September', task: 'Harvesting' }
        ],
        duration: '70-90 days',
        image: 'https://images.unsplash.com/photo-1593121925328-369ec8459c08?q=80&w=800'
    }
];

export const diseases = [
    {
        name: 'Rice Blast',
        symptoms: ['yellow_spots', 'wilting'],
        description: 'A serious fungal disease causing leaf spots and neck rot.',
        treatment: {
            organic: 'Apply Neem oil spray or Pseudomonas fluorescens.',
            chemical: 'Spray Tricyclazole 75 WP @ 0.6 g/l.'
        }
    },
    {
        name: 'Wheat Rust',
        symptoms: ['brown_edges', 'yellow_spots'],
        description: 'Fungal disease that produces reddish-brown spores on leaves and stems.',
        treatment: {
            organic: 'Use resistant varieties and crop rotation.',
            chemical: 'Spray Propiconazole 25 EC @ 1 ml/l.'
        }
    },
    {
        name: 'Root Rot',
        symptoms: ['root_rot', 'wilting', 'stunted_growth'],
        description: 'Caused by overwatering and soil fungi, leads to decaying roots.',
        treatment: {
            organic: 'Improve drainage and apply Trichoderma viride.',
            chemical: 'Soil drenching with Carbendazim @ 1 g/l.'
        }
    },
    {
        name: 'Downy Mildew',
        symptoms: ['white_mould', 'yellow_spots'],
        description: 'Fungal infection appearing as white fluffy growth on leaf undersides.',
        treatment: {
            organic: 'Increase air circulation and use Copper Oxychloride.',
            chemical: 'Spray Metalaxyl-M @ 2 g/l.'
        }
    }
];

export const animals = [
    {
        type: 'Cattle',
        id: 'cattle-1',
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21h4c1.1 0 2-.9 2-2v-4.5c0-.6-.2-1.1-.6-1.5-.4-.4-.9-.6-1.5-.6H12v8.6Z"/><path d="M12 21H8c-1.1 0-2-.9-2-2v-4.5c0-.6.2-1.1.6-1.5.4-.4.9-.6 1.5-.6H12v8.6Z"/><path d="M12 12V4a2 2 0 0 0-4 0v8"/><path d="M12 4a2 2 0 0 1 4 0v8"/></svg>',
        heartRate: 65,
        temp: '38.5°C',
        status: 'Healthy',
        location: 'North Pasture'
    },
    {
        type: 'Sheep',
        id: 'sheep-1',
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="7" r="4"/><path d="M9 11v10"/><path d="M9 15H5c-1.1 0-2-.9-2-2v-1.5c0-.6.2-1.1.6-1.5.4-.4.9-.6 1.5-.6h11.8c.6 0 1.1.2 1.5.6.4.4.6.9.6 1.5V13c0 1.1-.9 2-2 2h-4"/></svg>',
        heartRate: 75,
        temp: '39.1°C',
        status: 'Active',
        location: 'West Ridge'
    },
    {
        type: 'Poultry',
        id: 'poultry-1',
        icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22v-4"/><path d="M9 18h6"/><path d="M12 14v-2"/><path d="M12 10V6a2 2 0 0 0-4 0v4"/><path d="M12 6a2 2 0 0 1 4 0v4"/></svg>',
        heartRate: 250,
        temp: '41.2°C',
        status: 'Stress-Free',
        location: 'Coop A'
    }
];
