<?php

// CreaTED : 
// BY : AHMED SHARIF

// PURPOSE : handling the input info and serve as api in the main page to facilitate day by day tasks


$filename = 'tasks.json';
if (!file_exists($filename)) file_put_contents($filename, json_encode([]));

$data = json_decode(file_get_contents($filename), true);

$input = json_decode(file_get_contents('php://input'), true);
$action = $_GET['action'] ?? $input['action'] ?? '';

if ($action === 'read') {
    echo json_encode($data);
    exit;
}

if ($action === 'add' && !empty($input['task'])) {
    $data[] = htmlspecialchars($input['task']);
    file_put_contents($filename, json_encode($data));
    echo json_encode(['status' => 'added']);
    exit;
}

if ($action === 'delete' && isset($input['index'])) {
    array_splice($data, $input['index'], 1);
    file_put_contents($filename, json_encode($data));
    echo json_encode(['status' => 'deleted']);
    exit;
}

echo json_encode(['status' => 'invalid']);
