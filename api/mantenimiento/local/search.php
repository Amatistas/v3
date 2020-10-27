<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/core.php';
include_once '../../config/database.php';
include_once '../local/local.php';
 
// instantiate database and local object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
 
// initialize object
$local = new Local($db);
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query local
$stmt = $local->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // local array
    $local_arr=array();
    $local_arr["data"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
   
        extract($row);
 
        $local_item = array(
            "emp_id" => $emp_id,
            "loc_id" => $loc_id,
            "loc_cod" => $loc_cod,
            "loc_nom" => $loc_nom,
            "loc_dir" => $loc_dir,
            "ubi_id" => $ubi_id,
            "loc_ema" => $loc_ema,
            "loc_tel" => $loc_tel,
            "loc_cel" => $loc_cel,
            "loc_est" => $loc_est
        );
 
        array_push($local_arr["data"], $local_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show local data
    echo json_encode($local_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no local found
    echo json_encode(
        array("message" => "No local found.")
    );
}
?>