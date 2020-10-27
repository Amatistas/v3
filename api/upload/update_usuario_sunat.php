<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//
//
include '../config/database.php';
include '../upload/thing.php';

if (isset($_GET['update_user'])) {
    $data = json_decode(file_get_contents("php://input"));
    $database = new Database();
    $db = $database->getConnection($data->bd);
    $ti = new Thing($db);
    if ($ti->updateUsuarioSunat($data)) {
        echo json_encode(array("status" => "success", "message" => "Se actualizo el usuario"));
    } else {
        echo json_encode(array("status" => "error", "message" => "fallo al actualizacion del usuario"));
    }
} else {
    echo json_decode(array("status" => "error", "message" => "no se puede actualizar el usuario"));
}
