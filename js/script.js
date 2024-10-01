const clocks = [
    { id: 1, timezoneOffset: 2, country: 'Netherlands', city: 'Amsterdam' },
    { id: 2, timezoneOffset: -5, country: 'USA', city: 'New York' },
    { id: 3, timezoneOffset: 1, country: 'Germany', city: 'Berlin' }
];

function displayTime(clock) {
    const hr = document.getElementById(`hour${clock.id}`);
    const min = document.getElementById(`min${clock.id}`);
    const sec = document.getElementById(`sec${clock.id}`);
    const location = document.getElementById(`location${clock.id}`);

    if (!hr || !min || !sec || !location) {
        console.error(`Elements for clock ID ${clock.id} not found.`);
        return;
    }

    const date = new Date();
    const utcHours = date.getUTCHours();
    const utcMinutes = date.getUTCMinutes();
    const utcSeconds = date.getUTCSeconds();

    const hh = (utcHours + clock.timezoneOffset + 24) % 24; // Adjust the hours with the timezone offset
    const mm = utcMinutes;
    const ss = utcSeconds;

    const hRotation = 30 * hh + mm / 2;
    const mRotation = 6 * mm;
    const sRotation = 6 * ss;

    hr.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;

    const ampm = hh >= 12 ? 'PM' : 'AM';
    location.textContent = `${clock.city}, ${clock.country} (${ampm})`;
}

function updateClocks() {
    clocks.forEach(clock => displayTime(clock));
}

setInterval(updateClocks, 1000);
updateClocks();

async function fetchTimezoneInfo(query) {
    const apiKey = 'MK04YCQE07V2';
    try {
        const formattedQuery = query.replace(/\s+/g, '_');
        const response = await fetch(`http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`);
        const data = await response.json();
        const timezones = data.zones;

        const matchingTimezone = timezones.find(tz =>
            tz.zoneName.toLowerCase().includes(formattedQuery.toLowerCase()) ||
            tz.countryCode.toLowerCase().includes(formattedQuery.toLowerCase()) ||
            tz.countryName.toLowerCase().includes(formattedQuery.toLowerCase())
        );

        if (matchingTimezone) {
            const offset = matchingTimezone.gmtOffset / 3600;
            const country = matchingTimezone.countryName;
            const city = matchingTimezone.zoneName.split('/').pop().replace(/_/g, ' ');

            return {
                offset: offset,
                country: country,
                city: city
            };
        } else {
            return { error: 'Timezone not found' };
        }
    } catch (error) {
        console.error('Error fetching timezone info:', error);
        return { error: 'Error fetching timezone info' };
    }
}

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

document.querySelectorAll('.search-bar').forEach((searchBar, index) => {
    searchBar.addEventListener('input', debounce(async (event) => {
        const query = event.target.value;
        if (query.length > 2) {
            const timezoneInfo = await fetchTimezoneInfo(query);
            if (timezoneInfo && !timezoneInfo.error) {
                clocks[index].timezoneOffset = timezoneInfo.offset;
                clocks[index].country = timezoneInfo.country;
                clocks[index].city = timezoneInfo.city;
                updateClocks();
            }
        }
    }, 500));

    searchBar.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const query = event.target.value;
            if (query.length > 2) {
                const timezoneInfo = await fetchTimezoneInfo(query);
                if (timezoneInfo && timezoneInfo.error) {
                    alert(timezoneInfo.error || 'Timezone info not found');
                }
            }
        }
    });
});

