import { crops, diseases, animals } from './js/data.js';
import { weatherService, soilService, satelliteService } from './js/services.js';

/**
 * Global State
 */
let map;
let currentMarker;

/**
 * DOM Elements
 */
const elements = {
    advisorForm: document.getElementById('advisor-form'),
    resultsArea: document.getElementById('results-area'),
    resultsGrid: document.getElementById('results-grid'),
    resetBtn: document.getElementById('reset-btn'),
    weatherDashboard: document.getElementById('weather-dashboard'),
    tickerContent: document.getElementById('ticker-content'),
    themeToggle: document.getElementById('theme-toggle'),
    fertilizerSection: document.getElementById('fertilizer-section'),
    fertilizerContent: document.getElementById('fertilizer-content'),
    soilDashboard: document.getElementById('soil-dashboard'),
    calendarModal: document.getElementById('calendar-modal'),
    calendarContent: document.getElementById('calendar-content'),
    modalTitle: document.getElementById('modal-title'),
    closeModalBtns: document.querySelectorAll('.close-modal'),
    yieldModal: document.getElementById('yield-modal'),
    yieldContent: document.getElementById('yield-content'),
    yieldModalTitle: document.getElementById('yield-modal-title'),
    diagnosisResult: document.getElementById('diagnosis-result'),
    livestockGrid: document.getElementById('livestock-grid'),
    ndviVal: document.getElementById('ndvi-val'),
    satStatus: document.getElementById('sat-status'),
    menuToggle: document.getElementById('menu-toggle'),
    navLinks: document.getElementById('nav-links'),
    communityGrid: document.getElementById('community-grid'),
    diagnoseBtn: document.getElementById('diagnose-btn'),
    livestockModal: document.getElementById('livestock-modal'),
    livestockModalContent: document.getElementById('livestock-modal-content')
};

/**
 * Initialization
 */
// Global helpers for inline onclicks
window.scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        if (elements.navLinks) elements.navLinks.classList.remove('active');
        if (elements.menuToggle) elements.menuToggle.classList.remove('active');
    }
};
window.showFertilizers = showFertilizers;
window.showCalendar = showCalendar;
window.showYieldAnalytics = showYieldAnalytics;
window.toggleDiagnosticMode = toggleDiagnosticMode;
window.showLivestockDetail = showLivestockDetail;

/**
 * Initialization
 */
function init() {
    initMap();
    initTicker();
    initTheme();
    initReveals();
    initTilt();
    setupDiagnostics();
    initLivestock();
    initCustomCursor();
    initMagneticButtons();
    initScrollProgress();
    initMarketPredictor();
    initMobileMenu();
    initCommunityHub();
}

/**
 * Map Logic
 */
function initMap() {
    if (!document.getElementById('map')) return;
    map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        setMarker(lat, lng);
        handleLocationChange(lat, lng);
    });
}

function setMarker(lat, lng) {
    if (currentMarker) map.removeLayer(currentMarker);
    currentMarker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 8);
}

async function handleLocationChange(lat, lng) {
    // Update Weather
    elements.weatherDashboard.innerHTML = `
        <div class="weather-loading">
            <div class="spinner"></div>
            <p>Analyzing climate at ${lat.toFixed(2)}, ${lng.toFixed(2)}...</p>
        </div>
    `;

    const weather = await weatherService.getWeather(lat, lng);
    document.getElementById('temperature').value = weather.temp;
    document.getElementById('rainfall').value = weather.rainfall;
    document.getElementById('season').value = weather.season;

    elements.weatherDashboard.innerHTML = `
        <div class="weather-content fade-in-up">
            <div class="weather-info">
                <h4>Temperature</h4>
                <div class="weather-temp">${weather.temp}°C</div>
            </div>
            <div class="weather-info">
                <h4>Est. Rainfall</h4>
                <div class="weather-temp">${weather.rainfall}mm</div>
            </div>
            <div class="weather-info">
                <h4>Season</h4>
                <div class="weather-temp">${weather.season}</div>
            </div>
        </div>
    `;

    // Update Soil
    elements.soilDashboard.innerHTML = `
        <div class="weather-loading">
            <div class="spinner"></div>
            <p>Analyzing soil composition...</p>
        </div>
    `;

    const soil = await soilService.getSoilData(lat, lng);
    elements.soilDashboard.innerHTML = `
        <div class="weather-content fade-in-up">
            <div class="soil-stats">
                <div class="soil-item">
                    <span class="soil-label">Nitrogen (N)</span>
                    <div class="soil-bar-container"><div class="soil-bar" style="width: ${soil.n}%"></div></div>
                    <span class="soil-value">${soil.n} mg/kg</span>
                </div>
                <div class="soil-item">
                    <span class="soil-label">Phosphorus (P)</span>
                    <div class="soil-bar-container"><div class="soil-bar" style="width: ${soil.p}%"></div></div>
                    <span class="soil-value">${soil.p} mg/kg</span>
                </div>
                <div class="soil-item">
                    <span class="soil-label">Potassium (K)</span>
                    <div class="soil-bar-container"><div class="soil-bar" style="width: ${soil.k}%"></div></div>
                    <span class="soil-value">${soil.k} mg/kg</span>
                </div>
                <div class="soil-item">
                    <span class="soil-label">Soil pH</span>
                    <div class="soil-bar-container"><div class="soil-bar" style="width: ${(soil.ph / 10) * 100}%"></div></div>
                    <span class="soil-value">${soil.ph} pH</span>
                </div>
            </div>
        </div>
    `;
    document.getElementById('soilType').value = soil.type;

    // Update Satellite
    updateSatInsights();
}

