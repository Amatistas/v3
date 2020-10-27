<?php
class createNewService
{
    // database connection and table name
    public $conn;
    public $field;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }
    function createAsiento($getdb,$tbnom,$data)
    {
        $tip_pro_desc = $data->pro_nom;
        $dh = $data->dh;
        $cuenta_contable = $data->cuenta_contable;

            // query to insert record
               $query = "INSERT INTO `$getdb`.`tipo_producto` (tip_pro_desc,cuenta_contable,pad)values('$tip_pro_desc',$cuenta_contable,2)";
            // prepare query
                $stmt = $this->conn->prepare($query);
                
            // execute query
            if ($stmt->execute()) {
                return true;
            }{
            return false;
        }
        $stmt->close();
    }
    function insertService($getdb,$tbnom,$data,$id_asiento)
    {
        $tip_pro_desc = $data->pro_nom;
        $dh = $data->dh;
        $cuenta_contable = $data->cuenta_contable;
        $id_asiento = $id_asiento['tip_pro_id'];
            // query to insert record
               $query = "INSERT INTO `$getdb`.`producto_pro` (emp_id,pro_nom,pro_tip,pst_id,pro_fac,pro_igv,pro_isc,pro_ina)values(0,'$tip_pro_desc','$id_asiento',50,1,0,0,0)";
            // prepare query
                $stmt = $this->conn->prepare($query);
                
            // execute query
            if ($stmt->execute()) {
                return true;
            }{
            return false;
        }
        $stmt->close();
    }
    function getLastIdRegistroAsiento()
    {
            // query to insert record
               $query = "SELECT tip_pro_id  FROM tipo_producto
               ORDER by tip_pro_id DESC
               LIMIT 1";                  
            // prepare query
                $stmt = $this->conn->prepare($query);  
            // execute query
            if ($stmt->execute()) {
                return $stmt;
            }{
            return false;
        }
        $stmt->close();
    }
};
