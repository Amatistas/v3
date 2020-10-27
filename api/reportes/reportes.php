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

    function reporteCompra($getdb,$fechainicio,$fechafin)
    {
        // select all query
        $query = "SELECT * FROM `$getdb`.reporte_registro_compra where com_fecdoc >= '$fechainicio' and  com_fecdoc <= '$fechafin'";
  
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    
    function reporteVenta($getdb,$fechainicio,$fechafin)
    {
        // select all query
        $query = "SELECT * FROM `$getdb`.reportegeneralventa where ven_fecreg >= '$fechainicio' and  ven_fecreg <= '$fechafin'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    function reporteUtilidad($getdb,$id_producto,$fechainicio,$fechafin)
    {
        // select all query
        $query = "SELECT * FROM `$getdb`.reporte_utilidad_pro where ven_fecreg >= '$fechainicio' and  ven_fecreg <= '$fechafin' and pro_id = $id_producto";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    function reporteUtilidadGeneral($getdb,$fechainicio,$fechafin)
    {
        // select all query
        $query = "SELECT * FROM `$getdb`.reporte_general_utilidad where ven_fecreg >= '$fechainicio' and  ven_fecreg <= '$fechafin'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
};
