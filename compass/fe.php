<?php
class FE
{

    public $conn;
    // constructor with $db as database connection
    public function __construct($db, $venta_id, $emp_id)
    {
        $this->conn = $db;
        $this->venta_id = $venta_id;
        $this->emp_id = $emp_id;
    }
    function getVenta()
    {
        $query = "SELECT * FROM venta WHERE ven_id = $this->venta_id";
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

    function getVentaDet()
    {
        $query = "SELECT * FROM venta_det WHERE venta_id = $this->venta_id";
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
    function getMiEmpresa()
    {
        $query = "SELECT * FROM empresa WHERE emp_id = $this->emp_id";
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
    function getCliente($ane_id)
    {
        $query = "SELECT * FROM anexo WHERE ane_id = $ane_id";
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
    function getUbigeos($ubi_id)
    {
        $query = "SELECT * FROM ubigeo WHERE ubi_id = $ubi_id";
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

    function getDetalleProducto($pro_id)
    {

        $query = "SELECT * FROM producto_pro WHERE pro_id = $pro_id";
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

    function getPresentacionPorducto($pst_id)
    {

        $query = "SELECT pst_snt FROM presentacion WHERE id = $pst_id";
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
    function updateRespuesta($respuesta)
    {

        $venta_id = intval($this->venta_id);
        $json_respuesta = json_encode($respuesta);
        $query = "UPDATE venta
        SET notas_sunat = '$json_respuesta'
        WHERE ven_id = $venta_id ";
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
}
