
<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../insert2TablesVenta/insert2Tables.php';
include '../insert2TablesVenta/fields.php';

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

$dataPagos = $data->pagos;



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
                $insert2Tables->$val = null;
            }
        }


        // create the insert2Tables
        if ($insert2Tables->create($getdb, $tbnom, $arr_field)) {

            if (isset($dataInfo->documento_asociado)) {
                if ($insert2Tables->actualizarEstadoProceso($dataInfo->documento_asociado, 1)) {
                    array_push($adver, array("message" => "se actualizo el estado de proceso", "status" => "502"));
                } else {
                    array_push($adver, array("message" => "no se actualizo el estado de proceso", "status" => "200"));
                }
            }
            ////////////segundo insert bucle para ingresar todos los items
            $field2 = new Fields($db, $tbnom);
            $insert2TablesItems = new Insert2Tables($db);

            //declara la tabla venta_det para ingresar los item a la tabla
            $tbnom_det = $tbnom . "_det";

            //preparar el array de insercion de los datos 
            $field2 = $field2->fields($getdb, $tbnom_det);
            $numfield2 = $field2->rowCount();

            $arr_field2 = array();
            $insert2TablesID = new Insert2Tables($db);

            $insert2TablesID->actualizarSerie($dataInfo->emp_id,$dataInfo->loc_id,$dataInfo->ven_ser, $dataInfo->ven_num);


            //obtener el ultimo id de la compra para asociar la cabezera del asiento y y el detalle del asiento tablas "registo" y "registro_det" 
            $ven_id = $insert2TablesID->getLastIdVenta();
            $venid = $ven_id->fetch(PDO::FETCH_ASSOC);


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

                        //si existen simplemente se insertaran en el objeto $insert2TablesItems 
                        $insert2TablesItems->$val = $dataItems[$i]->$val;
                    } else {
                        //si no existen entoncs se remplazaran por 0 para que haya error
                        $insert2TablesItems->$val = 0;
                    }
                }

                $insert2TablesItems->venta_id = $venid['ven_id'];
                array_push($adver, array("message" => "ultimo id venta", "status" => "200", "ultimo" => $insert2TablesItems->venta_id));

                if ($insert2TablesItems->create_det($getdb, $tbnom_det, $arr_field2)) {

                    if ($insert2TablesItems->sacarAlmacen($dataItems[$i]->vt_pro_id, $dataInfo->cd_alm, $dataItems[$i]->vd_can)) {

                        $det_id = $insert2TablesID->getLastIdVentaDet();
                        $detid = $det_id->fetch(PDO::FETCH_ASSOC);

                        if ($insert2TablesItems->movimientoAlmacen($detid, $dataItems[$i], $dataInfo)) {
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

            foreach ($dataPagos as $key) {
                //insertar pagos 
                if ($insert2TablesItems->create_pago($getdb, $dataInfo, $key, $venid['ven_id'])) {
                    // set response code - 201 created
                    http_response_code(201);
                    // tell the user
                    array_push($adver, array("message" => "se inserto el pagos.", "status" => "200"));
                } else {
                    array_push($adver, array("message" => "No se pudo Insertar los pagos", "status" => "503"));
                }
            }


            // set response code - 201 created
            http_response_code(201);

            // tell the user
            array_push($adver, array("message" => "La Cabezera de La venta Se Creo Exitosamente", "status" => "200"));
        }
        // if unable to create the insert2Tables, tell the user
        else {
            // set response code - 503 service unavailable
            http_response_code(503);

            // tell the user
            array_push($adver, array("message" => "No se pudo Insertar la Venta", "status" => "503"));
        }
    }
}
echo json_encode($adver);
