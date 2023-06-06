<?php
    $to = "henrique12095@gmail.com"; //EMAIL DESTINATARIO

    $assunto = "FORMULARIO DE CONTATO";

    $mensagem = $_POST['mensagem']. " - ". $_POST['nome'];

    $email = $_POST['contatoEmail']; //remetente

    $status = mail($to, $assunto, $mensagem);


    if($status == true)
    {
        print "Mensagem foi enviada";
    }
    else{
        print "deu zica";
    }
?>