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

$sql = "DELETE FROM clocks WHERE id = '$id'";

if ($conn->query($sql) === TRUE) {
    echo "Clock deleted successfully.";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?>