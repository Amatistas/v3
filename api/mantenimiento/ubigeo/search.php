<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/core.php';
include_once '../../config/database.php';
include_once '../ubigeo/ubigeo.php';
 
// instantiate database and ubigeo object
$database = new Database();
$db = $database->getConnection("nubefapanel");
 
// initialize object
$ubigeo = new Ubigeo($db);
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query ubigeo
$stmt = $ubigeo->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // ubigeo array
    $ubigeo_arr=array();
    $ubigeo_arr["data"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
   
        extract($row);
 
        $ubigeo_item=array(
            "ubi_id" => $ubi_id,
            "departamento" => $departamento,
            "provincia" => $provincia,
            "distrito" => $distrito
        );
 
        array_push($ubigeo_arr["data"], $ubigeo_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show ubigeo data
    echo json_encode($ubigeo_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no ubigeo found
    echo json_encode(
        array("message" => "No ubigeo found.")
    );
}
?>