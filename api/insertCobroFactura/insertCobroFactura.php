<?php
class insertCobroFactura
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
        $r = "CALL sacarcobro($dataInfo->emp_id,$dataInfo->to_id,'$dataInfo->pag_fecpag',$dataInfo->pag_numope,$dataInfo->pag_tot,$dataInfo->pa_com_id,$dataInfo->usu_id,$dataInfo->ban_id)"; 
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
