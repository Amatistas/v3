<?php
class Local
{

    // database connection and table name
    public $conn;
    public $table_name = "`dbo.local`";

    // object properties
    public $emp_id;
    public $loc_id;
    public $loc_cod;
    public $loc_nom;
    public $loc_dir;
    public $ubi_id;
    public $loc_ema;
    public $loc_tel;
    public $loc_cel;
    public $loc_est;


    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    function searchExplicit($keyword,$getdb)
    {

        // select all query
        $query = "SELECT * FROM `$getdb`." . $this->table_name . "where emp_id = $keyword";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
        $stmt->close();
    }
    // read local
    function read($getdb)
    {
        // select all query
        $query = "SELECT loc_id,loc_cod,loc_nom,loc_dir,emp_nom,loc_tel,loc_cel,loc_est,loc_ema,`dbo.local`.ubi_id
        FROM `$getdb`." . $this->table_name . "
        INNER JOIN `$getdb`.`dbo.empresa`
        ON $this->table_name.emp_id=`dbo.empresa`.emp_id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
    function search($keyword)
    {

        // select all query
        $query = "SELECT * FROM " . $this->table_name . "where loc_id = $keyword";
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
        if (true) {
            // query to insert record
            $query = "INSERT INTO
               `$getdb`." . $this->table_name . "
               SET
                emp_id=:emp_id,
                loc_cod=:loc_cod,
                loc_nom=:loc_nom,
                loc_dir=:loc_dir,
                ubi_id=:ubi_id,
                loc_ema=:loc_ema,
                loc_tel=:loc_tel,
                loc_cel=:loc_cel,
                loc_est=:loc_est";
            // prepare query

            $stmt = $this->conn->prepare($query);

            // sanitize
            $this->emp_id =  htmlspecialchars(strip_tags($this->emp_id));
            $this->loc_cod = htmlspecialchars(strip_tags($this->loc_cod));
            $this->loc_nom = htmlspecialchars(strip_tags($this->loc_nom));
            $this->loc_dir = htmlspecialchars(strip_tags($this->loc_dir));
            $this->ubi_id =  htmlspecialchars(strip_tags($this->ubi_id));
            $this->loc_ema = htmlspecialchars(strip_tags($this->loc_ema));
            $this->loc_tel = htmlspecialchars(strip_tags($this->loc_tel));
            $this->loc_cel = htmlspecialchars(strip_tags($this->loc_cel));
            $this->loc_est = htmlspecialchars(strip_tags($this->loc_est));

            // bind values
            $stmt->bindParam(":emp_id", $this->emp_id);
            $stmt->bindParam(":loc_cod", $this->loc_cod);
            $stmt->bindParam(":loc_nom", $this->loc_nom);
            $stmt->bindParam(":loc_dir", $this->loc_dir);
            $stmt->bindParam(":ubi_id", $this->ubi_id);
            $stmt->bindParam(":loc_ema", $this->loc_ema);
            $stmt->bindParam(":loc_tel", $this->loc_tel);
            $stmt->bindParam(":loc_cel", $this->loc_cel);
            $stmt->bindParam(":loc_est", $this->loc_est);

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
          loc_cod=:loc_cod,
          loc_nom=:loc_nom,
          loc_dir=:loc_dir,
          ubi_id=:ubi_id,
          loc_ema=:loc_ema,
          loc_tel=:loc_tel,
          loc_cel=:loc_cel,
          loc_est=:loc_est
            WHERE
          loc_id=:loc_id";

        // prepare query statement
         $stmt = $this->conn->prepare($query);
        
           // sanitize
           $this->loc_id =  htmlspecialchars(strip_tags($this->loc_id));
           $this->emp_id =  htmlspecialchars(strip_tags($this->emp_id));
           $this->loc_cod = htmlspecialchars(strip_tags($this->loc_cod));
           $this->loc_nom = htmlspecialchars(strip_tags($this->loc_nom));
           $this->loc_dir = htmlspecialchars(strip_tags($this->loc_dir));
           $this->ubi_id =  htmlspecialchars(strip_tags($this->ubi_id));
           $this->loc_ema = htmlspecialchars(strip_tags($this->loc_ema));
           $this->loc_tel = htmlspecialchars(strip_tags($this->loc_tel));
           $this->loc_cel = htmlspecialchars(strip_tags($this->loc_cel));
           $this->loc_est = htmlspecialchars(strip_tags($this->loc_est));

           // bind values
           $stmt->bindParam(":loc_id", $this->loc_id);
           $stmt->bindParam(":emp_id", $this->emp_id);
           $stmt->bindParam(":loc_cod", $this->loc_cod);
           $stmt->bindParam(":loc_nom", $this->loc_nom);
           $stmt->bindParam(":loc_dir", $this->loc_dir);
           $stmt->bindParam(":ubi_id", $this->ubi_id);
           $stmt->bindParam(":loc_ema", $this->loc_ema);
           $stmt->bindParam(":loc_tel", $this->loc_tel);
           $stmt->bindParam(":loc_cel", $this->loc_cel);
           $stmt->bindParam(":loc_est", $this->loc_est);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }
        return false;

        $stmt->close();
    }
    function delete($getdb)
    {

        // delete query
        $query = "DELETE FROM `$getdb`." . $this->table_name . " WHERE loc_id = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id = htmlspecialchars(strip_tags($this->loc_id));

        // bind id of record to delete
        $stmt->bindParam(1, $this->loc_id);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
};