/**
 * UI State Logic
 */
function initMobileMenu() {
    elements.menuToggle.addEventListener('click', () => {
        elements.menuToggle.classList.toggle('active');
        elements.navLinks.classList.toggle('active');
    });

    // Close menu on link click
    elements.navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            elements.menuToggle.classList.remove('active');
            elements.navLinks.classList.remove('active');
        });
    });
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);

    elements.themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
    });
}

function updateThemeIcons(theme) {
    const sunIcon = elements.themeToggle.querySelector('.sun-icon');
    const moonIcon = elements.themeToggle.querySelector('.moon-icon');
    if (theme === 'dark') {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    }
}

/**
 * Data Rendering
 */
function initTicker() {
    const marketData = [
        { crop: 'Rice', price: '₹2,100', change: '+2.5%', up: true },
        { crop: 'Wheat', price: '₹2,275', change: '-1.2%', up: false },
        { crop: 'Cotton', price: '₹6,400', change: '+0.8%', up: true },
        { crop: 'Sugarcane', price: '₹315', change: '0.0%', up: true },
        { crop: 'Maize', price: '₹1,950', change: '-3.1%', up: false }
    ];

    elements.tickerContent.innerHTML = marketData.map(item => `
        <span class="ticker-item">
            ${item.crop}: ${item.price} 
            <span class="ticker-price ${item.up ? 'up' : 'down'}">${item.change}</span>
        </span>
    `).join('').repeat(10);
}

function initLivestock() {
    if (!elements.livestockGrid) return;
    elements.livestockGrid.innerHTML = animals.map((animal, index) => `
        <div class="livestock-card glass fade-in-up" style="animation-delay: ${index * 0.1}s" onclick="showLivestockDetail('${animal.id}')">
            <div class="animal-header">
                <div class="animal-icon">${animal.icon}</div>
                <span class="badge ${animal.status === 'Healthy' ? '' : 'badge-warning'}">${animal.status}</span>
            </div>
            <div class="animal-info">
                <h3>${animal.type} #${index + 1}</h3>
                <p style="font-size: 12px; opacity: 0.7;">${animal.location}</p>
            </div>
            <div class="health-metrics">
                <div class="metric-item">
                    <div class="metric-label">Heart Rate</div>
                    <div class="metric-value">${animal.heartRate} BPM</div>
                </div>
                <div class="metric-item">
                    <div class="metric-label">Body Temp</div>
                    <div class="metric-value">${animal.temp}</div>
                </div>
            </div>
        </div>
    `).join('');


    // Simulate real-time updates
    setInterval(() => {
        const items = document.querySelectorAll('.metric-value');
        items.forEach(item => {
            if (item.textContent.includes('BPM')) {
                const current = parseInt(item.textContent);
                item.textContent = `${current + Math.floor(Math.random() * 3 - 1)} BPM`;
            }
        });
    }, 3000);
}

