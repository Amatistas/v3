<?php
class Empresa
{

    // database connection and table name
    public $conn;
    public $table_name = "`dbo.empresa`";

    // object properties
    public $emp_id;
    public $emp_ruc;
    public $emp_nom;
    public $emp_nomcom;
    public $emp_repleg;
    public $emp_dir;
    public $ubi_id;
    public $emp_ema;
    public $emp_tel;
    public $emp_cel;
    public $emp_lat;
    public $emp_lon;
    public $emp_est;
    public $emp_per;
    public $emp_ret;
    public $emp_det;
    public $emp_igv;


    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }


    // read empresa
    function read($getdb)
    {

        // select all query
        $query = "SELECT * FROM `$getdb`." . $this->table_name ." ORDER BY emp_id desc ";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
    function search($keyword)
    {

        // select all query
        $query = "SELECT * FROM " . $this->table_name . "where emp_id = $keyword";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
        $stmt->close();
    }
    // create product
    function create($getdb)
    {
        // select all query
        $query = "SELECT count(emp_id) FROM `$getdb`." . $this->table_name . " where emp_ruc = '$this->emp_ruc'";
        // prepare query statement
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $nrows = $stmt->fetchColumn();
        if ($nrows < 1) {
            // query to insert record
            $query = "INSERT INTO
               `$getdb`." . $this->table_name . "
               SET
                emp_ruc=:emp_ruc,
                emp_nom=:emp_nom,
                emp_nomcom=:emp_nomcom,
                emp_repleg=:emp_repleg,
                emp_dir=:emp_dir,
                ubi_id=:ubi_id,
                emp_ema=:emp_ema,
                emp_tel=:emp_tel,
                emp_cel=:emp_cel,
                emp_est=:emp_est,
                emp_per=:emp_per,
                emp_ret=:emp_ret,
                emp_det=:emp_det,
                emp_igv=:emp_igv";

            // prepare query
            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->emp_ruc = htmlspecialchars(strip_tags($this->emp_ruc));
            $this->emp_nom = htmlspecialchars(strip_tags($this->emp_nom));
            $this->emp_nomcom = htmlspecialchars(strip_tags($this->emp_nomcom));
            $this->emp_repleg = htmlspecialchars(strip_tags($this->emp_repleg));
            $this->emp_dir = htmlspecialchars(strip_tags($this->emp_dir));
            $this->ubi_id = htmlspecialchars(strip_tags($this->ubi_id));
            $this->emp_ema = htmlspecialchars(strip_tags($this->emp_ema));
            $this->emp_tel = htmlspecialchars(strip_tags($this->emp_tel));
            $this->emp_cel = htmlspecialchars(strip_tags($this->emp_cel));
            $this->emp_est = htmlspecialchars(strip_tags($this->emp_est));
            $this->emp_per = htmlspecialchars(strip_tags($this->emp_per));
            $this->emp_ret = htmlspecialchars(strip_tags($this->emp_ret));
            $this->emp_det = htmlspecialchars(strip_tags($this->emp_det));
            $this->emp_igv = htmlspecialchars(strip_tags($this->emp_igv));

            // bind values
            $stmt->bindParam(":emp_ruc", $this->emp_ruc);
            $stmt->bindParam(":emp_nom", $this->emp_nom);
            $stmt->bindParam(":emp_nomcom", $this->emp_nomcom);
            $stmt->bindParam(":emp_repleg", $this->emp_repleg);
            $stmt->bindParam(":emp_dir", $this->emp_dir);
            $stmt->bindParam(":ubi_id", $this->ubi_id);
            $stmt->bindParam(":emp_ema", $this->emp_ema);
            $stmt->bindParam(":emp_tel", $this->emp_tel);
            $stmt->bindParam(":emp_cel", $this->emp_cel);
            $stmt->bindParam(":emp_est", $this->emp_est);
            $stmt->bindParam(":emp_per", $this->emp_per);
            $stmt->bindParam(":emp_ret", $this->emp_ret);
            $stmt->bindParam(":emp_det", $this->emp_det);
            $stmt->bindParam(":emp_igv", $this->emp_igv);

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
            emp_ruc=:emp_ruc,
            emp_nom=:emp_nom,
            emp_nomcom=:emp_nomcom,
            emp_repleg=:emp_repleg,
            emp_dir=:emp_dir,
            ubi_id=:ubi_id,
            emp_ema=:emp_ema,
            emp_tel=:emp_tel,
            emp_cel=:emp_cel,
            emp_est=:emp_est,
            emp_per=:emp_per,
            emp_ret=:emp_ret,
            emp_det=:emp_det,
            emp_igv=:emp_igv
            WHERE
            emp_id =:emp_id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

           // sanitize
           $this->emp_id = htmlspecialchars(strip_tags($this->emp_id));
           $this->emp_ruc = htmlspecialchars(strip_tags($this->emp_ruc));
           $this->emp_nom = htmlspecialchars(strip_tags($this->emp_nom));
           $this->emp_nomcom = htmlspecialchars(strip_tags($this->emp_nomcom));
           $this->emp_repleg = htmlspecialchars(strip_tags($this->emp_repleg));
           $this->emp_dir = htmlspecialchars(strip_tags($this->emp_dir));
           $this->ubi_id = htmlspecialchars(strip_tags($this->ubi_id));
           $this->emp_ema = htmlspecialchars(strip_tags($this->emp_ema));
           $this->emp_tel = htmlspecialchars(strip_tags($this->emp_tel));
           $this->emp_cel = htmlspecialchars(strip_tags($this->emp_cel));
           $this->emp_est = htmlspecialchars(strip_tags($this->emp_est));
           $this->emp_per = htmlspecialchars(strip_tags($this->emp_per));
           $this->emp_ret = htmlspecialchars(strip_tags($this->emp_ret));
           $this->emp_det = htmlspecialchars(strip_tags($this->emp_det));
           $this->emp_igv = htmlspecialchars(strip_tags($this->emp_igv));

        // bind values
        $stmt->bindParam(":emp_id", $this->emp_id);
        $stmt->bindParam(":emp_ruc", $this->emp_ruc);
        $stmt->bindParam(":emp_nom", $this->emp_nom);
        $stmt->bindParam(":emp_nomcom", $this->emp_nomcom);
        $stmt->bindParam(":emp_repleg", $this->emp_repleg);
        $stmt->bindParam(":emp_dir", $this->emp_dir);
        $stmt->bindParam(":ubi_id", $this->ubi_id);
        $stmt->bindParam(":emp_ema", $this->emp_ema);
        $stmt->bindParam(":emp_tel", $this->emp_tel);
        $stmt->bindParam(":emp_cel", $this->emp_cel);
        $stmt->bindParam(":emp_est", $this->emp_est);
        $stmt->bindParam(":emp_per", $this->emp_per);
        $stmt->bindParam(":emp_ret", $this->emp_ret);
        $stmt->bindParam(":emp_det", $this->emp_det);
        $stmt->bindParam(":emp_igv", $this->emp_igv);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
        
        $stmt->close();
    }
    function delete($getdb){
 
        // delete query
        $query = "DELETE FROM `$getdb`." . $this->table_name . " WHERE emp_id = ?";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->emp_id));
     
        // bind id of record to delete
        $stmt->bindParam(1, $this->emp_id);
     
        // execute query
        if($stmt->execute()){
            return true;
        }
     
        return false;
         
    }
};
