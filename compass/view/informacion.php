<?php

class informacion
{
    public $conn;
    public $field;
    public function __construct($db)
    {
        $this->conn = $db;
    }
    function getinformacionEmpresa($getdb, $id)
    {
        // query to insert record
        $query = "SELECT * FROM `$getdb`.datoempresa WHERE  emp_id=$id";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();
        return $stmt;

        $stmt->close();
    }
    function getinformacionPago($getdb, $id)
    {
        // query to insert record
        $query = "SELECT * FROM `$getdb`.comprobandoegreso WHERE  com_id = $id";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();
        return $stmt;

        $stmt->close();
    }
    function getinformacionVenta($getdb, $id)
    {
        // query to insert record
        $query = "SELECT * FROM `$getdb`.venta_vista_detalle WHERE  ven_id = $id";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();
        return $stmt;

        $stmt->close();
    }

    function getinformacionItem($getdb, $id)
    {
        // query to insert record
        $query = "SELECT * FROM `$getdb`.detalle_venta_det WHERE  venta_id = $id";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();
        return $stmt;

        $stmt->close();
    }
    function getheaderTraslado($getdb, $id)
    {
        // query to insert record
        $query = "SELECT * FROM `$getdb`.headertraslado WHERE  id_tras = $id";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();
        return $stmt;

        $stmt->close();
    }
    function getdetalleTraslado($getdb, $id)
    {
        // query to insert record
        $query = "SELECT * FROM `$getdb`.detalletraslado WHERE  id_tras_c = $id";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();
        return $stmt;

        $stmt->close();
    }

}