function initCommunityHub() {
    const communityData = [
        { name: 'Raj Kumar', location: 'Punjab', report: 'Bumper wheat harvest expected this year thanks to optimized irrigation!', img: 'https://i.pravatar.cc/150?u=raj' },
        { name: 'Sarah Devi', location: 'Andhra Pradesh', report: 'The Rice Blast warning saved my crop. Fast diagnosis is key.', img: 'https://i.pravatar.cc/150?u=sarah' },
        { name: 'Amit Singh', location: 'Maharashtra', report: 'Using satellite NDVI data has changed how I manage fertilization.', img: 'https://i.pravatar.cc/150?u=amit' }
    ];

    if (!elements.communityGrid) return;
    elements.communityGrid.innerHTML = communityData.map((post, index) => `
        <div class="community-card glass fade-in-up" style="animation-delay: ${index * 0.1}s">
            <p>${post.report}</p>
            <div class="report-author">
                <img src="${post.img}" alt="${post.name}" class="author-img">
                <div class="author-info">
                    <h4>${post.name}</h4>
                    <p>${post.location}</p>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Advisor Logic
 */
elements.advisorForm.addEventListener('submit', (e) => {
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

    elements.resultsArea.classList.remove('hidden');
    elements.resultsArea.scrollIntoView({ behavior: 'smooth' });
});

elements.resetBtn?.addEventListener('click', () => {
    elements.advisorForm.reset();
    elements.resultsArea.classList.add('hidden');
    window.scrollToSection('advisor-section');
});

function getRecommendations(data) {
    return crops.map(crop => {
        let score = 0;
        const matchedFactors = [];

        if (crop.seasons.includes(data.season)) {
            score += 30;
            matchedFactors.push('Ideal Season');
        }
        if (crop.soilTypes.includes(data.soilType)) {
            score += 30;
            matchedFactors.push('Perfect Soil');
        }
        const [minRain, maxRain] = crop.rainfallRange;
        if (data.rainfall >= minRain && data.rainfall <= maxRain) {
            score += 20;
            matchedFactors.push('Optimal Moisture');
        } else if (data.rainfall >= minRain * 0.7 && data.rainfall <= maxRain * 1.3) {
            score += 10;
            matchedFactors.push('Adequate Moisture');
        }
        const [minTemp, maxTemp] = crop.tempRange;
        if (data.temperature >= minTemp && data.temperature <= maxTemp) {
            score += 20;
            matchedFactors.push('Favorable Climate');
        }

        return { crop, score, matchedFactors };
    })
        .filter(res => res.score > 40)
        .sort((a, b) => b.score - a.score);
}

function renderResults(results, landSize = 1.0) {
    if (results.length === 0) {
        elements.resultsGrid.innerHTML = `
            <div class="glass" style="grid-column: 1/-1; padding: 60px; text-align: center;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <h3>No perfect matches found</h3>
                <p>Try adjusting your field parameters or exploring hybrid varieties.</p>
            </div>
        `;
        return;
    }

    elements.resultsGrid.innerHTML = results.map((res, index) => {
        const estYield = (res.crop.yieldPerAcre * landSize * (res.score / 100)).toFixed(1);
        const rainfall = parseFloat(document.getElementById('rainfall').value) || 0;
        const waterNeeded = Math.max(0, (res.crop.waterFactor * (landSize * 4046.86) / 1000) - (rainfall * landSize * 4.04)).toFixed(0);

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
                    
                    <div class="yield-badge" style="cursor:pointer" onclick="showYieldAnalytics('${res.crop.id}', ${landSize})">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                        Est. Yield: ${estYield} Tons →
                    </div>

                    <div class="irrigation-card">
                        <div class="irrigation-header">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 16.3c2.2 0 4-1.8 4-4 0-3.3-4-8-4-8s-4 4.7-4 8c0 2.2 1.8 4 4 4z" />
                                <path d="M17 16.3c2.2 0 4-1.8 4-4 0-3.3-4-8-4-8s-4 4.7-4 8c0 2.2 1.8 4 4 4z" />
                            </svg>
                            Smart Irrigation Plan
                        </div>
                        <div class="irrigation-value">${Number(waterNeeded).toLocaleString()} L</div>
                        <p style="font-size: 11px; opacity: 0.7;">Total supplemental water for ${landSize} acres.</p>
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

/**
 * Modals & Extra Info
 */
function showFertilizers(cropId) {
    const crop = crops.find(c => c.id === cropId);
    if (!crop) return;

    elements.fertilizerSection.classList.remove('hidden');
    elements.fertilizerContent.innerHTML = `
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
    elements.fertilizerSection.scrollIntoView({ behavior: 'smooth' });
}

function showCalendar(cropId) {
    const crop = crops.find(c => c.id === cropId);
    if (!crop) return;

    elements.modalTitle.textContent = `${crop.name} - Planting Calendar`;
    elements.calendarContent.innerHTML = `
        <div class="calendar-timeline">
            ${crop.calendar.map(item => `
                <div class="timeline-item fade-in-up">
                    <div class="timeline-month">${item.month}</div>
                    <div class="timeline-task">${item.task}</div>
                </div>
            `).join('')}
        </div>
    `;
    elements.calendarModal.classList.add('active');
}

function showYieldAnalytics(cropId, landSize) {
    const crop = crops.find(c => c.id === cropId);
    if (!crop) return;

    elements.yieldModalTitle.textContent = `${crop.name} - Detailed Analytics`;
    const baseYield = crop.yieldPerAcre * landSize;
    const scenarios = {
        low: (baseYield * 0.7).toFixed(1),
        avg: (baseYield).toFixed(1),
        high: (baseYield * 1.3).toFixed(1)
    };

    elements.yieldContent.innerHTML = `
        <div class="yield-content fade-in-up">
            <div class="yield-scenario-grid">
                <div class="yield-scenario-card">
                    <div class="scenario-title">Low (Stress)</div>
                    <div class="scenario-value">${scenarios.low}</div>
                    <div class="unit">Tons</div>
                </div>
                <div class="yield-scenario-card" style="border: 2px solid var(--primary)">
                    <div class="scenario-title">Expected</div>
                    <div class="scenario-value">${scenarios.avg}</div>
                    <div class="unit">Tons</div>
                </div>
                <div class="yield-scenario-card">
                    <div class="scenario-title">High (Optimal)</div>
                    <div class="scenario-value">${scenarios.high}</div>
                    <div class="unit">Tons</div>
                </div>
            </div>
            <div class="yield-chart" id="yield-chart">
                <div class="chart-bar" style="height: 70%" data-value="${scenarios.low}">
                    <span class="chart-label">Low</span>
                </div>
                <div class="chart-bar" style="height: 100%" data-value="${scenarios.avg}">
                    <span class="chart-label">Expected</span>
                </div>
                <div class="chart-bar" style="height: 100%; opacity: 0.3" data-value="???">
                    <span class="chart-label">Potential</span>
                </div>
            </div>
        </div>
    `;
    elements.yieldModal.classList.add('active');

    setTimeout(() => {
        const bars = document.querySelectorAll('.chart-bar');
        if (bars[2]) {
            bars[2].style.height = '140%';
            bars[2].style.opacity = '1';
            bars[2].setAttribute('data-value', scenarios.high);
        }
    }, 500);
}

function showLivestockDetail(animalId) {
    const animal = animals.find(a => a.id === animalId);
    if (!animal) return;

    elements.livestockModalContent.innerHTML = `
        <div class="livestock-detail fade-in-up">
            <div class="detail-header">
                <div class="detail-icon" style="width: 80px; height: 80px; background: var(--primary-light); border-radius: 20px; display: flex; align-items: center; justify-content: center; color: var(--primary);">
                    ${animal.icon}
                </div>
                <div>
                    <h2>${animal.type} Unit</h2>
                    <p>Status: <strong style="color: var(--primary)">${animal.status}</strong></p>
                </div>
            </div>
            
            <div class="biometric-stats" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
                <div class="stat-card glass" style="padding: 20px; text-align: center;">
                    <div class="label" style="font-size: 12px; opacity: 0.6; text-transform: uppercase;">Current Heart Rate</div>
                    <div class="value" style="font-size: 32px; font-weight: 800; color: var(--primary);">${animal.heartRate} BPM</div>
                </div>
                <div class="stat-card glass" style="padding: 20px; text-align: center;">
                    <div class="label" style="font-size: 12px; opacity: 0.6; text-transform: uppercase;">Body Temperature</div>
                    <div class="value" style="font-size: 32px; font-weight: 800; color: var(--primary);">${animal.temp}</div>
                </div>
            </div>

            <div class="activity-chart glass" style="margin-top: 30px; height: 150px; display: flex; align-items: flex-end; gap: 5px; padding: 20px;">
                ${Array(20).fill(0).map(() => `
                    <div class="activity-bar" style="flex: 1; background: var(--primary); opacity: ${0.2 + Math.random() * 0.8}; height: ${40 + Math.random() * 60}%"></div>
                `).join('')}
            </div>
            <p style="text-align: center; font-size: 12px; opacity: 0.5; margin-top: 10px;">24h Biometric activity trend</p>
        </div>
    `;
    elements.livestockModal.classList.add('active');
}

/**
 * Diagnostics Logic
 */
function setupDiagnostics() {
    elements.diagnoseBtn?.addEventListener('click', () => runDiagnosis());

    const leafUpload = document.getElementById('leaf-upload');
    const startScanBtn = document.getElementById('start-scan-btn');
    const scanPreview = document.getElementById('scan-preview');
    const previewPlaceholder = document.querySelector('.preview-placeholder');
    const scannerBox = document.querySelector('.scanner-box');

    leafUpload?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                scanPreview.src = event.target.result;
                scanPreview.classList.remove('hidden');
                previewPlaceholder.classList.add('hidden');
                startScanBtn.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        }
    });

    startScanBtn?.addEventListener('click', () => {
        startScanBtn.disabled = true;
        startScanBtn.textContent = 'AI Analyzing...';
        scannerBox.classList.add('scanning');

        setTimeout(() => {
            scannerBox.classList.remove('scanning');
            startScanBtn.disabled = false;
            startScanBtn.textContent = 'Start AI Scan';
            const possibleSymptoms = ['yellow_spots', 'wilting', 'holes_in_leaves', 'white_mould'];
            const randomSymptoms = possibleSymptoms.sort(() => 0.5 - Math.random()).slice(0, 2);
            runDiagnosis(randomSymptoms);
        }, 3000);
    });
}

