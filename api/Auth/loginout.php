<?php 
  session_start(); 
  // Borra todas las variables de sesión 
  $_SESSION = array(); 
  // Borra la cookie que almacena la sesión 
  if(isset($_COOKIE[session_name()])) { 
    setcookie(session_name(), '', time() - 42000, '/'); 
  } 
  // Finalmente, destruye la sesión 
 session_destroy(); 
?>
<script type="text/javascript">
sessionStorage.clear();
window.location.replace("../templete/pages/Auth/");
</script> 
