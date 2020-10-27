<?php
class Tipo_de_operacion{
 
    // database connection and table name
    public $conn;
    public $table_name = "`dbo.tipo_operacion`";
 
    // object properties
    public $to_id;
    public $to_nom;
    public $to_frm;
    public $to_tipsuj;
    public $to_tab;
    public $to_sql;
    public $to_bsql;
    public $to_psql;
    public $to_asi;
    public $to_kar;
    public $to_fac;
    public $to_est;
 
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