<?php
session_start();

class r2q
{
    // database connection and table name
    public $conn;
    public $field;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    function read($getdb,$where,$igual)
    {
        // select all query
        $query = "SELECT query FROM nubefapanel."."`dbo.menu` where descripcion = '$where' and formulario = '$igual'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    function read2($queryNew,$getdb)
    {
        $mse = $_SESSION['mySessionEmpresa'];
        $queryNew = str_replace("%getdb%", $getdb,$queryNew);
        $queryNew = str_replace("%miEmpresa%", $mse['emp_id'],$queryNew);
        // select all query
        $query = "$queryNew";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
};
