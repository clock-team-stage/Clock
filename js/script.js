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
        const response = await fetch(`http://api.timezonedb.com/v2.1/list-time-zone?key=${apiKey}&format=json`);
        const data = await response.json();
        const timezones = data.zones;

        const matchingTimezone = timezones.find(tz =>
            tz.zoneName.toLowerCase().includes(query.toLowerCase())
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
    return function(...args) {
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

// // Show an alert when the user enters the site
// window.onload = function() {
//     alert('Cities with a space in their name should be written with an underscore. For example, "New_York" instead of "New York".');
// };