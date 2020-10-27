<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../insert2TablesOrdenCompra/insert2Tables.php';
include '../insert2Tables/fields.php';

// instantiate database and insert2Tables object

$database = new Database();

$getdb = $_GET["getdb"];

$tbnom = $_GET["tbnom"];

$db = $database->getConnection($getdb);

// initialize object
$field = new Fields($db, $tbnom);

$insert2Tables = new Insert2Tables($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

$dataInfo = $data->info[0];
$dataItems = $data->items;

$adver = array();
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

        if($insert2Tables->updateSerie($dataInfo->com_ser, $dataInfo->com_num))
        {
            array_push($adver, array("message" => "se actualizo la serie", "status" => "200"));
        }else{
            array_push($adver, array("message" => "No se pudo actualizar la serie", "status" => "502"));
        }

        while ($row2 = $field2->fetch(PDO::FETCH_ASSOC)) {
            array_push($arr_field2, $row2['Field']);
        }
        for ($i = 0; $i < count($dataItems); $i++) {
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
                // tell the user
                array_push($adver, array("message" => "se crearon los objetos", "status" => "200"));
            }else{
                array_push($adver, array("message" => "no se crearon los objetos", "status" => "502"));
            }
        }

        // set response code - 201 created
        http_response_code(201);

        // tell the user
        array_push($adver, array("message" => "se creo la cabezera correctamente", "status" => "200"));
    }

    // if unable to create the insert2Tables, tell the user
    else {


        // tell the user
        array_push($adver, array("message" => "No se pudo crear la cabezera", "status" => "503"));
    }
}

// tell the user data is incomplete
else {
    array_push($adver, array("message" => "No se pudo hacer nada llame a nubefa", "status" => "400"));
}

echo json_encode($adver);
