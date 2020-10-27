<?php
session_start();
require './conx.php';
//Creamos la conexión
$conexion = mysqli_connect($server, $user, $pass, $bd)
    or die("Ha sucedido un error inexperado en la conexion de la base de datos");

$data = json_decode(file_get_contents("php://input"));


if($data){
    $username = $data['username'];
    $password = $data['password'];   
}
else { 
$username = $_POST['username'];
$password = $_POST['password'];   
}

if($_POST){
$username = $_POST['username'];
$password = $_POST['password'];   
}
else {
    $username = $data['username'];
    $password = $data['password']; 
}

$sql = "SELECT * FROM `nubefapanel`.`usuario` where usu_usu like '%$username%' and usu_est = 1 ";
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_array(MYSQLI_ASSOC);

    $bd = $row['usu_bd'];

$sql2 = "SELECT * FROM `$bd`.personal, nubefapanel.categoriaempresa 
 WHERE `$bd`.personal.per_ema = '$username'
 AND `$bd`.`personal`.per_est = 1
 AND `$bd`.personal.emp_id = nubefapanel.categoriaempresa.id";

    $result2 = $conexion->query($sql2);
    $row2 = $result2->fetch_array(MYSQLI_ASSOC);
    if ($password == $row2['usu_cla']) {
        $_SESSION['usu_id'] = $row2['per_id'];
        $_SESSION['database'] = $row['usu_bd'];
        $_SESSION['id_pla'] = $row['id_pla'];
        $_SESSION['usu_catemp'] = $row['usu_catemp'];
        $_SESSION['usu_nom'] = $row2['per_nom'];
        $_SESSION['usu_jer'] = $row2['usu_jer'];
        $_SESSION['usu_almperm'] = $row2['usu_almper'];
        $_SESSION['usu_notperm'] = $row2['usu_notperm'];
        $_SESSION['tde_sho'] = $row2['tde_sho'];
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        $_SESSION['start'] = time();
        $_SESSION['expire'] = $_SESSION['start'] + (5 * 60);

        //guardar los variables de la session y pasarlos a json para js
        echo $datosdesession = json_encode($_SESSION);
    }
    return false;
} else {
    return false;
}
mysqli_close($conexion);
