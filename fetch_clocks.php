<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "clocks_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM clocks";
$result = $conn->query($sql);

$clocks = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $clocks[] = $row;
    }
}

echo json_encode($clocks);

$conn->close();
?>