// Crop Data with Advanced Fertilizer Info
const crops = [
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

// Logic
function getRecommendations(data) {
    return crops.map(crop => {
        let score = 0;
        const matchedFactors = [];

        // Check season
        if (crop.seasons.includes(data.season)) {
            score += 30;
            matchedFactors.push('Ideal Season');
        }

        // Check soil type
        if (crop.soilTypes.includes(data.soilType)) {
            score += 30;
            matchedFactors.push('Perfect Soil');
        }

        // Check rainfall
        const [minRain, maxRain] = crop.rainfallRange;
        if (data.rainfall >= minRain && data.rainfall <= maxRain) {
            score += 20;
            matchedFactors.push('Optimal Moisture');
        } else if (data.rainfall >= minRain * 0.7 && data.rainfall <= maxRain * 1.3) {
            score += 10;
            matchedFactors.push('Adequate Moisture');
        }

        // Check temperature
        const [minTemp, maxTemp] = crop.tempRange;
        if (data.temperature >= minTemp && data.temperature <= maxTemp) {
            score += 20;
            matchedFactors.push('Favorable Climate');
        }

        return {
            crop,
            score,
            matchedFactors
        };
    })
        .filter(res => res.score > 40)
        .sort((a, b) => b.score - a.score);
}

// DOM Elements
const advisorForm = document.getElementById('advisor-form');
const resultsArea = document.getElementById('results-area');
const resultsGrid = document.getElementById('results-grid');
const resetBtn = document.getElementById('reset-btn');
const weatherDashboard = document.getElementById('weather-dashboard');
const tickerContent = document.getElementById('ticker-content');
const themeToggle = document.getElementById('theme-toggle');
const fertilizerSection = document.getElementById('fertilizer-section');
const soilDashboard = document.getElementById('soil-dashboard');
const calendarModal = document.getElementById('calendar-modal');
const calendarContent = document.getElementById('calendar-content');
const modalTitle = document.getElementById('modal-title');
const closeModalBtn = document.querySelector('.close-modal');
// Global State
let map;
let currentMarker;

// Initialize Map
function initMap() {
    map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setMarker(lat, lng);
        updateWeatherForLocation(lat, lng);
        updateSoilData(lat, lng);
    });
}

function setMarker(lat, lng) {
    if (currentMarker) map.removeLayer(currentMarker);
    currentMarker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 8);
}

// Weather Service Simulation
async function updateWeatherForLocation(lat, lng) {
    weatherDashboard.innerHTML = `
        <div class="weather-loading">
            <div class="spinner"></div>
            <p>Analyzing climate at ${lat.toFixed(2)}, ${lng.toFixed(2)}...</p>
        </div>
    `;

    setTimeout(() => {
        const temp = Math.floor(20 + (Math.sin(lat) * 15));
        const rainfall = Math.floor(500 + (Math.cos(lng) * 1500));
        const season = temp > 25 ? 'Kharif' : 'Rabi';

        document.getElementById('temperature').value = temp;
        document.getElementById('rainfall').value = rainfall;
        document.getElementById('season').value = season;

        weatherDashboard.innerHTML = `
            <div class="weather-content fade-in-up">
                <div class="weather-info">
                    <h4>Temperature</h4>
                    <div class="weather-temp">${temp}°C</div>
                </div>
                <div class="weather-info">
                    <h4>Est. Rainfall</h4>
                    <div class="weather-temp">${rainfall}mm</div>
                </div>
                <div class="weather-info">
                    <h4>Season</h4>
                    <div class="weather-temp">${season}</div>
                </div>
            </div>
        `;
    }, 1500);
}

// Soil Data Simulation
function updateSoilData(lat, lng) {
    soilDashboard.innerHTML = `
        <div class="weather-loading">
            <div class="spinner"></div>
            <p>Analyzing soil composition...</p>
        </div>
    `;

    setTimeout(() => {
        const n = Math.floor(40 + (Math.abs(Math.sin(lat * 10)) * 60));
        const p = Math.floor(20 + (Math.abs(Math.cos(lng * 10)) * 50));
        const k = Math.floor(30 + (Math.abs(Math.sin((lat + lng) * 5)) * 40));
        const ph = (5.5 + (Math.abs(Math.cos(lat)) * 2.5)).toFixed(1);

        soilDashboard.innerHTML = `
            <div class="weather-content fade-in-up">
                <div class="soil-stats">
                    <div class="soil-item">
                        <span class="soil-label">Nitrogen (N)</span>
                        <div class="soil-bar-container"><div class="soil-bar" style="width: ${n}%"></div></div>
                        <span class="soil-value">${n} mg/kg</span>
                    </div>
                    <div class="soil-item">
                        <span class="soil-label">Phosphorus (P)</span>
                        <div class="soil-bar-container"><div class="soil-bar" style="width: ${p}%"></div></div>
                        <span class="soil-value">${p} mg/kg</span>
                    </div>
                    <div class="soil-item">
                        <span class="soil-label">Potassium (K)</span>
                        <div class="soil-bar-container"><div class="soil-bar" style="width: ${k}%"></div></div>
                        <span class="soil-value">${k} mg/kg</span>
                    </div>
                    <div class="soil-item">
                        <span class="soil-label">Soil pH</span>
                        <div class="soil-bar-container"><div class="soil-bar" style="width: ${(ph / 10) * 100}%"></div></div>
                        <span class="soil-value">${ph} pH</span>
                    </div>
                </div>
            </div>
        `;

        // Update form soil type based on pH as a hint
        const soilType = ph < 6.5 ? 'Laterite' : ph > 7.5 ? 'Black' : 'Alluvial';
        document.getElementById('soilType').value = soilType;
    }, 1800);
}

