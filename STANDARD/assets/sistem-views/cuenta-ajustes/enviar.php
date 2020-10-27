<?php
$archivo = (isset($_FILES['archivo'])) ? $_FILES['archivo'] : null;
if ($archivo) {
   $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
   $extension = strtolower($extension);
   $extension_correcta = ($extension == 'pfx');
   if ($extension_correcta) {
      $ruta_destino_archivo = "archivo/{$archivo['name']}";
    $archivo_ok = move_uploaded_file($archivo['tmp_name'], $ruta_destino_archivo);
   }else
   echo ('El Archivo no es compatible');
}
?>