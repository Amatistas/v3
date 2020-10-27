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
    function getLastIdCompra()
    {
        // query to insert record
        $query = "SELECT com_id
               FROM compra
               ORDER by com_id DESC
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
    function verificarAlmacen($cd_pro_id, $alm_id, $cd_can, $pst_id)
    {
        $query = "select * from almacen where id_pro = $cd_pro_id and id_almac_info = $alm_id;";
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
    function insertAlamcen($cd_pro_id, $alm_id, $cd_can, $pst_id)
    {
        // query to insert record
        $query = "CALL registroalmacen($cd_pro_id,$alm_id,$cd_can,$pst_id);";
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
    function actualizarEstadoProceso($id, $value)
    {
        // query to insert record
        $query = "UPDATE compra SET estado_proceso = $value
        WHERE com_id = $id";
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
    function updateSerie($idSerie, $nro)
    {
        $sum = $nro + 1;
        $query = "UPDATE tipo_documento_serie
        SET tds_cor = $sum
        WHERE tds_ser = '$idSerie'";

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
};
