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
    <button id="add-clock" class="action-button"><i class="fas fa-plus"></i></button>

    <script src="js/script.js"></script>
    <script>
        // Initialize clocks array with data from the database
        const clocks = [
            <?php
            $conn = new mysqli($servername, $username, $password, $dbname);
            $result = $conn->query($sql);
            while($row = $result->fetch_assoc()) {
                echo "{id: " . $row["id"] . ", timezoneOffset: " . $row["timezoneOffset"] . ", country: '" . $row["country"] . "', city: '" . $row["city"] . "'},";
            }
            $conn->close();
            ?>
        ];

        // Call updateClocks() to initialize the clock displays
        updateClocks();
    </script>
</body>

</html>