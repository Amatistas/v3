<?php
if (!$almacén_cert = file_get_contents("src/LLAMA-PE-CERTIFICADO-DEMO-20552745419.pfx")) {
    echo "Error: No se puede leer el fichero del certificado\n";
    exit;
}
if (openssl_pkcs12_read($almacén_cert, $info_cert, 1213456)) {
    echo "Información del certificado\n";
   
    // foreach ($info_cert as $key => $value) {
    //     echo($value . "</br></br></br></br>");
    // };
    echo($info_cert['pkey']);
} else {
    echo "Error: No se puede leer el almacén de certificados.\n";
    exit;
}

?>
