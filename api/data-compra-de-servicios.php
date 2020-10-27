<?php 

 require '../resources/conx.php';
//conexión


$sql = "SELECT * FROM `dbo.compra`";

$result = mysqli_query($conexion, $sql);

$c=0;

while($row=$result->fetch_assoc()){

    $data[$c]["0"] = $row["com_id"];
    $data[$c]["1"] = $row["emp_id"];
    $data[$c]["2"] = $row["ofi_id"];
    $data[$c]["3"] = $row["to_id"];
    $data[$c]["4"] = $row["com_ser"];
    $data[$c]["5"] = $row["com_num"];
    $data[$c]["6"] = $row["com_fecdoc"];

    $c++;

}

$results = ["sEcho" => 1,
            "iTotalRecords" => count($data),
            "iTotalDisplayRecords" => count($data),
            "aaData" => $data ];

echo json_encode($results);

 ?>