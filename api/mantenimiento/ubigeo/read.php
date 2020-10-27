<?php
// required headersheader("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
// include database and object files
include '../../config/database.php';
include './ubigeo.php';
 
// instantiate database and usuario object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$compra_de_servicios = new Ubigeo($db);
 

// query usuario
$stmt = $compra_de_servicios->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // usuario array
    $compra_de_servicios_arr=array();
    $compra_de_servicios_arr["data"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $compra_de_servicios_item=array(

            "ubi_id" => $ubi_id,
            "departamento" => $departamento,
            "provincia" => $provincia,
            "distrito" => $distrito
        );
 
        array_push($compra_de_servicios_arr["data"], $compra_de_servicios_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show usuario data in json format
    echo json_encode($compra_de_servicios_arr);
}
 
// no usuario found will be here
else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no products found
    echo json_encode(
        array("message" => "No compras found.")
    );
}