<?php
class Operaciones
{
    // database connection and table name
    public $conn;
    public $field;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }
    function actualizarEstadoProceso($id,$value)
    {
        // query to insert record
        $query = "UPDATE traslado_almacen SET status_tras = $value
        WHERE id_tras = $id";
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
/*         echo $query; */
        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        foreach ($field as $key => $val) {
          $this->$val = htmlspecialchars(strip_tags($this->$val));
        }
        foreach ($field as $key => $val) {
            /* echo $val .":". $this->$val."\n"; */
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
    function sacarAlmacen($cd_pro_id, $alm_id, $cd_can)
    {
        // query to insert record
        $query = "CALL ventaStock($cd_pro_id,$alm_id,$cd_can);";
       
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
    function movimientoAlmacen($idtras, $data, $info)
    {

        $id_nc = $idtras;
        $fecha = $info->alm_fecha;
        $cantidad = $data->cantidad;
        $id_almacen = $info->id_almacen;
    
        // query to insert record
         $query = "CALL movimiento_almacen('$fecha',0,0,$id_nc,$cantidad,$id_almacen)"; 
         /// prepare query */
        $stmt = $this->conn->prepare($query);
        // execute query
        if ($stmt->execute()) {
            return true;
        } {
            return false;
        }
        $stmt->close();
    }
    function getLastIdTraslado()
    {
        // query to insert record
        $query = "SELECT id_tras
               FROM traslado_almacen
               ORDER by id_tras DESC
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
    function getLastIdTrasladoDet()
    {
        // query to insert record
        $query = "SELECT id_tras_det
               FROM traslado_almacen_det
               ORDER by id_tras_det DESC
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
};
