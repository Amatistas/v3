<?php
require('fpdf/fpdf.php');
// require('invoice/invoice.php');


// Añadir capítulo
class PDF extends FPDF{




    
    protected $extgstates = array();

    // alpha: real value from 0 (transparent) to 1 (opaque)
    // bm:    blend mode, one of the following:
    //          Normal, Multiply, Screen, Overlay, Darken, Lighten, ColorDodge, ColorBurn,
    //          HardLight, SoftLight, Difference, Exclusion, Hue, Saturation, Color, Luminosity
    function SetAlpha($alpha, $bm='Normal')
    {
        // set alpha for stroking (CA) and non-stroking (ca) operations
        $gs = $this->AddExtGState(array('ca'=>$alpha, 'CA'=>$alpha, 'BM'=>'/'.$bm));
        $this->SetExtGState($gs);
    }

    function AddExtGState($parms)
    {
        $n = count($this->extgstates)+1;
        $this->extgstates[$n]['parms'] = $parms;
        return $n;
    }

    function SetExtGState($gs)
    {
        $this->_out(sprintf('/GS%d gs', $gs));
    }

    function _enddoc()
    {
        if(!empty($this->extgstates) && $this->PDFVersion<'1.4')
            $this->PDFVersion='1.4';
        parent::_enddoc();
    }

    function _putextgstates()
    {
        for ($i = 1; $i <= count($this->extgstates); $i++)
        {
            $this->_newobj();
            $this->extgstates[$i]['n'] = $this->n;
            $this->_put('<</Type /ExtGState');
            $parms = $this->extgstates[$i]['parms'];
            $this->_put(sprintf('/ca %.3F', $parms['ca']));
            $this->_put(sprintf('/CA %.3F', $parms['CA']));
            $this->_put('/BM '.$parms['BM']);
            $this->_put('>>');
            $this->_put('endobj');
        }
    }

    function _putresourcedict()
    {
        parent::_putresourcedict();
        $this->_put('/ExtGState <<');
        foreach($this->extgstates as $k=>$extgstate)
            $this->_put('/GS'.$k.' '.$extgstate['n'].' 0 R');
        $this->_put('>>');
    }

    function _putresources()
    {
        $this->_putextgstates();
        parent::_putresources();
    }











    function Header()
{
    // Logo
    $this->Image('your-logo-here.png',10,8,33);
    $this->SetFont('Arial','I',8);

        $this->SetXY(48,10);
        $this->MultiCell(100,4,"CONTABILIZADO\n "."Jr. Las Crucinelas 435 Urb. Las Flores\n"."LIMA-LIMA-LOS OLIVOS\n"."Email: contabilizado@gmail.com / Teléf: 3750106 Cel: 921535282 \n",0,'L');
        $this->SetXY(135,10);
        $this->SetFont('Arial','B',9);
        $this->MultiCell(64,5,"RUC 20552745419 \n "."NOTA DE DÉBITO ELECTRÓNICA\n"."FF01-123\n",1,'C');
       // Line break
      

        $this->SetMargins(10,30,20,20);

$this->SetFont('Arial','',9);
$this->SetXY(10,30);
$this->MultiCell(110,5,"Cliente: CODIMAKT PERU S.A.C \n"."RUC: 2051824164\n"."Dirección: LOS OLIVOS\n"."Ubigeo: LIMA-LIMA-LOS OLIVOS\n"."Motivo de  Emisión: \n",0,'L');
$this->SetXY(120,30);

$this->MultiCell(80,5,"Fecha Emisión: 11-09-2020 \n"."Tipo Doc. Ref.: FACTURA\n"."Documento Ref: \n"."Tipo Moneda: \n",0,'L');

$this->SetLineWidth(0.4);
$this->line(10,55,200,55);
$this->SetY(60);
        // $fpdf->Ln(10);
        $this->SetFont('Arial','B',8);

$this->cell(20,6,'Código',1,'','C');
$this->cell(90,6,'Descripción',1,'','C');
$this->cell(20,6,'Cant',1,'','C');
// $this->cell(15,6,'Psnt',1,'','C');
$this->cell(30,6,'Precio',1,'','C');
$this->cell(30,6,'Importe',1,'','C');
$this->Ln(8);
// $this->Ln(5);
}


function Footer()
{
    // Posición: a 1,5 cm del final
    $this->SetY(-18);
    // Arial italic 8
    $this->SetFont('Arial','I',8);
    // Número de página

    $this->Cell(0,5,"REPRESENTACIÓN IMPRESA DEL COMPROBANTE DE PAGO ELECTRÓNICO \n",0,1,'C');
    $this->Cell(0,5,"ESTE DOCUMENTO PUEDE SER CONSULTADO EN",0,1,'C');
    $this->Cell(0,5,"www.gruposc.cpe.com.pe",0,1,'C');
    $this->SetX(50);
    $this->SetY(-10 );
    $this->Cell(0,5,'Página '.$this->PageNo().'/{nb}',0,0,'R');
    $this->SetAlpha(0.3);
    $this->Image('your-logo-here.png',46,130,120);
}

}