// Function to add a new clock
function addClock() {
    const newId = clocks.length + 1;
    const predefinedClock = clocks[(newId - 1) % clocks.length]; // Cycle through predefined clocks

    clocks.push({
        id: newId,
        timezoneOffset: predefinedClock.timezoneOffset,
        country: predefinedClock.country,
        city: predefinedClock.city
    });

    const clockWrapper = document.createElement('div');
    clockWrapper.className = 'clock-wrapper';
    clockWrapper.innerHTML = `
        <input type="text" id="search${newId}" class="search-bar" placeholder="Search for a city..." autocomplete="off">
        <div class="container">
            <div class="clock">
                <div id="hour${newId}" class="hand hour-hand"><i></i></div>
                <div id="min${newId}" class="hand minute-hand"><i></i></div>
                <div id="sec${newId}" class="hand second-hand"><i></i></div>
                <span style="--index: 1"><b>1</b></span>
                <span style="--index: 2"><b>2</b></span>
                <span style="--index: 3"><b>3</b></span>
                <span style="--index: 4"><b>4</b></span>
                <span style="--index: 5"><b>5</b></span>
                <span style="--index: 6"><b>6</b></span>
                <span style="--index: 7"><b>7</b></span>
                <span style="--index: 8"><b>8</b></span>
                <span style="--index: 9"><b>9</b></span>
                <span style="--index: 10"><b>10</b></span>
                <span style="--index: 11"><b>11</b></span>
                <span style="--index: 12"><b>12</b></span>
            </div>
        </div>
        <div id="location${newId}" class="location"></div>
    `;
    document.body.appendChild(clockWrapper);

    const searchBar = clockWrapper.querySelector('.search-bar');
    searchBar.addEventListener('input', debounce(async (event) => {
        const query = event.target.value;
        if (query.length > 2) {
            const timezoneInfo = await fetchTimezoneInfo(query);
            if (timezoneInfo && !timezoneInfo.error) {
                clocks[newId - 1].timezoneOffset = timezoneInfo.offset;
                clocks[newId - 1].country = timezoneInfo.country;
                clocks[newId - 1].city = timezoneInfo.city;
                updateClocks();
            }
        }
    }, 500));

    searchBar.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            const query = event.target.value;
            if (query.length > 2) {
                const timezoneInfo = await fetchTimezoneInfo(query);
                if (timezoneInfo && timezoneInfo.error) {
                    alert(timezoneInfo.error || 'Timezone info not found');
                }
            }
        }
    });

    updateClocks();
}

function removeClock() {
    if (clocks.length > 1) {
        clocks.pop();
        const clockWrappers = document.querySelectorAll('.clock-wrapper');
        const lastClockWrapper = clockWrappers[clockWrappers.length - 1];
        lastClockWrapper.remove();
    } else {
        
    }
}

document.getElementById('add-clock').addEventListener('click', addClock);
document.getElementById('remove-clock').addEventListener('click', removeClock);

// Responsive buttons 
const scrollTopButton = document.getElementById('scroll-top');
const scrollBottomButton = document.getElementById('scroll-bottom');

let currentClockIndex = 0;

function scrollToClock(index) {
    const clockWrapper = document.querySelectorAll('.clock-wrapper')[index];
    const clockWrapperRect = clockWrapper.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const offset = clockWrapperRect.top + scrollTop - (window.innerHeight / 2) + (clockWrapperRect.height / 2);

    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    });
}

scrollTopButton.addEventListener('click', () => {
    if (currentClockIndex > 0) {
        currentClockIndex--;
        scrollToClock(currentClockIndex);
    }
});

scrollBottomButton.addEventListener('click', () => {
    if (currentClockIndex < clocks.length - 1) {
        currentClockIndex++;
        scrollToClock(currentClockIndex);
    }
});

function updateScrollButtons() {
    const scrollTop = window.scrollY;
    const scrollHeight = document.body.scrollHeight;
    const clientHeight = window.innerHeight;

    if (scrollTop > 0) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }

    if (scrollTop + clientHeight < scrollHeight) {
        scrollBottomButton.style.display = 'block';
    } else {
        scrollBottomButton.style.display = 'none';
    }
}

window.addEventListener('scroll', updateScrollButtons);
window.addEventListener('load', updateScrollButtons);

const lightModeToggle = document.getElementById('light-mode-toggle');
lightModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = lightModeToggle.querySelector('i');
    if (document.body.classList.contains('light-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});