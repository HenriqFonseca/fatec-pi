<?php


  //Variáveis
  $email = $_POST['contatoEmail'];
  $nome = $_POST['nome'];
  $mensagem = $_POST['mensagem'];
  $data_envio = date('d/m/Y');
  $hora_envio = date('H:i:s');
  
  //Compo E-mail
  $arquivo = "
    <html>
      <p><b>Nome: </b>$nome</p>
      <p><b>E-mail: </b>$email</p>
      <p><b>Mensagem: </b>$mensagem</p>
      <p>Este e-mail foi enviado em <b>$data_envio</b> às <b>$hora_envio</b></p>
    </html>
  ";
  
  //Emails para quem será enviado o formulário
  $destino = "henrique12095@gmail.com";
  $assunto = "Contato pelo Site";

  //Este sempre deverá existir para garantir a exibição correta dos caracteres
  $headers  = "MIME-Version: 1.0\n";
  $headers .= "Content-type: text/html; charset=iso-8859-1\n";
  $headers .= "From: $nome <$email>";

  //Enviar
  $email = mail($destino, $assunto, $arquivo, $headers);
  
  if($email){
    echo "enviou";
  }else{
    echo "n enviou";
  }

  echo "<meta http-equiv='refresh' content='10;URL=../contato.html'>";
?>