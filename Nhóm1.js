
document.getElementById('show-contact-form').onclick = (e) => {
    e.preventDefault();
    document.getElementById('contact-form').style.display = 'block';
    document.getElementById('overlay-bg').style.display = 'block';
};


function closeForm() {
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('overlay-bg').style.display = 'none';
}
document.getElementById('overlay-bg').onclick = closeForm;

document.getElementById('close-form-btn').onclick = closeForm;
let clickCount = 0;
async function updateDanangWeather() {
    try {
        const lat = 16.0544;
        const lon = 108.2022;
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await response.json();
        
        const temp = Math.round(data.current_weather.temperature);
        
        const tempElement = document.getElementById('current-temp');
        if (tempElement) {
            tempElement.innerText = temp + '°C';
        }
        
        const iconEl = document.getElementById('weather-icon');
        if (iconEl) {
            if (temp >= 30) iconEl.innerText = '☀️';
            else if (temp <= 20) iconEl.innerText = '🌦️';
            else iconEl.innerText = '☁️';
        }
    } catch (error) {
        console.error("Lỗi cập nhật thời tiết Đà Nẵng:", error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    updateDanangWeather();
    setInterval(updateDanangWeather, 1800000);
});

function startDigitalSystems() {
    function updateClock() {
        const now = new Date();
        const d = String(now.getDate()).padStart(2, '0');
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const y = now.getFullYear();
        
        document.getElementById('current-date').innerText = `📅 ${d}/${m}/${y}`;
        document.getElementById('current-time').innerText = `⏰ ${now.toLocaleTimeString('vi-VN', { hour12: false })}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
    updateWeather();
    setInterval(updateWeather, 1800000);
}

document.addEventListener('DOMContentLoaded', startDigitalSystems);