<?php
class Compra_de_servicios{
 
    // database connection and table name
    public $conn;
    public $table_name = "`dbo.compra`";
 
    // object properties
    public $com_id;
    public $emp_id;
    public $ofi_id;
    public $to_id;
    public $td_id;
    public $com_ser;
    public $com_num;
    public $com_fecdoc;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }


// read products
 function read(){
 
    // select all query
    $query = "SELECT * FROM " . $this->table_name;
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

};


?>