function runDiagnosis(predefinedSymptoms = null) {
    const checkedSymptoms = predefinedSymptoms ||
        Array.from(document.querySelectorAll('.symptom-tag input:checked')).map(input => input.value);

    if (checkedSymptoms.length === 0) {
        elements.diagnosisResult.innerHTML = `
            <div class="empty-state">
                <p>Please select at least one symptom.</p>
            </div>
        `;
        return;
    }

    elements.diagnosisResult.innerHTML = `
        <div class="weather-loading">
            <div class="spinner"></div>
            <p>Analyzing symptoms with AI...</p>
        </div>
    `;

    setTimeout(() => {
        let bestMatch = null;
        let maxOverlap = 0;

        diseases.forEach(disease => {
            const overlap = disease.symptoms.filter(s => checkedSymptoms.includes(s)).length;
            if (overlap > maxOverlap) {
                maxOverlap = overlap;
                bestMatch = disease;
            }
        });

        if (!bestMatch || maxOverlap === 0) {
            elements.diagnosisResult.innerHTML = `
                <div class="empty-state">
                    <h3>No direct match found</h3>
                    <p>Symptoms don't clearly match our database. Please consult a local expert.</p>
                </div>
            `;
            return;
        }

        renderDiagnosis(bestMatch);
    }, 1500);
}

