<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../usuarios/usuario.php';
 
// instantiate database and usuario object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
 
// initialize object
$usuario = new Usuario($db);
 

// query usuario
$stmt = $usuario->read($getdb);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // usuario array
    $usuario_arr=array();
    $usuario_arr["data"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
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
 
    // show usuario data in json format
    echo json_encode($usuario_arr);
}
 
// no usuario found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No Usuarios found.")
    );
}