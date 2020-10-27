<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../insert2TablesGuiaRemisionCompra/insert2Tables.php';
include '../insert2TablesGuiaRemisionCompra/fields.php';

// instantiate database and insert2Tables object

$database = new Database();

$getdb = $_GET["getdb"];

$tbnom = $_GET["tbnom"];

$db = $database->getConnection($getdb);

// initialize object
$field = new Fields($db, $tbnom);

$insert2Tables = new Insert2Tables($db);


$adver = array();

// get posted data
$data = json_decode(file_get_contents("php://input"));

$dataInfo = $data->info[0];
$dataItems = $data->items;
// make sure data is not empty
if (true) {
    $field = $field->fields($getdb, $tbnom);
  
    $numfield = $field->rowCount();
  
    $arr_field = array();

    while ($row = $field->fetch(PDO::FETCH_ASSOC)) {
        array_push($arr_field, $row['Field']);
    }
    foreach ($arr_field as $clave => $val) {

        if (isset($dataInfo->$val)) {
 
            $insert2Tables->$val = $dataInfo->$val;
 
        } else {
 
            $insert2Tables->$val = 0;
        }
    }
    // create the insert2Tables
    if ($insert2Tables->create($getdb, $tbnom, $arr_field)) {

        ////////////segundo insert bucle para ingresar todos los items
        $field2 = new Fields($db, $tbnom);

        $insert2TablesItems = new Insert2Tables($db);

        $tbnom_det = $tbnom . "_det";

        $field2 = $field2->fields($getdb, $tbnom_det);

        $numfield2 = $field2->rowCount();
    
        $arr_field2 = array();

        $insert2TablesID = new Insert2Tables($db);

        $com_id = $insert2TablesID->getLastIdCompra();

        $comid = $com_id->fetch(PDO::FETCH_ASSOC);

        while ($row2 = $field2->fetch(PDO::FETCH_ASSOC)) {
            array_push($arr_field2, $row2['Field']);
        }
      
        for ($i=0; $i < count($dataItems); $i++) { 
             foreach ($arr_field2 as $key => $val) {
            
                if (isset($dataItems[$i]->$val)) {
                    
                    $insert2TablesItems->$val = $dataItems[$i]->$val;
                    $insert2TablesItems->det_com_id = $comid['com_id'];
    
                } else {
                    $insert2TablesItems->$val = 0;
                }
            }

            if ($insert2TablesItems->create_det($getdb, $tbnom_det, $arr_field2)) {
            // set response code - 201 created
            http_response_code(200);
            // tell the user
            array_push($adver, array("message" => "Se insertaron los objetos", "status" => "200"));
            }       
           
    
        }
     
        // set response code - 201 created
        http_response_code(200);

        // tell the user
        array_push($adver, array("message" => "se creo la cabezaera correctamente", "status" => "200"));
    }

    // if unable to create the insert2Tables, tell the user
    else {

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        array_push($adver, array("message" => "No se pudo crear el documento", "status" => "503"));
    }
}

// tell the user data is incomplete
else {

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to create insert2Tables. Data is incomplete.", "error" => "400"));
}

echo json_encode($adver);
