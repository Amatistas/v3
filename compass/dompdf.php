<?php
// include autoloader

require __DIR__ . '/vendor/autoload.php';
/* require 'dompdf/autoload.inc.php'; */
// reference the Dompdf namespace
use Dompdf\Dompdf;

// instantiate and use the dompdf class
$dompdf = new Dompdf();

$timeZone = new DateTimeZone('America/Lima');
           
$transitionToDst = '2014-03-30 03:00:00';

$date = new DateTime($transitionToDst, $timeZone);


$html = '<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Aloha!</title>

<style type="text/css">
@page {
  margin: 1cm 1cm;
}
    * {
        font-family: Verdana, Arial, sans-serif;
    }
    table{
        font-size: x-small;
    }
    tfoot tr td{
        font-weight: bold;
        font-size: x-small;
    }
    .gray {
        background-color: lightgray
    }
    
    /** Define the footer rules **/
    footer {
        position: fixed; 
        bottom: 0cm; 
        left: 0cm; 
        right: 0cm;
        height: 2cm;
      font-size:10px;
        /** Extra personal styles **/
     
        text-align: center;
       
    }
</style>

</head>
<body>

  <table width="100%">
    <tr>
        <td valign="top"><img src="../STANDARD/assets/images/your-logo-here.png" alt="" width="150"/></td>
        <td align="center">
        <p>                    
        <strong>
        CONTABILIZADO <br>
        </strong>
        Jr. Las Crucinelas 435 Urb. Las Flores  <br>
        LIMA-LIMA-LOS OLIVOS<br>
        Email: contabilizado@gmail.com<br>
        Teléf: 3750106 Cel: 921535282
</p>
        </td>
        <td align="right">
        <p align="center">
        RUC 20552745419<br>
        FACTURA ELECTRÓNICA<br>
        F001-00000009 <br>
    </p>
        </td>
    </tr>

  </table>

  <table width="100%">
    <tr>
        <td><strong></strong>Cliente:</td>
        <td><strong></strong>CODIMAKT PERU S.A.C</td>
        <td><strong></strong>Fecha Emisión:</td>
        <td><strong></strong>11-09-2020</td>
    </tr>
    <tr>
        <td><strong></strong>RUC:</td>
        <td><strong></strong>2051824164</td>
        <td><strong></strong>Condición:</td>
        <td><strong></strong>CONTADO</td>
    </tr>
    <tr>
        <td><strong></strong>Dirección:</td>
        <td><strong></strong>LOS OLIVOS</td>
        <td><strong></strong>G.R Remitente:</td>
        <td><strong></strong> </td>
    </tr>
    <tr>
        <td><strong></strong>Ubigeo:</td>
        <td><strong></strong>LIMA-LIMA-LOS OLIVOS</td>
        <td><strong>From:</strong>11-09-2020</td>
        <td><strong></strong></td>
    </tr>
    <tr>
        <td><strong></strong>Obs:</td>
        <td><strong></strong></td>
        <td><strong></strong></td>
        <td><strong></strong></td>
    </tr>

  </table>

  <br/>

  <table width="100%">
    <thead style="background-color: lightgray;">
      <tr>
        <th>Código</th>
        <th>Descripción</th>
        <th>Cant</th>
        <th>Psnt</th>
        <th>Precio</th>
        <th>Importe</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Playstation IV - Black</td>
        <td align="right">1</td>
        <td align="right">1400.00</td>
        <td align="right">1400.00</td>
        <td align="right">1400.00</td>
      </tr>
     
    </tbody>

    <tfoot>
        <tr>
            <td colspan="4"></td>
            <td align="right">Afecto:</td>
            <td align="right">1635.00</td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td align="right">Inafecto:</td>
            <td align="right">294.3</td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td align="right">ISC:</td>
            <td align="right">$ 1929.3</td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td align="right">IGV/IVA:</td>
            <td align="right" >$ 1929.3</td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td align="right">Total Dsctos:</td>
            <td align="right" >$ 1929.3</td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td align="right">Total Dsctos:</td>
            <td align="right" >$ 1929.3</td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td align="right">Total Dcmto:</td>
            <td align="right" >$ 1929.3</td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td align="right">Percepción:</td>
            <td align="right" >$ 1929.3</td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td align="right">Total a Pagar:</td>
            <td align="right" class="gray">$ 1929.3</td>
        </tr>
    </tfoot>
  </table>
<footer><p>REPRESENTACIÓN IMPRESA DEL COMPROBANTE DE PAGO ELECTRÓNICO <br>
ESTE DOCUMENTO PUEDE SER CONSULTADO EN <br>
www.gruposc.cpe.com.pe</p></footer>
</body>
</html>';

$dompdf->loadHtml($html);
$dompdf->render();
header("Content-type: application/pdf");
header("Content-Disposition: inline; filename=documento.pdf");
echo $dompdf->output();