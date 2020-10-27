<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../almacenes/almacen.php';
 
// instantiate database and almacen object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
 
// initialize object
$almacen = new Almacen($db);
 

// query almacen
$stmt = $almacen->read($getdb);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // almacen array
    $almacen_arr=array();
    $almacen_arr["data"]=array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $almacen_item=array(
        "loc_nom" => $loc_nom,
      //"emp_id" => $emp_id,
        "alm_id" => $alm_id,
      //"ofi_id" => $ofi_id,
        "alm_cod" => $alm_cod,
        "alm_nom" => $alm_nom,
      //"per_id" => $per_id,
        "per_nom" => $per_nom,
        "per_apepat" => $per_apepat,
        "alm_dir" => $alm_dir,
        "ubi_id" => $ubi_id,
        "alm_tel" => $alm_tel,
        "emp_nom" => $emp_nom,
      //"alm_lat" => $alm_lat,
      //"alm_lon" => $alm_lon,
      //"alm_con" => $alm_con,
      //"alm_est" => $alm_est
        );
 
        array_push($almacen_arr["data"], $almacen_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show almacen data in json format
    echo json_encode($almacen_arr);
}
 
// no almacen found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No almacens found.")
    );
}