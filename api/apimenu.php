<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/json; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');

echo '{"resultados":[';
function display_menu(){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "nubefapanel";
    $connect = new mysqli($servername, $username, $password, $dbname);
    $connect->set_charset("utf8");
    
    $menus = "";
    $menus .= multilevel_menu($connect);
    return $menus;
}
function multilevel_menu($connect){
    $tde_sho = "1,2,"; 
    $tde_sho = rtrim($tde_sho, ',');
    $menu = "";

$sql = "SELECT id,descripcion,formulario,padre FROM `dbo.menu` WHERE  id in ($tde_sho) and estado = 1 order by orden asc";
 
    $result = mysqli_query($connect, $sql);
        while($row = mysqli_fetch_assoc($result)) {
            if($row["formulario"]){
                $menu .= '{"id": "'.$row['id'].'","text": "'.$row['descripcion'].'"';
            }else{
                $menu .= '{"text": "'.$row['descripcion'].'" , ';
            }
            $row_id = $row["id"];
            $sql_b = "SELECT * FROM `dbo.menu` WHERE padre = $row_id";
            $count = mysqli_query($connect, $sql_b);            
            if($count->num_rows > 0){
                $menu .= '"children":['.multilevel_menu($connect, $row["id"]).' ]';
            }else{
                $menu .= multilevel_menu($connect, $row["id"]);
            }
            $menu .= "},";
        }
    return $menu;
    mysqli_close($connect);
}
echo display_menu();
?>
]}