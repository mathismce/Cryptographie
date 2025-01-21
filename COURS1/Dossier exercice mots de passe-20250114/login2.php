<?php


// passwords compute with the SHA1 hash function
define('CREDENTIALS', ['user2' =>  "4f438b5fb4252e077c28d3895644377d1c794195",
                       'user3' => "0b08e9f1c3394fe184f17f5c3e0e2a825802c75a",
                       'user4' =>  "5ab6137f2dcf051378142696fd8bb0c0e7fc941b"]);



if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username'], $_POST['password'])) {
    if (isset(CREDENTIALS[$_POST['username']]) && (hash("sha1", $_POST['password']) === CREDENTIALS[$_POST['username']])) {
        header('Location: ./home.html', TRUE, 302); // This is not the way...
        http_response_code(200);
        echo json_encode("Authentication successful!");
        exit();
    } else {
        http_response_code(401);
        echo json_encode("Authentication failed!");
        exit();
    }
}


?>