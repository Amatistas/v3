<?php
// required headersheader("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
// include database and object files
include '../../config/database.php';
include './tipo_de_operacion.php';
 
// instantiate database and usuario object
$database = new Database();
$getdb=$_GET["getdb"];
$db = $database->getConnection($getdb);
 
// initialize object
$tipo_de_operacion = new Tipo_de_operacion($db);
 

// query usuario
$stmt = $tipo_de_operacion->read();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // usuario array
    $tipo_de_operacion_arr=array();
    $tipo_de_operacion_arr["data"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $tipo_de_operacion_item=array(
                "to_id"=>    $to_id,
                "to_nom" =>   $to_nom,
                "to_frm" =>   $to_frm,
                "to_tipsuj"    =>$to_tipsuj,
                "to_tab" =>   $to_tab,
                "to_sql" =>   $to_sql,
                "to_bsql"  =>  $to_bsql,
                "to_psql"  =>  $to_psql,
                "to_asi" =>   $to_asi,
                "to_kar" =>   $to_kar,
                "to_fac" =>   $to_fac,
                "to_est" =>   $to_est
                                     );
 
        array_push($tipo_de_operacion_arr["data"], $tipo_de_operacion_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show usuario data in json format
    echo json_encode($tipo_de_operacion_arr);
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