<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'mailer/Exception.php';
require 'mailer/PHPMailer.php';
require 'mailer/SMTP.php';

$phone = '';
$email = '';

if (isset($_POST['phone'])) {
    $phone = $_POST['phone'];
}
if (isset($_POST['email'])) {
    $email = $_POST['email'];
}

$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// Настройки SMTP
$mail->isSMTP();
$mail->Host = ' ';
$mail->SMTPAuth = true;
$mail->Username = ' ';
$mail->Password = ' ';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465; 

// От кого письмо
$mail->setFrom('info@matsakov-victor.com', 'Заявка - Мацаков Виктор');
// Кому отправить
$mail->addAddress('order@salesgenerator.pro');

$mail->Subject = 'Заявка - Мацаков Виктор';

// Текст письма
$mail->isHTML(true);  
$mail->Body    = "Новая заявка с сайта: <br>
                  Телефон: $phone <br>
                  Email: $email";

// Отправка письма
if (!$mail->send()) {
    return false;
} else {
    return true;
}
