<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://kit.fontawesome.com/29186d169c.js" crossorigin="anonymous"></script>
  <link rel="icon" href="assets/clockicon.jpg">
  <link rel="stylesheet" href="css/style.css" />
  <title>Analog Clock</title>
</head>

<body>
  <p class="toptext">If something is not working, please reload the page.</p>
  <label id="light-mode-toggle">
    <i class="fa-solid fa-moon"></i>
  </label>

  <button id="scroll-top" class="scroll-button"><i class="fas fa-angle-up"></i></button>
  <button id="scroll-bottom" class="scroll-button"><i class="fas fa-angle-down"></i></button>

  <button id="remove-clock" class="action-button"><i class="fas fa-minus"></i></button>

  <!-- Clock 1 -->
  <div class="clock-wrapper">
    <input type="text" id="search1" class="search-bar" placeholder="Search for a city..." autocomplete="off">
    <div class="container">
      <div class="clock">
        <div id="hour1" class="hand hour-hand">
          <i></i>
        </div>
        <div id="min1" class="hand minute-hand">
          <i></i>
        </div>
        <div id="sec1" class="hand second-hand">
          <i></i>
        </div>
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
    <div id="location1" class="location"></div>
  </div>

  <!-- Clock 2 -->
  <div class="clock-wrapper">
    <input type="text" id="search2" class="search-bar" placeholder="Search for a city..." autocomplete="off">
    <div class="container">
      <div class="clock">
        <div id="hour2" class="hand hour-hand">
          <i></i>
        </div>
        <div id="min2" class="hand minute-hand">
          <i></i>
        </div>
        <div id="sec2" class="hand second-hand">
          <i></i>
        </div>
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
    <div id="location2" class="location"></div>
  </div>

  <!-- Clock 3 -->
  <div class="clock-wrapper">
    <input type="text" id="search3" class="search-bar" placeholder="Search for a city..." autocomplete="off">
    <div class="container">
      <div class="clock">
        <div id="hour3" class="hand hour-hand">
          <i></i>
        </div>
        <div id="min3" class="hand minute-hand">
          <i></i>
        </div>
        <div id="sec3" class="hand second-hand">
          <i></i>
        </div>
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
    <div id="location3" class="location"></div>
  </div>

  <!-- Add clock button -->
  <button id="add-clock" class="action-button"><i class="fas fa-plus"></i></button>

  <!-- Script to handle clock functionality -->
  <script>
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

      const hh = (utcHours + clock.timezoneOffset + 24) % 24;
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
          return {
            offset: matchingTimezone.gmtOffset / 3600,
            country: matchingTimezone.countryName,
            city: matchingTimezone.zoneName.split('/')[1]
          };
        } else {
          return { error: 'City not found' };
        }
      } catch (error) {
        console.error('Error fetching timezone data:', error);
        return { error: 'Failed to fetch data' };
      }
    }

    const searchBar1 = document.getElementById('search1');
    const searchBar2 = document.getElementById('search2');
    const searchBar3 = document.getElementById('search3');

    searchBar1.addEventListener('input', debounce(async (event) => {
      const query = event.target.value;
      if (query.length > 2) {
        const timezoneInfo = await fetchTimezoneInfo(query);
        if (timezoneInfo && !timezoneInfo.error) {
          clocks[0].timezoneOffset = timezoneInfo.offset;
          clocks[0].country = timezoneInfo.country;
          clocks[0].city = timezoneInfo.city;
          updateClocks();
          saveClocksToLocalStorage(); // Save the updated clocks to localStorage
        }
      }
    }, 500));

    searchBar2.addEventListener('input', debounce(async (event) => {
      const query = event.target.value;
      if (query.length > 2) {
        const timezoneInfo = await fetchTimezoneInfo(query);
        if (timezoneInfo && !timezoneInfo.error) {
          clocks[1].timezoneOffset = timezoneInfo.offset;
          clocks[1].country = timezoneInfo.country;
          clocks[1].city = timezoneInfo.city;
          updateClocks();
          saveClocksToLocalStorage(); // Save the updated clocks to localStorage
        }
      }
    }, 500));

    searchBar3.addEventListener('input', debounce(async (event) => {
      const query = event.target.value;
      if (query.length > 2) {
        const timezoneInfo = await fetchTimezoneInfo(query);
        if (timezoneInfo && !timezoneInfo.error) {
          clocks[2].timezoneOffset = timezoneInfo.offset;
          clocks[2].country = timezoneInfo.country;
          clocks[2].city = timezoneInfo.city;
          updateClocks();
          saveClocksToLocalStorage(); // Save the updated clocks to localStorage
        }
      }
    }, 500));

    // Debounce function to delay search
    function debounce(func, delay) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
      };
    }

    // Add clock button
    const addClockButton = document.getElementById('add-clock');
    addClockButton.addEventListener('click', () => addClock());

    // Add new clock function
    function addClock() {
      const newId = clocks.length + 1;
      const predefinedClock = clocks[(newId - 1) % clocks.length];

      clocks.push({
        id: newId,
        timezoneOffset: predefinedClock.timezoneOffset,
        country: predefinedClock.country,
        city: predefinedClock.city
      });

      // Create new clock in DOM (simplified for demonstration)
      const clockWrapper = document.createElement('div');
      clockWrapper.className = 'clock-wrapper';
      clockWrapper.innerHTML = `
        <input type="text" id="search${newId}" class="search-bar" placeholder="Search for a city..." autocomplete="off">
        <div class="container">
          <div class="clock">
            <div id="hour${newId}" class="hand hour-hand">
              <i></i>
            </div>
            <div id="min${newId}" class="hand minute-hand">
              <i></i>
            </div>
            <div id="sec${newId}" class="hand second-hand">
              <i></i>
            </div>
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
      saveClocksToLocalStorage(); // Save the updated clocks to localStorage
      updateClocks(); // Update the clocks display
    }

    // Save clock data to localStorage
    function saveClocksToLocalStorage() {
      localStorage.setItem('clocks', JSON.stringify(clocks));
    }

    // Load clock data from localStorage on page load
    function loadClocksFromLocalStorage() {
      const storedClocks = localStorage.getItem('clocks');
      if (storedClocks) {
        const parsedClocks = JSON.parse(storedClocks);
        clocks.length = 0; // Clear the current clocks array
        clocks.push(...parsedClocks); // Load the saved clocks from localStorage
        updateClocks(); // Update the clocks display
      }
    }

    window.addEventListener('load', loadClocksFromLocalStorage);
  </script>
</body>

</html>
