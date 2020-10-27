
<?php
require('fpdf/fpdf.php');
// require('invoice/invoice.php');




$fpdf = new FPDF($orientation='P',$unit='mm', array(80,350),true);
$fpdf->AddPage();
$fpdf->SetFont('Arial','B',8);    //Letra Arial, negrita (Bold), tam. 20
$textypos = 20;
$fpdf->setY(2);
$fpdf->setX(20);
$fpdf->Cell(37,$textypos,$fpdf->Image('your-logo-here.png', $fpdf->GetX(0), $fpdf->GetY(0),35),0);
$fpdf->Ln(10);
$fpdf->SetFont('Arial','',6); 
$fpdf->setXY(0,25);
$fpdf->MultiCell(75,4,"RUC 20552745419 \n "."NOTA DE CRÉDITO ELECTRÓNICA\n"."FF01-123\n",0,'C');
$fpdf->Ln(10);
$fpdf->SetFont('Arial','',5); 
$fpdf->setXY(0,40);
$fpdf->MultiCell(75,3,"CONTABILIZADO\n "."Jr. Las Crucinelas 435 Urb. Las Flores\n"."LIMA-LIMA-LOS OLIVOS\n"."Email: contabilizado@gmail.com / Teléf: 3750106 Cel: 921535282 \n",0,'C');
$fpdf->SetFont('Arial','',5); 
$fpdf->setXY(3,55);
$fpdf->MultiCell(110,4,"Cliente: CODIMAKT PERU S.A.C \n"."RUC: 2051824164\n"."Dirección: LOS OLIVOS\n"."Ubigeo: LIMA-LIMA-LOS OLIVOS\n"."Motivo de Emisión: \n",0,'L');
$fpdf->setXY(3,75);
$fpdf->MultiCell(80,4,"Fecha Emisión: 11-09-2020 \n"."Tipo Doc. Ref.: FACTURA\n"."Documento Ref: \n"."Tipo Moneda: \n"."Guias: \n",0,'L');
$fpdf->Ln(5);
$fpdf->SetFont('Arial','',5);    //Letra Arial, negrita (Bold), tam. 20
$textypos+=6;
$fpdf->setX(2);
// $textypos+=6;
$fpdf->setX(2);
$fpdf->Cell(10,5,'CANT',0,'','C');
$fpdf->Cell(30,5,'DESCRIP',0,'','C');
$fpdf->Cell(15,5,'PRECIO',0,'','C');
$fpdf->Cell(15,5,'TOTAL',0,'','C');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(5,5,'-----------------------------------------------------------------------------------------------------------------------------');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(10,5,'1',0,'C');
$fpdf->Cell(30,5,substr('COMPUTADORA LENOVO A5 CON BETA DE LADO',0,25),0,'C');
$fpdf->Cell(15,5,"1.000 S./",0,'','R');
$fpdf->Cell(15,5,"1.000 S./",0,'','R');



$fpdf->Ln(10);
$fpdf->setX(2);
$fpdf->Cell(15,3,"AFECTO: 1.000 S./",0,'','L');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(15,3,"ISC: 1.000 S./",0,'','L');
$fpdf->Ln();
$fpdf->setX(2);
$fpdf->Cell(15,3,"IGV: 1.000 S./",0,'','L');
$fpdf->Ln();
$fpdf->setX(2);  
$fpdf->Cell(15,3,"TOTAL: 1.000 S./",0,'','L');
$fpdf->setX(2);
$fpdf->Ln(5);
$fpdf->Cell(5,3,'GRACIAS POR TU COMPRA ');

$fpdf->output('I','nombre.fpdf','UTF-8');

?>
