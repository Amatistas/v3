<?php
class Personal
{

    // database connection and table name
    public $conn;
    public $table_name = "`dbo.personal`";

    // object properties
    public $per_id;
    public $emp_id;
    public $ofi_id;
    public $per_cod;
    public $per_tipdoc;
    public $per_numdoc;
    public $per_nom;
    public $per_apepat;
    public $per_apemat;
    public $per_dir;
    public $ubi_id;
    public $per_sex;
    public $per_ema;
    public $per_fecnac;
    public $per_tel;
    public $per_ven;
    public $per_cho;
    public $are_id;
    public $per_jef;
    public $per_obs;
    public $per_est;

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
        $query = "SELECT * FROM `$getdb`." . $this->table_name . "where per_id = $keyword";
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
        $query = "SELECT count(*) FROM `$getdb`." . $this->table_name . " where per_numdoc = $this->per_numdoc ";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $nrows = $stmt->fetchColumn();
        if ($nrows == 0) {
            // query to insert record
            $query = "INSERT INTO
            `$getdb`." . $this->table_name . "
            SET
            emp_id=:emp_id,
            ofi_id=:ofi_id,
            per_cod=:per_cod,
            per_tipdoc=:per_tipdoc,
            per_numdoc=:per_numdoc,
            per_nom=:per_nom,
            per_apepat=:per_apepat,
            per_dir=:per_dir,
            ubi_id=:ubi_id,
            per_sex=:per_sex,
            per_ema=:per_ema,
            per_fecnac=:per_fecnac,
            per_tel=:per_tel,
            per_ven=:per_ven,
            per_cho=:per_cho,
            are_id=:are_id,
            per_jef=:per_jef,
            per_obs=:per_obs,
            per_est=:per_est";

            // prepare query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->emp_id = htmlspecialchars(strip_tags($this->emp_id));
            $this->ofi_id = htmlspecialchars(strip_tags($this->ofi_id));
            $this->per_cod = htmlspecialchars(strip_tags($this->per_cod));
            $this->per_tipdoc = htmlspecialchars(strip_tags($this->per_tipdoc));
            $this->per_numdoc = htmlspecialchars(strip_tags($this->per_numdoc));
            $this->per_nom = htmlspecialchars(strip_tags($this->per_nom));
            $this->per_apepat = htmlspecialchars(strip_tags($this->per_apepat));
            $this->per_dir = htmlspecialchars(strip_tags($this->per_dir));
            $this->ubi_id = htmlspecialchars(strip_tags($this->ubi_id));
            $this->per_sex = htmlspecialchars(strip_tags($this->per_sex));
            $this->per_ema = htmlspecialchars(strip_tags($this->per_ema));
            $this->per_fecnac = htmlspecialchars(strip_tags($this->per_fecnac));
            $this->per_tel = htmlspecialchars(strip_tags($this->per_tel));
            $this->per_ven = htmlspecialchars(strip_tags($this->per_ven));
            $this->per_cho = htmlspecialchars(strip_tags($this->per_cho));
            $this->are_id = htmlspecialchars(strip_tags($this->are_id));
            $this->per_jef = htmlspecialchars(strip_tags($this->per_jef));
            $this->per_obs = htmlspecialchars(strip_tags($this->per_obs));
            $this->per_est = htmlspecialchars(strip_tags($this->per_est));

            // bind values

            $stmt->bindParam(":emp_id", $this->emp_id);
            $stmt->bindParam(":ofi_id", $this->ofi_id);
            $stmt->bindParam(":per_cod", $this->per_cod);
            $stmt->bindParam(":per_tipdoc", $this->per_tipdoc);
            $stmt->bindParam(":per_numdoc", $this->per_numdoc);
            $stmt->bindParam(":per_nom", $this->per_nom);
            $stmt->bindParam(":per_apepat", $this->per_apepat);
            $stmt->bindParam(":per_dir", $this->per_dir);
            $stmt->bindParam(":ubi_id", $this->ubi_id);
            $stmt->bindParam(":per_sex", $this->per_sex);
            $stmt->bindParam(":per_ema", $this->per_ema);
            $stmt->bindParam(":per_fecnac", $this->per_fecnac);
            $stmt->bindParam(":per_tel", $this->per_tel);
            $stmt->bindParam(":per_ven", $this->per_ven);
            $stmt->bindParam(":per_cho", $this->per_cho);
            $stmt->bindParam(":are_id", $this->are_id);
            $stmt->bindParam(":per_jef", $this->per_jef);
            $stmt->bindParam(":per_obs", $this->per_obs);
            $stmt->bindParam(":per_est", $this->per_est);


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
        ofi_id=:ofi_id,
        per_cod=:per_cod,
        per_tipdoc=:per_tipdoc,
        per_numdoc=:per_numdoc,
        per_nom=:per_nom,
        per_apepat=:per_apepat,
        per_dir=:per_dir,
        ubi_id=:ubi_id,
        per_sex=:per_sex,
        per_ema=:per_ema,
        per_fecnac=:per_fecnac,
        per_tel=:per_tel,
        per_ven=:per_ven,
        per_cho=:per_cho,
        are_id=:are_id,
        per_jef=:per_jef,
        per_obs=:per_obs,
        per_est=:per_est
        WHERE
        per_id = :per_id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->per_id = htmlspecialchars(strip_tags($this->per_id));
        $this->emp_id = htmlspecialchars(strip_tags($this->emp_id));
        $this->ofi_id = htmlspecialchars(strip_tags($this->ofi_id));
        $this->per_cod = htmlspecialchars(strip_tags($this->per_cod));
        $this->per_tipdoc = htmlspecialchars(strip_tags($this->per_tipdoc));
        $this->per_numdoc = htmlspecialchars(strip_tags($this->per_numdoc));
        $this->per_nom = htmlspecialchars(strip_tags($this->per_nom));
        $this->per_apepat = htmlspecialchars(strip_tags($this->per_apepat));
        $this->per_dir = htmlspecialchars(strip_tags($this->per_dir));
        $this->ubi_id = htmlspecialchars(strip_tags($this->ubi_id));
        $this->per_sex = htmlspecialchars(strip_tags($this->per_sex));
        $this->per_ema = htmlspecialchars(strip_tags($this->per_ema));
        $this->per_fecnac = htmlspecialchars(strip_tags($this->per_fecnac));
        $this->per_tel = htmlspecialchars(strip_tags($this->per_tel));
        $this->per_ven = htmlspecialchars(strip_tags($this->per_ven));
        $this->per_cho = htmlspecialchars(strip_tags($this->per_cho));
        $this->are_id = htmlspecialchars(strip_tags($this->are_id));
        $this->per_jef = htmlspecialchars(strip_tags($this->per_jef));
        $this->per_obs = htmlspecialchars(strip_tags($this->per_obs));
        $this->per_est = htmlspecialchars(strip_tags($this->per_est));

        // bind values
        $stmt->bindParam(":per_id", $this->per_id);
        $stmt->bindParam(":emp_id", $this->emp_id);
        $stmt->bindParam(":ofi_id", $this->ofi_id);
        $stmt->bindParam(":per_cod", $this->per_cod);
        $stmt->bindParam(":per_tipdoc", $this->per_tipdoc);
        $stmt->bindParam(":per_numdoc", $this->per_numdoc);
        $stmt->bindParam(":per_nom", $this->per_nom);
        $stmt->bindParam(":per_apepat", $this->per_apepat);
        $stmt->bindParam(":per_dir", $this->per_dir);
        $stmt->bindParam(":ubi_id", $this->ubi_id);
        $stmt->bindParam(":per_sex", $this->per_sex);
        $stmt->bindParam(":per_ema", $this->per_ema);
        $stmt->bindParam(":per_fecnac", $this->per_fecnac);
        $stmt->bindParam(":per_tel", $this->per_tel);
        $stmt->bindParam(":per_ven", $this->per_ven);
        $stmt->bindParam(":per_cho", $this->per_cho);
        $stmt->bindParam(":are_id", $this->are_id);
        $stmt->bindParam(":per_jef", $this->per_jef);
        $stmt->bindParam(":per_obs", $this->per_obs);
        $stmt->bindParam(":per_est", $this->per_est);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;

        $stmt->close();
    }
    function delete($getdb){
 
        // delete query
        $query = "DELETE FROM `$getdb`." . $this->table_name . " WHERE per_id = ?";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->per_id));
     
        // bind id of record to delete
        $stmt->bindParam(1, $this->per_id);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
     
        return false;
         
    }
};
