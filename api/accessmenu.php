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
    $menus ="";
        $sql = "SELECT * FROM `dbo.menu`  order by id asc";
    
    $result = mysqli_query($connect, $sql);
        while($row = mysqli_fetch_assoc($result)) {
            
                $menus .= $row['id'].',';
           
        }
    
    return $menus;
}
echo display_menu();
?>
]}