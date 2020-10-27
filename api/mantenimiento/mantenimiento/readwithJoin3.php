<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include '../../config/database.php';
include '../mantenimiento/mantenimiento.php';

// instantiate database and empresa object
$database = new Database();
$getdb=$_GET["getdb"]; 
if(isset($_GET["where"])){
    $where=$_GET["where"];
    $igual=$_GET["igual"];    
    $igual=$_GET["igual"];    
}else{
    $where="";
    $igual=""; 
}

$obj = array('where' => $where,'igual' => $igual,'getdb'=>$getdb);

$db = $database->getConnection($getdb);
 
// initialize object
$mantenimento = new Mantenimiento($db);
 
// query empresa
$stmt = $mantenimento->readwithJoin3($obj);
$num = $stmt->rowCount();
$arr_field = array();
while ($row = $field->fetch(PDO::FETCH_ASSOC)) {
    array_push($arr_field,$row['Field']);
}
// check if more than 0 record found
if($num>0){
 
    // empresa array
    $mantenimento_arr=array();
    
    $mantenimento_arr['fields']=array();

    array_push($mantenimento_arr['fields'],$arr_field);

    $mantenimento_arr['data']=array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        array_push($mantenimento_arr['data'],$row);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show empresa data in json format
    echo json_encode($mantenimento_arr);
}
 
// no empresa found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No data found.")
    );
}