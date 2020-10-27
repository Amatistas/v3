<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include '../config/database.php';
include '../Auth/var.php';

$database = new Database();

$getdb = 'nubefaco_nubefapanel';

$tbnom = 'usuario';

$db = $database->getConnection($getdb);

$auth = new Auth($db);

$data = json_decode(file_get_contents("php://input"),true);

if (!empty($data['username']) || !empty($data['password'])) {

    $username = $data['username'];
    $password = $data['password'];

    $fethVal = $auth->ValidarOnNubefaPanel($username);

    if ($row1 = $fethVal->fetch(PDO::FETCH_ASSOC)) {
        $fethVal2 = $auth->validarOnBaseDeDatosEmpresa($row1['usu_bd'], $username);
        if ($row2 = $fethVal2->fetch(PDO::FETCH_ASSOC)) {
            if ($password == $row2['usu_cla'] ) {
                $_SESSION['emp_id'] = $row2['emp_id'];
                $_SESSION['ofi_id'] = $row2['ofi_id'];
                $_SESSION['usu_id'] = $row2['per_id'];
                $_SESSION['database'] = $row1['usu_bd'];
                $_SESSION['id_pla'] = $row1['id_pla'];
                $_SESSION['usu_catemp'] = $row1['usu_catemp'];
                $_SESSION['usu_nom'] = $row2['per_nom'];
                $_SESSION['usu_apepat'] = $row2['per_apepat'];
                $_SESSION['usu_apemat'] = $row2['per_apemat'];
                $_SESSION['usu_jer'] = $row2['usu_jer'];
                $_SESSION['usu_almperm'] = $row2['usu_almper'];
                $_SESSION['usu_notperm'] = $row2['usu_notperm'];
            /*     $_SESSION['tde_sho'] = $row2['tde_sho']; */
                $_SESSION['loggedin'] = true;
                $_SESSION['username'] = $username;
                $_SESSION['start'] = time();
                $_SESSION['expire'] = $_SESSION['start'] + (5 * 60);

                http_response_code(200);
                echo $datosdesession = json_encode($_SESSION);

            }else{
                http_response_code(502);
                json_encode(array("error" => "clave incorrecta"));
            }
        }else{
            http_response_code(404);
            json_encode(array("error" => "usuario no asignado a una empresa"));
        }
    } else {
        http_response_code(404);
        json_encode(array("error" => "usuario no encontrado"));
    }
   
}else{
    http_response_code(404);
    echo json_encode(array("error"=>"complete todo el formulario"));
}
