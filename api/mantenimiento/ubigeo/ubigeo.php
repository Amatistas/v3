<?php
class Ubigeo{
 
    // database connection and table name
    public $conn;
    public $table_name = "`dbo.ubigeo`";
 
    // object properties
    public $ubi_id;
    public $departamento;
    public $provincia;
    public $distrito;
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
// search ubigeo
function search($keywords){
 
    // select all query
    $query = "SELECT
                *
            FROM
                " . $this->table_name . " WHERE departamento like ? OR provincia like ? OR distrito like ? OR ubi_id like ?";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $keywords=htmlspecialchars(strip_tags($keywords));
    $keywords = "%{$keywords}%";
 
    // bind
    $stmt->bindParam(1, $keywords);
    $stmt->bindParam(2, $keywords);
    $stmt->bindParam(3, $keywords);
    $stmt->bindParam(4, $keywords);
 
    // execute query
    $stmt->execute();
 
    return $stmt;
}

};


?>
