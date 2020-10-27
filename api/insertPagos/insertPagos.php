<?php
class insertPagos
{
    // database connection and table name
    public $conn;
    public $field;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }
    function create($getdb,$tbnom,$dataInfo)
    {
        $r = "CALL sacarpago($dataInfo->emp_id,$dataInfo->to_id,'$dataInfo->pag_fecpag','$dataInfo->pag_fecreg',$dataInfo->ane_id,$dataInfo->ban_id,$dataInfo->pag_numope,$dataInfo->cc_id,'$dataInfo->pag_tot',$dataInfo->usu_id,$dataInfo->pa_com_id)";
        var_dump($r); 
        // query to insert record
             $query = "SELECT * FROM pago_pago";
            // prepare query
                $stmt = $this->conn->prepare($r);
            // execute query
            if ($stmt->execute()) {
                return $stmt;
            }{
            return false;
        }
        $stmt->close();
    }
};
