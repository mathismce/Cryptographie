<?php


// passwords compute with the SHA1 hash function
define('CREDENTIALS', [
    'user2' => "b612af11efb748105a3b356cf99f836b01fffbe9",
    'user3' => "7491af954d5232daa771ce0534a2901586a02e65",
    'user4' => "6df0ab0e83295dbfbd7f10509be236bcffa3d2c7",
    'user5' => "03de6c570bfe24bfc328ccd7ca46b76eadaf4334"]);



if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'], $_POST['password'])) {
    if (isset(CREDENTIALS[$_POST['username']]) && (hash("sha1", $_POST['password']) === CREDENTIALS[$_POST['username']])) {
            header('Location: ./home.html', TRUE, 302); // This is not the way...
            http_response_code(200);
            echo json_encode("Authentication successful!");
            exit();
        }  else {
        http_response_code(401);
        echo json_encode("Authentication failed!");
        exit();
    }
}
