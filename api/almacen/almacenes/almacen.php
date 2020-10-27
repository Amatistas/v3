<?php
class Almacen
{
    // database connection and table name
    public $conn;
    public $table_name = "`dbo.almacen`";

    // object properties 
    public $emp_id;
    public $alm_id;
    public $loc_id;
    public $alm_cod;
    public $alm_nom;
    public $per_id;
    public $alm_dir;
    public $ubi_id;
    public $alm_tel;
    public $alm_lat;
    public $alm_lon;
    public $alm_con;
    public $alm_est;


    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }


    // read almacens
    function read($getdb)
    {
        // select all query
        $query = "SELECT loc_nom,alm_id,alm_cod,alm_nom,alm_dir,emp_nom,alm_tel,per_nom,per_apepat,`dbo.almacen`.ubi_id
        FROM `$getdb`.`dbo.almacen`
        INNER JOIN `$getdb`.`dbo.empresa`
        ON `dbo.almacen`.emp_id=`dbo.empresa`.emp_id
        INNER JOIN `$getdb`.`dbo.personal`
        ON `dbo.almacen`.per_id=`dbo.personal`.per_id
        INNER JOIN `$getdb`.`dbo.local`
        ON `dbo.almacen`.loc_id=`dbo.local`.loc_id";

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
        $query = "SELECT * FROM " . $this->table_name . "where alm_id = $keyword";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
        $stmt->close();
    }

    // create almacen
    function create($getdb)
    {
        if (true) {
            // query to insert record
            $query = "INSERT INTO
            `$getdb`." . $this->table_name . "
            SET
            emp_id=:emp_id,
            loc_id=:loc_id,
            alm_cod=:alm_cod,
            alm_nom=:alm_nom,
            per_id=:per_id,
            alm_dir=:alm_dir,
            ubi_id=:ubi_id,
            alm_tel=:alm_tel,
            alm_con=:alm_con,
            alm_est=:alm_est";


            // prepare query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->emp_id = htmlspecialchars(strip_tags($this->emp_id));
            $this->loc_id = htmlspecialchars(strip_tags($this->loc_id));
            $this->alm_cod = htmlspecialchars(strip_tags($this->alm_cod));
            $this->alm_nom = htmlspecialchars(strip_tags($this->alm_nom));
            $this->per_id = htmlspecialchars(strip_tags($this->per_id));
            $this->alm_dir = htmlspecialchars(strip_tags($this->alm_dir));
            $this->ubi_id = htmlspecialchars(strip_tags($this->ubi_id));
            $this->alm_tel = htmlspecialchars(strip_tags($this->alm_tel));
            $this->alm_con = htmlspecialchars(strip_tags($this->alm_con));
            $this->alm_est = htmlspecialchars(strip_tags($this->alm_est));

            // bind values

            $stmt->bindParam(":emp_id", $this->emp_id);
            $stmt->bindParam(":loc_id", $this->loc_id);
            $stmt->bindParam(":alm_cod", $this->alm_cod);
            $stmt->bindParam(":alm_nom", $this->alm_nom);
            $stmt->bindParam(":per_id", $this->per_id);
            $stmt->bindParam(":alm_dir", $this->alm_dir);
            $stmt->bindParam(":ubi_id", $this->ubi_id);
            $stmt->bindParam(":alm_tel", $this->alm_tel);
            $stmt->bindParam(":alm_con", $this->alm_con);
            $stmt->bindParam(":alm_est", $this->alm_est);


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
                 emp_id=:emp_id,
                 loc_id=:loc_id,
                 alm_cod=:alm_cod,
                 alm_nom=:alm_nom,
                 per_id=:per_id,
                 alm_dir=:alm_dir,
                 ubi_id=:ubi_id,
                 alm_tel=:alm_tel,
                 alm_con=:alm_con,
                 alm_est=:alm_est
            WHERE
            alm_id = :alm_id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->alm_id = htmlspecialchars(strip_tags($this->alm_id));
        $this->emp_id = htmlspecialchars(strip_tags($this->emp_id));
        $this->loc_id = htmlspecialchars(strip_tags($this->loc_id));
        $this->alm_cod = htmlspecialchars(strip_tags($this->alm_cod));
        $this->alm_nom = htmlspecialchars(strip_tags($this->alm_nom));
        $this->per_id = htmlspecialchars(strip_tags($this->per_id));
        $this->alm_dir = htmlspecialchars(strip_tags($this->alm_dir));
        $this->ubi_id = htmlspecialchars(strip_tags($this->ubi_id));
        $this->alm_tel = htmlspecialchars(strip_tags($this->alm_tel));
        $this->alm_con = htmlspecialchars(strip_tags($this->alm_con));
        $this->alm_est = htmlspecialchars(strip_tags($this->alm_est));

        // bind values

        $stmt->bindParam(":alm_id", $this->alm_id);
        $stmt->bindParam(":emp_id", $this->emp_id);
        $stmt->bindParam(":loc_id", $this->loc_id);
        $stmt->bindParam(":alm_cod", $this->alm_cod);
        $stmt->bindParam(":alm_nom", $this->alm_nom);
        $stmt->bindParam(":per_id", $this->per_id);
        $stmt->bindParam(":alm_dir", $this->alm_dir);
        $stmt->bindParam(":ubi_id", $this->ubi_id);
        $stmt->bindParam(":alm_tel", $this->alm_tel);
        $stmt->bindParam(":alm_con", $this->alm_con);
        $stmt->bindParam(":alm_est", $this->alm_est);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;

        $stmt->close();
    }
    // delete the almacen
    function delete()
    {

        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE alm_id = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id = htmlspecialchars(strip_tags($this->alm_id));

        // bind id of record to delete
        $stmt->bindParam(1, $this->alm_id);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
};
