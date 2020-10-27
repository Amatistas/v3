<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include '../config/database.php';
include '../r2qE/r2qE.php';

// instantiate database and empresa object
$database = new Database();

$getdb=$_GET["getdb"];

if(isset($_GET["where"])){
    $where=$_GET["where"];
    $igual=$_GET["igual"];    
    $thing=$_GET["thing"];    
}else{
    $where="";
    $igual=""; 
}


$db = $database->getConnection($getdb);
 
// initialize object
$mantenimento = new r2qE($db);
 
// query empresa
$stmt = $mantenimento->read($getdb,$where,$igual);

$num = $stmt->rowCount();
// check if more than 0 record found
if(true){
    // empresa array
    $mantenimento_arr=array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        array_push($mantenimento_arr,$row);
    }
    if($queryNew = $mantenimento_arr[0]['query']){
       $stmt2 = $mantenimento->read2($queryNew,$getdb,$thing);
       $num2 = $stmt2->rowCount();
        // set response code - 200 OK
        $mantenimento_arrr = array();
        $mantenimento_arrr['data'] = array();
        while ($roww = $stmt2->fetch(PDO::FETCH_ASSOC)){
            array_push($mantenimento_arrr['data'],$roww);
        }
     http_response_code(200);
     // show empresa data in json format
     echo json_encode($mantenimento_arrr);
    }
}
 
// no empresa found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No empresas found.")
    );
}