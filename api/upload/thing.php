<?php
class Thing
{

    public $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    function updateUrlCertificado($getdb, $url, $emp_id, $clave)
    {

        $query = "UPDATE `$getdb`." . " `empresa` " . "
        SET fe_cerrut = '$url', fe_cercla = '$clave'
        WHERE emp_id = $emp_id
        ";
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
    function updateUsuarioSunat($data)
    {
        $query = "UPDATE `$data->bd`." . " `empresa` " . "
        SET fe_sntruc = '$data->ruc', fe_sntusu = '$data->user', fe_sntcla = '$data->pas'
        WHERE emp_id = $data->d_id
        ";
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
}
