
<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../insert2Tables/insert2Tables.php';
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

$adver = array();

$dataInfo = $data->info[0];
$dataItems = $data->items;
// make sure data is not empty
if (true) {
    if ($dataInfo->td_id == 'FA' || $dataInfo->td_id == 'BO' || $dataInfo->td_id == 'NV' || $dataInfo->td_id == 'RH') {
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
            $com_id = $insert2TablesID->getLastIdCompra();
            $comid = $com_id->fetch(PDO::FETCH_ASSOC);

            //actualizar estado del documento
            if(isset($dataInfo->com_doc_aso)){
                $insert2Tables->actualizarEstadoProceso($dataInfo->com_doc_aso,1);
            }

            //se crea el la cabezera del asiento 
            if ($insert2Tables->createRegistroAsiento($getdb, $tbnom, $dataInfo, $serial, $comid)) {
                array_push($adver, array("message" => "Se Creo la cabezera del Registo", "status" => "200"));
            };

            //obtener el ultimo id de la tabla "registo" (la cabezera del asiento) para relacionar el detalle con la cabezera "registro_det" (items del asiento)
            $regAsiento_id = $insert2TablesID->getLastIdRegistroAsiento();
            $lastAsiento = $regAsiento_id->fetch(PDO::FETCH_ASSOC);

            ////bucle para obtener las columnas de la tabla compra_det, para luego insertar los items en cada columns de esta tabla
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
                        $insert2TablesItems->det_com_id = $comid['com_id'];
                    } else {
                        //si no existen entoncs se remplazaran por 0 para que haya error
                        $insert2TablesItems->$val = 0;
                    }
                }

                if ($insert2TablesItems->create_det($getdb, $tbnom_det, $arr_field2)) {
                    if (isset($dataInfo->alm_id)) {
                        if ($dataInfo->alm_id != 0) {
                            if ($insert2TablesItems->insertAlamcen($dataItems[$i]->cd_pro_id, $dataInfo->alm_id, $dataItems[$i]->cd_can, $dataItems[$i]->pst_id)) {
    
                                $det_id = $insert2TablesID->getLastIdCompraDet();
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
                        } else {
                            array_push($adver, array("message" => "No se selecciono un Almacen", "status" => "200"));
                        }
                    } else {
                        array_push($adver, array("message" => "Almacen no existe", "status" => "200"));
                    }
            
                    array_push($adver, array("message" => "se inserto el objeto.", "status" => "200"));
                }
                if (isset($dataItems[$i]->cc_id)) {
                    if ($cc_asiento = $insert2Tables->selectAsientoCentroCosto($dataItems[$i]->cc_id)) {
                        while ($rowCC = $cc_asiento->fetch(PDO::FETCH_ASSOC)) {
                            if ($generarAsiento = $insert2Tables->generarAsientoCC($lastAsiento, $rowCC, $dataItems[$i])) {
                                array_push($adver, array("message" => "Se Creo el asiento del centro de costo", "status" => "200"));
                                if ($generarAsiento = $insert2Tables->generarAsientoCC79($lastAsiento, $rowCC, $dataItems[$i])) {
                                    array_push($adver, array("message" => "Se Creo el asiento del centro de costo 79", "status" => "200"));
                                }
                            } else {
                                array_push($adver, array("message" => "El item tiene Centro de costo, pero no existe el centro de costo", "status" => "502"));
                            }
                        }
                    }
                } else {
                    array_push($adver, array("message" => "El item no tiene centro de costo", "status" => "200"));
                }
            }

            $ass = $insert2Tables->selectAsientoValor($comid);
            $assDet = $insert2Tables->selectAsientoPredeterminados($dataInfo);
            $plantillaAsiento = array();

            while ($rowAsi1 = $ass->fetch(PDO::FETCH_ASSOC)) {
                array_push($plantillaAsiento, $rowAsi1);
            }
            //verificar el almacen seleccionado para realizar el asiento del mismo
            if (isset($dataInfo->alm_id)) {
                if ($dataInfo->alm_id != 0) {
                    $alm = $insert2Tables->selectAsientoAlmacen($comid);
                    $alm2 = $insert2Tables->selectAsientoAlmacen2($comid);
                    while ($rowAsiAlm = $alm->fetch(PDO::FETCH_ASSOC)) {
                        if ($insert2Tables->generarAsientoAlm($lastAsiento, $rowAsiAlm)) {
                            array_push($adver, array("message" => "El asiento de almacen Debe se creo ", "status" => "200"));
                        } else {
                            array_push($adver, array("message" => "el asiento del Debe almacen no se creo", "status" => "503"));
                        }
                    }

                    while ($rowAsiAlm2 = $alm2->fetch(PDO::FETCH_ASSOC)) {
                        if ($insert2Tables->generarAsientoAlm2($lastAsiento, $rowAsiAlm2)) {
                            array_push($adver, array("message" => "El asiento de almacen Haber se creo ", "status" => "200"));
                        } else {
                            array_push($adver, array("message" => "el asiento del Haber almacen no se creo", "status" => "503"));
                        }
                    }
                }
            }
            if (isset($dataInfo->compraAsociada)) {
                if ($dataInfo->compraAsociada == true) {

                    $alm = $insert2Tables->selectAsientoAlmacenCompraAsociada($comid);
                    $alm2 = $insert2Tables->selectAsientoAlmacen2CompraAsociada($comid);

                    while ($rowAsiAlm = $alm->fetch(PDO::FETCH_ASSOC)) {
                        if ($insert2Tables->generarAsientoAlm($lastAsiento, $rowAsiAlm)) {
                            array_push($adver, array("message" => "El asiento de almacen Debe de Importacion se creo ", "status" => "200"));
                        } else {
                            array_push($adver, array("message" => "el asiento de almacen Debe de Importacion no se creo", "status" => "503"));
                        }
                    }

                    while ($rowAsiAlm2 = $alm2->fetch(PDO::FETCH_ASSOC)) {
                        if ($insert2Tables->generarAsientoAlm2($lastAsiento, $rowAsiAlm2)) {
                            array_push($adver, array("message" => "El asiento de almacen Haber de Importacion se creo ", "status" => "200"));
                        } else {
                            array_push($adver, array("message" => "el asiento de almacen Haber  no se creo", "status" => "503"));
                        }
                    }
                }
            }

            if (isset($dataInfo->com_dt)) {
                $dtAsiento1 = $insert2Tables->selectAsientoDetraccion();
                $dtAsientoDtPago = $insert2Tables->selectAsientoDetraccionPagoMnd($dataInfo->mnd_id);

                while ($rowAsiDt = $dtAsiento1->fetch(PDO::FETCH_ASSOC)) {
                    if ($insert2Tables->generarAsientoDetraccion($lastAsiento, $rowAsiDt, $dataInfo->com_dt)) {
                        array_push($adver, array("message" => "El asiento de la detraccion Debe se creo ", "status" => "200"));
                    } else {
                        array_push($adver, array("message" => "El asiento de Detraccion Debe no se Creo", "status" => "503"));
                    }
                }
                while ($rowAsiDtPago = $dtAsientoDtPago->fetch(PDO::FETCH_ASSOC)) {
                    if ($insert2Tables->generarAsientoDetraccionH($lastAsiento, $rowAsiDtPago, $dataInfo->com_dt)) {
                        array_push($adver, array("message" => "El asiento de la detraccion Haber se creo", "status" => "200"));
                    } else {
                        array_push($adver, array("message" => "El asiento de Detraccion Haber no se Creo", "status" => "503"));
                    }
                }
            } else {
                array_push($adver, array("message" => "este documento no tiene Detracción", "status" => "200"));
            }

            while ($rowAsi2 = $assDet->fetch(PDO::FETCH_ASSOC)) {
                array_push($plantillaAsiento, $rowAsi2);
            }

            // set response code - 201 created
            http_response_code(201);

            // tell the user
            array_push($adver, array("message" => "La Cabezera de La Compra Se Creo Exitosamente", "status" => "200"));

            $lsAsiento = $lastAsiento['id'];

            $detalle = array();

            for ($i = 0; $i < count($plantillaAsiento); $i++) {
                $detalle[$i] = array();
                if (isset($plantillaAsiento[$i]['NroCompra'])) {
                    array_push($detalle[$i], array("reg_id" => $lsAsiento));
                } else {
                    array_push($detalle[$i], array("reg_id" => $lsAsiento));
                }
                if (isset($plantillaAsiento[$i]['cta_id']) && !isset($plantillaAsiento[$i]['IdPlanCuenta'])) {
                    array_push($detalle[$i], array("cta_id" => $plantillaAsiento[$i]['cta_id']));
                }
                if (isset($plantillaAsiento[$i]['IdPlanCuenta'])) {
                    array_push($detalle[$i], array("cta_id" => $plantillaAsiento[$i]['IdPlanCuenta']));
                }
                if (isset($plantillaAsiento[$i]['tip_pro_id'])) {
                    array_push($detalle[$i], array("tip_pro_id" => $plantillaAsiento[$i]['tip_pro_id']));
                } else {
                    array_push($detalle[$i], array("tip_pro_id" => 0));
                }
                if (isset($plantillaAsiento[$i]['pad_dh'])) {
                    array_push($detalle[$i], array("pad_dh" => $plantillaAsiento[$i]['pad_dh']));
                } else {
                    array_push($detalle[$i], array("pad_dh" => 'D'));
                }
                if (isset($plantillaAsiento[$i]['prm_id'])) {
                    $param = $plantillaAsiento[$i]['prm_id'];
                    switch ($param) {
                        case '1': //afecto + inafecto
                            array_push($detalle[$i], array("rd_imp" => $dataInfo['com_afe'] + $dataInfo['com_ina']));
                            break;
                        case '2': //ISC
                            if ($dataInfo->com_isc > 0) {
                                array_push($detalle[$i], array("rd_imp" => $dataInfo->com_isc));
                            } else {
                                array_push($detalle[$i], array("rd_imp" => 0));
                            }
                            break;

                        case '3': //IGV
                            if ($dataInfo->com_igv > 0) {
                                array_push($detalle[$i], array("rd_imp" => $dataInfo->com_igv));
                            } else {
                                array_push($detalle[$i], array("rd_imp" => 0));
                            }
                            break;

                        case '4': //Total Descuento
                            if ($dataInfo->com_totdscto > 0) {

                                array_push($detalle[$i], array("rd_imp" => $dataInfo->com_totdscto));
                            } else {
                                array_push($detalle[$i], array("rd_imp" => 0));
                            }
                            break;

                        case '5': //Total Documento
                            if ($dataInfo->com_totdoc > 0) {
                                array_push($detalle[$i], array("rd_imp" => $dataInfo->com_totdoc));
                            } else {
                                array_push($detalle[$i], array("rd_imp" => 0));
                            }
                            break;

                        case '6': //Percerpcion
                            if ($dataInfo->com_per > 0) {
                                array_push($detalle[$i], array("rd_imp" => $dataInfo->com_per));
                            } else {
                                array_push($detalle[$i], array("rd_imp" => 0));
                            }
                            break;
                        case '7': //Total Pagar
                            if ($dataInfo->com_totdoc > 0) {
                                if ($plantillaAsiento[$i]['mnd_id'] == $dataInfo->mnd_id) {
                                    array_push($detalle[$i], array("rd_imp" => $dataInfo->com_totdoc));
                                } else {
                                    array_push($detalle[$i], array("rd_imp" => 0));
                                }
                            }
                            break;
                        case '8': //Retenciones
                            if ($dataInfo->com_ret > 0) {
                                array_push($detalle[$i], array("rd_imp" => $dataInfo->com_ret));
                            } else {
                                array_push($detalle[$i], array("rd_imp" => 0));
                            }
                            break;
                        case '9': //Detracciones

                            break;

                        case '10': //Costo de Ventas

                            break;
                        case '11': //Comision

                            break;

                        default:

                            break;
                    }
                } else {
                    if (isset($plantillaAsiento[$i]['totalcompra'])) {
                        array_push($detalle[$i], array("rd_imp" => $plantillaAsiento[$i]['totalcompra']));
                    }
                }
                if ($generarAsiento = $insert2Tables->generarAsientoBL($detalle[$i])) {
                    array_push($adver, array("message" => "Se Creo el asiento", "status" => "200"));
                };
            }
        }
        // if unable to create the insert2Tables, tell the user
        else {
            // set response code - 503 service unavailable
            http_response_code(503);

            // tell the user
            array_push($adver, array("message" => "No se pudo Insertar la Compra", "status" => "503"));
        }
    }
    //condicion para registrar el invioce documento internacional factura internacional 
    if ($dataInfo->td_id == 'IV') {
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
            $com_id = $insert2TablesID->getLastIdCompra();
            $comid = $com_id->fetch(PDO::FETCH_ASSOC);

            //se crea el la cabezera del asiento 
            if ($insert2Tables->createRegistroAsiento($getdb, $tbnom, $dataInfo, $serial, $comid)) {
                array_push($adver, array("message" => "Se Creo la cabezera del Registo", "status" => "200"));
            };

            //obtener el ultimo id de la tabla "registo" (la cabezera del asiento) para relacionar el detalle con la cabezera "registro_det" (items del asiento)
            $regAsiento_id = $insert2TablesID->getLastIdRegistroAsiento();
            $lastAsiento = $regAsiento_id->fetch(PDO::FETCH_ASSOC);

            ////bucle para obtener las columnas de la tabla compra_det, para luego insertar los items en cada columns de esta tabla
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
                        $insert2TablesItems->det_com_id = $comid['com_id'];
                    } else {
                        //si no existen entoncs se remplazaran por 0 para que haya error
                        $insert2TablesItems->$val = 0;
                    }
                }
                if ($insert2TablesItems->create_det($getdb, $tbnom_det, $arr_field2)) {

                    // set response code - 201 created
                    http_response_code(201);
                    // tell the user
                    array_push($adver, array("message" => "se inserto el objeto.", "status" => "200"));
                }
            }

            $ass = $insert2Tables->selectAsientoValorImport($comid);
            $assDet = $insert2Tables->selectAsientoPredeterminados($dataInfo);
            $plantillaAsiento = array();

            while ($rowAsi1 = $ass->fetch(PDO::FETCH_ASSOC)) {
                array_push($plantillaAsiento, $rowAsi1);
            }

            //verificar el almacen seleccionado para realizar el asiento del mismo
            if (true) {

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
                        array_push($adver, array("message" => "El asiento de almacen Haber de Importacion se creo ", "status" => "200"));
                    } else {
                        array_push($adver, array("message" => "el asiento de almacen Haber  no se creo", "status" => "503"));
                    }
                }
            }


            while ($rowAsi2 = $assDet->fetch(PDO::FETCH_ASSOC)) {
                array_push($plantillaAsiento, $rowAsi2);
            }

            // set response code - 201 created
            http_response_code(201);

            // tell the user
            array_push($adver, array("message" => "La Cabezera de La Compra Invoice Se Creo Exitosamente", "status" => "200"));
            $lsAsiento = $lastAsiento['id'];

            $detallev = array();

            for ($i = 0; $i < count($plantillaAsiento); $i++) {
                $detallev[$i] = array();
                if (isset($plantillaAsiento[$i]['NroCompra'])) {
                    array_push($detallev[$i], array("reg_id" => $lsAsiento));
                } else {
                    array_push($detallev[$i], array("reg_id" => $lsAsiento));
                }
                if (isset($plantillaAsiento[$i]['cta_id']) && !isset($plantillaAsiento[$i]['IdPlanCuenta'])) {
                    array_push($detallev[$i], array("cta_id" => $plantillaAsiento[$i]['cta_id']));
                }
                if (isset($plantillaAsiento[$i]['IdPlanCuenta'])) {
                    array_push($detallev[$i], array("cta_id" => $plantillaAsiento[$i]['IdPlanCuenta']));
                }
                if (isset($plantillaAsiento[$i]['tip_pro_id'])) {
                    array_push($detallev[$i], array("tip_pro_id" => $plantillaAsiento[$i]['tip_pro_id']));
                } else {
                    array_push($detallev[$i], array("tip_pro_id" => 0));
                }
                if (isset($plantillaAsiento[$i]['pad_dh'])) {

                    array_push($detallev[$i], array("pad_dh" => $plantillaAsiento[$i]['pad_dh']));
                } else {
                    array_push($detallev[$i], array("pad_dh" => 'D'));
                }
                if (isset($plantillaAsiento[$i]['prm_id'])) {
                    $param = $plantillaAsiento[$i]['prm_id'];
                    switch ($param) {
                        case '1': //afecto + inafecto
                            array_push($detallev[$i], array("rd_imp" => $dataInfo->com_totdoc));
                            break;
                        case '2': //ISC
                            if ($dataInfo->com_isc > 0) {
                                array_push($detallev[$i], array("rd_imp" => $dataInfo->com_isc));
                            } else {
                                array_push($detallev[$i], array("rd_imp" => 0));
                            }
                            break;

                        case '3': //IGV
                            if ($dataInfo->com_igv > 0) {
                                array_push($detallev[$i], array("rd_imp" => $dataInfo->com_igv));
                            } else {
                                array_push($detallev[$i], array("rd_imp" => 0));
                            }
                            break;
                        case '4': //Total Descuento
                            if ($dataInfo->com_totdscto > 0) {

                                array_push($detallev[$i], array("rd_imp" => $dataInfo->com_totdscto));
                            } else {
                                array_push($detallev[$i], array("rd_imp" => 0));
                            }
                            break;

                        case '5': //Total Documento
                            if ($dataInfo->com_totdoc > 0) {
                                array_push($detallev[$i], array("rd_imprrr" => $dataInfo->com_totdoc));
                            } else {
                                array_push($detallev[$i], array("rd_impeee" => 0));
                            }
                            break;

                        case '6': //Percerpcion
                            if ($dataInfo->com_per > 0) {
                                array_push($detallev[$i], array("rd_imp" => $dataInfo->com_per));
                            } else {
                                array_push($detallev[$i], array("rd_imp" => 0));
                            }
                            break;
                        case '7': //Total Pagar
                            if ($dataInfo->com_totdoc > 0) {
                                if ($plantillaAsiento[$i]['mnd_id'] == $dataInfo->mnd_id) {
                                    array_push($detallev[$i], array("rd_imp" => $dataInfo->com_totdoc));
                                } else {
                                    array_push($detallev[$i], array("rd_imp" => 0));
                                }
                            }
                            break;
                        case '8': //Retenciones
                            if ($dataInfo->com_ret > 0) {
                                array_push($detallev[$i], array("rd_imp" => $dataInfo->com_ret));
                            } else {
                                array_push($detallev[$i], array("rd_imp" => 0));
                            }
                            break;
                        case '9': //Detracciones

                            break;

                        case '10': //Costo de Ventas

                            break;
                        case '11': //Comision

                            break;

                        default:

                            break;
                    }
                } else {
                    if (isset($plantillaAsiento[$i]['totalcompra'])) {
                        array_push($detallev[$i], array("rd_imp" => $plantillaAsiento[$i]['totalcompra']));
                    }
                }
                if ($generarAsiento = $insert2Tables->generarAsientoBL($detallev[$i])) {
                    array_push($adver, array("message" => "Se Creo el asiento", "status" => "200"));
                };
            }
        }
        // if unable to create the insert2Tables, tell the user
        else {
            // set response code - 503 service unavailable
            http_response_code(503);

            // tell the user
            array_push($adver, array("message" => "No se pudo Insertar la Compra", "status" => "503"));
        }
    }

    //condicion para registrar documentos relcionados con el invoice documentos internacionales 
    if ($dataInfo->td_id == 'DN') {
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
            $com_id = $insert2TablesID->getLastIdCompra();
            $comid = $com_id->fetch(PDO::FETCH_ASSOC);

            //se crea el la cabezera del asiento 
            if ($insert2Tables->createRegistroAsiento($getdb, $tbnom, $dataInfo, $serial, $comid)) {
                array_push($adver, array("message" => "Se Creo la cabezera del Registo", "status" => "200"));
            };

            //obtener el ultimo id de la tabla "registo" (la cabezera del asiento) para relacionar el detalle con la cabezera "registro_det" (items del asiento)
            $regAsiento_id = $insert2TablesID->getLastIdRegistroAsiento();
            $lastAsiento = $regAsiento_id->fetch(PDO::FETCH_ASSOC);

            ////bucle para obtener las columnas de la tabla compra_det, para luego insertar los items en cada columns de esta tabla
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
                        $insert2TablesItems->det_com_id = $comid['com_id'];
                    } else {
                        //si no existen entoncs se remplazaran por 0 para que haya error
                        $insert2TablesItems->$val = 0;
                    }
                }
                if ($insert2TablesItems->create_det($getdb, $tbnom_det, $arr_field2)) {

                    // set response code - 201 created
                    http_response_code(201);
                    // tell the user
                    array_push($adver, array("message" => "se inserto el objeto.", "status" => "200"));
                }
            }

            $ass = $insert2Tables->selectAsientoValorImport($comid);
            $assDet = $insert2Tables->selectAsientoPredeterminados($dataInfo);
            $plantillaAsiento = array();

            while ($rowAsi1 = $ass->fetch(PDO::FETCH_ASSOC)) {
                array_push($plantillaAsiento, $rowAsi1);
            }

            //verificar el almacen seleccionado para realizar el asiento del mismo
            if (true) {

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


            while ($rowAsi2 = $assDet->fetch(PDO::FETCH_ASSOC)) {
                array_push($plantillaAsiento, $rowAsi2);
            }

            // set response code - 201 created
            http_response_code(201);

            // tell the user
            array_push($adver, array("message" => "La Cabezera de La Compra Invoice Se Creo Exitosamente", "status" => "200"));
            $lsAsiento = $lastAsiento['id'];

            $detallev = array();

            for ($i = 0; $i < count($plantillaAsiento); $i++) {
                $detallev[$i] = array();
                if (isset($plantillaAsiento[$i]['NroCompra'])) {
                    array_push($detallev[$i], array("reg_id" => $lsAsiento));
                } else {
                    array_push($detallev[$i], array("reg_id" => $lsAsiento));
                }
                if (isset($plantillaAsiento[$i]['cta_id']) && !isset($plantillaAsiento[$i]['IdPlanCuenta'])) {
                    array_push($detallev[$i], array("cta_id" => $plantillaAsiento[$i]['cta_id']));
                }
                if (isset($plantillaAsiento[$i]['IdPlanCuenta'])) {
                    array_push($detallev[$i], array("cta_id" => $plantillaAsiento[$i]['IdPlanCuenta']));
                }
                if (isset($plantillaAsiento[$i]['tip_pro_id'])) {
                    array_push($detallev[$i], array("tip_pro_id" => $plantillaAsiento[$i]['tip_pro_id']));
                } else {
                    array_push($detallev[$i], array("tip_pro_id" => 0));
                }
                if (isset($plantillaAsiento[$i]['pad_dh'])) {

                    array_push($detallev[$i], array("pad_dh" => $plantillaAsiento[$i]['pad_dh']));
                } else {
                    array_push($detallev[$i], array("pad_dh" => 'D'));
                }
                if (isset($plantillaAsiento[$i]['prm_id'])) {
                    $param = $plantillaAsiento[$i]['prm_id'];
                    switch ($param) {
                        case '1': //afecto + inafecto
                            array_push($detallev[$i], array("rd_imp" => $dataInfo->com_totdoc));
                            break;
                        case '2': //ISC
                            if ($dataInfo->com_isc > 0) {
                                array_push($detallev[$i], array("rd_imp" => $dataInfo->com_isc));
                            } else {
                                array_push($detallev[$i], array("rd_imp" => 0));
                            }
                            break;

                        case '3': //IGV
                            if ($dataInfo->com_igv > 0) {
                                array_push($detallev[$i], array("rd_imp" => $dataInfo->com_igv));
                            } else {
                                array_push($detallev[$i], array("rd_imp" => 0));
                            }
                            break;
                        case '4': //Total Descuento
                            if ($dataInfo->com_totdscto > 0) {

                                array_push($detallev[$i], array("rd_imp" => $dataInfo->com_totdscto));
                            } else {
                                array_push($detallev[$i], array("rd_imp" => 0));
                            }
                            break;

                        case '5': //Total Documento
                            if ($dataInfo->com_totdoc > 0) {
                                array_push($detallev[$i], array("rd_imprrr" => $dataInfo->com_totdoc));
                            } else {
                                array_push($detallev[$i], array("rd_impeee" => 0));
                            }
                            break;

                        case '6': //Percerpcion
                            if ($dataInfo->com_per > 0) {
                                array_push($detallev[$i], array("rd_imp" => $dataInfo->com_per));
                            } else {
                                array_push($detallev[$i], array("rd_imp" => 0));
                            }
                            break;
                        case '7': //Total Pagar
                            if ($dataInfo->com_totdoc > 0) {
                                if ($plantillaAsiento[$i]['mnd_id'] == $dataInfo->mnd_id) {
                                    array_push($detallev[$i], array("rd_imp" => $dataInfo->com_totdoc));
                                } else {
                                    array_push($detallev[$i], array("rd_imp" => 0));
                                }
                            }
                            break;
                        case '8': //Retenciones
                            if ($dataInfo->com_ret > 0) {
                                array_push($detallev[$i], array("rd_imp" => $dataInfo->com_ret));
                            } else {
                                array_push($detallev[$i], array("rd_imp" => 0));
                            }
                            break;
                        case '9': //Detracciones

                            break;

                        case '10': //Costo de Ventas

                            break;
                        case '11': //Comision

                            break;

                        default:

                            break;
                    }
                } else {
                    if (isset($plantillaAsiento[$i]['totalcompra'])) {
                        array_push($detallev[$i], array("rd_imp" => $plantillaAsiento[$i]['totalcompra']));
                    }
                }
                if ($generarAsiento = $insert2Tables->generarAsientoBL($detallev[$i])) {
                    array_push($adver, array("message" => "Se Creo el asiento", "status" => "200"));
                };
            }
        }
        // if unable to create the insert2Tables, tell the user
        else {
            // set response code - 503 service unavailable
            http_response_code(503);
            // tell the user
            array_push($adver, array("message" => "No se pudo Insertar la Compra", "status" => "503"));
        }
    }
}
echo json_encode($adver);
