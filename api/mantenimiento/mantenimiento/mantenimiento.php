<?php
class Mantenimiento
{

    // database connection and table name
    public $conn;
    public $field;
    public $table_name = "";


    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read 
    function read($getdb, $tbnom, $where, $igual)
    {
        if (!$igual || $igual == "undefined") {
            // select all query
            $query = "SELECT * FROM `$getdb`." . "`$tbnom`";
        } else {

            // select all query
            $query = "SELECT * FROM `$getdb`." . "`$tbnom` where $where = $igual";
        }
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();
        return $stmt;
    }
    function readwithJoin3($obj)
    {

        var_dump($obj);
    }
    function search($keyword, $key, $getdb, $tbnom)
    {

        // select all query
        $query = "SELECT * FROM `$getdb`." . "`$tbnom`" . "where $keyword LIKE '%$key%'";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
        $stmt->close();
    }
    function search2($keyword, $key, $getdb, $tbnom, $where, $igual)
    {
        // select all query
        $query = "SELECT * FROM `$getdb`." . "`$tbnom`" . " where $where = $igual AND $key like '%$keyword%'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
        $stmt->close();
    }
    function search3($keyword, $key, $getdb, $tbnom, $where, $igual, $where2, $igual2)
    {
        // select all query
        $query = "SELECT * FROM `$getdb`." . "`$tbnom`" . "where $where = $igual AND $where2 = $igual2 AND $key LIKE '%$keyword%'";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
        $stmt->close();
    }
    function create($getdb, $tbnom, $field)
    {
        // query to insert record
        $query = "INSERT INTO
               `$getdb`." . " `$tbnom` " . "
               SET ";
        foreach ($field as $key => $val) {
            $query .= $val . "=:" . $val . ",";
        }
        $query = substr($query, 0, -1);


        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        foreach ($field as $key => $val) {
            $this->$val = htmlspecialchars(strip_tags($this->$val));
        }
        foreach ($field as $key => $val) {
            $stmt->bindParam(":" . $val, $this->$val);
        }
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }

        $stmt->close();
    }

    function update($getdb, $tbnom, $toUpdate, $identifiquerID, $identifiquerVALUE)
    {
        // query to insert record
        $query = "UPDATE
               `$getdb`." . " `$tbnom` " . "
               SET ";
        foreach ($toUpdate as $key => $val) {
            $query .= $key . "=" . $val . ",";
        }
        $query = substr($query, 0, -1);

        $query .= " WHERE " . $identifiquerID . "=" . $identifiquerVALUE;
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
    function delete($getdb, $tbnom, $identifiquer, $valr)
    {
        // delete query
        $query = "DELETE FROM `$getdb`.`$tbnom` WHERE " . $identifiquer . " = " . $valr;


        // prepare query
        $stmt = $this->conn->prepare($query);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;

        $stmt->close();
    }
};
