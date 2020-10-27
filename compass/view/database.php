<?php
class Database{
 
    // specify your own database credentials
  /*   private $host = "3.16.113.166";
    //private $db_name = "nubefa";
    private $username = "pedro";
    private $password = "adolfo2403"; */
    private $host = "localhost";
    //private $db_name = "nubefa";
    private $username = "root";
    private $password = "";
    public $conn;
 
    // get the database connection
    public function getConnection($getdb){
 
        $this->conn = null;
        
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $getdb, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>