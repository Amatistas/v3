<?php

use Greenter\XMLSecLibs\Certificate\X509Certificate;
use Greenter\XMLSecLibs\Certificate\X509ContentType;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require '../../compass/vendor/autoload.php';
include '../config/database.php';
include '../upload/thing.php';

$folder = $_GET['folder'];
$emp_id = $_GET['emp_id'];

$database = new Database();
$db = $database->getConnection($folder);
$ti = new Thing($db);

if (isset($_FILES['uploadedFile']) && $_FILES['uploadedFile']['error'] === UPLOAD_ERR_OK) {
    // get details of the uploaded file
    $fileTmpPath = $_FILES['uploadedFile']['tmp_name'];
    $fileName = $_FILES['uploadedFile']['name'];
    $fileSize = $_FILES['uploadedFile']['size'];
    $fileType = $_FILES['uploadedFile']['type'];
    $fileNameCmps = explode(".", $fileName);
    $fileExtension = strtolower(end($fileNameCmps));
    $newFileName =  $fileName . '.' . $fileExtension;

    $allowedfileExtensions = array('png', 'jpg', 'gif', 'jpeg');
    if (in_array($fileExtension, $allowedfileExtensions)) {

        //verificar si existe el direcctorio de los certificados


        // directory in which the uploaded file will be moved
        $uploadFileDir = './logos/' . $folder . "/";

        if (file_exists($uploadFileDir)) {
        } else {
            mkdir($uploadFileDir, 0777, TRUE);
        }

        $dest_path = $uploadFileDir . $newFileName;
        $dest_path2 = $uploadFileDir . $fileName;

        $db = $database->getConnection($folder);
        $ti = new Thing($db);

        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            if ($ti->updateLogoEmpresa($folder, $dest_path2, $emp_id)) {
                echo json_encode(array("status" => "success", "message" => "Se actualizo el logo"));
            } else {
                echo json_encode(array("status" => "error", "message" => "Fallo la Actualizacion del Logo"));
            }
        }else{
            echo json_encode(array("status" => "error", "message" => "fallo al cargar el logo"));
        }

    } else {
        echo json_encode(array("status" => "error", "message" => "Este Archivo no es Valido por Favor usa un JPG PNG"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "No se pudo leer la Imagen"));
}
