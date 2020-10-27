
<form id="selecionarAccessos">
    <ul data-controller="checkbox-family" data-checkbox-family-parent-checked-if="allChildrenChecked" data-checkbox-family-parent-indeterminate-if="anyChildrenChecked" data-checkbox-family-children-checked-if="parentChecked" id="scrollabled-modal">
        <?php

        function display_menu()
        {
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
        function multilevel_menu($connect)
        {

            $menu = "";
            $sql = "SELECT id FROM `nubefapanel`.`dbo.menu` WHERE padre = 0 and estado = 1 ";
            $result = mysqli_query($connect, $sql);
            while ($row = mysqli_fetch_assoc($result)) {
                
                mysqli_free_result($result);
                if ($row["formulario"]) {
                    $menu .= "<li class='custom-control custom-checkbox'><input type='checkbox' class='" . $row['id'] . "' name='" . $row['id'] . "' id='" . $row['descripcion'] . "-" . $row['padre'] . "-" . $row['id'] . "'>" . $row['descripcion'];
                } else {
                    $menu .= "<li class='custom-control custom-checkbox'><input type='checkbox' class='" . $row['id'] . "' name='" . $row['id'] . "' id='" . $row['descripcion'] . "-" . $row['padre'] . "-" . $row['id'] . "'>" . $row['descripcion'];
                }

                $row_id = $row["id"];
                $sql_b = "SELECT id FROM `nubefapanel`.`dbo.menu` WHERE padre = $row_id";
                
                $count = mysqli_query($connect, $sql_b);
                if ($count->num_rows > 0) {
                    $menu .= "<ul class='list-unstyled mb-0'>" . multilevel_menu($connect, $row["id"]) . "</ul>";
                } else {
                    $menu .= multilevel_menu($connect, $row["id"]);
                }
                $menu .= "</li>";
                mysqli_free_result($count);
            }
            return $menu;
            mysqli_close($connect);
        }

        echo display_menu();
        ?>
    </ul>
</form>