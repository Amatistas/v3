<?php
class Insert2Tables
{
    // database connection and table name
    public $conn;
    public $field;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
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
        $query = substr($query, 0, -1); //quitar la ultima coma de la cadena del "INSERT INTO " 

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
    
    
    function getLastSerial($fecha)
    {
        $fech = explode("-", $fecha);
        // query to insert record
        $query = "SELECT reg_cod from registro WHERE MONTH (reg_fec) = $fech[1] AND YEAR (reg_fec) = $fech[0]
               ORDER by id DESC
               LIMIT 1";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }

    function actualizarSerie($idSerie,$nro)
    {
        $sum = $nro + 1;
        $query = "UPDATE tipo_documento_serie
        SET tds_Cor = $sum
        WHERE id = $idSerie";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }

    function getLastIdVenta()
    {
        // query to insert record
        $query = "SELECT ven_id
               FROM venta
               ORDER by ven_id DESC
               LIMIT 1";
        // prepare query
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return $stmt;
        } {
            return false;
        }
        $stmt->close();
    }

    function create_det($getdb, $tbnom, $field)
    {
        // query to insert record
        $query = "INSERT INTO
               `$getdb`." . " `$tbnom` " . "
               SET ";
        foreach ($field as $key => $val) {
            $query .= $val . "=:" . $val . ",";
        }

        $query = substr($query, 0, -1); //quitar la ultima coma de la cadena del "INSERT INTO " 
    
       
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
};
