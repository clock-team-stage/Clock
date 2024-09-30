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

    location.textContent = `${capitalizeFirstLetter(clock.city)}, ${capitalizeFirstLetter(clock.country)}`;
}

function updateClocks() {
    clocks.forEach(clock => displayTime(clock));
}

// Update clocks every second
setInterval(updateClocks, 1000);
updateClocks();

async function fetchTimezoneOffset(city) {
    const response = await fetch(`http://worldtimeapi.org/api/timezone`);
    const data = await response.json();
    const timezone = data.find(tz => tz.toLowerCase().includes(city.toLowerCase()));
    if (timezone) {
        const timezoneResponse = await fetch(`http://worldtimeapi.org/api/timezone/${timezone}`);
        const timezoneData = await timezoneResponse.json();
        const offset = timezoneData.utc_offset;
        const hoursOffset = parseInt(offset.slice(1, 3));
        const minutesOffset = parseInt(offset.slice(4, 6));
        return offset[0] === '+' ? hoursOffset + minutesOffset / 60 : -(hoursOffset + minutesOffset / 60);
    }
    return null;
}

async function fetchCountry(city) {
    const response = await fetch(`https://api.teleport.org/api/cities/?search=${encodeURIComponent(city)}`);
    const data = await response.json();
    if (data._embedded['city:search-results'].length > 0) {
        const cityInfo = data._embedded['city:search-results'][0];
        const cityDetailsResponse = await fetch(cityInfo._links['city:item'].href);
        const cityDetails = await cityDetailsResponse.json();
        return cityDetails._links['city:country'].name;
    }
    return null;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

document.querySelectorAll('.search-bar').forEach((searchBar, index) => {
    searchBar.addEventListener('input', async (event) => {
        const city = event.target.value;
        const offset = await fetchTimezoneOffset(city);
        const country = await fetchCountry(city);
        if (offset !== null && country !== null) {
            clocks[index].timezoneOffset = offset;
            clocks[index].city = city;
            clocks[index].country = country;
            updateClocks();
        }
    });
});