<?php
session_start();
require './conx.php';
//Creamos la conexión
$conexion = mysqli_connect($server, $user, $pass, $bd)
or die("Ha sucedido un error inexperado en la conexion de la base de datos");

$data = json_decode(file_get_contents("php://input"));
if (!empty($data->username) || !empty($data->password)) {

    $username = $data->username;
    $password = $data->password;

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
            $_SESSION['emp_id'] = $row2['emp_id'];
            $_SESSION['ofi_id'] = $row2['ofi_id'];
            $_SESSION['usu_id'] = $row2['per_id'];
            $_SESSION['database'] = $row['usu_bd'];
            $_SESSION['id_pla'] = $row['id_pla'];
            $_SESSION['usu_catemp'] = $row['usu_catemp'];
            $_SESSION['usu_nom'] = $row2['per_nom'];
            $_SESSION['usu_apepat'] = $row2['per_apepat'];
            $_SESSION['usu_apemat'] = $row2['per_apemat'];
            $_SESSION['usu_jer'] = $row2['usu_jer'];
            $_SESSION['usu_almperm'] = $row2['usu_almper'];
            $_SESSION['usu_notperm'] = $row2['usu_notperm'];
            $_SESSION['tde_sho'] = $row2['tde_sho'];
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $username;
            $_SESSION['start'] = time();
            $_SESSION['expire'] = $_SESSION['start'] + (5 * 60);
            //guardar los variables de la session y pasarlos a json para js
            http_response_code(200);
            echo $datosdesession = json_encode($_SESSION);
        } else {
            http_response_code(404);
            echo $datos = json_encode(array("mensaje" => "error usuario no se encuentra en la base de datos principal"));
            return false;
        }
    } else {
        echo $datos = json_encode(array("mensaje" => "error usuario no se necuentra en ninguna de las base de datos existente o la contraseña es erronea"));
        http_response_code(404);
        return false;
    }
    mysqli_close($conexion);

} else {
    echo $datos = json_encode(array("mensaje" => "error complete todo el formulario"));
    http_response_code(404);
}
