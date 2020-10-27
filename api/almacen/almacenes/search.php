<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../config/database.php';
include_once '../almacenes/almacen.php';
 
// instantiate database and almacen object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
 
// initialize object
$almacen = new Almacen($db);
 
// get keywords
$keywords=isset($_GET["s"]) ? $_GET["s"] : "";
 
// query almacen
$stmt = $almacen->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // almacen array
    $almacen_arr=array();
    $almacen_arr["data"]=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
   
        extract($row);
 
        $almacen_item=array(
            "emp_id"=> $emp_id,
            "alm_id"=> $alm_id,
            "loc_id"=> $loc_id,
            "alm_cod"=> $alm_cod,
            "alm_nom"=> $alm_nom,
            "per_id"=> $per_id,
            "alm_dir"=> $alm_dir,
            "ubi_id"=> $ubi_id,
            "alm_tel"=> $alm_tel,
            "alm_lat"=> $alm_lat,
            "alm_lon"=> $alm_lon,
            "alm_con"=> $alm_con,
            "alm_est"=> $alm_est
        );
 
        array_push($almacen_arr["data"], $almacen_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show almacen data
    echo json_encode($almacen_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no almacen found
    echo json_encode(
        array("message" => "No almacen found.")
    );
}
?>