<?php
class Auth
{
    public $conn;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    function ValidarOnNubefaPanel($username)
    {
        // select all query
        $query = "SELECT * FROM `nubefaco_nubefapanel`.`usuario` where usu_usu like '%$username%' and usu_est = 1 ";
        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
    function validarOnBaseDeDatosEmpresa($bd,$username)
    {
        $query = "SELECT * FROM `$bd`.personal JOIN `$bd`.empresa ON `$bd`.empresa.emp_id =`$bd`.personal.emp_id
        WHERE `$bd`.personal.per_ema = '$username'
        AND `$bd`.personal.per_est = 1";

        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
}
