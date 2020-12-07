<?php
class Insert2Tables
{
    // database connection and table name
    public $conn;
    public $field;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }
/*     function create($getdb, $tbnom, $field)
    {
        // query to insert record
        $query = "INSERT INTO
               `$getdb`." . " `$tbnom` " . "
               SET ";
        foreach ($field as $key => $val) {
            $query .= $val . "=:" . $val . ",";
        }
        $query = substr($query, 0, -1); //quitar la ultima coma de la cadena del "INSERT INTO " 

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        foreach ($field as $key => $val) {
            $this->$val = htmlspecialchars(strip_tags($this->$val));
        }
        foreach ($field as $key => $val) {
            $stmt->bindParam(":" . $val, $this->$val);
        }

        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    } */
    function createRegistroAsiento($getdb, $tbnom, $dataInfo, $serial, $id_compra)
    {
     /*    var_dump($dataInfo);
        var_dump($serial);
        var_dump($idcompra);
         $id_comprax = $id_compra['com_id'];
        // query to insert record
        $query = "INSERT INTO registro(to_id,tip_asi,reg_fec,reg_cod,usu_id,empre_id,anex_id,mnd_id,re_com_id)
               VALUES
               ($dataInfo->to_id,'05','$dataInfo->com_fecdoc',$serial+1,$dataInfo->usu_id,$dataInfo->emp_id,$dataInfo->ane_id,'$dataInfo->mnd_id',$id_comprax)";

        $stmt = $this->conn->prepare($query);

        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();  */
    }
    function getLastSerial($fecha)
    {
        $fech = explode("-", $fecha);
        // query to insert record
        $query = "SELECT reg_cod from registro WHERE MONTH (reg_fec) = $fech[1] AND YEAR (reg_fec) = $fech[0]
               ORDER by id DESC
               LIMIT 1";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function updateCantiadCompraDetAlmacen($detalle)
    {
       $com_id = $detalle->com_id;
       $cantidad = $detalle->cd_cantidadingresar;
        // query to insert record
        $query = "call compra_actual_almacen($com_id,$cantidad)";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }

    function cabezeraRegistroAlmacen($detalle,$info)
    {
/*         var_dump($detalle);
        var_dump($info); */
       $fec_alm = $info->alm_fecha;
       $com_id=$detalle->com_id;
       $ve_id=0;
       $cantidad = $detalle->cd_cantidadingresar;
       $alm_id =$detalle->alm_id;
        // query to insert record
        $query = "call movimiento_almacen('$fec_alm',$com_id,$ve_id,0,$cantidad,$alm_id)";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }

    function selectAsientoValor($com_id)
    {
        $comid = $com_id['com_id'];
        // query to insert record
        $query = "SELECT * FROM asientovalor WHERE NroCompra = $comid";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function selectAsientoValorImport($com_id)
    {
        $comid = $com_id['com_id'];
        // query to insert record
        $query = "SELECT * FROM asientoproductoimport WHERE NroCompra = $comid";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function selectAsientoAlmacen($com_id)
    {
        $comid = $com_id['com_id'];
        // query to insert record
        $query = "SELECT * FROM asientoalmacen WHERE NroCompra = $comid";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function selectAsientoAlmacen2($com_id)
    {
        $comid = $com_id['com_id'];
        // query to insert record
        $query = "SELECT * FROM asientoalmacen2 WHERE NroCompra = $comid";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function selectAsientoAlmacenImport($com_id)
    {
        $comid = $com_id['com_id'];
        // query to insert record
        $query = "SELECT * FROM asientoalmacenimport WHERE NroCompra = $comid";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function selectAsientoAlmacen2Import($com_id)
    {
        $comid = $com_id['com_id'];
        // query to insert record
        $query = "SELECT * FROM asientoalmacenimport2 WHERE NroCompra = $comid";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function selectAsientoAlmacenCompraAsociada($com_id)
    {
        $comid = $com_id['com_id'];
        // query to insert record
        $query = "SELECT * FROM asientoalmacencompraasociada WHERE NroCompra = $comid";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function selectAsientoAlmacen2CompraAsociada($com_id)
    {
        $comid = $com_id['com_id'];
        // query to insert record
        $query = "SELECT * FROM asientoalmacencompraasociada2 WHERE NroCompra = $comid";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function selectAsientoDetraccion()
    {
        // query to insert record
        $query = "SELECT * FROM tipo_producto WHERE tip_pro_id = 10";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function selectAsientoDetraccionPagoMnd($moneda)
    {
        switch ($moneda) {
            case 'PEN':
                $query = "SELECT * FROM tipo_producto WHERE tip_pro_id = 11 and mnd = '$moneda'";
                break;

            case 'USD':
                $query = "SELECT * FROM tipo_producto WHERE tip_pro_id = 12 and mnd = '$moneda'";
                break;

            default:

                break;
        }
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }

    function selectAsientoPredeterminados($to_id)
    {
        $tipo_operacion = $to_id->to_id;
        // query to insert record
        $query = "SELECT * FROM plantilla_asiento_det WHERE plaasi_id = $tipo_operacion";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function selectAsientoCentroCosto($cc_id)
    {
        // query to insert record
        $query = "SELECT * FROM centro_costo WHERE cc_id = $cc_id";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function generarAsientoDetraccion($reg_id, $detalles, $montodt)/* $lastAsiento, $rowAsiDt,$dataInfo->com_dt */
    {
        $reg_id = $reg_id['id'];
        $cta_id = $detalles['cuenta_contable'];
        $tip_pro_id = $detalles['tip_pro_id'];
        $pad_dh = "H";//alerta este se deja asi en H a pesar de que esta funcion dice Debe
        $rd_imp = $montodt;
        // query to insert record
        $query = "INSERT INTO registro_det(reg_id,cta_id,ti_pro_rd,d_h,rd_imp)
               values ($reg_id,$cta_id,$tip_pro_id,'$pad_dh','$rd_imp')";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    }
    function generarAsientoDetraccionH($reg_id, $detalles, $montodt)/* $lastAsiento, $rowAsiDt,$dataInfo->com_dt */
    {
        $reg_id = $reg_id['id'];
        $cta_id = $detalles['cuenta_contable'];
        $tip_pro_id = $detalles['tip_pro_id'];
        $pad_dh = "D";//alerta este se deja asi en D a pesar de que esta funcion dice Haber
        $rd_imp = $montodt;
        // query to insert record
        $query = "INSERT INTO registro_det(reg_id,cta_id,ti_pro_rd,d_h,rd_imp)
               values ($reg_id,$cta_id,$tip_pro_id,'$pad_dh','$rd_imp')";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    }

    function generarAsientoAlm($reg_id, $detalles)
    {
        $reg_id = $reg_id['id'];
        $cta_id = $detalles['IdPlanCuenta'];
        $tip_pro_id = $detalles['tip_pro_id'];
        $pad_dh = "H";
        $rd_imp = $detalles['totalcompra'];
        // query to insert record
        $query = "INSERT INTO registro_det(reg_id,cta_id,ti_pro_rd,d_h,rd_imp)
               values ($reg_id,$cta_id,$tip_pro_id,'$pad_dh','$rd_imp')";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    }
    function generarAsientoAlm2($reg_id, $detalles)
    {
        $reg_id = $reg_id['id'];
        $cta_id = $detalles['IdPlanCuenta'];
        $tip_pro_id = $detalles['tip_pro_id'];
        $pad_dh = "D";
        $rd_imp = $detalles['totalcompra'];
        // query to insert record
        $query = "INSERT INTO registro_det(reg_id,cta_id,ti_pro_rd,d_h,rd_imp)
               values ($reg_id,$cta_id,$tip_pro_id,'$pad_dh','$rd_imp')";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    }
    function generarAsientoCC($reg_id, $detalles, $mon)
    {
        $reg_id = round($reg_id['id'], 6);
        $cta_id = $detalles['cta_id'];
        $tip_pro_id = $mon->cd_pro_id;
        $pad_dh = "D";
        $rd_imp = $mon->cd_impdes;
        // query to insert record
        $query = "INSERT INTO registro_det(reg_id,cta_id,ti_pro_rd,d_h,rd_imp)
               values ($reg_id,$cta_id,$tip_pro_id,'$pad_dh','$rd_imp')";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    }
    function generarAsientoCC79($reg_id, $detalles, $mon)
    {
        $reg_id = round($reg_id['id'], 6);
        $cta_id = 5857;
        $tip_pro_id = $mon->cd_pro_id;
        $pad_dh = "H";
        $rd_imp = $mon->cd_impdes;
        // query to insert record
        $query = "INSERT INTO registro_det(reg_id,cta_id,ti_pro_rd,d_h,rd_imp)
               values ($reg_id,$cta_id,$tip_pro_id,'$pad_dh','$rd_imp')";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    }
    function generarAsientoBL($detalles)
    {

        $detalles = $detalles;
        $reg_id = $detalles[0]['reg_id'];
        $cta_id = $detalles[1]['cta_id'];
        $tip_pro_id = $detalles[2]['tip_pro_id'];
        $pad_dh = $detalles[3]['pad_dh'];
        if (isset($detalles[4]['rd_imp'])) {
            $rd_imp = round(($detalles[4]['rd_imp']), 6);
        }else {
            $rd_imp = 0;
        }

        // query to insert record
        $query = "INSERT INTO registro_det (reg_id,cta_id,ti_pro_rd,d_h,rd_imp)
               values ($reg_id,$cta_id,$tip_pro_id,'$pad_dh','$rd_imp')";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    }

    function getLastIdCompra()
    {
        // query to insert record
        $query = "SELECT com_id
               FROM compra
               ORDER by com_id DESC
               LIMIT 1";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }

    function getLastIdRegistroAsiento()
    {
        // query to insert record
        $query = "SELECT id
               FROM registro
               ORDER by id DESC
               LIMIT 1";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }

    function create_det($getdb, $tbnom, $field)
    {
        // query to insert record
        $query = "INSERT INTO
               `$getdb`." . " `$tbnom` " . "
               SET ";
        foreach ($field as $key => $val) {
            $query .= $val . "=:" . $val . ",";
        }
        $query = substr($query, 0, -1); //quitar la ultima coma de la cadena del "INSERT INTO " 

        // prepare query
        $stmt = $this->conn->prepare($query);
        // sanitize
        foreach ($field as $key => $val) {
            $this->$val = htmlspecialchars(strip_tags($this->$val));
        }
        foreach ($field as $key => $val) {
            $stmt->bindParam(":" . $val, $this->$val);
        }
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    }
    function verificarAlmacen($cd_pro_id, $alm_id, $cd_can, $pst_id)
    {
        $query = "select * from almacen where id_pro = $cd_pro_id and id_almac_info = $alm_id;";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }
    function insertAlamcen($cd_pro_id, $alm_id, $cd_can, $pst_id)
    {
        // query to insert record
        $query = "CALL registroalmacen($cd_pro_id,$alm_id,$cd_can,$pst_id);";
       
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    }
};
