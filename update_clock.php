<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "clocks_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = intval($_POST['id']);
$timezoneOffset = floatval($_POST['timezoneOffset']);
$country = $_POST['country'];
$city = $_POST['city'];

$sql = "UPDATE clocks SET timezoneOffset = '$timezoneOffset', country = '$country', city = '$city' WHERE id = '$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true, "message" => "Clock updated successfully"]);
} else {
    echo json_encode(["success" => false, "error" => "Error updating clock: " . $conn->error]);
}

$conn->close();
?>