// Creación del objeto de la clase heredada
$fpdf = new PDF('P','mm','A4',true);

$fpdf->AddPage('portrait','A4');
// $fpdf->SetMargins(20)

$fpdf->SetFont('Arial','',8);

/////////////////item de productos///////////////


$fpdf->cell(20,6,'hola',1,'','L');
$fpdf->cell(90,6,substr('aaaaaaaaaaaaaaaaaaaaaaaaaaaa',0,60),1,'','L');
$fpdf->cell(20,6,'0 UND',1,'','C');
$fpdf->cell(30,6,'0,0',1,'','R');
$fpdf->cell(30,6,'0,0',1,'','R');
$fpdf->Ln();

/////////////////item de productos end///////////

$fpdf->cell(130,6,'SON: MIL CON 00/100 Solesto',0,'','L');

// $fpdf->Ln();
// $fpdf->Image('qr.jpg',0,0,33);
// $fpdf->Ln();
// $fpdf->SetX(140);
$fpdf->cell(30,6,'Afecto',1,'','L');
$fpdf->cell(30,6,'0,0',1,'','R');
$fpdf->Ln();
// $fpdf->SetY(50);
$fpdf->SetX(140);
// $fpdf->cell(130,36,'Inafecto',1,'','L');
$fpdf->cell(30,6,'Inafecto',1,'','L');
$fpdf->cell(30,6,'0,0',1,'','R');
$fpdf->Ln();
// $fpdf->SetX(140);
$fpdf->Cell(130,30, $fpdf->Image('qr.jpg', $fpdf->GetX(0), $fpdf->GetY(0),25),0);
$fpdf->cell(30,6,'ISC',1,'','L');
$fpdf->cell(30,6,'0,0',1,'','R');
$fpdf->Ln();
$fpdf->SetX(140);
$fpdf->cell(30,6,'IGV/IVA',1,'','L');
$fpdf->cell(30,6,'0,0',1,'','R');
$fpdf->Ln();
$fpdf->SetX(140);
$fpdf->cell(30,6,'Total Dsctos',1,'','L');
$fpdf->cell(30,6,'0,0',1,'','R');
$fpdf->Ln();
$fpdf->SetX(140);
$fpdf->cell(30,6,'Total Dsctos',1,'','L');
$fpdf->cell(30,6,'0,0',1,'','R');
$fpdf->Ln();
$fpdf->SetX(140);
$fpdf->cell(30,6,'Total Dcmto',1,'','L');
$fpdf->cell(30,6,'0,0',1,'','R');
$fpdf->Ln();
$fpdf->SetX(140);
$fpdf->cell(30,6,'Percepción',1,'','L');
$fpdf->cell(30,6,'0,0',1,'','R');
$fpdf->Ln();
// $fpdf->SetX(140);
$fpdf->cell(130,6,'Cta Ahorro: 0011-0566-7602000598-49 Cta Interbancaria: 011-566-000200059849-76',0,'','L');
$fpdf->cell(30,6,'Total a Pagar',1,'','L');
$fpdf->cell(30,6,'0,0',1,'','R');


$fpdf->AliasNbPages();
$fpdf->Output('I','nombre.pdf','UTF-8');
?>
