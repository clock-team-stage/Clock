<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "clocks_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$timezoneOffset = intval($_POST['timezoneOffset']);
$country = $_POST['country'];
$city = $_POST['city'];

$sql = "INSERT INTO clocks (timezoneOffset, country, city) VALUES ('$timezoneOffset', '$country', '$city')";

if ($conn->query($sql) === TRUE) {
    $last_id = $conn->insert_id;
    echo json_encode([
        "id" => $last_id,
        "timezoneOffset" => $timezoneOffset,
        "country" => $country,
        "city" => $city
    ]);
} else {
    echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
?>