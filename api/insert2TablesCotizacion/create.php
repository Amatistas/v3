
<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../insert2TablesCotizacion/insert2Tables.php';
include '../insert2TablesCotizacion/fields.php';

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

$adver = array();

$dataInfo = $data->info[0];
$dataItems = $data->items;
// make sure data is not empty
if (true) {
    //condicion para registrar el invioce documento internacional factura internacional 
    if (true) {
        //momento de validacion
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

            //declara la tabla cotizacion_det para ingresar los item a la tabla
            $tbnom_det = $tbnom . "_det";

            //preparar el array de insercion de los datos 
            $field2 = $field2->fields($getdb, $tbnom_det);
            $numfield2 = $field2->rowCount();

            $arr_field2 = array();
            $insert2TablesID = new Insert2Tables($db);

            $insert2TablesID->actualizarSerie($dataInfo->ven_serieID, $dataInfo->ven_num);

            //obtener el ultimo id de la compra para asociar la cabezera del asiento y y el detalle del asiento tablas "registo" y "registro_det" 
            $ven_id = $insert2TablesID->getLastIdVenta();
            $venid = $ven_id->fetch(PDO::FETCH_ASSOC);


            ////bucle para obtener las columnas de la tabla cotizacion_det, para luego insertar los items en cada columns de esta tabla
            while ($row2 = $field2->fetch(PDO::FETCH_ASSOC)) {
                array_push($arr_field2, $row2['Field']);
            }

            ///////bucle que cuenta la cantidad de items que contiene la compra y repite los prcesos de insercion de almacen, registro_det
            for ($i = 0; $i < count($dataItems); $i++) {
                //descomposicion del array $arr_field2  
                foreach ($arr_field2 as $key => $val) {
                    //comprobar si existen los elementos del objeto que contiene los datos de los items de la compra
                    if (isset($dataItems[$i]->$val)) {

                        //si existen simplemente se insertaran en el objeto $insert2TablesItems 
                        $insert2TablesItems->$val = $dataItems[$i]->$val;
                    } else {
                        //si no existen entoncs se remplazaran por 0 para que haya error
                        $insert2TablesItems->$val = 0;
                    }
                }

                $insert2TablesItems->venta_id = $venid['ven_id'];

                if ($insert2TablesItems->create_det($getdb, $tbnom_det, $arr_field2)) {

                    // set response code - 201 created
                    http_response_code(201);
                    // tell the user
                    array_push($adver, array("message" => "se inserto el objeto.", "status" => "200"));
                } else {
                    array_push($adver, array("message" => "No se pudo Insertar los Objetos", "status" => "503"));
                }
            }

            // set response code - 201 created
            http_response_code(201);

            // tell the user
            array_push($adver, array("message" => "La Cabezera de la cotizacion Se Creo Exitosamente", "status" => "200"));
        }
        // if unable to create the insert2Tables, tell the user
        else {
            // set response code - 503 service unavailable
            http_response_code(503);
            // tell the user
            array_push($adver, array("message" => "No se pudo Insertar la cotizacion", "status" => "503"));
        }
    }
}
echo json_encode($adver);
