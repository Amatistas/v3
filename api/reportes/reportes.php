<?php
class Reportes
{
    // database connection and table name
    public $conn;
    public $field;
    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    function reporteCompra($getdb, $fechainicio, $fechafin)
    {
        // select all query
        $query = "SELECT * FROM `$getdb`.reporte_registro_compra where com_fecdoc >= '$fechainicio' and  com_fecdoc <= '$fechafin'";

        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }

    function reporteVenta($getdb, $fechainicio, $fechafin)
    {
        // select all query
        $query = "SELECT * FROM `$getdb`.reportegeneralventa where ven_fecreg >= '$fechainicio' and  ven_fecreg <= '$fechafin'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    function reporteUtilidad($getdb, $id_producto, $fechainicio, $fechafin)
    {
        // select all query
        $query = "SELECT * FROM `$getdb`.reporte_utilidad_pro where ven_fecreg >= '$fechainicio' and  ven_fecreg <= '$fechafin' and pro_id = $id_producto";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    function reporteUtilidadGeneral($getdb, $fechainicio, $fechafin)
    {
        // select all query
        $query = "SELECT * FROM `$getdb`.reporte_general_utilidad where ven_fecreg >= '$fechainicio' and  ven_fecreg <= '$fechafin'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    function reporteKardex($getdb)
    {
        $query = "SELECT * FROM (select producto_pro.pro_id,producto_pro.pro_cod,pro_nom,stock, 
            sum(vd_can) as ventas,
            sum(cd_can) as compras from producto_pro

            join almacen on almacen.id_pro = producto_pro.pro_id

            left join venta_det on venta_det.vt_pro_id = producto_pro.pro_id

            left join compra_det on compra_det.cd_pro_id = producto_pro.pro_id

            left join traslado_almacen_det on traslado_almacen_det.id_pro_tras = producto_pro.pro_id

            group by producto_pro.pro_id)T1 

            left join ( SELECT sum(cantidad) as carga,id_pro_tras from traslado_almacen_det 
            join traslado_almacen on traslado_almacen.id_tras = traslado_almacen_det.id_tras_c 
            join tipo_operacion on tipo_operacion.to_id = traslado_almacen.tip_ope where to_nom = 'Carga Almacén'
            GROUP by id_pro_tras)T2 on T1.pro_id = T2.id_pro_tras 

            left join ( SELECT sum(cantidad) as carga,id_pro_tras from traslado_almacen_det 
            join traslado_almacen on traslado_almacen.id_tras = traslado_almacen_det.id_tras_c 
            join tipo_operacion on tipo_operacion.to_id = traslado_almacen.tip_ope where to_nom = 'Descarga Almacén'
            GROUP by id_pro_tras)T3 on T1.pro_id = T3.id_pro_tras";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
};
