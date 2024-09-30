const clocks = [
    { id: 1, timezoneOffset: 2, country: '', city: '' },
    { id: 2, timezoneOffset: -5, country: '', city: '' },
    { id: 3, timezoneOffset: 1, country: '', city: '' }
];

function displayTime(clock) {
    const hr = document.getElementById(`hour${clock.id}`);
    const min = document.getElementById(`min${clock.id}`);
    const sec = document.getElementById(`sec${clock.id}`);
    const location = document.getElementById(`location${clock.id}`);

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

    location.textContent = `${clock.city} ${clock.country}`;
}

function updateClocks() {
    clocks.forEach(clock => displayTime(clock));
}

setInterval(updateClocks, 1000);
updateClocks();

async function fetchTimezoneInfo(query) {
    const apiKey = 'MK04YCQE07V2'; // Replace with your TimezoneDB API key
    try {
        // Replace spaces with underscores in the query
        const formattedQuery = query.replace(/\s+/g, '_');
        const response = await fetch(`http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`);
        const data = await response.json();
        const timezones = data.zones;

        const matchingTimezone = timezones.find(tz =>
            tz.zoneName.toLowerCase().includes(formattedQuery.toLowerCase())
        );

        if (matchingTimezone) {
            const offset = matchingTimezone.gmtOffset / 3600; // Convert seconds to hours
            const [area, ...locationParts] = matchingTimezone.zoneName.split('/');
            const location = locationParts.join(', ').replace(/_/g, ' ');

            return {
                offset: offset,
                country: area,
                city: location
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

// Scroll buttons functionality
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

// Light mode toggle functionality
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