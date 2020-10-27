
<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../insert2TablesAlmacenIngreso/insert2Tables.php';
include '../insert2TablesAlmacenIngreso/fields.php';

// instantiate database and insert2Tables object

$database = new Database();

$getdb = $_GET["getdb"];
$tbnom = "";

$db = $database->getConnection($getdb);

// initialize object
$field = new Fields($db, $tbnom);

$insert2Tables = new Insert2Tables($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

$adver = array();

$dataInfo = $data->info[0];
$dataAlmInfo = $data->almInfo[0];
$dataItems = $data->items;
// make sure data is not empty
if (true) {
    $ser = $insert2Tables->getLastSerial($dataInfo->com_fecdoc);
    $ser_id = $ser->fetch(PDO::FETCH_ASSOC);

    /* $registro_Serial = $registroSerial->fetch(PDO::FETCH_ASSOC); */
    $serial = $ser_id['reg_cod']; //ultimo serial de registro del asiento contable

    ////////////segundo insert bucle para ingresar todos los items
    $field2 = new Fields($db, $tbnom);
    $insert2TablesItems = new Insert2Tables($db);

    //declara la tabla compra_det para ingresar los item a la tabla
    $tbnom_det = $tbnom . "_det";

    //preparar el array de insercion de los datos 
    $field2 = $field2->fields($getdb, $tbnom_det);
    $numfield2 = $field2->rowCount();

    $arr_field2 = array();
    $insert2TablesID = new Insert2Tables($db);

    //obtener el ultimo id de la compra para asociar la cabezera del asiento y y el detalle del asiento tablas "registo" y "registro_det" 
    $comid = $dataInfo->com_id;

    /*      //se crea el la cabezera del asiento 
            if ($insert2Tables->createRegistroAsiento($getdb, $tbnom, $dataInfo, $serial, $comid)) {
                array_push($adver, array("message" => "Se Creo la cabezera del Registo", "status" => "200"));
            }else {
                array_push($adver, array("message" => "NO se Creo la cabezera del Registo", "status" => "502"));
                
            } */

    //obtener el ultimo id de la tabla "registo" (la cabezera del asiento) para relacionar el detalle con la cabezera "registro_det" (items del asiento)
    /*   $regAsiento_id = $insert2TablesID->getLastIdRegistroAsiento();
            $lastAsiento = $regAsiento_id->fetch(PDO::FETCH_ASSOC);
 */
    ///////bucle que cuenta la cantidad de items que contiene la compra y repite los prcesos de insercion de almacen, registro_det
    for ($i = 0; $i < count($dataItems); $i++) {

        if ($insert2Tables->updateCantiadCompraDetAlmacen($dataItems[$i])) {
            if ($insert2Tables->insertAlamcen($dataItems[$i]->cd_pro_id, $dataItems[$i]->alm_id, $dataItems[$i]->cd_cantidadingresar, $dataItems[$i]->pst_id)) {
                array_push($adver, array("message" => "almacen insert success", "status" => "200"));
                if ($insert2Tables->cabezeraRegistroAlmacen($dataItems[$i],$dataAlmInfo)) {
                    array_push($adver, array("message" => "Cabezera Almacen success", "status" => "200"));
                } else {
                    array_push($adver, array("message" => "Fallo al crear la cabezera del Almacen", "status" => "502"));
                }
            } else {
                array_push($adver, array("message" => "almacen insert fail fallo", "status" => "502"));
            }
            array_push($adver, array("message" => "update chido", "status" => "200"));
        } else {
            array_push($adver, array("message" => "update fallo", "status" => "502"));
        }
    }

    //verificar el almacen seleccionado para realizar el asiento del mismo
    if (false) {

        $alm = $insert2Tables->selectAsientoAlmacenImport($comid);

        $alm2 = $insert2Tables->selectAsientoAlmacen2Import($comid);

        while ($rowAsiAlm = $alm->fetch(PDO::FETCH_ASSOC)) {
            if ($insert2Tables->generarAsientoAlm($lastAsiento, $rowAsiAlm)) {
                array_push($adver, array("message" => "El asiento de almacen Debe de Importacion se creo ", "status" => "200"));
            } else {
                array_push($adver, array("message" => "el asiento de almacen Debe de Importacion no se creo", "status" => "503"));
            }
        }

        while ($rowAsiAlm2 = $alm2->fetch(PDO::FETCH_ASSOC)) {
            if ($insert2Tables->generarAsientoAlm2($lastAsiento, $rowAsiAlm2)) {
                array_push($adver, array("message" => "El asiento de almacen Haber de Importacion se creo", "status" => "200"));
            } else {
                array_push($adver, array("message" => "el asiento de almacen Haber  no se creo", "status" => "503"));
            }
        }
    }
}
echo json_encode($adver);
