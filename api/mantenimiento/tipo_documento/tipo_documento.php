<?php
class Tipodocumento
{

    // database connection and table name
    public $conn;
    public $table_name = "`dbo.tipo_documento`";
    
    // object properties
    public $td_id;
    public $td_nom;
    public $td_fac;
    public $td_snt;
    public $td_sntnom;
    public $td_asi;
    public $td_est;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }


    // read products
    function read()
    {

        // select all query
        $query = "SELECT * FROM " . $this->table_name;
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
    function search($getdb, $keyword)
    {

        // select all query
        $query = "SELECT * FROM `$getdb`." . $this->table_name . "where td_id = '$keyword'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
        $stmt->close();
    }
    function create($getdb)
    {
        // select all query
        $query = "SELECT count(*) FROM `$getdb`." . $this->table_name . " where td_id = $this->td_id ";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $nrows = $stmt->fetchColumn();
        if ($nrows == 0) {
            // query to insert record
            $query = "INSERT INTO
            `$getdb`." . $this->table_name . "
            SET
            td_id=:td_id,
            td_nom=:td_nom,
            td_fac=:td_fac,
            td_snt=:td_snt,
            td_sntnom=:td_sntnom,
            td_asi=:td_asi,
            td_est=:td_est";

            // prepare query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->td_id = htmlspecialchars(strip_tags($this->td_id));
            $this->td_nom = htmlspecialchars(strip_tags($this->td_nom));
            $this->td_fac = htmlspecialchars(strip_tags($this->td_fac));
            $this->td_snt = htmlspecialchars(strip_tags($this->td_snt));
            $this->td_sntnom = htmlspecialchars(strip_tags($this->td_sntnom));
            $this->td_asi = htmlspecialchars(strip_tags($this->td_asi));
            $this->td_est = htmlspecialchars(strip_tags($this->td_est));

            // bind values

            $stmt->bindParam(":td_id", $this->td_id);
            $stmt->bindParam(":td_nom", $this->td_nom);
            $stmt->bindParam(":td_fac", $this->td_fac);
            $stmt->bindParam(":td_snt", $this->td_snt);
            $stmt->bindParam(":td_sntnom", $this->td_sntnom);
            $stmt->bindParam(":td_asi", $this->td_asi);
            $stmt->bindParam(":td_est", $this->td_est);


            // execute query
            if ($stmt->execute()) {
                return true;
            }
            return false;
        } {
            return false;
        }

        $stmt->close();
    }
    function update($getdb)
    {
        // update query
        $query = "UPDATE
            `$getdb`." . $this->table_name . "
        SET
            td_nom=:td_nom,
            td_fac=:td_fac,
            td_snt=:td_snt,
            td_sntnom=:td_sntnom,
            td_asi=:td_asi,
            td_est=:td_est
        WHERE
        td_id = :td_id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->td_id = htmlspecialchars(strip_tags($this->td_id));
        $this->td_nom = htmlspecialchars(strip_tags($this->td_nom));
        $this->td_fac = htmlspecialchars(strip_tags($this->td_fac));
        $this->td_snt = htmlspecialchars(strip_tags($this->td_snt));
        $this->td_sntnom = htmlspecialchars(strip_tags($this->td_sntnom));
        $this->td_asi = htmlspecialchars(strip_tags($this->td_asi));
        $this->td_est = htmlspecialchars(strip_tags($this->td_est));

        // bind values
        $stmt->bindParam(":td_id", $this->td_id);
        $stmt->bindParam(":td_nom", $this->td_nom);
        $stmt->bindParam(":td_fac", $this->td_fac);
        $stmt->bindParam(":td_snt", $this->td_snt);
        $stmt->bindParam(":td_sntnom", $this->td_sntnom);
        $stmt->bindParam(":td_asi", $this->td_asi);
        $stmt->bindParam(":td_est", $this->td_est);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;

        $stmt->close();
    }
    function delete($getdb){
 
        // delete query
        $query = "DELETE FROM `$getdb`." . $this->table_name . " WHERE td_id = ?";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->td_id));
     
        // bind id of record to delete
        $stmt->bindParam(1, $this->td_id);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
     
        return false;
         
    }
};
