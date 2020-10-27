<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include '../../config/database.php';
include '../personal/personal.php';
 
// instantiate database and usuario object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
$personal = new Personal($db);
 

// query personal
$stmt = $personal->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // personal array
    $personal_arr=array();
    $personal_arr["data"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $personal_item=array(
        "per_id" => $per_id,
        "emp_id" => $emp_id,
        "ofi_id" => $ofi_id,
        "per_cod" => $per_cod,
        "per_tipdoc" => $per_tipdoc,
        "per_numdoc" => $per_numdoc,
        "per_nom" => $per_nom,
        "per_apepat" => $per_apepat,
        "per_apemat" => $per_apemat,
        "per_dir" => $per_dir,
        "ubi_id" => $ubi_id,
        "per_sex" => $per_sex,
        "per_ema" => $per_ema,
        "per_fecnac" => $per_fecnac,
        "per_tel" => $per_tel,
        "per_ven" => $per_ven,
        "per_cho" => $per_cho,
        "are_id" => $are_id,
        "per_jef" => $per_jef,
        "per_obs" => $per_obs,
        "per_est" => $per_est
        );
 
        array_push($personal_arr["data"], $personal_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show personal data in json format
    echo json_encode($personal_arr);
}
 
// no personal found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No personals found.")
    );
}