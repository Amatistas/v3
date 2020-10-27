<?php
class r2qE
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
        $query = "SELECT query FROM `$getdb`.`zquery` where $where = $igual ";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
    function read2($queryNew,$getdb,$thing)
    {
        $queryNew = str_replace("%getdb%", $getdb,$queryNew);
        $queryNew = str_replace("%getCodigoDeDocumento%",$thing,$queryNew);
        //$queryNew = str_replace("%miEmpresa%", $miEmpresa,$queryNew);
        // select all query
        $query = "$queryNew";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        // execute query
        $stmt->execute();
        return $stmt;
    }
};
