<?php

class FiltrosBtn
{
    // database connection and table name
    public $conn;
    public $field;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    function getfiltroporpagar()
    {
        // select all query
        $query = "SELECT * FROM  getfiltroporpagar";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }

    function getfiltroporpagarDetraccion()
    {
        // select all query
        $query = "SELECT * FROM getfiltropordetraccion";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }

    function getfiltroporpagarMesActual()
    {
        $mes = date('m');
        // select all query
        $query = "SELECT *,MONTH(com_fecdoc) AS mes from getfiltroporpagar WHERE MONTH(com_fecdoc) = $mes";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }

    function getfiltroporpagarProveedores()
    {
        $mes = date('m');
        // select all query
        $query = "SELECT *,MONTH(com_fecdoc) AS mes from getfiltroporpagar WHERE MONTH(com_fecdoc) = $mes";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
};