function renderDiagnosis(disease) {
    elements.diagnosisResult.innerHTML = `
        <div class="diagnosis-card fade-in-up">
            <div class="disease-header">
                <div class="disease-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                </div>
                <div class="disease-title">
                    <h3>${disease.name}</h3>
                    <span class="badge">Condition Detected</span>
                </div>
            </div>
            <p>${disease.description}</p>
            <div class="treatment-plan">
                <h4>Recommended Management Plan</h4>
                <div class="treatment-list">
                    <div class="treatment-item">
                        <h4>Organic Solution</h4>
                        <div class="timeline-task">${disease.treatment.organic}</div>
                    </div>
                    <div class="treatment-item">
                        <h4>Chemical Control</h4>
                        <div class="timeline-task" style="background: rgba(239, 68, 68, 0.1)">${disease.treatment.chemical}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function toggleDiagnosticMode(mode) {
    const manualBtn = document.querySelector('[onclick="toggleDiagnosticMode(\'manual\')"]');
    const scanBtn = document.querySelector('[onclick="toggleDiagnosticMode(\'scan\')"]');
    const manualDiv = document.getElementById('manual-diagnosis');
    const scanDiv = document.getElementById('scan-diagnosis');

    if (mode === 'manual') {
        manualBtn?.classList.add('active');
        scanBtn?.classList.remove('active');
        manualDiv?.classList.remove('hidden');
        scanDiv?.classList.add('hidden');
    } else {
        manualBtn?.classList.remove('active');
        scanBtn?.classList.add('active');
        manualDiv?.classList.add('hidden');
        scanDiv?.classList.remove('hidden');
    }
}

/**
 * Extras
 */
function initMarketPredictor() {
    const grid = document.getElementById('prediction-grid');
    if (!grid) return;
    const marketData = [
        { crop: 'Rice', current: '$420/t', trend: 'up', prediction: '+5.2%' },
        { crop: 'Wheat', current: '$280/t', trend: 'down', prediction: '-2.1%' },
        { crop: 'Maize', current: '$190/t', trend: 'up', prediction: '+1.8%' },
        { crop: 'Cotton', current: '$1.2/kg', trend: 'up', prediction: '+8.5%' }
    ];
    grid.innerHTML = marketData.map((item, index) => `
        <div class="prediction-card glass fade-in-up" style="animation-delay: ${index * 0.1}s">
            <div style="font-size: 14px; opacity: 0.6; font-weight: 600;">${item.crop} Futures</div>
            <div style="font-size: 24px; font-weight: 800; margin-top: 4px;">${item.current}</div>
            <div class="trend-indicator ${item.trend === 'up' ? 'bullish' : 'bearish'}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                    <path d="${item.trend === 'up' ? 'M5 12l7-7 7 7' : 'M19 12l-7 7-7-7'}" />
                    <path d="${item.trend === 'up' ? 'M12 19V5' : 'M12 5v14'}" />
                </svg>
                <span>${item.prediction} Target</span>
            </div>
            <div class="mini-chart">
                ${Array(7).fill(0).map(() => `<div class="bar-sm" style="height: ${30 + Math.random() * 70}%"></div>`).join('')}
            </div>
        </div>
    `).join('');
}

function initReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('section, .glass, .hero-text').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

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

function initScrollProgress() {
    const scrollBar = document.getElementById('scroll-bar');
    const scrollTopBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollBar) scrollBar.style.width = scrolled + "%";
        const nav = document.querySelector('.navbar');
        if (winScroll > 50) nav?.classList.add('scrolled');
        else nav?.classList.remove('scrolled');
        if (winScroll > 500) scrollTopBtn?.classList.add('visible');
        else scrollTopBtn?.classList.remove('visible');
    });
}

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    if (!cursor || !follower) return;
    let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.left = `${mouseX}px`; cursor.style.top = `${mouseY}px`;
    });
    setInterval(() => {
        posX += (mouseX - posX) / 8; posY += (mouseY - posY) / 8;
        follower.style.left = `${posX}px`; follower.style.top = `${posY}px`;
    }, 16);
}

function initMagneticButtons() {
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.02)`;
        });
        btn.addEventListener('mouseleave', () => btn.style.transform = 'translate(0, 0) scale(1)');
    });
}

async function updateSatInsights() {
    const ndvi = await satelliteService.getNDVI();
    if (elements.ndviVal) elements.ndviVal.textContent = ndvi;
    if (elements.satStatus) {
        if (ndvi > 0.7) { elements.satStatus.textContent = 'High Vigour'; elements.satStatus.style.color = '#4ade80'; }
        else if (ndvi > 0.5) { elements.satStatus.textContent = 'Stable'; elements.satStatus.style.color = '#fbbf24'; }
        else { elements.satStatus.textContent = 'Low Vigour'; elements.satStatus.style.color = '#f87171'; }
    }
}

// Global Modal handlers
elements.closeModalBtns.forEach(btn => btn.addEventListener('click', () => {
    elements.calendarModal.classList.remove('active');
    elements.yieldModal.classList.remove('active');
    elements.livestockModal.classList.remove('active');
}));

window.addEventListener('click', (e) => {
    if (e.target === elements.calendarModal || e.target === elements.yieldModal || e.target === elements.livestockModal) {
        elements.calendarModal.classList.remove('active');
        elements.yieldModal.classList.remove('active');
        elements.livestockModal.classList.remove('active');
    }
});

/**
 * Run App
 */
window.addEventListener('load', init);
