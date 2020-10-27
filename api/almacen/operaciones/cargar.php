
<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../../config/database.php';
include '../../almacen/operaciones/operaciones.php';
include '../../almacen/operaciones/fields.php';

// instantiate database and operaciones object

$database = new Database();

$getdb = $_GET["getdb"];

$tbnom = 'traslado_almacen';

$db = $database->getConnection($getdb);

// initialize object
$field = new Fields($db, $tbnom);

$operaciones = new Operaciones($db);

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
                $operaciones->$val = $dataInfo->$val;
            } else {
                $operaciones->$val = null;
            }
        }


        // create the operaciones
        if ($operaciones->create($getdb, $tbnom, $arr_field)) {

            ////////////segundo insert bucle para ingresar todos los items
            $field2 = new Fields($db, $tbnom);
            $operacionesItems = new operaciones($db);

            //declara la tabla venta_det para ingresar los item a la tabla
            $tbnom_det = $tbnom . "_det";

            //preparar el array de insercion de los datos 
            $field2 = $field2->fields($getdb, $tbnom_det);
            $numfield2 = $field2->rowCount();

            $arr_field2 = array();
            $operacionesID = new operaciones($db);

            $operacionesID->actualizarSerie($dataInfo->serie_tras, $dataInfo->nro_doc);

            //obtener el ultimo id de la compra para asociar la cabezera del asiento y y el detalle del asiento tablas "registo" y "registro_det" 

            $tras_id = $operacionesID->getLastIdTraslado();
            $trasid = $tras_id->fetch(PDO::FETCH_ASSOC);

            ////bucle para obtener las columnas de la tabla venta_det, para luego insertar los items en cada columns de esta tabla
            while ($row2 = $field2->fetch(PDO::FETCH_ASSOC)) {
                array_push($arr_field2, $row2['Field']);
            }


            ///////bucle que cuenta la cantidad de items que contiene la compra y repite los prcesos de insercion de almacen, registro_det
            for ($i = 0; $i < count($dataItems); $i++) {
                //descomposicion del array $arr_field2  
                foreach ($arr_field2 as $key => $val) {
                    //comprobar si existen los elementos del objeto que contiene los datos de los items de la compra
                    if (isset($dataItems[$i]->$val)) {

                        //si existen simplemente se insertaran en el objeto $operacionesItems 
                        $operacionesItems->$val = $dataItems[$i]->$val;
                    } else {
                        //si no existen entoncs se remplazaran por 0 para que haya error
                        $operacionesItems->$val = 0;
                    }
                }

                $operacionesItems->id_tras_c = $trasid['id_tras'];

                if ($operacionesItems->create_det($getdb, $tbnom_det, $arr_field2)) {

                    if ($operacionesItems->insertAlamcen($dataItems[$i]->id_pro_tras, $dataInfo->id_almacen, $dataItems[$i]->cantidad, $dataItems[$i]->presentacion)) {

                        
                        $tras_id_det = $operacionesID->getLastIdTrasladoDet();
                        $trasiddet = $tras_id_det->fetch(PDO::FETCH_ASSOC);

                        if ($operacionesItems->movimientoAlmacen($trasiddet['id_tras_det'], $dataItems[$i], $dataInfo)) {
                            array_push($adver, array("message" => "Movimiento de almacen", "status" => "200"));
                        } else {
                            array_push($adver, array("message" => "Movimiento de almacen no grabado", "status" => "502"));
                        }
                        array_push($adver, array("message" => "Se Actualizo El Almacen", "status" => "200"));
                    } else {
                        array_push($adver, array("message" => "No se pudo actualizar el Almacen", "status" => "502"));
                    }

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
            array_push($adver, array("message" => "La Cabezera de La venta Se Creo Exitosamente", "status" => "200"));
        }
        // if unable to create the operaciones, tell the user
        else {
            // set response code - 503 service unavailable
            http_response_code(503);

            // tell the user
            array_push($adver, array("message" => "No se pudo Insertar la carga ", "status" => "503"));
        }
    }
}
echo json_encode($adver);