function initTicker() {
    const marketData = [
        { crop: 'Rice', price: '₹2,100', change: '+2.5%', up: true },
        { crop: 'Wheat', price: '₹2,275', change: '-1.2%', up: false },
        { crop: 'Cotton', price: '₹6,400', change: '+0.8%', up: true },
        { crop: 'Sugarcane', price: '₹315', change: '0.0%', up: true },
        { crop: 'Maize', price: '₹1,950', change: '-3.1%', up: false }
    ];

    tickerContent.innerHTML = marketData.map(item => `
        <span class="ticker-item">
            ${item.crop}: ${item.price} 
            <span class="ticker-price ${item.up ? 'up' : 'down'}">${item.change}</span>
        </span>
    `).join('').repeat(10); // Dynamic repeat for continuous scrolling
}

// Theme Toggle System
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });
}

function updateThemeIcons(theme) {
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    if (theme === 'dark') {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

// Reveal on Scroll System
function initReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section, .glass, .hero-text').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// 3D Card Tilt Effect
function initTilt() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.crop-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            } else {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            }
        });
    });
}

// Fertilizer Advisor Logic
function showFertilizers(cropId) {
    const crop = crops.find(c => c.id === cropId);
    if (!crop) return;

    fertilizerSection.classList.remove('hidden');
    fertilizerContent.innerHTML = `
        <div class="fertilizer-grid fade-in-up">
            ${crop.fertilizers.map(f => `
                <div class="fertilizer-card">
                    <h4>${f.name}</h4>
                    <p><strong>Dosage:</strong> ${f.dosage}</p>
                    <p><strong>Stage:</strong> ${f.stage}</p>
                </div>
            `).join('')}
        </div>
    `;
    fertilizerSection.scrollIntoView({ behavior: 'smooth' });
}

// Planting Calendar Modal Logic
function showCalendar(cropId) {
    const crop = crops.find(c => c.id === cropId);
    if (!crop) return;

    modalTitle.textContent = `${crop.name} - Planting Calendar`;
    calendarContent.innerHTML = `
        <div class="calendar-timeline">
            ${crop.calendar.map(item => `
                <div class="timeline-item fade-in-up">
                    <div class="timeline-month">${item.month}</div>
                    <div class="timeline-task">${item.task}</div>
                </div>
            `).join('')}
        </div>
    `;
    calendarModal.classList.add('active');
}

function closeModal() {
    calendarModal.classList.remove('active');
}

closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === calendarModal) closeModal();
});

// Initialize on load
window.addEventListener('load', () => {
    initMap();
    initTicker();
    initTheme();
    initReveals();
    initTilt();
});

// Interaction
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

advisorForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        season: document.getElementById('season').value,
        soilType: document.getElementById('soilType').value,
        rainfall: parseFloat(document.getElementById('rainfall').value),
        temperature: parseFloat(document.getElementById('temperature').value),
        landSize: parseFloat(document.getElementById('landSize').value || 1.0)
    };

    const results = getRecommendations(formData);
    renderResults(results, formData.landSize);

    resultsArea.classList.remove('hidden');
    resultsArea.scrollIntoView({ behavior: 'smooth' });
});

resetBtn.addEventListener('click', () => {
    advisorForm.reset();
    resultsArea.classList.add('hidden');
    scrollToSection('advisor-section');
});

function renderResults(results, landSize = 1.0) {
    if (results.length === 0) {
        resultsGrid.innerHTML = `
            <div class="glass" style="grid-column: 1/-1; padding: 60px; text-align: center;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4a373" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <h3>No perfect matches found</h3>
                <p>Try adjusting your field parameters or exploring hybrid varieties.</p>
            </div>
        `;
        return;
    }

    resultsGrid.innerHTML = results.map((res, index) => {
        const estYield = (res.crop.yieldPerAcre * landSize * (res.score / 100)).toFixed(1);

        return `
            <div class="crop-card glass fade-in-up" style="animation-delay: ${index * 0.1}s">
                <div class="crop-image">
                    <img src="${res.crop.image}" alt="${res.crop.name}">
                    <div class="match-badge">${res.score}% Match</div>
                </div>
                <div class="crop-info">
                    <div class="crop-title">
                        <div class="crop-name">
                            <h3>${res.crop.name}</h3>
                            <div class="scientific">${res.crop.scientificName}</div>
                        </div>
                    </div>
                    <p class="crop-desc">${res.crop.description}</p>
                    
                    <div class="yield-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        Est. Yield: ${estYield} Tons
                    </div>

                    <div class="crop-meta" style="margin-top: 16px;">
                        <div class="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                            <span><strong>Duration:</strong> ${res.crop.duration}</span>
                        </div>
                        <div class="meta-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                            <div class="nutrients">
                                <span class="nutrient-tag">N: ${res.crop.nutrients.N}</span>
                                <span class="nutrient-tag">P: ${res.crop.nutrients.P}</span>
                                <span class="nutrient-tag">K: ${res.crop.nutrients.K}</span>
                            </div>
                        </div>
                    </div>
                    <div class="factor-tags">
                        ${res.matchedFactors.map(f => `<span class="factor-tag">${f}</span>`).join('')}
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 16px;">
                        <button class="btn btn-outline" style="padding: 10px; font-size: 14px;" onclick="showFertilizers('${res.crop.id}')">Nutrients</button>
                        <button class="btn btn-primary" style="padding: 10px; font-size: 14px;" onclick="showCalendar('${res.crop.id}')">Calendar</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

