<?php
class Usuario
{

    // database connection and table name
    public $conn;
    public $table_name = "`dbo.usuario`";

    // object properties
    public $usu_id;
    public $usu_nom;
    public $usu_ema;
    public $usu_usu;
    public $usu_cla;
    public $per_id;
    public $tcja_id;
    public $usu_est;
    public $usu_created;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }


    // read usuarios
    function read()
    {

        // select all query
        $query = "SELECT * FROM " . $this->table_name;
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
        
        $stmt->close();
    }

    function search($keyword)
    {

        // select all query
        $query = "SELECT * FROM " . $this->table_name . "where usu_id = $keyword";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
        $stmt->close();
    }

    // update usuario menu permisos
    function updateMenuPermisos()
    {

        // update query
        $query = "UPDATE
               personal
            SET
                usu_notperm = :usu_notperm
            WHERE
                per_id = :per_id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->usu_notperm = $this->usu_notperm;
        $this->per_id = htmlspecialchars(strip_tags($this->per_id));

        // bind new values
        $stmt->bindParam(':usu_notperm', $this->usu_notperm);
        $stmt->bindParam(':per_id', $this->per_id);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
        
        $stmt->close();
    }
    // create usuario
    function create($getdb)
    {
        // select all query
        $query = "SELECT count(*) FROM " . $this->table_name . " where usu_ema = '$this->usu_ema'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $nrows = $stmt->fetchColumn();
        if ($nrows == 0) {
            $query2 = "SELECT usu_usu FROM `nubefapanel`.`dbo.usuarios` where usu_bd = '$getdb'";
            // prepare query statement
            $stmt2 = $this->conn->prepare($query2);
            $stmt2->execute();
            $nrows2 = $stmt2->fetchColumn();
            $arr = explode(',', $nrows2);
            array_push($arr, $this->usu_ema);
            $arr = implode(",", $arr);

            $query3 = "UPDATE
                `nubefapanel`.`dbo.usuarios`
            SET
                usu_usu = '$arr'
            WHERE
                usu_bd = '$getdb'";
            // prepare query statement
            $stmt3 = $this->conn->prepare($query3);
            $stmt3->execute();


            // query to insert record
            $query = "INSERT INTO
                " . $this->table_name . "
                SET
                usu_nom=:usu_nom,
                usu_ema=:usu_ema,
                usu_cla=:usu_cla,
                usu_jer=:usu_jer,
                usu_est=:usu_est";

            // prepare query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->usu_nom = htmlspecialchars(strip_tags($this->usu_nom));
            $this->usu_ema = htmlspecialchars(strip_tags($this->usu_ema));
            $this->usu_cla = htmlspecialchars(strip_tags($this->usu_cla));
            $this->usu_jer = htmlspecialchars(strip_tags($this->usu_jer));
            $this->usu_est = htmlspecialchars(strip_tags($this->usu_est));

            // bind values
            $stmt->bindParam(":usu_nom", $this->usu_nom);
            $stmt->bindParam(":usu_ema", $this->usu_ema);
            $stmt->bindParam(":usu_cla", $this->usu_cla);
            $stmt->bindParam(":usu_jer", $this->usu_jer);
            $stmt->bindParam(":usu_est", $this->usu_est);

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
            usu_nom=:usu_nom,
            usu_ema=:usu_ema,
            usu_cla=:usu_cla,
            usu_jer=:usu_jer,
            usu_est=:usu_est
            WHERE
            usu_id = :usu_id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->usu_id = htmlspecialchars(strip_tags($this->usu_id));
        $this->usu_nom = htmlspecialchars(strip_tags($this->usu_nom));
        $this->usu_ema = htmlspecialchars(strip_tags($this->usu_ema));
        $this->usu_cla = htmlspecialchars(strip_tags($this->usu_cla));
        $this->usu_jer = htmlspecialchars(strip_tags($this->usu_jer));
        $this->usu_est = htmlspecialchars(strip_tags($this->usu_est));

        // bind values
        $stmt->bindParam(":usu_id", $this->usu_id);
        $stmt->bindParam(":usu_nom", $this->usu_nom);
        $stmt->bindParam(":usu_ema", $this->usu_ema);
        $stmt->bindParam(":usu_cla", $this->usu_cla);
        $stmt->bindParam(":usu_jer", $this->usu_jer);
        $stmt->bindParam(":usu_est", $this->usu_est);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
        
        $stmt->close();
    }
    // delete the usuario
function delete(){
 
    // delete query
    $query = "DELETE FROM " . $this->table_name . " WHERE usu_id = ?";
 
    // prepare query
    $stmt = $this->conn->prepare($query);
 
    // sanitize
    $this->id=htmlspecialchars(strip_tags($this->usu_id));
 
    // bind id of record to delete
    $stmt->bindParam(1, $this->usu_id);
 
    // execute query
    if($stmt->execute()){
        return true;
    }
 
    return false;
     
}
};
