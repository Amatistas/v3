<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/core.php';
include_once '../../config/database.php';
include_once '../usuarios/usuario.php';
 
// instantiate database and usuario object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
 
// initialize object
$usuario = new Usuario($db);
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query usuario
$stmt = $usuario->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // usuario array
    $usuario_arr=array();
    $usuario_arr["data"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
   
        extract($row);
 
        $usuario_item=array(
            "usu_id" => $usu_id,
            "usu_nom" => $usu_nom,
            "usu_ema" => $usu_ema,
            "usu_usu" => $usu_usu,
            "usu_cla" => $usu_cla,
            "usu_jer" => $usu_jer,
            "usu_notperm" => $usu_notperm
        );
 
        array_push($usuario_arr["data"], $usuario_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show usuario data
    echo json_encode($usuario_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no usuario found
    echo json_encode(
        array("message" => "No usuario found.")
    );
}
?>