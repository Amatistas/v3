<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$ruta = "https://ruc.com.pe/api/beta/ruc";
$token = "fd49d95c-0dc4-4d7c-80bd-13f1b2e07943-d23070ac-9472-42ad-96eb-4a69d1f8e1d4";

$rucaconsultar = $_GET['ruc'];

$data = array(
    "token"	=> $token,
    "ruc"   => $rucaconsultar
);
	
$data_json = json_encode($data);

// Invocamos el servicio a ruc.com.pe
// Ejemplo para JSON
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $ruta);
curl_setopt(
	$ch, CURLOPT_HTTPHEADER, array(
	'Content-Type: application/json',
	)
);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS,$data_json);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$respuesta  = curl_exec($ch);
curl_close($ch);
$leer_respuesta =  json_decode($respuesta);
if (isset($leer_respuesta->error)) {
       http_response_code(400);
       echo json_encode(
        array("message" => $leer_respuesta->error )
    );
} else {
    //Mostramos la respuesta
    $array = json_decode(($respuesta), true);
    $x = $array['entity'];

    $result = array(
        "emp_nomcom" => $x['nombre_o_razon_social'],
        "emp_nom" => $x['nombre_o_razon_social'],
        "ubi_id" => $x['ubigeo'],
        "u_ubi_id" => $x['distrito'].'-'.$x['provincia'].'-'.$x['departamento'],
        "emp_dir" => $x['direccion']
    );
    http_response_code(200);
    echo json_encode($result);
}