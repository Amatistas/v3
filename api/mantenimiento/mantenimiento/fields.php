<?php
class Fields
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

    // read empresa
    function fields($getdb,$tbnom)
    {
        // select all query
        $query = "SHOW COLUMNS FROM `$getdb`.`$tbnom` where Extra !='auto_increment' AND Type !='datetime'";
        // prepare query statement

        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
    function fieldsToEdit($getdb,$tbnom)// obtiene los id autoincrementables para  inyectarlos en los UPDATE
    {
        // select all query
        $query = "SHOW COLUMNS FROM `$getdb`.`$tbnom`";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
};
