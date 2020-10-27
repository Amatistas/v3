<?php

require './conx.php';
session_start();
$datax = json_decode(file_get_contents("php://input"));

$emp_id = $datax->emp_id;
$data = json_decode($datax->data, true);

$conexion = mysqli_connect($server, $user, $pass, $bd)
or die("Ha sucedido un error inexperado en la conexion de la base de datos");

$database = $data['database'];

$sql = "SELECT * FROM `$database`.`empresa` where emp_id = $emp_id";
if ($result = $conexion->query($sql)) {
    $row = $result->fetch_array(MYSQLI_ASSOC);

    $_SESSION['mySessionEmpresa'] = $row;

    mysqli_close($conexion);

    http_response_code(200);
    
    echo "{'success':'puto el que lo lea'}";
} else {
    http_response_code(404);
    echo "{'error':'dataSession is bad'}";
}
